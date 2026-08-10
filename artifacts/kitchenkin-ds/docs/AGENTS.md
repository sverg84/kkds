# KitchenKin Design System

This package defines the visual language for the project. Use it whenever you
build or restyle UI so every surface looks like the same product. It is a real
workspace package (`@sverg84/kkds-react`): other artifacts depend on it and import
its theme and components directly.

## What's here

- `tokens.json` — the single source of truth (DTCG format): colors (full light
  and dark sets), typography, spacing, and radius.
- `scripts/build-tokens.mjs` — generates the outputs below from `tokens.json`.
- `src/index.css` — GENERATED shadcn theme (web), exported as `./styles.css`.
- `src/generated/tokens.tsx` — GENERATED hex token object, the package's `.` and
  `./tokens` entry. Mobile (Expo) and other platforms import this.
- `public/favicon.svg` — GENERATED app icon from `tokens.json` + the title.
- `src/components/ui/` — the shadcn / Base UI component library, themed by the
  tokens, re-exported from the package barrel (`@sverg84/kkds-react`), including
  `Combobox` (searchable/filterable option selection).
- `src/components/kkds/` — KitchenKin semantic components (Layer 3) that compose
  KKDS primitives into food-domain UI. All are RSC-compatible except `RecipeSearchBar` (declares `"use client"`).
  Exported components:
  - `RecipeImage` — aspect-ratio-constrained recipe photograph with warm placeholder
  - `RecipeMetadata` — prep time, cook time, and servings row with icons
  - `CategoryBadge` — warm secondary badge for recipe categories and cuisines
  - `AllergenBadge` — muted outline badge for dietary constraints and allergen warnings
  - `RecipeAuthor` — Avatar + name identity row in default and sm sizes
  - `RecipeCard` — primary recipe content unit (image + title + tags + metadata)
  - `RecipeCardSkeleton` — loading placeholder matching RecipeCard dimensions exactly
  - `RecipeSearchBar` *(client)* — controlled search input with icon prefix and clear button
- `src/lib/` (`cn`) and `src/hooks/` (`useIsMobile`) — re-exported from the
  package barrel.
- **Documentation / living style guide** lives in the separate consumer package
  `@workspace/kkds-site` (`artifacts/kkds-site/`), not in this package. That site
  owns `src/preview/` (registry, foundations, demos, pattern pages) and imports
  `@sverg84/kkds-react` like any other consumer. See
  `artifacts/kkds-site/docs/AGENTS.md`.
- `docs/consuming-web.md` and `docs/consuming-expo.md` — platform-specific usage.
- `docs/migrating-web.md` and `docs/migrating-expo.md` — replacing scaffolded or
  existing local design-system implementations.
- `docs/audit-phase2.md` — source-evidence audit for KitchenKin Layer 3 concepts;
  includes RSC notes and why each concept was exported vs. kept as a pattern
  (e.g. FavoriteButton remains a pattern).
- `docs/api-consistency-audit.md` — public API consistency audit (prop naming,
  className, refs, render props, controlled APIs, events, docs gaps) with a
  phased migration plan. Phase 1 (Combobox + correctness) and Phase 2 (direct
  pre-adoption renames: `sm`, `onValueChange`, `formatTagLabel`, required `alt`)
  are complete.
- `docs/patterns.md` — markdown documentation for the four applied-example patterns
  (Recipe Discovery, Recipe Detail, Profile Tabs, Loading & Empty). The authoritative
  reference for AI agents building KitchenKin interfaces.

Every source file in this package is a `.tsx` file, including token, utility,
and hook modules with no JSX, so every export below is a single `*.tsx` glob. Do
not add `.ts` files here.

## What this package exports

Public entry points (see `package.json` `exports`):

