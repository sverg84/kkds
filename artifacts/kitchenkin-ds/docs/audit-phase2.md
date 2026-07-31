# KKDS Phase 2 Audit — KitchenKin Semantic Component Layer

Generated from analysis of `kitchenkin-main/apps/web/src/`.

---

## Methodology

Every component, page, feature, and layout in the KitchenKin web app was inspected. Recurring JSX structures, class-name patterns, and interaction behaviours were catalogued. A concept is promoted to an exported KKDS component only if it:

1. Appears in two or more distinct contexts (pages/features), **or**
2. Encodes a domain-specific visual decision that would be re-invented by any KitchenKin surface.

Concepts that are too tightly coupled to the app's data layer (Prisma, TanStack Query, Next.js routing, Auth) are documented as **patterns** or **app-only** implementations.

---

## Exported KKDS Components (Layer 3)

### 1. RecipeImage

| Field | Value |
|---|---|
| **Why it exists** | Food photography is the primary visual driver of KitchenKin. Recipes without images need a warm, branded placeholder rather than a broken image. The 16:9 aspect ratio and `object-cover` cropping are non-negotiable for consistent card grids. |
| **Source files** | `components/recipe/recipe-image.tsx` (primary), used in `recipe-card.tsx` AND `recipe/[id]/page.tsx` |
| **Design language** | Constrained aspect ratio, object-cover framing, warm-toned SVG placeholder derived from the recipe title |
| **Suggested API** | `src?: string \| null`, `alt?: string \| null`, `aspectRatio?: number` (default 16/9), `priority?: boolean`, `className?: string` |
| **Layer verdict** | ✅ Exported KKDS component |
| **RSC compatible** | ✅ Yes — no hooks, just an `<img>` |
| **`"use client"`** | ❌ Not required |
| **Composing primitives** | `AspectRatio` |

---

### 2. RecipeMetadata

| Field | Value |
|---|---|
| **Why it exists** | Prep time and cook time appear together on every recipe card and on the recipe detail page. Always rendered with a Clock icon in the same typographic style. Extracting this prevents drift between surfaces. |
| **Source files** | `recipe-card.tsx` (CardFooter), `recipe/[id]/page.tsx` (detail body) |
| **Design language** | `text-sm text-muted-foreground`, Clock/Users icons from lucide-react, horizontal flex with `gap-4` |
| **Suggested API** | `prepTime?: string \| null`, `cookTime?: string \| null`, `servings?: string \| number \| null`, `className?: string` |
| **Layer verdict** | ✅ Exported KKDS component |
| **RSC compatible** | ✅ Yes |
| **`"use client"`** | ❌ Not required |
| **Composing primitives** | None (plain HTML + lucide icons) |

---

### 3. CategoryBadge

| Field | Value |
|---|---|
| **Why it exists** | Recipe tags (Breakfast, Dinner, Italian, Vegetarian, etc.) appear as inline badges on both the card and the detail page. They use `formatRecipeTagLabel` normalisation and a consistent warm-secondary visual treatment. |
| **Source files** | `recipe-card.tsx` (CardHeader tag list), `recipe/[id]/page.tsx` (detail badge row) |
| **Design language** | `Badge` `secondary` variant — warm cream background, no border, compact `px-2.5 py-0.5` |
| **Suggested API** | `label: string`, `className?: string` |
| **Layer verdict** | ✅ Exported KKDS component |
| **RSC compatible** | ✅ Yes |
| **`"use client"`** | ❌ Not required |
| **Composing primitives** | `Badge` |

---

### 4. AllergenBadge

