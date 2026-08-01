# KitchenKin Design System — Architecture

> **Design Principles · Architecture · Package Responsibilities · Future Mobile Strategy · Shared vs Platform-Specific**

---

## Design Principles

### 1. Shared language, platform-specific implementation
The KitchenKin design language — colour, typography, spacing, motion rhythm, component concepts — is defined once and shared across platforms. How those concepts are rendered is each platform's responsibility.

### 2. One source of truth
`lib/kkds-common/tokens.json` (DTCG-format) is the single authority for every design decision. Build scripts generate platform-appropriate outputs from it: CSS custom properties for the web, a portable TypeScript object for mobile.

### 3. Avoid premature abstraction
Cross-platform APIs are introduced only when a second platform is ready to consume them. Abstractions added speculatively tend to calcify and constrain both platforms. When in doubt, keep the web implementation concrete and document the concept.

### 4. Explicit platform boundaries
Browser-specific APIs (`HTMLElement`, `MouseEvent`, `href`, CSS class strings) stay in kkds-web. Native APIs (`StyleSheet`, `Pressable`, `Animated`) will stay in kkds-mobile. `kkds-common` accepts neither.

### 5. The web experience comes first
Mobile support is enabled, not forced. The quality of the web implementation is never compromised to satisfy an abstract cross-platform ideal.

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         lib/kkds-common                                      │
│                      @sverg84/kkds-common                                    │
│                                                                              │
│  tokens.json ──► src/generated/tokens.ts                                    │
│                  (colors · typography · spacing · radius · motion)           │
│                                                                              │
│  src/motion.ts          — semantic motion intents                            │
│  src/types/allergens.ts — AllergenTag, ALLERGEN_META                        │
│  src/types/recipe.ts    — RecipeSummary, RecipeDetail, RecipeAuthor, …       │
│  src/types/components.ts— platform-neutral component contracts               │
│                                                                              │
│  Pure TypeScript · lib: ["es2022"] · zero framework dependencies             │
└────────────────────────┬─────────────────────────────────────────────────────┘
                         │ workspace:*
             ┌───────────▼──────────────┐
             │   artifacts/kitchenkin-ds │
             │     @sverg84/kkds         │
             │                          │
             │  React components         │
             │  Radix UI primitives      │
             │  CSS / Tailwind v4        │
             │  shadcn/ui curated subset │
             │  lucide-react icons       │
             │  next-themes, sonner      │
             │                          │
             │  Exports (dist/):         │
             │    .         → all        │
             │    ./tokens  → token obj  │
             │    ./tokens.json          │
             │    ./styles.css           │
             └──────────┬───────────────┘
                        │ workspace:*
             ┌──────────▼───────────────┐
             │   artifacts/kkds-site     │
             │   KitchenKin DS docs site │
             │   (deployed, static)      │
             └──────────────────────────┘

                                   (future)
             ┌─────────────────────────────────────────────┐
             │              @sverg84/kkds-mobile             │
             │                                              │
             │  React Native components                     │
             │  NativeWind or StyleSheet                    │
             │  Reanimated motion                           │
             │  react-native-svg icons                      │
             │                                              │
             │  consumes kkds-common (workspace:*)          │
             └─────────────────────────────────────────────┘

             ┌─────────────────────────────────────────────┐
             │            KitchenKin Web App                │
             │         depends on @sverg84/kkds             │
             └─────────────────────────────────────────────┘

             ┌─────────────────────────────────────────────┐
             │         KitchenKin Expo App (future)         │
             │      depends on @sverg84/kkds-mobile         │
             │    and optionally @sverg84/kkds-common       │
             └─────────────────────────────────────────────┘
