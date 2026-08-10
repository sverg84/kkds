# KitchenKin UI Patterns

Patterns are recommended compositions of KKDS primitives and KitchenKin components. They encode layout conventions, state-management strategies, and interaction models that are too application-specific to export as components but too important to leave undocumented.

Compose only APIs that exist on the `@sverg84/kkds-react` public barrel today. Application-owned pieces (filter chips, FavoriteButton, ingredient rows, pagination, error panels) stay in the app or docs-site pattern demos.

---

## 1. Recipe Discovery

### When to use
Any surface that presents a filterable, searchable list of recipes — the public discovery feed, the "My Recipes" tab, or the "favorites" collection.

### Components
| Role | Component |
|---|---|
| Search entry point | `RecipeSearchBar` (client component) |
| Category filters | **App-owned filter chips** (interactive buttons or toggles). Do **not** use `CategoryBadge` as a selected-filter control — badges are non-interactive labels for display on cards/detail. |
| Content grid | `RecipeCard` × N in a responsive grid |
| Card actions (e.g. favorite) | App-owned composition of Layer 1 `Toggle` via `RecipeCard` `action` |
| Loading state | `RecipeCardSkeleton count={n}` |
| Empty / no-results state | KKDS `Empty` + food-forward copy |
| Error state | App-owned panel: compose `Empty` (or a simple bordered region) + `Button` retry — there is no public `Alert` export |
| Pagination | App-level — compose with `Button` + `<nav>` or a pagination library (`Pagination` is not part of the public API) |

### Layout conventions
```
┌─────────────────────────────────┐
│  RecipeSearchBar (full width)   │
├─────────────────────────────────┤
│  [Italian] [Vegan] [Quick] …   │  ← app-owned filter chip row
├─────────────────────────────────┤
│  ┌───────┐ ┌───────┐ ┌───────┐ │
│  │ Card  │ │ Card  │ │ Card  │ │  ← 1→2→3 column responsive grid
│  └───────┘ └───────┘ └───────┘ │     grid-cols-1 md:grid-cols-2 lg:grid-cols-3
│  ┌───────┐ ┌───────┐ ┌───────┐ │     gap-6
│  │ Card  │ │ Card  │ │ Card  │ │
│  └───────┘ └───────┘ └───────┘ │
├─────────────────────────────────┤
│  ← Previous  1  2  3  Next →  │  ← app-level pagination (not a KKDS export)
└─────────────────────────────────┘
```

### State management strategy
- Manage `query` (search string) and `activeCategory` in React state or URL search params.
- Feed `query` and `activeCategory` into your data-fetching hook (TanStack Query `useQuery` or `useInfiniteQuery`).
- Show `RecipeCardSkeleton count={6}` while the query is pending.
- Show the `Empty` component when the query succeeds but returns zero results, with copy that reflects whether the list is intrinsically empty or filtered-empty (no results for query).
- On query errors, show an app-owned error composition with a single retry `Button` (not a KKDS `Alert`).

### Breakpoints
- Mobile (< `md`): 1 column, `RecipeSearchBar` stacked above filters.
- Tablet (`md`–`lg`): 2 columns.
- Desktop (≥ `lg`): 3 columns.

### Empty state copy
- Intrinsically empty: "Ready to discover something delicious?" / "Browse by category, search for an ingredient, or let us surprise you."
- No results: "No recipes match '…'" / "Try a different ingredient or browse by category."

---

## 2. Recipe Detail

### When to use
The full recipe view — shows a single recipe's image, author, metadata, ingredients, instructions, and actions. Typically a dedicated page.

### Components
| Role | Component |
|---|---|
| Hero image | `RecipeImage aspectRatio={4/3}` (left column) |
| Favorite / save action | App-owned `Toggle` composition (pattern), not a KKDS export |
| Attribution | `RecipeAuthor` (right column, below title) |
| Time & servings | `RecipeMetadata` (right column) |
| Category tags | `CategoryBadge` × N (right column) — display labels only |
| Allergen info | `AllergenBadge` × N (right column, separate section) |
| Ingredient rows | App-owned list markup (e.g. bordered `divide-y` rows) — there is no public `Item` / `ItemContent` export |
| Instruction steps | Numbered `<ol>` with KKDS `Separator` between steps |

### Layout conventions
```
┌──────────────────────────┬─────────────────────────────┐
│                          │  Recipe title (h1)          │
│   RecipeImage (4:3)      │  RecipeAuthor               │
│                          │  RecipeMetadata             │
│   [♡ favorite]           │  [Italian] [Dinner] [Quick] │
│                          │                             │
│                          │  Contains: [Eggs] [Dairy]   │
│                          │                             │
│                          │  Ingredients                │
│                          │  ───────────────────────    │
│                          │  • 200g spaghetti           │
│                          │  • 2 eggs                   │
│                          │                             │
│                          │  Instructions               │
│                          │  ───────────────────────    │
│                          │  1. Boil pasta…             │
└──────────────────────────┴─────────────────────────────┘
```

Two-column grid: `grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr]`

### Grid class for recipe lists
All recipe card grids — live and skeleton — must use the same class:
`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`

This is the canonical grid that matches `RecipeCardSkeleton`'s internal layout. Using any other breakpoint (e.g. `sm:grid-cols-2`) causes layout shift when the skeleton swaps to live cards.

### Metadata priority order (top to bottom in right column)
1. Title (`text-3xl font-bold`)
2. RecipeAuthor (attribution)
3. RecipeMetadata (time + servings)
4. CategoryBadge row
5. Description (if present)
6. AllergenBadge row (with "Contains allergens:" heading)
7. Ingredients section
8. Instructions section

### Image-to-content ratio
Left column (image + actions): `2fr`. Right column (all content): `3fr`. At mobile widths, image stacks above content full-width.