| Field | Value |
|---|---|
| **Why it exists** | Dietary constraints (Gluten, Dairy, Nuts, Eggs, Soy) are visually distinct from category tags — they carry a safety implication and use an outline/muted treatment to signal caution without alarm. They appear exclusively on the detail page. |
| **Source files** | `recipe/[id]/page.tsx` (allergen list section) |
| **Design language** | `Badge` `outline` variant — border-only, muted foreground, same normalisation as CategoryBadge |
| **Suggested API** | `label: string`, `className?: string` |
| **Layer verdict** | ✅ Exported KKDS component (one usage, but the visual distinction from CategoryBadge is semantically important) |
| **RSC compatible** | ✅ Yes |
| **`"use client"`** | ❌ Not required |
| **Composing primitives** | `Badge` |

---

### 5. RecipeAuthor

| Field | Value |
|---|---|
| **Why it exists** | The Avatar + display name pattern appears in the profile header (`user-profile.tsx`) and on the recipe detail page author attribution. Both share the same size variants and initials-fallback logic. |
| **Source files** | `components/profile/user-profile.tsx`, `app/recipe/[id]/page.tsx` |
| **Design language** | `size-10` Avatar, initials fallback, `font-medium` name, optional `text-xs text-muted-foreground` subtitle |
| **Suggested API** | `name: string`, `avatarUrl?: string \| null`, `subtitle?: string \| null`, `size?: 'default' \| 'compact'`, `className?: string` |
| **Layer verdict** | ✅ Exported KKDS component |
| **RSC compatible** | ✅ Yes (Avatar owns its own `"use client"` boundary) |
| **`"use client"`** | ❌ Not required at this level |
| **Composing primitives** | `Avatar`, `AvatarImage`, `AvatarFallback` |

---

### 6. RecipeCard

| Field | Value |
|---|---|
| **Why it exists** | The primary content unit of KitchenKin. Used identically across three list surfaces: public discovery, my recipes, and favorites. Every surface renders the same layout: image → title → tags → description → metadata. |
| **Source files** | `components/recipe/list/recipe-card.tsx`, consumed in `public-recipe-list.tsx`, `favorites-recipe-list.tsx`, `my-recipes-list.tsx` |
| **Design language** | `Card` with `overflow-hidden hover:shadow-lg transition-shadow`, 16:9 image header, `text-lg font-semibold` title, category badge row, `line-clamp-2` muted description, metadata footer |
| **Suggested API** | `title: string`, `description?: string \| null`, `imageUrl?: string \| null`, `tags?: string[]`, `prepTime?: string \| null`, `cookTime?: string \| null`, `href?: string`, `className?: string` |
| **Layer verdict** | ✅ Exported KKDS component |
| **RSC compatible** | ✅ Yes |
| **`"use client"`** | ❌ Not required |
| **Composing primitives** | `Card`, `CardHeader`, `CardContent`, `CardFooter`, `RecipeImage`, `RecipeMetadata`, `CategoryBadge` |

---

### 7. RecipeCardSkeleton

| Field | Value |
|---|---|
| **Why it exists** | Every recipe list in KitchenKin wraps its content in `Suspense` with a matching skeleton. The skeleton must exactly match the live card's dimensions to avoid layout shift. |
| **Source files** | `components/recipe/list/recipe-skeleton.tsx`, `recipe-skeleton-list.tsx` |
| **Design language** | Skeleton blocks matching the image area, title, tag chips, description lines, and metadata footer of `RecipeCard`. Same `Card` wrapper with `overflow-hidden`. |
| **Suggested API** | `count?: number` (default 1; renders a responsive grid when > 1), `className?: string` |
| **Layer verdict** | ✅ Exported KKDS component |
| **RSC compatible** | ✅ Yes |
| **`"use client"`** | ❌ Not required |
| **Composing primitives** | `Card`, `CardHeader`, `CardContent`, `CardFooter`, `Skeleton` |

---

### 8. FavoriteButton

