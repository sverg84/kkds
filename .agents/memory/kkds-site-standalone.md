---
name: kkds-site standalone config
description: Key differences between artifacts/kkds-site (standalone docs Vite app) and artifacts/kitchenkin-ds (library-only @sverg84/kkds-react). Historical note about the old /kitchenkin-ds/ preview.
---

`artifacts/kkds-site` is the only Vite docs/preview app. `artifacts/kitchenkin-ds` (`@sverg84/kkds-react`) is a library built with `theme` + `tsup` + `build:css` — no Vite SPA, no Replit artifact.

**kkds-site vite.config.ts**
- `base: "/"` hardcoded — no `BASE_PATH` env var needed
- `PORT` is optional: `Number(process.env.PORT ?? "5173")` — no throw if missing
- No `resolve.alias` block (KKDS components use relative imports, not `@/`)

**kkds-site package.json**
- Name: `@workspace/kkds-site` (required for artifact.toml filter compatibility)
- No library fields (`exports`, `main`, `module`, `types`, `files`, `peerDependencies`)
- No `tsup` — consumes `@sverg84/kkds-react` as a workspace dependency
- `react`/`react-dom` in `dependencies`

**artifact.toml**
- Only `artifacts/kkds-site/.replit-artifact/artifact.toml` exists for deploy
- `serve = "static"`, `publicDir = "artifacts/kkds-site/dist"`
- `rewrites: /* → /index.html` for client-side routing

**Historical:** kitchenkin-ds previously shipped a Vite preview at `/kitchenkin-ds/` (required `BASE_PATH`, port 20227). That SPA and its Replit design-system artifact were removed; docs live solely on kkds-site at `/`.
