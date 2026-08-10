# Migrating Expo UI to KitchenKin Design System

Read `artifacts/kitchenkin-ds/docs/AGENTS.md` and
`artifacts/kitchenkin-ds/docs/consuming-expo.md` first. Use this guide when an
Expo app, including a fresh scaffold, has local theme, hooks, fonts, or
product-agnostic component implementations.

**Current status:** There is no `@sverg84/kkds-mobile` package yet. Migration
means adopting `@sverg84/kkds-common` for tokens/types/contracts and aligning
app-local native UI with those contracts — not importing web paths from
`@sverg84/kkds-react`.

## Rewrite shared imports

Grep the Expo artifact for local palettes, `@/constants/colors`, and ad-hoc
token maps.

- Import portable tokens and domain types from `@sverg84/kkds-common`.
- Delete duplicated hex/radius/spacing tables once the app theme helper reads
  from `tokens`.
- Do **not** rewrite imports to `@workspace/kitchenkin-ds/...` or to
  non-existent `components/native/*` package paths.

## Replace product-agnostic UI (app-owned)

Inventory inline and app-local styled controls before migrating screens.

- Keep native Buttons, Inputs, Cards, Badges, Toggles, Empty, Spinner, and
  Skeleton in the Expo app (or a private package) until `kkds-mobile` ships.
- Prefer prop names and variants that mirror the web families documented in
  `@sverg84/kkds-react`, where React Native supports them.
- Keep domain-specific compositions local; implement RecipeCard-like views
  against `RecipeCardContract` and related contracts from kkds-common.
- Do not import web `components/ui/*`, `styles.css`, `cn`, or DOM/Tailwind code
  into React Native.

## Clean dependencies and verify

- Depend on `@sverg84/kkds-common` (and later `@sverg84/kkds-mobile` when it
  exists).
- Remove dependencies used only by deleted local token tables.
- Grep for `@workspace/kitchenkin-ds` and resolve every hit.
- Run Expo typecheck and the development workflow; verify tokens + one native
  primitive before presenting the app.

Migration is complete when Expo reads shared visual tokens/types from
`@sverg84/kkds-common` and retains only product-specific UI compositions
locally (until a mobile package is available).
