# `@workspace/kkds-site`

Standalone documentation and living style guide for the KitchenKin Design System.

This package **consumes** `@sverg84/kkds-react`. It does not publish or re-export
design-system components.

## What's here

- `src/preview/` — `DesignSystemBrowser`, registry, foundations, component demos,
  and KitchenKin pattern pages
- `docs/` — site-local notes; prefer `artifacts/kitchenkin-ds/docs/` for package
  contracts and consumption guides

Authoritative DS package docs: [`artifacts/kitchenkin-ds/docs/AGENTS.md`](../kitchenkin-ds/docs/AGENTS.md).

## Development

From the monorepo root (after workspace libs are built):

```sh
pnpm --filter @sverg84/kkds-common run build
pnpm --filter @sverg84/kkds-react run build:lib
PORT=19573 pnpm --filter @workspace/kkds-site run dev
```

## Consuming the design system from demos

Import from the `@sverg84/kkds-react` barrel only:

```tsx
import {
  Button,
  Combobox,
  Toggle,
  RecipeCard,
  RecipeImage,
} from "@sverg84/kkds-react";
import "@sverg84/kkds-react/styles.css";
```

Do not document or import APIs that are not on that barrel (for example
`Toaster`, `useToast`, `Alert`, `Item`, or `FavoriteButton`).
