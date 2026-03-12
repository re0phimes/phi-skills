---
name: faq-generator
description: 从技术文档中提取核心知识点并生成高质量 QA 对。用于：(1) 用户提供技术文档（Markdown/文本）需要自动生成 FAQ (2) 批量导入文档并生成问答对 (3) 用户说"生成QA"、"提取问答"、"从文档生成FAQ"。输入为文档文本和已有标签列表，输出为结构化 QA 对列表。
---

# FAQ Generator

从技术文档提取知识点，生成自然、独立可理解的 QA 对。

## Workflow

1. 接收文档 Markdown 文本和已有标签列表
2. 分析文档结构，识别核心知识点
3. 为每个知识点生成自然的问答对
4. 输出结构化 JSON

## Generation Rules

- 每 1000 字约生成 1-2 个 QA
- 问题要像真实用户会问的，自然、有场景感，不要生硬拼凑
- 答案要完整、准确，读者不需要看原文也能理解
- 答案使用中文 Markdown，支持 LaTeX 公式（`$` 或 `$$` 包裹）
- 尽量复用已有标签，保持标签体系一致性

### 问题场景化规则（严格执行）

问题必须包含足够的场景约束，让读者明确知道"在什么条件下讨论什么"。禁止生成缺少关键前提的泛化问题。

判断标准：如果一个问题的答案会因为缺少某个条件而完全不同，那这个条件就必须出现在问题中。

| 必须包含的场景要素 | 说明 |
|---|---|
| 模型规格 | 具体模型名+参数量，如 "LLaMA-7B"、"GPT-3 175B" |
| 训练方法 | LoRA / 全量微调 / QLoRA / Adapter 等 |
| 训练阶段 | Pretrain / SFT / RLHF / DPO / GRPO 等 |
| 硬件环境 | GPU 型号、数量、显存（如适用） |
| 数据规模 | 序列长度、batch size、数据集大小（如适用） |

**Bad — 缺场景：**
- "模型训练需要多少显存？" → 什么模型？什么训练方法？什么阶段？
- "LoRA 微调的效率如何？" → 什么模型？跟什么比？
- "如何计算推理的 FLOPs？" → 什么模型架构？什么精度？

**Good — 有场景：**
- "对 LLaMA-7B 进行 LoRA SFT 微调（rank=16, alpha=32），在单张 A100-80G 上的显存占用大约是多少？"
- "在 batch_size=1、seq_len=2048 的条件下，LLaMA-13B 单次前向推理的 FLOPs 大约是多少？如何推导？"
- "使用 QLoRA（4-bit 量化 + LoRA rank=64）对 LLaMA-65B 做 SFT，相比全量微调能节省多少显存？"

### 公式规范（严格执行）

答案中出现的每一个公式都必须满足以下三个要求，缺一不可：

**① 公式来源**：说明这个公式从哪来、为什么成立

**② 参数解释**：每个符号的含义和取值依据

**③ 场景代入**：用问题中的实际数值代入计算，给出具体结果

**Bad — 孤立公式：**
```
矩阵乘法的 FLOPs 为 $2MNK$。
```
→ 没有说明为什么是 2MNK，没有代入实际值。

**Good — 完整公式推导：**
```
对于一次矩阵乘法 $C = A \times B$，其中 $A \in \mathbb{R}^{M \times N}$，$B \in \mathbb{R}^{N \times K}$，
每个输出元素需要 $N$ 次乘法和 $N-1$ 次加法，近似为 $2N$ 次浮点运算，
共 $M \times K$ 个输出元素，因此总 FLOPs 为：

$$\text{FLOPs} = 2MNK$$

这个 $2$ 来自"一次乘法 + 一次加法"的计数惯例（MAC, Multiply-Accumulate）。

以 LLaMA-7B 的 Self-Attention 中 Q 投影为例：
- 输入维度 $M = \text{seq\_len} = 2048$（序列长度）
- 隐藏维度 $N = d_{\text{model}} = 4096$
- 输出维度 $K = d_{\text{model}} = 4096$

代入得：$2 \times 2048 \times 4096 \times 4096 = 68.7 \text{GFLOPs}$
```

## Output Schema

