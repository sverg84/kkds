# @sverg84/kkds-react

> **Pre-release — `0.1.0`** This package is published for internal use and early
> feedback. The public API is not yet stable. Expect breaking changes before
> `1.0.0`.

KitchenKin Design System — components, tokens, and styles for the web.

Built on shadcn/ui and Tailwind v4 with a warm food-forward palette (Quicksand,
coral-orange, cream, rich brown). Ships full light and dark mode out of the box.

---

## Installation

```sh
npm install @sverg84/kkds-react
# or
pnpm add @sverg84/kkds-react
```

### Peer dependencies

React 18 or 19 is required and must be provided by the consuming application.

```sh
npm install react@^19 react-dom@^19
```

---

## Setup

### 1. Import the stylesheet

Add this **once** at your app entry (e.g. `app/layout.tsx`, `main.tsx`, or a
root CSS file):

```tsx
import "@sverg84/kkds-react/styles.css";
```

`dist/styles.css` is pre-compiled, browser-ready CSS. It includes the
KKDS design tokens, all component styles, and Tailwind utilities for every
class used by the components. **You do not need Tailwind installed in your
application** to use this package's styles — the stylesheet is self-contained.

### 2. Import components

```tsx
import {
  RecipeCard,
  RecipeImage,
  RecipeMetadata,
  RecipeAuthor,
  CategoryBadge,
  AllergenBadge,
  RecipeSearchBar,
  RecipeCardSkeleton,
} from "@sverg84/kkds-react";

// Generic UI primitives (shadcn-based)
import { Button, Badge, Card, Input, Skeleton } from "@sverg84/kkds-react";

// Utilities
import { cn } from "@sverg84/kkds-react";
```

### 3. Token object (for non-CSS consumers)

```ts
import { tokens } from "@sverg84/kkds-react/tokens";

tokens.color.light.primary    // "#ff7b54"
tokens.color.dark.background  // "#1c1208"
tokens.fontFamily.sans        // ["Quicksand", ...]
tokens.radius                 // "0.625rem"
```

### 4. Raw token JSON

```ts
import tokensJson from "@sverg84/kkds-react/tokens.json" assert { type: "json" };
```

---

## Package entry points

| Import                             | Description                                   |
|------------------------------------|-----------------------------------------------|
| `@sverg84/kkds-react`                    | All components, hooks, and utilities (ESM/CJS) |
| `@sverg84/kkds-react/tokens`             | Portable hex token object (ESM/CJS + types)   |
| `@sverg84/kkds-react/tokens.json`        | Raw DTCG token JSON                           |
| `@sverg84/kkds-react/styles.css`         | Pre-compiled browser-ready stylesheet          |
| `@sverg84/kkds-react/package.json`       | Package manifest                              |

---

## Next.js App Router

### Stylesheet

Import `@sverg84/kkds-react/styles.css` in your root layout:

```tsx
// app/layout.tsx
import "@sverg84/kkds-react/styles.css";
```

### Client boundary

The entire `@sverg84/kkds-react` module is marked `"use client"`. This means you can
import any KKDS component directly from a React Server Component — Next.js will
treat it as a client component reference and render it on the client.

```tsx
// app/recipes/page.tsx  (Server Component — no "use client" needed here)
import { RecipeCard } from "@sverg84/kkds-react";

export default async function RecipesPage() {
  const recipes = await fetchRecipes();
  return (
    <main>
      {recipes.map((r) => (
        <RecipeCard key={r.id} title={r.title} imageUrl={r.imageUrl} />
      ))}
    </main>
  );
}
```

Interactive components work through the same boundary:

```tsx
// app/recipes/page.tsx
import { RecipeSearchBar } from "@sverg84/kkds-react";

export default function Page() {
  // RecipeSearchBar is a client component — you can import it from a Server
  // Component; Next.js handles the boundary automatically.
  return <RecipeSearchBar value="" onChange={() => {}} />;
}
```

If you need to manage interactive state from the server-component tree, wrap
the interactive part in your own `"use client"` component and pass data as
props.

---

## Dark mode

`dist/styles.css` uses the `.dark` class strategy. Toggle `class="dark"` on
`<html>`, or use `next-themes` / any preferred theme manager.

```tsx
// With next-themes
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

## KitchenKin semantic components

These are the primary exports KKDS is designed around:

| Component            | Client? | Description                            |
|----------------------|---------|----------------------------------------|
| `RecipeCard`         | No*     | Composite recipe card with image, metadata, badges |
| `RecipeImage`        | No*     | Aspect-ratio image wrapper             |
| `RecipeMetadata`     | No*     | Time, servings, difficulty row         |
| `RecipeAuthor`       | No*     | Avatar + author name                   |
| `CategoryBadge`      | No*     | Pill badge for a recipe category       |
| `AllergenBadge`      | No*     | Pill badge for an allergen             |
| `RecipeSearchBar`    | **Yes** | Search input with clear button         |
| `RecipeCardSkeleton` | No*     | Loading skeleton matching `RecipeCard` |

\* Stateless/presentational; imports Radix primitives that carry their own
`"use client"`. Because the single bundle is marked `"use client"`, all
components are treated as client modules. A future version may split the bundle
to restore per-component RSC granularity.

---

## Accessibility

All KKDS semantic components delegate accessibility semantics to their
underlying shadcn/Base UI primitives. Interactive components (`RecipeSearchBar`) expose `aria-label` and `aria-pressed` / `role` via the
underlying Base UI `Toggle` and input primitives. Ensure that:

- `RecipeSearchBar`'s `placeholder` is set to a locale-appropriate string.
- Images in `RecipeImage` carry a descriptive `alt` attribute.

---

## Does my app need Tailwind?

**No.** `dist/styles.css` is pre-compiled and self-contained. Import it once at
your app root; no Tailwind configuration is required in the consuming
application.

If your own application also uses Tailwind v4, both stylesheets coexist without
conflict. Do not add a separate `@import "tailwindcss"` that scans
`node_modules/@sverg84/kkds` — the utilities are already embedded in
`dist/styles.css`.

---

## License

MIT
