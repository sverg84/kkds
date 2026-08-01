# Mobile Readiness Assessment

> Phase 8 of the KKDS cross-platform architecture review.
> Answers: what is already well-separated, what would make Expo difficult, which abstractions are strongest, and which APIs should evolve before 1.0.

---

## What is already well-separated ✅

### 1. Design tokens are platform-neutral from day one
`lib/kkds-common/tokens.json` stores all values as platform-agnostic primitives — hex colors, rem strings for radius/spacing, ms strings for motion duration, and CSS cubic-bezier strings for easing. The generated TypeScript object (`tokens.ts`) has no DOM types. A React Native `StyleSheet` can consume `tokens.color.light.*` directly today.

### 2. Motion is semantic, not implementation-specific
`src/motion.ts` defines intents (`overlay.enter`, `feedback.fast`, etc.) as `{ duration: number, ease: string }` pairs. Duration is in plain milliseconds. The web uses Framer Motion; mobile would use Reanimated or `Animated.timing`. No Framer Motion types leak into `kkds-common`.

### 3. Domain types carry no framework coupling
`RecipeSummary`, `RecipeDetail`, `AllergenTag`, `RecipeCategory`, etc. are plain TypeScript interfaces with no imports. They can be imported in any TypeScript environment — browser, Node, React Native, Deno.

### 4. Component contracts are browser-free
`src/types/components.ts` uses no DOM types. `RecipeCardContract` has `onPress?: () => void` instead of `href`, no `MouseEvent`, no `HTMLElement`, no `className`. Platform implementations extend these with platform-specific props.

### 5. No Next.js coupling in the library
`@sverg84/kkds-react` has no `next/` imports. It is a pure React library. The `"use client"` banner is added by tsup at build time and is only relevant in Next.js App Router contexts — it doesn't affect Expo.

### 6. The three-layer model is already in place
Layer 1 (shadcn/Radix primitives) → web only. Layer 2 (KKDS custom primitives) → web for now, concepts are portable. Layer 3 (KKDS semantic) → contracts live in kkds-common, implementations live in kkds-web.

---

## What would make Expo difficult ⚠️

### 1. `useMobile` uses `window.matchMedia`
`hooks/use-mobile.tsx` reads `window.innerWidth` and uses `window.matchMedia`. These don't exist in React Native. This hook is exported from `@sverg84/kkds-react` but its contract (`useIsMobile(): boolean`) is platform-neutral — only the implementation is browser-specific.

**Recommendation:** Keep the hook in kkds-web. In kkds-mobile, implement the same `useIsMobile` contract using React Native's `useWindowDimensions`. The hook's name and return type stay the same.

### 2. `useToast` is radix-specific
`hooks/use-toast.tsx` is coupled to Radix Toast's state machine. The toast *concept* is portable but the implementation isn't.

**Recommendation:** Keep in kkds-web. Document the concept in kkds-common (`ToastContract` if needed) and let kkds-mobile use a React Native toast library (e.g. `react-native-toast-message`).

### 3. `cn()` utility wraps `tailwind-merge`
`lib/utils.tsx` exports `cn()` which uses `clsx` + `tailwind-merge`. These are web/CSS tools. React Native doesn't use CSS class strings.

**Recommendation:** Keep `cn` in kkds-web. In kkds-mobile, use `StyleSheet.create` or NativeWind. The concept (combining conditional styles) maps naturally; the API doesn't need to be shared.

### 4. `href` on RecipeCard is implicit navigation coupling
`RecipeCard` accepts an `href` prop and wraps in `<a>` when present. This is idiomatic web but meaningless on mobile. The `RecipeCardContract` in kkds-common deliberately omits `href` in favour of `onPress`.

**Status:** Already addressed in the contract. The web component uses `href`; mobile will use `onPress` + navigator. No action needed before adding mobile.

### 5. Sidebar component uses `document.cookie` and `window.addEventListener`
`components/ui/sidebar.tsx` reads cookies directly. This component is excluded from the public API (not in the Layer 1 curated subset), so it won't create a mobile conflict. But it would need a complete rewrite for mobile.

**Status:** Not exported, so safe. Note for the future: any sidebar/drawer for mobile should be implemented separately using a bottom-sheet library.

### 6. Motion easing strings need mapping on React Native
`tokens.motion.easing.standard` is `"cubic-bezier(0.4, 0, 0.2, 1)"` — a CSS string. Reanimated uses `Easing.bezier(0.4, 0, 0.2, 1)` (same values, different API).