```jsonc
".":              { "types": "./dist/index.d.ts", "import": "./dist/index.js", "require": "./dist/index.cjs" },
"./tokens":       { "types": "./dist/tokens.d.ts", "import": "./dist/tokens.js", "require": "./dist/tokens.cjs" },
"./tokens.json":  "./tokens.json",
"./styles.css":   "./dist/styles.css",
"./package.json": "./package.json"
```

There are **no** `./components/*`, `./lib/*`, or `./hooks/*` subpath exports.
Import components, hooks, and `cn` from the package root barrel
(`@sverg84/kkds-react`). The barrel inventory lives in `src/index.ts`.

Import KitchenKin semantic components from the barrel export:
```ts
import {
  RecipeCard,
  RecipeCardSkeleton,
  RecipeImage,
  RecipeMetadata,
  RecipeAuthor,
  CategoryBadge,
  AllergenBadge,
  RecipeSearchBar,
} from '@sverg84/kkds-react';
```

Components import each other with relative paths internally. Never use a `@/`
alias inside this package. Components added through shadcn may use this
package's `#components/*`, `#lib/*`, and `#hooks/*` imports from `package.json`.

## Editing and maintaining the design system

Edit `tokens.json` only, then run `pnpm tokens`; the package Vite preview also
regenerates on change when run. Never hand-edit `src/index.css` or
`src/generated/tokens.tsx`.

Every user-facing web component exported from this package should have a family
story under `artifacts/kkds-site/src/preview/demos/` covering variants, sizes,
and important states. Register each family once in
`artifacts/kkds-site/src/preview/registry.tsx`. If a component API changes,
update the matching demo and registry entry in the same change.

KitchenKin semantic components live under `src/components/kkds/`. Add or update a
`DocBlock` on the corresponding kkds-site demo page. Update
`docs/audit-phase2.md` and `docs/patterns.md` when adding new components or
patterns.

There is no shipped `src/components/native/` tree in this package today. Future
React Native work belongs in `@sverg84/kkds-mobile` (see
`docs/mobile-readiness.md` and `docs/consuming-expo.md`).

## Prototyping on the canvas

Use the mockup-sandbox skill's "Design systems" flow. It creates a sandbox entry
for `@sverg84/kkds-react` and renders mockups using this package's theme and components.

## Consuming this package

Never copy token values, component source, hooks, or these docs into a consuming
artifact. Add `@sverg84/kkds-react` as a `workspace:*` dependency, run `pnpm install`,
and import directly from this package.

Read only the guides required by the current task:

- Building or styling web UI: `artifacts/kitchenkin-ds/docs/consuming-web.md`
- Building or styling Expo UI: `artifacts/kitchenkin-ds/docs/consuming-expo.md`
- Building KitchenKin UI patterns: `artifacts/kitchenkin-ds/docs/patterns.md`
- Replacing an existing or scaffolded web theme/component library:
  `artifacts/kitchenkin-ds/docs/migrating-web.md`
- Replacing existing or scaffolded Expo theme/hooks/components:
  `artifacts/kitchenkin-ds/docs/migrating-expo.md`

A freshly scaffolded app counts as a migration when it still contains local
theme, hook, or component copies that this package supersedes. Read the platform
consumption guide first, then its migration guide before authoring UI.

For web/static consumers, follow the workspace dependency placement rules from
the pnpm-workspace skill. Expo is a runtime consumer, so the package belongs in
`dependencies`.

Before migrating an entire app, render one platform-appropriate primitive from
the package and run the consumer's typecheck and dev server. Proceed only after
the import resolves and the primitive uses this design system's theme.

## Universal rules

- Match exact token values. Do not invent colors, fonts, spacing, or radii in a
  consuming app.
- Keep product data, navigation, application state, and product-specific
  compositions in the app. Product-agnostic visual primitives belong here.
- Read these docs in place. Do not copy them into another artifact.
- When building KitchenKin interfaces, read `docs/patterns.md` first — it
  documents which KKDS components compose each major UI pattern and what layout
  conventions to follow.
