# Consuming KitchenKin Design System in Expo apps

Read `artifacts/kitchenkin-ds/docs/AGENTS.md` and
`artifacts/kitchenkin-ds/docs/mobile-readiness.md` first.

**Current status:** `@sverg84/kkds-mobile` does **not** ship yet. Expo apps
cannot import React Native component paths from `@sverg84/kkds-react`. Share
tokens, motion, domain types, and component contracts from
`@sverg84/kkds-common`, and implement native UI in the app (or a future mobile
package) against those contracts.

## Shared foundation (`@sverg84/kkds-common`)

```tsx
import {
  tokens,
  motion,
  type RecipeSummary,
  type RecipeCardContract,
  allergenLabel,
  categoryLabel,
} from "@sverg84/kkds-common";
```

- Colors are hex strings; radius/spacing are CSS length strings — convert `rem`
  to density-independent pixels once in your Expo theme helper.
- Map `motion.*` `{ duration, ease }` specs to Reanimated (or `Animated`) in the
  app; ease values are CSS `cubic-bezier(...)` strings.
- Implement Layer 3 concepts by satisfying the `*Contract` interfaces with React
  Native primitives. Navigation stays platform-specific (no speculative
  `onPress` fields on the shared contracts).

## What not to import

Do **not** import web DOM components, `styles.css`, `cn`, or
`@sverg84/kkds-react` hooks into React Native.

There are also **no** published paths such as:

- `@sverg84/kkds-react/components/native/*`
- `@workspace/kitchenkin-ds/...` (legacy name — do not use)

`ToggleGroup`, `Alert`, `Toast` / `Toaster`, and similar web catalog items are
not public KKDS exports on web either; treat them as app decisions on mobile.

## Native components (app-owned until kkds-mobile)

Until `@sverg84/kkds-mobile` exists, keep product-agnostic native primitives in
the Expo app (or a private workspace package). Prefer matching the web family's
prop names where React Native supports them, and document platform differences
locally.

Typical early families: Button, typography, Input, Textarea, Label/Field, Card,
Badge, Toggle, Empty, Spinner, Skeleton — plus RecipeCard / RecipeImage
implementations driven by the shared contracts.

## Verify

1. Install `@sverg84/kkds-common` and import `tokens` + one domain type.
2. Run Expo typecheck and the development workflow.
3. Confirm theme conversion from tokens before broader screen work.

When `kkds-mobile` lands, migrate app-local primitives to that package using the
same contracts — not by copying web component source.
