---
name: faq-judge
description: 评估 QA 对质量，从问题和答案两个维度共 10 项打分。重点检查：问题场景完整性（scenario_completeness）和公式严谨性（formula_rigor）。用于：(1) 评估自动生成的 QA 对质量 (2) 筛选高质量问答对 (3) 用户说"评估QA"、"QA评分"、"质量审核"。输入为 QA 对列表和原文摘要，输出为每个 QA 的 10 维度评分、通过/不通过判定和改进建议。
---

# FAQ Judge

评估 QA 对质量，10 维度打分，筛选通过阈值的高质量问答。

## Scoring Dimensions

### 问题评分 (5 维度, 每项 1-5 分)

| 维度 | 含义 |
|------|------|
| naturalness | 是否像真实用户会问的，不是生硬拼凑 |
| context_relevance | 脱离原文后问题是否还有意义 |
| knowledge_clarity | 是否清楚在考什么知识 |
| phrasing | 结合场景的问法是否恰当 |
| **scenario_completeness** | **问题是否包含足够的场景约束条件** |

#### scenario_completeness 评分标准（新增，重点维度）

| 分数 | 标准 | 示例 |
|------|------|------|
| 1 | 完全没有场景，泛泛而谈 | "模型训练需要多少显存？" |
| 2 | 有部分场景但关键条件缺失，答案会因缺失条件而完全不同 | "LoRA 微调的效率如何？"（缺模型、缺对比基准） |
| 3 | 场景基本完整但缺少 1-2 个影响答案的次要条件 | "LLaMA-7B 的 LoRA 微调需要多少显存？"（缺 rank、缺精度） |
| 4 | 场景完整，关键条件齐全 | "对 LLaMA-7B 使用 LoRA（rank=16）进行 SFT，显存占用大约多少？" |
| 5 | 场景丰富且精确，包含硬件、超参等完整上下文 | "对 LLaMA-7B 使用 LoRA（rank=16, alpha=32）在单张 A100-80G 上进行 SFT（seq_len=2048, batch_size=4），显存占用大约多少？" |

**判断原则**：如果一个问题的答案会因为缺少某个条件而产生完全不同的结果，那这个条件就是"关键条件"，缺失则扣分。

### 答案评分 (5 维度, 每项 1-5 分)

| 维度 | 含义 |
|------|------|
| accuracy | 答案是否正确 |
| completeness | 是否充分回答了问题 |
| mastery | 读者看完能否真正理解这个知识点 |
| independence | 不依赖原文上下文也能理解 |
| **formula_rigor** | **公式是否有来源、参数解释、场景代入（无公式则默认 5 分）** |

#### formula_rigor 评分标准（新增，重点维度）

| 分数 | 标准 | 示例 |
|------|------|------|
| 1 | 公式孤立出现，无任何解释 | "FLOPs = $2MNK$。" |
| 2 | 有公式但只有简单的符号说明，无来源无代入 | "FLOPs = $2MNK$，其中 M 是行数，N 是列数，K 是内维度。" |
| 3 | 有来源或有代入，但不完整（二缺一） | 解释了 2 的来源（MAC），但没有代入实际模型参数 |
| 4 | 来源 + 参数解释 + 代入都有，但代入不够详细 | 代入了 d_model=4096 但没说明这个值从哪来 |
| 5 | 完整：来源说明 + 每个参数解释 + 代入问题场景的实际数值并算出结果 | 说明 2 来自 MAC 惯例，解释每个参数对应模型的哪个维度，代入 LLaMA-7B 的实际值算出具体 GFLOPs |

**无公式的答案**：如果答案本身不涉及公式（如概念解释类），formula_rigor 默认给 5 分，不影响总分。

## Verdict

- 10 维度平均分 >= 3.5 → `pass`
- 10 维度平均分 < 3.5 → `fail`
- 特殊规则：如果 scenario_completeness <= 2 或 formula_rigor <= 2，无论平均分多高，直接 `fail`

## Output Schema

```json
{
  "results": [
    {
      "question_scores": { "naturalness": 4, "context_relevance": 5, "knowledge_clarity": 4, "phrasing": 3, "scenario_completeness": 4 },
      "answer_scores": { "accuracy": 5, "completeness": 4, "mastery": 4, "independence": 4, "formula_rigor": 5 },
      "average": 4.2,
      "verdict": "pass",
      "question_suggestion": "可以补充 batch_size 和 seq_len 等超参条件",
      "answer_suggestion": "公式代入部分建议补充 K/V 投影的 FLOPs 以给出完整的 Attention 层计算量"
    }
  ],
  "summary": { "total": 5, "passed": 4, "failed": 1 }
}
```

## Judging Example

**待评估 QA：**

问题："LoRA 微调的效率如何？"
答案："LoRA 通过低秩分解减少参数量，FLOPs 为 $2MNK$，效率很高。"

**评分：**
```json
{
  "question_scores": { "naturalness": 3, "context_relevance": 3, "knowledge_clarity": 2, "phrasing": 2, "scenario_completeness": 1 },
  "answer_scores": { "accuracy": 3, "completeness": 2, "mastery": 2, "independence": 3, "formula_rigor": 1 },
  "average": 2.2,
  "verdict": "fail",
  "question_suggestion": "问题缺少关键场景：什么模型？rank 多少？跟什么方法比效率？建议改为：'对 LLaMA-7B 使用 LoRA（rank=16）进行 SFT，相比全量微调在参数量和显存上分别能节省多少？'",
  "answer_suggestion": "1) 公式 2MNK 没有来源说明（为什么是 2？）2) 没有解释 M/N/K 分别对应什么 3) 没有代入实际模型参数计算 4) '效率很高'是空话，需要给出具体的压缩比数据"
}
```

## System Prompt Template

```
你是一个 QA 质量评审专家。评估每个问答对的质量。

评分维度 (每项 1-5 分):

问题评分 (5 维度):
- naturalness: 是否像真实用户会问的，不是生硬拼凑
- context_relevance: 脱离原文后问题是否还有意义
- knowledge_clarity: 是否清楚在考什么知识
- phrasing: 结合场景的问法是否恰当
- scenario_completeness: 问题是否包含足够的场景约束（模型规格、训练方法、阶段、硬件等）。如果答案会因缺少某条件而完全不同，该条件必须出现在问题中。1分=完全无场景，5分=场景丰富精确

答案评分 (5 维度):
- accuracy: 答案是否正确
- completeness: 是否充分回答了问题
- mastery: 读者看完能否真正理解这个知识点
- independence: 不依赖原文上下文也能理解
- formula_rigor: 公式是否有来源说明+参数解释+场景代入。1分=公式孤立无解释，5分=来源+参数+代入完整。无公式的答案默认5分

对每个 QA:
1. 给出各维度分数
2. 计算平均分 (10个维度的平均)
3. 平均分 >= 3.5 为 pass，否则 fail
4. 特殊规则：scenario_completeness <= 2 或 formula_rigor <= 2 时，无论平均分多高，直接 fail
5. 给出 question_suggestion (问题改进建议，包括更好的问法)
6. 给出 answer_suggestion (答案改进建议，特别关注公式是否孤立)

只输出 JSON: { "results": [...], "summary": { "total": N, "passed": N, "failed": N } }
```

## API Call Pattern

- Endpoint: `{AI_API_BASE_URL}/chat/completions`
- Model: `{AI_MODEL}`
- Temperature: 0.2 (更低温度保证评分一致性)
- Response format: `{ type: "json_object" }`
- User prompt 包含原文摘要 + 待评估 QA 对列表
