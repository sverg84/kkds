# Consuming KitchenKin Design System in web apps

Read `artifacts/kitchenkin-ds/docs/AGENTS.md` first. This guide covers
React/Vite and other shadcn/Tailwind web consumers. If the app already contains
a local theme or component library, also read
`artifacts/kitchenkin-ds/docs/migrating-web.md` before writing UI.

## Installation

```sh
npm install @sverg84/kkds-react
# or
pnpm add @sverg84/kkds-react
```

Within this pnpm workspace, declare the workspace dependency instead:

```json
"dependencies": {
  "@sverg84/kkds-react": "workspace:*"
}
```

Then build the publishable libraries once (or ensure `dist/` already exists):

```sh
pnpm --filter @sverg84/kkds-common run build
pnpm --filter @sverg84/kkds-react run build:lib
```

## Theme

Import this package's theme once from the app's main CSS:

```css
@import "@sverg84/kkds-react/styles.css";
```

`styles.css` already imports Tailwind, its plugins, and this package's token
theme. It also registers this package's component sources via `@source
"./components"` (resolved relative to the CSS file in node_modules), so
Tailwind generates utilities for every class the components use. Do not add a
separate Tailwind import or a `node_modules` source path in a Tailwind v4
consumer.

**Tailwind v3 consumers:** keep your existing `@tailwind` directives and add
`node_modules/@sverg84/kkds-react/dist/components` to your `content` array.

## Components and helpers

Import primitives, semantic components, `cn`, and hooks from the package root
barrel. There are **no** `./components/*`, `./lib/*`, or `./hooks/*` subpath
exports.

```tsx
import {
  Button,
  Card,
  Badge,
  Input,
  Combobox,
  Toggle,
  RecipeCard,
  RecipeImage,
  Spinner,
  Empty,
  cn,
  useIsMobile,
} from "@sverg84/kkds-react";

// Token object (hex values, for non-CSS consumers)
import { tokens } from "@sverg84/kkds-react/tokens";
```

Use the package component whenever it provides the required family. Keep
product-specific compositions in the app, but compose them from package
primitives rather than recreating those primitives locally.

### Not exported (do not import)

The following appear in older guides or shadcn catalogs but are **not** part of
the `@sverg84/kkds-react` public API today:

- `Alert`, `Item` / `ItemContent`, `ButtonGroup`, `Sheet`, `Tooltip`
- `Toast` / `Toaster`, `SonnerToaster`, `useToast`, `ToggleGroup`
- `FavoriteButton` — compose Layer 1 `Toggle` in the app/pattern layer

For transient notifications, use an application-level toast library. For error
panels, compose `Empty` + `Button` (see `docs/patterns.md`).

### Framework escape hatches

`RecipeImage` accepts `renderImage` and `RecipeCard` accepts `renderLink` (plus
`renderImage` passthrough) so frameworks like Next.js can supply `Image` / `Link`
without KKDS depending on Next. Prefer these named hatches over forking the
components. Keep `RecipeCard` `action` controls separate from the `href` /
`renderLink` navigation surface so interactive elements are not nested.

## Verify

After installing, import and render `Button` from `@sverg84/kkds-react`. Run the
app's typecheck and dev server. The import must resolve and the Button must use
this package's theme before broader UI work begins.

## Ongoing rules

- Keep one source of theme variables.
- Import package-provided primitives and helpers from `@sverg84/kkds-react`.
- Add reusable product-agnostic components to this package first.
- For a non-shadcn app, use the tokens as the source of truth and adapt
  existing components to the token CSS variables without copying token values.