```json
{
  "qa_pairs": [
    {
      "question": "string (中文，自然语言)",
      "answer": "string (中文 Markdown)",
      "tags": ["string (2-5个中文技术标签)"],
      "categories": ["string (1-2个分类)"],
      "confidence": 0.85
    }
  ]
}
```

## System Prompt Template

```
你是一个 AI/ML 领域的技术教育专家。你的任务是阅读一篇技术文档，提取核心知识点，生成高质量的问答对。

要求:
1. 每个问答对包含: question (中文), answer (中文 Markdown，支持 LaTeX 公式用 $ 或 $$ 包裹), tags (2-5个中文技术标签), categories (1-2个分类), confidence (0-1 的置信度)
2. 问题要像真实用户会问的，自然、有场景感，不要生硬拼凑
3. 答案要完整、准确，读者不需要看原文也能理解
4. 根据文档长度自适应生成数量（约每 1000 字 1-2 个 QA）
5. 尽量复用已有标签: {existingTags}

只输出 JSON: { "qa_pairs": [...] }
```

## API Call Pattern

- Endpoint: `{AI_API_BASE_URL}/chat/completions`
- Model: `{AI_MODEL}`
- Temperature: 0.3 (低温度保证一致性)
- Response format: `{ type: "json_object" }`
- Parse response: `data.choices[0].message.content` → JSON → `.qa_pairs`

## Quality Criteria

### 问题质量自检清单

生成每个问题后，逐项检查：

- [ ] 问题是否包含具体的模型/方法/场景？
- [ ] 如果去掉场景信息，答案是否会变得模糊或多义？（如果是，说明场景信息是必要的）
- [ ] 问题是否像一个有经验的工程师在实际工作中会问的？
- [ ] 问题是否脱离原文也能被理解？

### 答案质量自检清单

生成每个答案后，逐项检查：

- [ ] 答案中的每个公式是否都有来源说明？
- [ ] 答案中的每个公式参数是否都有解释？
- [ ] 答案中的公式是否代入了问题场景中的实际数值？
- [ ] 读者不看原文，能否完全理解这个答案？

### 完整 Example

**输入文档片段：**
> LoRA（Low-Rank Adaptation）通过在预训练权重旁注入低秩矩阵来实现高效微调。对于权重矩阵 W ∈ R^{d×k}，LoRA 将更新分解为 ΔW = BA，其中 B ∈ R^{d×r}，A ∈ R^{r×k}，r << min(d,k)。

**生成的 QA 对：**

```json
{
  "question": "对 LLaMA-7B（hidden_dim=4096）使用 LoRA（rank=16）进行 SFT 微调时，单个线性层的 LoRA 可训练参数量是多少？相比全量微调减少了多少倍？",
  "answer": "## LoRA 可训练参数量推导\n\nLoRA 的核心思想是将权重更新 $\\Delta W$ 分解为两个低秩矩阵的乘积：\n\n$$\\Delta W = BA$$\n\n其中 $B \\in \\mathbb{R}^{d \\times r}$，$A \\in \\mathbb{R}^{r \\times k}$。这个分解来自 Hu et al. (2021) 的 LoRA 论文，基于\"预训练模型的权重更新具有低秩结构\"这一假设。\n\n**参数量计算：**\n\n- 全量微调：直接更新 $W \\in \\mathbb{R}^{d \\times k}$，参数量 = $d \\times k$\n- LoRA：只训练 $B$ 和 $A$，参数量 = $d \\times r + r \\times k$\n\n**代入 LLaMA-7B 的实际值：**\n\n以 Self-Attention 的 Q 投影为例，$d = k = 4096$，$r = 16$：\n\n- 全量参数：$4096 \\times 4096 = 16,777,216$（约 16.8M）\n- LoRA 参数：$4096 \\times 16 + 16 \\times 4096 = 65,536 + 65,536 = 131,072$（约 131K）\n- 压缩比：$\\frac{16,777,216}{131,072} = 128$ 倍\n\n因此，rank=16 的 LoRA 将单层可训练参数减少到全量微调的 **1/128**。",
  "tags": ["LoRA", "参数高效微调", "LLaMA", "低秩分解"],
  "categories": ["模型微调"],
  "confidence": 0.92
}
```
