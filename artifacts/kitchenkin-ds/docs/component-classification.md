# Component Classification — Shipped vs Excluded vs Future

This document classifies KKDS concepts against the **current** `@sverg84/kkds-react`
public barrel (`artifacts/kitchenkin-ds/src/index.ts`). It is not a wishlist
presented as inventory.

Status key:

- **Shipped / exported** — importable from `@sverg84/kkds-react` today
- **Explicitly excluded** — deliberately omitted from the public surface
- **Pattern / app-owned** — documented composition, not a package export
- **Potential future candidate** — may be considered later with product evidence

---

## Layer 3: KitchenKin Semantic Components (shipped)

### RecipeCard

**Status:** Shipped / exported

**Concept (platform-neutral):** Canonical recipe summary — image, title, tags,
description, prep/cook time. Contract: `RecipeCardContract` (no navigation fields).

**Web implementation:** Optional `href` / `renderLink` for navigation; `action`
slot for separate controls; `renderImage` passthrough to `RecipeImage`.

**Mobile notes:** Implement against the contract; add native press/navigation on
the mobile package only — do not backfill speculative `onPress` into kkds-common.

### RecipeImage

**Status:** Shipped / exported · Contract: `RecipeImageContract` (`alt` required)

**Web:** AspectRatio + `<img>` or `renderImage` override · **Mobile:** RN `Image` + `aspectRatio`

### RecipeMetadata

**Status:** Shipped / exported · Contract includes `prepTime`, `cookTime`, `servings`

**Note:** There is no `difficulty` prop on the current API.

### RecipeAuthor

**Status:** Shipped / exported · `size?: "default" | "sm"`

### RecipeSearchBar

**Status:** Shipped / exported · Controlled `value` + `onValueChange`

### RecipeCardSkeleton

**Status:** Shipped / exported · `count` may render a convenience grid when `> 1`

### AllergenBadge / CategoryBadge

**Status:** Shipped / exported · Display labels (not interactive filter controls)

---

## Layer 2: KKDS Custom Primitives (shipped)

| Component | Status | Notes |
|---|---|---|
| Empty (+ parts) | Shipped | Compound layout; `EmptyContract` is a content model |
| Field (+ parts) | Shipped | Form field stacking |
| InputGroup (+ parts) | Shipped | Addon composition |
| Spinner | Shipped | `size` + `label` aligned with `SpinnerContract` |

---

## Layer 1: Curated shadcn / Base UI (shipped)

These wrap Base UI / DOM APIs and are web-only:

AlertDialog, AspectRatio, Avatar, Badge, Button, Card, Combobox, Dialog,
DropdownMenu, Input, Label, Popover, ScrollArea, Select, Separator, Skeleton,
Switch, Tabs, Textarea, **Toggle**

---

## Explicitly excluded from the public API

Listed in the barrel exclusion comment and **not** exported. Do not document them
as available KKDS components:

| Concept | Notes |
|---|---|
| Alert | Use `Empty` + `Button` or app UI for errors |
| Toast / Toaster / Sonner / useToast | Use an app-level toast library |
| Sheet | Excluded overlay |
| Tooltip | Excluded |
| ToggleGroup | Excluded (single `Toggle` is shipped) |
| ButtonGroup | Not implemented / not exported |
| Item / ItemContent / ItemGroup | Not implemented / not exported |
| Accordion, Breadcrumb, Calendar, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Drawer, Form, HoverCard, InputOtp, Menubar, NavigationMenu, Pagination, Progress, RadioGroup, Resizable, Sidebar, Slider, Table | Excluded catalog |

---

## Pattern / app-owned (not exported)

| Concept | Guidance |
|---|---|
| FavoriteButton | Compose Layer 1 `Toggle` + icon; wire favorites state in the app |
| Filter chips | Interactive selection row in discovery — not `CategoryBadge` |
| Ingredient / instruction rows | Plain markup + `Separator` as needed |
| Pagination controls | `Button` + `<nav>` or a library |
| Error banners | Compose exported primitives; no public `Alert` |

---

## Potential future candidates

Promote only with KitchenKin product evidence and an explicit API decision:

- FavoriteButton as Layer 3 (if a stable cross-surface API emerges)
- Filter chip / segmented control primitive
- Item row primitive for dense lists
- Alert / toast family (if product standardizes on one)
- ButtonGroup, Sheet, Tooltip, ToggleGroup

Until then, keep them out of the public barrel and out of “shipped” docs.

---

## Web-specific APIs (shipped on web, not in contracts)

| Prop | Component | Role | Mobile equivalent (future package) |
|---|---|---|---|
| `href` / `renderLink` | RecipeCard | Navigation surface | Native press + navigator |
| `renderImage` | RecipeImage / RecipeCard | Framework image override | RN `Image` / Expo Image |
| `action` | RecipeCard | Separate control slot | Same composition idea |
| `className` | Most roots | Tailwind escape hatch | `style` / NativeWind |
| `ref` | DOM / Base UI roots | React 19 ref-as-prop | Native refs |

---

## Hooks & utilities (shipped)

| Export | Status |
|---|---|
| `useIsMobile` | Shipped (web implementation) |
| `cn` | Shipped (web) |
