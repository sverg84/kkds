# KKDS docs site (`@workspace/kkds-site`)

This package is the **standalone documentation / preview site** for the
KitchenKin Design System. It consumes `@sverg84/kkds-react`; it does not publish
or re-export design-system components.

Authoritative DS package docs: `artifacts/kitchenkin-ds/docs/AGENTS.md`.

## What's here

- `src/preview/` — `DesignSystemBrowser`, registry, foundations, demos
  (including Combobox and KKDS Layer 3 stories with DocBlocks), and pattern pages
- `src/preview/demos/` — component family stories; keep aligned with the public
  surface of `@sverg84/kkds-react`
- `src/preview/demos/kkds/` — KitchenKin semantic component stories + DocBlocks
- `src/preview/demos/kkds/patterns/` — applied-example pattern pages
- `docs/` — site-local notes (`audit-phase2.md`, `patterns.md`); prefer
  `artifacts/kitchenkin-ds/docs/` for package contracts and consumption guides

## Consuming `@sverg84/kkds-react`

Import from the package root barrel only. There are **no** `./components/*`,
`./lib/*`, or `./hooks/*` subpath exports.

```ts
import {
  Button,
  Combobox,
  RecipeCard,
  RecipeCardSkeleton,
  RecipeImage,
  RecipeMetadata,
  RecipeAuthor,
  CategoryBadge,
  AllergenBadge,
  RecipeSearchBar,
} from "@sverg84/kkds-react"
import "@sverg84/kkds-react/styles.css"
```

Published entry points (from kkds-react `package.json`):

```jsonc
".":              { "types": "./dist/index.d.ts", "import": "./dist/index.js", "require": "./dist/index.cjs" },
"./tokens":       { "types": "./dist/tokens.d.ts", "import": "./dist/tokens.js", "require": "./dist/tokens.cjs" },
"./tokens.json":  "./tokens.json",
"./styles.css":   "./dist/styles.css",
"./package.json": "./package.json"
```

## Maintaining demos

Every user-facing web component exported from `@sverg84/kkds-react` should have
a family story under `src/preview/demos/` covering variants, sizes, and
important states. Register each family once in `src/preview/registry.tsx`.

When a component API changes in kkds-react, update the matching demo and
registry entry in the same change. For KitchenKin semantic components, keep the
DocBlock accurate (`purpose`, `whenToUse`, `whenNotToUse`, `composition`,
`accessibility`, `example`).

## Related guides

- Building or styling web UI: `artifacts/kitchenkin-ds/docs/consuming-web.md`
- Building KitchenKin UI patterns: `artifacts/kitchenkin-ds/docs/patterns.md`
- Public API consistency audit: `artifacts/kitchenkin-ds/docs/api-consistency-audit.md`
- Source-evidence audit (Layer 3): `artifacts/kitchenkin-ds/docs/audit-phase2.md`
