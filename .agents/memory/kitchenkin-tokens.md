---
name: KitchenKin design tokens
description: Converted hex values from globals.css OKLCH, and dark-mode palette logic for the KitchenKin design system.
---

# KitchenKin token decisions

## Light-mode OKLCH → hex conversions (from apps/web/src/app/globals.css)
- background `oklch(96.48% 0.0224 109.54)` → `#f4f5e4` warm cream
- foreground `oklch(42.08% 0.0704 53.92)` → `#6b4226` warm brown
- primary `oklch(72.98% 0.1702 37.21)` → `#ff7b54` coral-orange
- secondary `oklch(78.06% 0.1269 57.86)` → `#f4a261` amber-orange
- muted `oklch(92.81% 0.0252 109.33)` → `#e8e9d6`
- muted-foreground `oklch(59.02% 0.0497 55.67)` → `#957661`
- accent `oklch(67.83% 0.1559 35.18)` → `#e76f51` deeper orange
- destructive `oklch(0.577 0.245 27.325)` → `#e7000b`
- border `oklch(0.922 0 0)` → `#e5e5e5`
- ring `oklch(0.708 0 0)` → `#a1a1a1`

## Dark-mode design decisions
**Why:** Task required warm dark brown surfaces (not cold grays). Mobile app dark palette (#000000 bg, #212225 element) used as surface depth cue.
- background: `#1c1208` (very dark warm brown)
- card: `#241a0d` (elevated surface)
- border/input: `#3a2614`
- foreground: `#f5eee6` (warm off-white)
- primary: `#ff8b66` (coral slightly brightened for dark bg)
- muted: `#2d1e0f`, muted-fg: `#a8886b`
- sidebar mirrors background

## Typography
- sans: Quicksand (Google Fonts) — task plan overrides Spline Sans from mobile global.css
- serif: Georgia
- mono: system monospace stack from mobile global.css

## Radius
- base: `0.625rem` (matches web app --radius exactly)

## Brand asset
- `apps/mobile/assets/images/icon.png` → `artifacts/kitchenkin-ds/docs/references/logos/icon.png` and `public/icon.png`