| Field | Value |
|---|---|
| **Why it exists** | The heart-toggle pattern for favoriting recipes appears in the favorites flow and is referenced in all three recipe list contexts. Its pressed/unpressed visual state and accessible label are a KitchenKin convention. |
| **Source files** | `app/api/recipes/[id]/favorite/route.ts` (API), `favorites-recipe-list.tsx` (consumer), `app/recipe/[id]/page.tsx` (detail action) |
| **Design language** | Heart icon, `fill-destructive` when pressed, brief scale animation on press, ghost variant, accessible aria-label |
| **Suggested API** | `isFavorited?: boolean`, `onToggle?: (next: boolean) => void`, `disabled?: boolean`, `size?: 'default' \| 'sm' \| 'lg'`, `className?: string` |
| **Layer verdict** | ✅ Exported KKDS component |
| **RSC compatible** | ❌ No — requires `"use client"` |
| **`"use client"`** | ✅ Required (manages pressed state) |
| **Composing primitives** | `Toggle` |

---

### 9. RecipeSearchBar

| Field | Value |
|---|---|
| **Why it exists** | The search input on the home page is the entry point to recipe discovery. It uses a Search icon prefix, a clear button, and controlled input — a pattern that any KitchenKin surface implementing search would replicate. |
| **Source files** | `components/search-bar.tsx`, used in `app/page.tsx` |
| **Design language** | `InputGroup` with inline Search icon, full-width controlled input, ghost clear button with X icon when value is present |
| **Suggested API** | `value: string`, `onChange: (value: string) => void`, `placeholder?: string`, `onClear?: () => void`, `className?: string` |
| **Layer verdict** | ✅ Exported KKDS component (navigation logic stripped — KKDS version is framework-agnostic) |
| **RSC compatible** | ❌ No — requires `"use client"` |
| **`"use client"`** | ✅ Required (controlled input) |
| **Composing primitives** | `InputGroup`, `InputGroupAddon`, `InputGroupInput`, `InputGroupButton` |

---

## Documentation Patterns (Layer 4)

The following concepts exist in the source but are too coupled to application infrastructure to be exported as components. They should be documented as recommended compositions.

### RecipeListShell (pattern)

- **Why not a component:** Depends on TanStack Query's `useInfiniteQuery`, `IntersectionObserver`, and connection-style pagination (`edges`, `node`, `pageInfo`). These are application concerns, not design system concerns.
- **Document as:** "Infinite scroll recipe grid" composition pattern using `RecipeCard`, `RecipeCardSkeleton`, and KKDS `Pagination`.

### UserProfile header (pattern)

- **Why not a component:** The spring-animated tab indicator depends on Framer Motion and `ResizeObserver`-based measurement. The tab content (ProfileRecipes, ProfileFavorites) is data-coupled.
- **Document as:** "Profile tabs" pattern showing how to compose `RecipeAuthor`, KKDS `Tabs`, and a spring-animated active indicator.

### Recipe Detail layout (pattern)

- **Why not a component:** The two-column grid, edit/delete actions, ingredient list, and instruction list are all application-specific page structure.
- **Document as:** "Recipe detail" pattern showing layout using `RecipeImage`, `RecipeAuthor`, `RecipeMetadata`, `CategoryBadge`, `AllergenBadge`, and KKDS primitives.

### Recipe Discovery layout (pattern)

- **Why not a component:** Infinite scroll wiring, URL-based search parameter management, and router integration are app responsibilities.
- **Document as:** "Recipe discovery" pattern showing `RecipeSearchBar` + `RecipeCard` grid + `RecipeCardSkeleton` + empty state composition.

---

## Application-Only Implementations (excluded from KKDS)

| Concept | Reason |
|---|---|
| `RecipeForm` | Tightly coupled to `react-hook-form`, `zod`, image upload API, and server actions |
| `RecipeListShell` | Requires TanStack Query `useInfiniteQuery` + connection pagination |
| Auth components (`LoginForm`, `OAuthButton`, `UserMenu`) | Tightly coupled to Better Auth's `authClient.useSession()` |
| `DeleteDialogButtons` | Server action coupling |
| Suspense fallbacks | Application-level Next.js structure |
| Ingredient / Instruction rows | No recurrence outside a single page; tied to Prisma schema shapes |
