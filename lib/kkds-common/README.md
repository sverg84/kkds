# @sverg84/kkds-common

Platform-neutral tokens, types, motion semantics, and domain contracts for the **KitchenKin Design System**.

This package has **zero framework dependencies** — no React, no React Native, no DOM, no CSS. It is pure TypeScript and compiles to ES2022.

---

## What lives here

| Module | Contents |
|---|---|
| `tokens` | Color (hex), typography, spacing, radius, and motion tokens — one source of truth for every platform |
| `motion` | Semantic motion intents (`overlay.enter`, `feedback.fast`, etc.) composed from token primitives |
| Domain types | `RecipeSummary`, `RecipeDetail`, `AllergenTag`, `RecipeCategory`, etc. |
| Component contracts | Platform-neutral prop interfaces that web and mobile implementations extend |

## What does NOT live here

- React components → `@sverg84/kkds-react` (kkds-web)
- CSS / Tailwind styles → `@sverg84/kkds-react/styles.css`
- Future React Native components → `@sverg84/kkds-mobile` (not yet built)

---

## Usage

```ts
// Platform-neutral tokens
import { tokens, motion } from '@sverg84/kkds-common';

// Semantic motion
import { motion } from '@sverg84/kkds-common';
// Web (Framer Motion)
<motion.div transition={{ duration: motion.overlay.enter.duration / 1000, ease: motion.overlay.enter.ease }} />

// Mobile (Reanimated, future)
withTiming(1, { duration: motion.overlay.enter.duration, easing: Easing.bezier(...) })

// Domain types
import type { RecipeSummary, AllergenTag } from '@sverg84/kkds-common';

// Raw token JSON (e.g. for Expo StyleSheet or React Native StyleSheet)
import tokens from '@sverg84/kkds-common/tokens.json';
```

---

## Token generation

`tokens.json` in this package is the **single source of truth** for the entire design system.

```bash
# Regenerate src/generated/tokens.ts from tokens.json
pnpm tokens

# When working in kkds-web, run from there instead — it regenerates both
# kkds-common's TS output and kkds-web's CSS theme in one step:
cd ../../artifacts/kitchenkin-ds && pnpm tokens
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   @sverg84/kkds-common                  │
│   tokens · motion · domain types · component contracts  │
│                 pure TypeScript, no DOM                 │
└────────────────────┬─────────────────────┬──────────────┘
                     │                     │
           ┌─────────▼──────┐   ┌──────────▼──────────┐
           │ @sverg84/kkds-react │   │  @sverg84/kkds-mobile │
           │  React / web        │   │  React Native / Expo  │
           │  Base UI, CSS       │   │     (future)          │
           └─────────────────────┘   └───────────────────────┘
```

See `artifacts/kitchenkin-ds/docs/architecture.md` for the full architecture guide.

---

## Releasing

This package is published to npm via [Changesets](https://github.com/changesets/changesets).

1. In a feature branch, run `pnpm changeset`, select `@sverg84/kkds-common`, choose a bump type, and commit the generated file under `.changeset/`.
2. Merge the feature PR to `main`. CI opens or updates a **Version Packages** PR.
3. Merge the Version Packages PR to publish. Feature merges alone do not publish.

See [`.changeset/README.md`](../../.changeset/README.md) for setup notes (trusted publishing, Actions permissions).