### Food imagery framing
Use `aspectRatio={4/3}` for detail pages (wider crop than cards). The `object-cover` framing ensures the subject is always centred regardless of the original photo dimensions.

### Allergen placement
Always in its own section with a visible heading ("Contains allergens" or "Dietary info"). Never mix AllergenBadge with CategoryBadge in the same row.

---

## 3. Profile Tabs

### When to use
A user's profile page — shows the user's identity header above a tabbed view of their authored recipes and saved favorites.

### Components
| Role | Component |
|---|---|
| Identity header | `RecipeAuthor size="default"` |
| Tab navigation | KKDS `Tabs` + `TabsList` + `TabsTrigger` |
| Tab content | `RecipeCard` grid per tab |
| Loading per tab | `RecipeCardSkeleton count={6}` |
| Empty per tab | KKDS `Empty` with tab-appropriate copy |

### Layout conventions
```
┌──────────────────────────────────────┐
│  ◉ [Avatar]  Sarah Chen             │
│              12 recipes             │  ← RecipeAuthor size="default"
├──────────────────────────────────────┤
│  [ My Recipes ]  [ favorites ]     │  ← TabsList
├──────────────────────────────────────┤
│  ┌───────┐ ┌───────┐ ┌───────┐     │
│  │ Card  │ │ Card  │ │ Card  │     │  ← RecipeCard grid (same as Discovery)
│  └───────┘ └───────┘ └───────┘     │
└──────────────────────────────────────┘
```

### Header structure
`RecipeAuthor` with `size="default"` renders a 40px avatar. Use `subtitle` for a recipe count ("12 recipes") or role label. Place the header outside and above the `Tabs` component so it stays visible during tab switching.

### Tab indicator animation guidance
The default KKDS `Tabs` uses a CSS-driven indicator. For a spring-animated indicator matching the KitchenKin app, implement a custom `TabsList` using Framer Motion's `layoutId` on an absolutely-positioned `<motion.span>` that follows the active trigger. Measure trigger positions with `ResizeObserver`. This is optional — the default CSS indicator is accessible and on-brand.

### Grid-within-tab spacing
Apply `pt-6` to the `TabsContent` panel and use the canonical responsive grid class: `grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`.

---

## 4. Loading & Empty State Philosophy

### Core principle
**Skeleton layouts must match live content dimensions exactly.** A skeleton that is wider, taller, or shaped differently than the live content causes layout shift when data loads, which destroys the perceived performance benefit.

### Loading strategy
1. Identify the expected result count (from pagination metadata, cache, or a fixed page size).
2. Render `<RecipeCardSkeleton count={n} />` in the same responsive grid container used for live cards.
3. Never use a page-level spinner for content that occupies known grid positions — the skeleton communicates both loading state and expected layout.

### Empty state taxonomy

| State | Trigger | Heading pattern | Action |
|---|---|---|---|
| **Intrinsically empty** | Collection exists but has no items | Invitation ("Ready to discover…") | CTA to create or browse |
| **No results** | Search/filter yields zero matches | Contextual ("No recipes match 'X'") | Suggest alternative; clear filter |
| **Error** | Query or mutation failed | Acknowledge + reassure ("Something went wrong") | Retry button |

### Skeleton accessibility
Wrap the skeleton grid in a `<div aria-busy="true" aria-label="Loading recipes">`. Remove `aria-busy` and the label once content replaces the skeleton.

### Empty state copy tone
- **Inviting, not apologetic.** "Your recipe box is empty" not "You have no recipes."
- **Action-forward.** Every empty state has exactly one primary CTA.
- **Food-flavoured when natural.** "Ready to discover something delicious?" uses the brand voice without being forced.

### Error state pattern
There is **no** public `Alert` component in `@sverg84/kkds-react`. Compose an error panel from exported primitives, for example:

1. `Empty` (or a bordered `div`) with a one-sentence acknowledgement ("We couldn't load your recipes.").
2. A reassurance that user data is safe when relevant.
3. A single recovery action (`Button variant="outline"` labelled "Try again").

Toast notifications are also **not** exported (`Toaster` / `SonnerToaster` / `useToast` are excluded). Use an application-level toast library if you need transient notices.

---

## Framework escape hatches (web)

These named render props keep framework integration out of KKDS while preserving component semantics. They are **not** a general polymorphism API.

| Hatch | Where | Purpose |
|---|---|---|
| `renderImage` | `RecipeImage` (passthrough from `RecipeCard`) | Swap the underlying `<img>` for Next.js `Image` (or similar) while KKDS keeps aspect ratio, clipping, and placeholder |
| `renderLink` | `RecipeCard` | Swap the default `<a>` for Next.js `Link` (or similar) while KKDS keeps the inset link surface and focus treatment |

### `action` + `href` interaction
When `href` (or `renderLink`) is set, the card's navigation surface is a single interactive region. Pass favorites and other controls through `action` so they remain **separate** interactive elements above that surface. Do not nest buttons/links inside the card body when the card itself is a link.

See the Recipe Card and Recipe Image demos on the docs site for working examples.

---

## Component index by pattern

| Pattern | RecipeCard | RecipeCardSkeleton | RecipeSearchBar | RecipeImage | RecipeAuthor | RecipeMetadata | CategoryBadge | AllergenBadge | Empty | Toggle (app pattern) |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Recipe Discovery | ✓ | ✓ | ✓ | — | — | — | display only | — | ✓ | via `action` |
| Recipe Detail | — | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | — | favorite control |
| Profile Tabs | ✓ | ✓ | — | — | ✓ | — | — | — | ✓ | — |
| Loading & Empty | — | ✓ | — | — | — | — | — | — | ✓ | — |
