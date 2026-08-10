# AGENTS.md

## Cursor Cloud specific instructions

This is a **pnpm + TypeScript monorepo** for the KitchenKin Design System (KKDS). There is **no backend, database, or Docker**. The only deployable product is a Vite React SPA (`kkds-site`); `@sverg84/kkds-react` is a published library.

### Products

| Product | Package | Dev / build command | Port |
|---|---|---|---|
| Standalone docs site | `@workspace/kkds-site` | `PORT=19573 pnpm --filter @workspace/kkds-site run dev` | 19573 |
| Design-system library | `@sverg84/kkds-react` | `pnpm --filter @sverg84/kkds-react run build:lib` | — |

Artifact run definition for the docs site: `artifacts/kkds-site/.replit-artifact/artifact.toml`.

### Required: build workspace libraries before consumers

`@sverg84/kkds-common` and `@sverg84/kkds-react` export from `dist/`. After `pnpm install` (or a clean checkout), build them before typechecking or running `kkds-site`:

```sh
pnpm --filter @sverg84/kkds-common run build
pnpm --filter @sverg84/kkds-react run build:lib
```

Without these, Vite dep-scan warns and TypeScript cannot resolve the workspace packages. Vite can still serve `kkds-site` once `dist/` exists (the dep-scan warning is then harmless).

`kkds-site` defaults `PORT` to 5173 and hardcodes `base: "/"`.

### Lint / typecheck / build / test

- Prefer per-package typecheck after libs are built:
  - `pnpm --filter @sverg84/kkds-react run typecheck`
  - `pnpm --filter @workspace/kkds-site run typecheck`
- Root `pnpm run typecheck` currently fails: `tsconfig.json` references missing `./lib/db` (no such package in the repo).
- There is no ESLint config and no automated test suite in this repo. Use typecheck + Vite build/dev (site) and `build:lib` (DS) as the verification path.
- Production builds: `pnpm --filter @workspace/kkds-site run build`; library: `pnpm --filter @sverg84/kkds-react run build:lib`.

### Other gotchas

- **pnpm only** — root `preinstall` rejects npm/yarn.
- Do not disable `minimumReleaseAge` in `pnpm-workspace.yaml`.
- Package filter for the DS is `@sverg84/kkds-react`.
- npm publishing uses Changesets (`.github/workflows/release.yml`) with npm **trusted publishing** (OIDC). Do not inject `NPM_TOKEN` / `NODE_AUTH_TOKEN` into that workflow, and do not commit project-level `_authToken` `.npmrc` files.
- Design-system usage notes: `artifacts/kitchenkin-ds/docs/AGENTS.md` and `artifacts/kkds-site/docs/AGENTS.md`.
