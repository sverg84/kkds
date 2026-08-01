# Icon Strategy

## Current state (web)

`@sverg84/kkds-react` uses **lucide-react** as its icon library.

- **Source format:** SVG (Lucide's source is SVG; `lucide-react` ships pre-built React components that render inline SVG)
- **Usage:** Icons are imported as named React components and rendered inline in JSX. No sprite sheet, no font icon fallback.
- **Tree shaking:** Works because each icon is a separate named export.

Example:
```tsx
import { Clock, Heart, Search, X } from 'lucide-react';
```

---

## Why `lucide-react` is web-only

`lucide-react` renders `<svg>` elements with `<path>` children — valid in a browser DOM but **not** in React Native, which uses the `react-native-svg` API (`<Svg>`, `<Path>`, etc.).

This means icon imports cannot be shared between web and mobile without a build transform or a separate package.

---

## Platform-neutral icon strategy

### Principle: SVG as the source of truth

The SVG source (Lucide's design) is platform-neutral. The **rendering API** is platform-specific. This separation is the key insight.

```
lucide SVG source
      │
      ├──► lucide-react     → <svg> in browser DOM (web)
      └──► lucide-react-native → <Svg> from react-native-svg (mobile)
```

### For KitchenKin icons (custom)

Any custom icons created for KitchenKin should be authored as plain SVG files in `public/icons/` or `src/assets/icons/`. From there:

- Web: wrap in a React component that renders `<svg>` directly
- Mobile (future): wrap in a component that uses `react-native-svg`

Because the path data is shared, the icon looks identical on both platforms.

---

## How to add icons without breaking the mobile path

### ✅ DO: Reference icons through kkds-common contracts

If a component contract in `kkds-common` needs to communicate "this component accepts an icon", use a string identifier (not a React element) in the contract:

```typescript
// In kkds-common/src/types/components.ts
export interface EmptyContract {
  /** Platform-neutral icon identifier, e.g. "search", "heart", "chef-hat". */
  icon?: string;
  title: string;
  // ...
}
```

Each platform maps the string identifier to the appropriate icon component.

### ✅ DO: Keep lucide-react imports inside web component files only

```tsx
// ✅ Web component — lucide-react lives here
import { Search } from 'lucide-react';
export function RecipeSearchBar() { ... }
```

### ❌ DON'T: Export a React icon element from kkds-common

```typescript
// ❌ Breaks mobile — ReactElement is web-specific and cannot render in RN
export { SearchIcon } from 'lucide-react'; // in kkds-common — WRONG
```

---

## Future mobile implementation (React Native)

When `kkds-mobile` is ready:

1. Install `lucide-react-native` and `react-native-svg`
2. Replace web `lucide-react` imports with `lucide-react-native` imports — **same API, different renderer**
3. Custom KitchenKin icons: generate React Native components from the same SVG path data using `SVGR` with the `--native` flag

```bash
# Generate a web icon component
npx svgr --icon src/assets/icons/chef-hat.svg -o src/components/icons/ChefHat.tsx

# Generate the same icon for React Native
npx svgr --icon --native src/assets/icons/chef-hat.svg -o src/components/icons/ChefHat.native.tsx
```

Metro bundler's platform extension resolution (`.native.tsx` files take priority on RN) means the component API is identical across platforms — only the renderer differs.

---

## Lucide version pinning

`lucide-react` is in `@sverg84/kkds-react` **dependencies** (not peerDependencies). This means consumers get a consistent icon set without managing the dependency themselves. If a specific Lucide icon is removed in a future release, the dependency pin protects against accidental breakage.

The current version is `^0.545.0`. Avoid upgrading lucide-react unless the desired new icons aren't available in the pinned version — Lucide occasionally renames or removes icons between minor releases.
