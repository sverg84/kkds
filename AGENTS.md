# AGENTS.md

## Cursor Cloud specific instructions

This is a **pnpm + TypeScript monorepo** for the KitchenKin Design System (KKDS). There is **no backend, database, or Docker**. Both deployable products are Vite React SPAs.

### Products

| Product | Package | Dev command | Port |
|---|---|---|---|
| Standalone docs site | `@workspace/kkds-site` | `PORT=19573 pnpm --filter @workspace/kkds-site run dev` | 19573 |
| Design-system library + preview | `@sverg84/kkds-react` | `PORT=20227 BASE_PATH=/kitchenkin-ds/ pnpm --filter @sverg84/kkds-react run dev` | 20227 |

Artifact run definitions live in each package's `.replit-artifact/artifact.toml`.

### Required: build workspace libraries before consumers

`@sverg84/kkds-common` and `@sverg84/kkds-react` export from `dist/`. After `pnpm install` (or a clean checkout), build them before typechecking or running `kkds-site`:

```sh
pnpm --filter @sverg84/kkds-common run build
pnpm --filter @sverg84/kkds-react run build:lib
```

Without these, Vite dep-scan warns and TypeScript cannot resolve the workspace packages. Vite can still serve `kkds-site` once `dist/` exists (the dep-scan warning is then harmless).

### kitchenkin-ds preview: missing gitignored script

`artifacts/kitchenkin-ds/vite.config.ts` imports `./scripts/build-tokens.mjs`, but root `.gitignore` contains a broad `scripts/` rule (added to ignore Replit root scripts). That rule also ignores `artifacts/kitchenkin-ds/scripts/build-tokens.mjs`, so the file is **absent from a clean checkout** and `pnpm --filter @sverg84/kkds-react run dev` fails with `Could not resolve "./scripts/build-tokens.mjs"`.

Restore it from git history before starting the DS preview (file stays untracked/ignored):

```sh
git show 21d2110:artifacts/kitchenkin-ds/scripts/build-tokens.mjs > artifacts/kitchenkin-ds/scripts/build-tokens.mjs
```

`kkds-site` does **not** need this file.

Also: `kitchenkin-ds` **requires** both `PORT` and `BASE_PATH` env vars (hard throws in its Vite config). `kkds-site` defaults `PORT` to 5173 and hardcodes `base: "/"`.

### Lint / typecheck / build / test

- Prefer per-package typecheck after libs are built:
  - `pnpm --filter @sverg84/kkds-react run typecheck`
  - `pnpm --filter @workspace/kkds-site run typecheck`
- Root `pnpm run typecheck` currently fails: `tsconfig.json` references missing `./lib/db` (no such package in the repo).
- There is no ESLint config and no automated test suite in this repo. Use typecheck + Vite build/dev as the verification path.
- Production builds: `pnpm --filter @workspace/kkds-site run build`; DS preview build needs `PORT` + `BASE_PATH` then `pnpm --filter @sverg84/kkds-react run build:preview`.

### Other gotchas

- **pnpm only** — root `preinstall` rejects npm/yarn.
- Do not disable `minimumReleaseAge` in `pnpm-workspace.yaml`.
- Package filter for the DS is `@sverg84/kkds-react`.
- npm publishing uses Changesets (`.github/workflows/release.yml`) with npm **trusted publishing** (OIDC). Do not inject `NPM_TOKEN` / `NODE_AUTH_TOKEN` into that workflow, and do not commit project-level `_authToken` `.npmrc` files.
- Design-system usage notes: `artifacts/kitchenkin-ds/docs/AGENTS.md` and `artifacts/kkds-site/docs/AGENTS.md`.
