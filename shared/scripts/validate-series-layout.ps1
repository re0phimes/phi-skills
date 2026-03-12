$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot | Split-Path -Parent
Set-Location $repoRoot

$requiredDirs = @(
  "skills/phi",
  "skills/faq",
  "shared/hooks",
  "shared/components",
  "shared/templates",
  "shared/scripts",
  "packages/phi/.claude-plugin",
  "packages/phi/.cursor-plugin",
  "packages/phi/.opencode/plugins",
  "packages/phi/.codex",
  "packages/faq/.claude-plugin",
  "packages/faq/.cursor-plugin",
  "packages/faq/.opencode/plugins",
  "packages/faq/.codex"
)

$requiredJson = @(
  "lib/host-map.json",
  "lib/skill-map.json",
  "lib/source-manifest.json",
  ".claude-plugin/marketplace.json",
  ".claude-plugin/plugin.json",
  ".cursor-plugin/plugin.json",
  ".opencode/opencode.json",
  "shared/hooks/hooks.json",
  "packages/phi/.claude-plugin/plugin.json",
  "packages/phi/.claude-plugin/marketplace.json",
  "packages/phi/.cursor-plugin/plugin.json",
  "packages/phi/.opencode/opencode.json",
  "packages/faq/.claude-plugin/plugin.json",
  "packages/faq/.claude-plugin/marketplace.json",
  "packages/faq/.cursor-plugin/plugin.json",
  "packages/faq/.opencode/opencode.json"
)

$requiredSkillDirs = @(
  "skills/phi/phi-backend",
  "skills/phi/phi-brainstorming",
  "skills/phi/phi-db",
  "skills/phi/phi-debugging",
  "skills/phi/phi-execute",
  "skills/phi/phi-faq",
  "skills/phi/phi-frontend",
  "skills/phi/phi-java",
  "skills/phi/phi-parallel",
  "skills/phi/phi-planning",
  "skills/phi/phi-python",
  "skills/phi/phi-review",
  "skills/phi/phi-tdd",
  "skills/phi/phi-verify",
  "skills/faq/faq-generator",
  "skills/faq/faq-grounded-review",
  "skills/faq/faq-judge"
)

foreach ($path in $requiredDirs + $requiredSkillDirs) {
  if (-not (Test-Path $path)) {
    throw "Missing required path: $path"
  }
}

foreach ($path in $requiredJson) {
  if (-not (Test-Path $path)) {
    throw "Missing required JSON file: $path"
  }

  Get-Content $path | ConvertFrom-Json | Out-Null
}

Write-Host "Series layout validation passed."
