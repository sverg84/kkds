# Mobile Readiness Assessment

> Cross-platform readiness notes for KKDS after the pre-adoption API stabilization
> (PR #5). Answers: what is already well-separated, what would make Expo difficult,
> which abstractions are strongest, and which assumptions should stay web-only.

---

## Contract philosophy (post-stabilization)

Component contracts in `@sverg84/kkds-common` describe **current shared behavior** —
the data and intent a semantic component needs — not a speculative multi-platform
prop bag.

Rules in force:

1. Contracts track the stable, platform-neutral fields of today's web APIs.
2. **No speculative mobile-only fields** (for example, do not put `onPress` on
   `RecipeCardContract` “for later”).
3. **Navigation stays platform-specific:** web uses `href` / `renderLink` on
   `@sverg84/kkds-react` RecipeCard; a future native package may add press /
   navigator handlers on its own implementation.
4. Web-only props (`href`, `className`, `renderLink`, `renderImage`, DOM refs)
   remain in the web package only.

---

## What is already well-separated

### 1. Design tokens are platform-neutral from day one
`lib/kkds-common/tokens.json` stores values as platform-agnostic primitives — hex
colors, rem strings for radius/spacing, ms strings for motion duration, and CSS
cubic-bezier strings for easing. The generated TypeScript object has no DOM types.
A React Native `StyleSheet` can consume `tokens.color.light.*` today.

### 2. Motion is semantic, not implementation-specific
`lib/kkds-common/src/motion.ts` defines intents (`overlay.enter`, `feedback.fast`,
etc.) as `{ duration: number, ease: string }` pairs. Duration is in plain
milliseconds. The web uses CSS / Framer Motion; mobile would use Reanimated or
`Animated.timing`. No Framer Motion types leak into `kkds-common`.

### 3. Domain types carry no framework coupling
`RecipeSummary`, `RecipeDetail`, `AllergenTag`, `RecipeCategory`, etc. are plain
TypeScript interfaces. They can be imported in any TypeScript environment.

### 4. Component contracts are browser-free
`lib/kkds-common/src/types/components.ts` uses no DOM or React types.
`RecipeCardContract` intentionally **omits** navigation (`href` / `onPress`).
Platform packages extend the concept with their own navigation APIs.

### 5. No Next.js coupling in the web library
`@sverg84/kkds-react` has no `next/` imports. Framework integration uses named
escape hatches (`renderImage`, `renderLink`) instead of hard dependencies.

### 6. The three-layer model is already in place
Layer 1 (shadcn/Base UI) → web only. Layer 2 (KKDS custom primitives) → web for
now; concepts are portable. Layer 3 (KitchenKin semantic) → contracts in
kkds-common, web implementations in kkds-react.

---

## What would make Expo difficult

### 1. `useIsMobile` uses `window.matchMedia`
`hooks/use-mobile.tsx` reads `window.innerWidth` and uses `window.matchMedia`.
These do not exist in React Native. The hook is exported from
`@sverg84/kkds-react`; only the implementation is browser-specific.

**Recommendation:** Keep the hook in kkds-react. In a future kkds-mobile,
implement the same `useIsMobile(): boolean` contract with
`useWindowDimensions`.

### 2. Toast APIs are not part of the public web surface
`useToast`, `Toaster`, and `SonnerToaster` are **not** exported from
`@sverg84/kkds-react` (Toast / Sonner are on the Layer 1 exclusion list). Do not
treat them as shared KKDS APIs when planning mobile.

**Recommendation:** If the KitchenKin apps need toasts, adopt a platform toast
library in each app (or a future mobile package). Optionally document a toast
*concept* later — do not invent a `ToastContract` until a second platform needs
it.

### 3. `cn()` wraps `tailwind-merge`
`cn` is a web/CSS helper. React Native does not use CSS class strings.

**Recommendation:** Keep `cn` in kkds-react. On mobile, use `StyleSheet` or
NativeWind.

### 4. `href` / `renderLink` on RecipeCard are web navigation
Idiomatic on web; meaningless on mobile. The shared contract omits them by
design. A native RecipeCard should accept platform navigation APIs on the native
package, not by backfilling `onPress` into kkds-common ahead of time.

### 5. Non-exported web internals
Some shadcn files may exist under `src/components/ui/` but remain **excluded**
from the public barrel (Sheet, Sidebar, Toast, etc.). They are not a mobile
migration surface.

### 6. Motion easing strings need mapping on React Native
`tokens.motion.easing.standard` is a CSS `cubic-bezier(...)` string. Reanimated
uses `Easing.bezier(...)`.

**Recommendation:** In kkds-mobile, add a thin `motionToReanimated(spec)` adapter.
Keep `MotionSpec` unchanged.

```typescript
// Future kkds-mobile utility (illustrative)
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

## Which abstractions are strongest

1. **`tokens.json` (DTCG)** — hex colors and ms durations consume cleanly on any platform.
2. **Semantic motion intents** — `{ duration, ease }` pairs translate to any animation API.
3. **Domain types** — pure TypeScript.
4. **Synced component contracts** — minimal shared fields plus platform-owned navigation/styling.

---

## Which assumptions should remain web-only

These are intentional. Do not abstract them prematurely:

- Tailwind CSS / CSS custom properties for theming
- CSS animations (`tw-animate-css`)
- Base UI / Radix browser primitives
- Framer Motion
- `lucide-react` (use `lucide-react-native` or SVG in kkds-mobile)
- `next-themes` (on mobile, use `useColorScheme`)
- Named web escape hatches (`renderLink`, `renderImage`, `className`)

---

## What belongs in kkds-common vs platform packages

| Item | Status |
|---|---|
| `tokens.json` and generated tokens | In kkds-common |
| Semantic motion tokens | In kkds-common |
| Allergen / recipe domain models | In kkds-common |
| Component contracts (`*Contract`) | In kkds-common (synced to current web APIs) |
| `cn()` | Keep in kkds-react |
| `useIsMobile` | Keep in kkds-react |
| Toast / Sonner | Not public KKDS exports — app or future package decision |
| RecipeCard navigation | Web: `href` / `renderLink`; mobile: native handlers on kkds-mobile |

---

## Readiness summary

| Category | Readiness |
|---|---|
| Token sharing | Ready today |
| Motion sharing | Ready today |
| Domain type sharing | Ready today |
| Component contract spec | Ready today (post-#5 sync) |
| React component reuse | Not applicable (platform-specific) |
| CSS reuse | Not applicable (web only) |
| Icon strategy | Documented — SVG source shared, renderer differs |
| Hook reuse | Concept may be shared; implementations differ |
| Animation API | Easing needs a thin adapter in kkds-mobile |

**Verdict:** The architecture is ready for a future mobile implementation.
Start from `@sverg84/kkds-common` tokens, domain types, and contracts. Do not
block on speculative contract fields or nonexistent toast exports.