**Recommendation:** For kkds-mobile, create a `motionToReanimated(spec: MotionSpec)` adapter that parses the cubic-bezier string and returns a Reanimated `Easing` value. The `MotionSpec` interface remains unchanged.

```typescript
// Future kkds-mobile utility
import { Easing } from 'react-native-reanimated';
import type { MotionSpec } from '@sverg84/kkds-common';

function parseEasing(css: string) {
  const m = css.match(/cubic-bezier\(([^)]+)\)/);
  if (!m) return Easing.linear;
  const [x1, y1, x2, y2] = m[1].split(',').map(Number);
  return Easing.bezier(x1, y1, x2, y2);
}

export function motionToReanimated(spec: MotionSpec) {
  return { duration: spec.duration, easing: parseEasing(spec.ease) };
}
```

---

## Which abstractions are strongest 💪

1. **`tokens.json` (DTCG)** — the cleanest shared artefact. Hex colors and ms durations are consumed without transformation on any platform.
2. **Semantic motion intents** — `{ duration, ease }` pairs translate directly to any animation API.
3. **Domain types** (`RecipeSummary`, `AllergenTag`, etc.) — pure TypeScript, will work in any environment without modification.
4. **Component contracts** — the interface-only `*Contract` types in `kkds-common/src/types/components.ts` are the clearest possible spec for what mobile needs to implement.

---

## Which APIs should evolve before 1.0 🔄

### `href` on RecipeCard
Currently a web-only prop undocumented as such. Before 1.0, add a JSDoc note marking it as web-specific and pointing to `RecipeCardContract.onPress` as the platform-neutral alternative.

**Status:** JSDoc added in this review cycle.

### `className` on all components
All web components accept `className?: string`. This is idiomatic React/web but meaningless on mobile. Before 1.0, document the intended customisation boundary — which props are part of the stable API and which are escape hatches.

### Exported hooks
`useMobile` and `useToast` are exported from `@sverg84/kkds-react`. Before 1.0, decide whether to:
a) Keep them as web-only exports (document this)
b) Move them behind a `/hooks` subpath so consumers opt in

**Recommendation:** Option (a) — keep them in the main barrel but add JSDoc `@web-only` tags.

---

## Which assumptions should remain web-only 🔒

These are correct and intentional web assumptions. Do not abstract them:

- Tailwind CSS / CSS custom properties for theming
- CSS animations (`tw-animate-css`)
- Radix UI primitives (they are browser/DOM only)
- Framer Motion
- `lucide-react` (use `lucide-react-native` in kkds-mobile)
- `sonner` (use a React Native toast library in kkds-mobile)
- `next-themes` (web dark mode — on mobile, use `useColorScheme`)

---

## Which should move into kkds-common 📦

These are either already in kkds-common or should move there:

| Item | Status |
|---|---|
| `tokens.json` and generated tokens | ✅ Done — now in `lib/kkds-common/` |
| Semantic motion tokens | ✅ Done — `src/motion.ts` |
| `AllergenTag`, `ALLERGEN_META`, `allergenLabel` | ✅ Done |
| `RecipeCategory`, `RECIPE_CATEGORIES`, `categoryLabel` | ✅ Done |
| `RecipeSummary`, `RecipeDetail`, etc. | ✅ Done |
| Component contracts (`*Contract`) | ✅ Done |
| `cn()` utility | ❌ Keep in kkds-web — uses tailwind-merge |
| `useMobile` hook | ❌ Keep in kkds-web — browser-specific |
| `useToast` hook | ❌ Keep in kkds-web — Radix-specific |

---

## Readiness summary

| Category | Readiness |
|---|---|
| Token sharing | ✅ Ready today |
| Motion sharing | ✅ Ready today |
| Domain type sharing | ✅ Ready today |
| Component contract spec | ✅ Ready today |
| React component reuse | ❌ Not applicable (platform-specific) |
| CSS reuse | ❌ Not applicable (web only) |
| Icon strategy | ✅ Documented — SVG source shared, renderer differs |
| Hook reuse | ⚠️ Concept is shared, implementation must differ |
| Animation API | ⚠️ Easing needs a thin adapter in kkds-mobile |

**Verdict:** The architecture is ready for a mobile implementation. No changes to `kkds-common` or `kkds-web` are required before starting `kkds-mobile`. The `RecipeCardContract`, domain types, and semantic motion tokens are sufficient to begin implementing the Layer 3 components in React Native.