```

---

## Package Responsibilities

### `@sverg84/kkds-common` (`lib/kkds-common/`)

| What | Where |
|---|---|
| Token source of truth | `tokens.json` (DTCG) |
| Portable token object | `src/generated/tokens.ts` (generated) |
| Semantic motion tokens | `src/motion.ts` |
| Allergen domain model | `src/types/allergens.ts` |
| Recipe domain model | `src/types/recipe.ts` |
| Component contracts | `src/types/components.ts` |

**Must never contain:** React, React Native, DOM types, CSS, Radix, Framer Motion, Reanimated, Next.js.

**TypeScript config:** `lib: ["es2022"]` — no DOM lib. Any import that requires `lib: ["dom"]` belongs in a platform package.

---

### `@sverg84/kkds-react` (`artifacts/kitchenkin-ds/`)

| What | Where |
|---|---|
| Web CSS theme | `src/index.css` (generated from tokens.json) |
| React components | `src/components/ui/` (Layer 1 — shadcn/ui) |
| KKDS custom primitives | `src/components/ui/` (Layer 2) |
| KitchenKin semantic components | `src/components/kkds/` (Layer 3) |
| Hooks | `src/hooks/` |
| Utilities | `src/lib/` |
| Design system preview | `src/preview/` (dev only) |

**Depends on:** `@sverg84/kkds-common` (re-exports motion, domain types, contracts).

---

### `@sverg84/kkds-mobile` (future, `artifacts/kitchenkin-mobile/`)

Will consume `@sverg84/kkds-common` and implement the component contracts using React Native primitives.

---

## How tokens, components, documentation, and governance flow

```
tokens.json (edit here) ──► build-tokens.mjs
                                    │
                   ┌────────────────┼────────────────┐
                   ▼                ▼                ▼
         kkds-common/              src/             public/
         generated/tokens.ts   index.css          favicon.svg
           (all platforms)     (web only)         (web only)

Component concept (e.g. RecipeCard)
  └─► kkds-common: RecipeCardContract (data + intent)
  └─► kkds-web:    <RecipeCard> React component
  └─► kkds-mobile: <RecipeCard> (future, React Native)
  └─► docs site:   demo + contract documentation

Governance:
  - All token changes start in lib/kkds-common/tokens.json
  - Run `pnpm tokens` from artifacts/kitchenkin-ds to regenerate everything
  - New component contracts go in lib/kkds-common/src/types/components.ts first
  - Web implementation follows in artifacts/kitchenkin-ds/src/components/kkds/
```

---

## Shared vs Platform-Specific

| Concept | Shared in kkds-common | Web only | Mobile only (future) |
|---|---|---|---|
| Color tokens (hex) | ✓ | | |
| Color tokens (CSS HSL vars) | | ✓ | |
| Typography tokens | ✓ | | |
| Spacing / radius tokens | ✓ | | |
| Motion duration + easing | ✓ | | |
| Semantic motion intents | ✓ | | |
| Framer Motion variants | | ✓ | |
| Reanimated withTiming | | | ✓ |
| Domain types (recipe, allergen) | ✓ | | |
| Component contracts (interfaces) | ✓ | | |
| React components | | ✓ | |
| CSS class utilities (cn, tw) | | ✓ | |
| React Native StyleSheet | | | ✓ |
| lucide-react icons | | ✓ | |
| react-native-svg icons | | | ✓ |
| Browser hooks (useMobile) | | ✓ | |
| Native device hooks | | | ✓ |
| Radix UI primitives | | ✓ | |
| Expo / NativeBase primitives | | | ✓ |

---

## Future Mobile Strategy

See `docs/mobile-readiness.md` for a full assessment.

**Key principle:** `kkds-common` is already the shared foundation. Adding `kkds-mobile` means:
1. Install `@sverg84/kkds-common` as a dependency
2. Implement each `*Contract` interface from `src/types/components.ts` using React Native primitives
3. Map `motion.*` durations and easings to Reanimated equivalents
4. Use `tokens.color.light` / `tokens.color.dark` with `StyleSheet.create` or NativeWind
5. Generate react-native-svg icons from the same SVG sources as the web

No changes to `kkds-common` or `kkds-web` are required to add mobile.
