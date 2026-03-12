---
name: faq-grounded-review
description: Use when answering one or more FAQ questions from plain text or image OCR, with paper-first web grounding, citation-located evidence, answer-structure quality checks, and staging to a human review queue.
---

# FAQ Grounded Review

统一处理文本问题与图片提取问题，按“先回答、再证据校验、再修订、最后入 `review`”执行。  
本 skill 的默认目标是：`高可解释 + 可追溯引用 + 人工审核可接管`，绝不自动发布。

## Input Routing（强约束）

### 1) 纯文本单题
- 输入：一个自然语言问题字符串
- 处理：只生成 1 个 QA 项，不做批量扩散
- 必做：问题归一化（去空白、去重复、修正明显 OCR 噪声）

### 2) 纯图片单题
- 输入：1 张图片，OCR 后仅提取到 1 个问题
- 处理：按单题流程执行，不因为来源是图片而降级
- 必做：记录 `question_source=ocr_image`，并在输出中保留原图路径或图片标识

### 3) 纯图片多题 / 文本多题 / 混合输入
- 输入：多问题集合（文本、图片或混合）
- 处理：逐题独立流水线，单题失败不影响其他题
- 必做：每题独立 evidence、独立 citation、独立质量判定

## Mandatory Workflow（逐题执行）

1. 问题分析（Question Analysis）
- 识别问题类型：`concept` / `formula` / `comparison` / `troubleshooting` / `architecture`
- 提取场景要素：模型、训练方法、阶段、硬件、数据规模、约束条件
- 若关键场景缺失，先补齐上下文假设并显式写出“假设条件”

2. 生成基线答案（Baseline Answer）
- 先给一个可读、完整、可独立理解的草稿答案
- 不允许先堆引用再拼答案，避免“引用驱动幻觉”

3. 检索证据（Web Grounding）
- 检索优先级：`paper > official docs > expert blog > general blog`
- 最低门槛：`>=2` 条来源，且优先满足 `>=1` 条 paper
- 证据冲突时：高优先级来源覆盖低优先级来源，并保留冲突说明

4. 可靠性评估（Evidence Reliability）
- 对每条来源打分：来源等级、可访问性、与问题匹配度、信息新鲜度
- 形成 `evidence_score`（0-100）和 `needs_manual_verification`（布尔）

5. 证据回写修订（Grounded Revision）
- 用证据修正基线答案中的事实、数字、术语和边界条件
- 对每个关键结论增加 citation 标记

6. 答案结构质检（Answer QA Gate）
- 检查是否说清：场景、公式来源、原理解释、是否需要配图
- 检查答案构成占比是否合理（见下文比例规则）

7. 入库与审核（Stage to Review）
- 永远写入 `status=review`
- 低证据项必须标记人工复核，不得自动发布

## Evidence Ranking + Score

### Source Rank
- `paper`: arXiv / conference / journal / openreview
- `official docs`: 官方技术文档、框架文档、标准文档
- `expert blog`: 专家作者的技术博客、实验复盘
- `general blog`: 一般技术博客，仅补充

### Reliability Score（建议）
- `score = 0.35*source_rank + 0.25*relevance + 0.20*freshness + 0.20*accessibility`
- 评分区间 0-100：
- `>=80`: 高可靠，可进入 review
- `60-79`: 中可靠，必须带人工复核标记
- `<60`: 低可靠，建议拒绝自动入库或仅入库并强提示人工重写

## Answer Type 要求

| 类型 | 必须回答的内容 |
|---|---|
| concept | 概念定义、关键机制、适用边界、常见误解 |
| formula | 公式来源、符号解释、场景代入、结果单位 |
| comparison | 对比维度、优缺点、适用场景、选择建议 |
| troubleshooting | 现象、定位路径、根因、止血与长期修复 |
| architecture | 链路分层、瓶颈点、权衡、监控与回滚 |

## 答案构成占比（建议区间）

> 用于“结构检查”，不是死规则。无法满足时必须写明原因。

- 场景与问题重述：`15%-25%`
- 原理解释：`25%-35%`
- 公式/推导/量化依据：`20%-35%`（无公式题可降到 0%，并把比例让给原理与案例）
- 示例/配图说明：`10%-20%`
- 边界条件与风险提示：`5%-15%`

## Citation 标记规范（必须）

### 行内标记
- 普通结论：`... [cite:ref-1 §Method]`
- 公式来源：`... [cite:ref-2 Eq.(4)]`
- 图示来源：`... [cite:ref-3 Fig.2]`

### 小字标记（可替代）
- 在段末或图下注明：`<sub>来源: [cite:ref-2 §3.1]</sub>`

### 无法精准定位时
- 允许使用定位提示：`[cite:ref-4 locator_hint="search: IO-aware attention"]`
- 必须同时设置 `needs_manual_verification=true`

## Output Schema（逐题）

```json
{
  "question": "string",
  "question_source": "text|ocr_image",
  "question_type": "concept|formula|comparison|troubleshooting|architecture",
  "scenario_assumptions": ["string"],
  "baseline_answer": "string",
  "final_answer": "string (含 cite 标记或小字来源定位)",
  "answer_composition_ratio": {
    "scenario": 0.2,
    "principle": 0.3,
    "formula_or_quant": 0.25,
    "example_or_figure": 0.15,
    "risks": 0.1
  },
  "quality_check": {
    "scenario_completeness": 1,
    "formula_rigor": 1,
    "principle_clarity": 1,
    "figure_needed_and_explained": true
  },
  "evidence_score": 0,
  "needs_manual_verification": true,
  "verification_notes": "string",
  "references": [
    {
      "id": "ref-1",
      "type": "paper|official|blog|other",
      "title": "string",
      "url": "https://...",
      "locator": "§2.3 / Eq.(4) / Fig.2 / locator_hint"
    }
  ],
  "stage_status": "review"
}
```

## 与其他 Skills 的协同边界

- 单独给一个文本问题：默认只用 `faq-grounded-review`
- 从文档批量生成 QA：用 `faq-generator`（如需证据落地，再逐题进入 `faq-grounded-review`）
- 只做质量评分：用 `faq-judge`
- 组合链路推荐：`faq-generator -> faq-grounded-review -> faq-judge`
- 本 skill 不自动触发发布；发布动作必须人工审核后执行

## Neon 优秀样例（来自现有库）

样例已外置为完整内容文件，必要时按 ID 读取：
- `examples/neon-examples.full.json`

文件中包含每个样例的完整字段（非缩略）：
- `question` / `question_en`
- `answer` / `answer_brief` / `answer_en` / `answer_brief_en`
- `tags` / `categories`
- `references` / `images`
- `upvote_count` / `downvote_count` / `status` / `created_at` / `updated_at`

当前收录样例 ID：
- `1`（Flash Attention）
- `3`（PPO / GRPO / DPO）
- `91`（chunk size / overlap）
- `111`（DeepSpeed ZeRO stages）

使用约束：
- 在 SKILL 正文中只保留索引与读取路径，不粘贴大段样例正文。
- 需要完整示例时，再按具体 ID 从 `examples/neon-examples.full.json` 读取。
- 如果样例过期，更新外置 JSON，不在 SKILL 主文档堆叠历史版本。

## Hard Rules

1. 不得跳过问题分析直接拼接引用。
2. 不得在无证据情况下给确定性结论。
3. 不得省略 citation（行内或小字至少一种）。
4. 不得自动发布，必须 `status=review`。
5. 低证据必须明确标记人工复核。
