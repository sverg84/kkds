# @sverg84/kkds

KitchenKin design system — components, tokens, and styles for the web.

Built on shadcn/ui and Tailwind v4 with a warm food-forward palette (Quicksand, coral-orange, cream, rich brown). Ships full light and dark mode out of the box.

## Installation

```sh
npm install @sverg84/kkds
# or
pnpm add @sverg84/kkds
```

### Peer dependencies

```json
"peerDependencies": {
  "react": ">=18",
  "react-dom": ">=18"
}
```

## Setup

### 1. Import the stylesheet

Add this once in your app's root CSS file:

```css
@import "@sverg84/kkds-react/styles.css";
```

This imports Tailwind, all design tokens (light + dark), and registers component sources for utility generation. Do not add a separate `@import "tailwindcss"` — it's already included.

### 2. Import components

```tsx
import { Button, Card, Badge, Input, Spinner } from "@sverg84/kkds-react";
import { cn } from "@sverg84/kkds-react";

// Toast (radix-based)
import { Toaster, useToast } from "@sverg84/kkds-react";

// Sonner toast (re-exported as SonnerToaster to avoid name conflict)
import { SonnerToaster } from "@sverg84/kkds-react";
```

### 3. Token object (optional)

For non-CSS consumers (e.g. React Native, canvas, charting libraries):

```ts
import { tokens } from "@sverg84/kkds-react/tokens";

tokens.color.light.primary   // "#ff7b54"
tokens.color.dark.background // "#1c1208"
tokens.fontFamily.sans       // ["Quicksand", ...]
tokens.radius                // "0.625rem"
```

## Dark mode

The stylesheet uses the `.dark` class strategy. Toggle `class="dark"` on `<html>` or use `next-themes` / your preferred theme manager.

## License

MIT
