---
name: kkds-site standalone config
description: Key differences between artifacts/kkds-site (standalone, root path) and artifacts/kitchenkin-ds (monorepo library with preview at /kitchenkin-ds/).
---

`artifacts/kkds-site` is a self-contained copy of the KKDS documentation site configured for root-path deployment. Key differences from the monorepo `artifacts/kitchenkin-ds`:

**vite.config.ts**
- `base: "/"` hardcoded — no `BASE_PATH` env var needed
- `PORT` is optional: `Number(process.env.PORT ?? "5173")` — no throw if missing
- No `resolve.alias` block (KKDS components use relative imports, not `@/`)

**package.json**
- Name: `@workspace/kkds-site` (required for artifact.toml filter compatibility)
- No library fields (`exports`, `main`, `module`, `types`, `files`, `peerDependencies`)
- No `tsup` devDependency
- `imports` field preserved for `#components/*`, `#lib/*`, `#hooks/*` path aliases (these are unused in practice — source uses relative imports)
- `build` script: `node scripts/build-tokens.mjs && vite build` (no lib build)
- `react`/`react-dom` in `dependencies` (not `devDependencies` like the library)

**tsconfig.json**
- Standalone (no `extends: "../../tsconfig.base.json"`)
- No `references` array (removed `lib/api-client-react` reference)
- No `paths` alias for `@/*`

**artifact.toml**
- `serve = "static"`, `publicDir = "artifacts/kkds-site/dist"` (not `dist/public`)
- `rewrites: /* → /index.html` for client-side routing

**Copy pitfalls**
- `cp -r src/ dst/` when `dst/` exists merges but does NOT overwrite existing files. Must `rm -rf dst/ && cp -r src/ dst/` to guarantee replacement.
- Nested copy artifacts to watch for: `src/src/`, `public/public/`, `hooks/hooks/`.
- Scaffold leaves behind: `src/App.tsx` (wouter/react-query), `src/pages/`, `src/hooks/use-toast.ts` (`.ts` not `.tsx`), `src/generatedhooks/`.

**Why:**
The monorepo kitchenkin-ds artifact was deployed at `/kitchenkin-ds/` and required `BASE_PATH` env var; Replit's deployment healthcheck was failing because the api-server was included. The standalone site removes all API/DB/auth dependencies and deploys clean from `/`.
