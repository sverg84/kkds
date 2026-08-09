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
- `src/components/ui/` — the shadcn component library, themed by the tokens,
  exported as `./components/*`.
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
- `src/lib/` (`cn`) and `src/hooks/` — exported as `./lib/*` and `./hooks/*`.
- `src/App.tsx` — the entry point for the living style guide.
- `src/preview/DesignSystemBrowser.tsx` — the persistent grouped navigation,
  branded header, search, deep links, and active page shell.
- `src/preview/registry.tsx` — preview metadata (`DESIGN_SYSTEM` title,
  description) and ordered navigation. Overview comes first;
  Brand/Colors/Fonts/Layout precede Components; Content/Charts/Motion/Applied
  examples follow when applicable. Each group is a nav section whose entries
  are its nested pages. Empty optional groups stay hidden.
- `src/preview/foundations.tsx` — token-driven Overview, Colors, Fonts, and Layout
  pages.
- `src/preview/parts.tsx` — shared page helpers:
  - `Row`, `Stack` — flex layout wrappers with optional labels
  - `Guidelines` — visual do/don't list (color/component/hierarchy usage)
  - `DocBlock` — AI-oriented documentation block for KitchenKin components.
    Fields: `purpose`, `whenToUse`, `whenNotToUse`, `composition`,
    `accessibility`, `example`. Populate from the source evidence in
    `docs/audit-phase2.md`.
- `src/preview/demos/<component>.tsx` — component stories. Keep these stories and
  the registry aligned with the final web component inventory.
- `src/preview/demos/kkds/` — KitchenKin semantic component stories. Each file
  includes a `DocBlock` with AI-oriented guidance.
- `src/preview/demos/kkds/patterns/` — four applied-example pattern pages:
  - `recipe-discovery.tsx` — RecipeSearchBar + filter row + RecipeCard grid + app-level pagination
  - `recipe-detail.tsx` — two-column detail layout (image + author + metadata + badges + ingredients)
  - `profile-tabs.tsx` — RecipeAuthor header + Tabs with RecipeCard panels
  - `loading-empty.tsx` — loading, empty, no-results, and error state compositions
- `docs/consuming-web.md` and `docs/consuming-expo.md` — platform-specific usage.
- `docs/migrating-web.md` and `docs/migrating-expo.md` — replacing scaffolded or
  existing local design-system implementations.
- `docs/audit-phase2.md` — source-evidence audit for all nine KitchenKin components;
  includes RSC compatibility notes and why each concept was exported vs. kept as a pattern.
- `docs/patterns.md` — markdown documentation for the four applied-example patterns
  (Recipe Discovery, Recipe Detail, Profile Tabs, Loading & Empty). The authoritative
  reference for AI agents building KitchenKin interfaces.

Every source file in this package is a `.tsx` file, including token, utility,
and hook modules with no JSX, so every export below is a single `*.tsx` glob. Do
not add `.ts` files here.

## What this package exports

```jsonc
".":              "./dist/index.js",
"./tokens":       "./dist/tokens.js",
"./styles.css":   "./dist/styles.css",
"./components/*": "./src/components/*.tsx",
"./lib/*":        "./src/lib/*.tsx",
"./hooks/*":      "./src/hooks/*.tsx"
```

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

Edit `tokens.json` only, then run `pnpm tokens`; the dev server also regenerates
on change. Never hand-edit `src/index.css` or `src/generated/tokens.tsx`.

Every user-facing web component under `src/components/ui/` must have a family
story in `src/preview/demos/` covering its variants, sizes, and important states.
Register each family once in `src/preview/registry.tsx`. If a component changes,
update its story and registry entry in the same change and note meaningful
additions or customizations in "What's here" above.

KitchenKin semantic components live under `src/components/kkds/`. Add a `DocBlock`
to each new component's demo page. Update `docs/audit-phase2.md` and
`docs/patterns.md` when adding new components or patterns.

Native components live under `src/components/native/`. Match an existing web
component family's public API wherever React Native supports it, and document
platform-required differences in "What's here". Native components are not
imported into the web-only Vite preview.

Keep `DESIGN_SYSTEM.title` and `DESIGN_SYSTEM.description` accurate. Update
`NAV_GROUPS` whenever the system gains or loses a foundation, content guideline,
chart, motion rule, or applied example.

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
