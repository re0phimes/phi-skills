# FAQ Grounded Review Examples

该目录存放 `faq-grounded-review` 的外置样例数据。

## Files

- `neon-examples.full.json`: 从 Neon `faq_items` 导出的完整样例（包含完整答案和引用）。

## Refresh Examples From Neon

在 `C:\Users\re0ph\Code\AIFAQ` 下执行：

```powershell
@'
import fs from "fs";
import path from "path";
import { sql } from "@vercel/postgres";

const ids = [1, 3, 91, 111];
const { rows } = await sql`
  SELECT
    id,
    question,
    question_en,
    answer,
    answer_brief,
    answer_en,
    answer_brief_en,
    tags,
    categories,
    "references",
    images,
    upvote_count,
    downvote_count,
    status,
    created_at,
    updated_at
  FROM faq_items
  WHERE id = ANY(${ids}::int[])
  ORDER BY id
`;

const payload = {
  generated_at: new Date().toISOString(),
  source: { project: "AIFAQ", table: "faq_items", ids },
  examples: rows
};

const phiSkillsRepo = process.env.PHI_SKILLS_REPO ?? "C:/path/to/phi-skills";
const outPath = path.resolve(phiSkillsRepo, "skills/faq/faq-grounded-review/examples/neon-examples.full.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n", "utf-8");
console.log(outPath);
'@ | npx tsx -r ./scripts/env-loader.js -
```

## Notes

- `SKILL.md` 只保留索引，不应粘贴大段样例正文。
- 样例变更优先更新本目录 JSON 文件。
- 运行前设置 `PHI_SKILLS_REPO` 到你的本地仓库路径，可避免机器相关的绝对路径。
