---
name: Imported artifact workflows
description: Replit workspace behavior observed when a Vercel app is imported into the pnpm workspace scaffold.
---

Imported web artifacts can have a valid `.replit-artifact/artifact.toml` on disk while not appearing in the artifact or workflow registry. In that case, the app will not start with artifact-injected environment values.

**Why:** The imported workspace may contain the scaffolded artifact metadata without the runtime registration that normally comes from artifact creation.

**How to apply:** Check `listArtifacts()` and `listWorkflows()` before verification. If both are empty but the artifact metadata exists, register the existing frontend workflow with its declared port and base path in the command, then verify through the proxy.