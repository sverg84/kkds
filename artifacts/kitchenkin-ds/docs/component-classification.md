# Component Classification — Platform-Neutral Concept vs Web Implementation

Every exported component in `@sverg84/kkds-react` is documented below with:
- **Concept** — the platform-neutral intent (what it means, what data it needs, what it communicates to users)
- **Web implementation** — browser-specific details (HTML elements, CSS, Radix, Framer Motion, DOM APIs)
- **Mobile notes** — what a future React Native implementation would need to adapt

This classification guides which parts belong in `kkds-common` vs `kkds-web`.

---

## Layer 3: KitchenKin Semantic Components

### RecipeCard

**Concept (platform-neutral):**
- Canonical recipe summary: the primary content unit in KitchenKin
- Image hierarchy → food photograph first, then metadata
- Metadata hierarchy → title, tags, description, prep/cook time
- Loading behaviour → RecipeCardSkeleton must match this layout exactly
- Accessibility → must be navigable as a single interactive unit
- Contract → `RecipeCardContract` in `kkds-common`

**Web implementation:**
- `<article>` wrapping, optional `<a>` for keyboard-navigable linking
- `href` prop — web navigation only (not in contract)
- CSS Grid via Tailwind classes
- `hover:shadow-lg transition-shadow` — browser hover state
- Radix `Card`, `CardHeader`, `CardContent`, `CardFooter`

**Mobile notes:**
- Use `<Pressable>` instead of `<a>` — map `onPress` to navigation
- No `href` — use React Navigation or Expo Router
- Use `Image` instead of `<img>` with `objectFit: "cover"`
- Hover states don't exist — replace with `activeOpacity` or scale press animation

---

### RecipeImage

**Concept:** Aspect-ratio constrained food photograph with a warm branded placeholder when no image is provided.

**Web implementation:**
- Radix `AspectRatio` wrapper
- CSS `object-fit: cover` via Tailwind
- `<img>` element with `alt` attribute

**Mobile notes:**
- React Native `Image` with explicit width/height or `aspectRatio` style
- No CSS `object-fit` — use `resizeMode: "cover"`
- No aspect ratio wrapper needed — use `style={{ aspectRatio: 16/9 }}`

---

### RecipeMetadata

**Concept:** Compact display of preparation and cooking time side by side with clock icon emphasis.

**Web implementation:** `lucide-react` `Clock` icon, flex row, Tailwind typography classes.

**Mobile notes:** `react-native-svg` or `lucide-react-native` for icon; `View` + `Text` for layout.

---

### RecipeAuthor

**Concept:** Identity row pairing a user's avatar with their display name and optional subtitle (e.g. "Home baker · 42 recipes").

**Web implementation:** Radix `Avatar` with fallback initials, flex row, Tailwind `gap` classes.

**Mobile notes:** React Native `Image` (circular via `borderRadius`), `View`, `Text`.

---

### RecipeSearchBar

**Concept:** Controlled search input with an inline clear action when text is present.

**Web implementation:**
- `<input type="search">` wrapped in a positioned container
- `lucide-react` `Search` and `X` icons
- `onClick` on the clear button

**Mobile notes:**
- React Native `TextInput` with `returnKeyType="search"`
- `onChangeText` instead of `onChange`
- `Pressable` for clear button

---

### AllergenBadge

**Concept:** Compact label that communicates a dietary constraint or allergen warning. Should visually recede compared to category badges — it is a warning, not a highlight.

**Web implementation:** Radix `Badge` with `variant="outline"`, muted styling.

**Mobile notes:** React Native `View` + `Text` with border, same muted colour from `tokens.color.light.muted`.

---

### CategoryBadge

**Concept:** Warm, secondary label for recipe cuisines and styles. Higher visual weight than AllergenBadge since categories are browseable filters.

**Web implementation:** Radix `Badge` with `variant="secondary"`.

**Mobile notes:** `View` + `Text` with background from `tokens.color.light.secondary`.

---

## Layer 2: KKDS Custom Primitives

### Spinner

**Concept:** Indeterminate loading indicator. Communicates that an operation is in progress but duration is unknown.

**Web implementation:** `lucide-react` `Loader2Icon` with CSS `animate-spin`. Screen reader text via visually-hidden `<span>`.

**Mobile notes:** React Native `ActivityIndicator` — native, no CSS animation needed. Size + colour from tokens.

### Empty

**Concept:** Structured empty state that guides users when no content exists. Provides an icon, title, description, and optional call-to-action.

**Web implementation:** Flexbox centred layout, lucide-react icon slot, Tailwind prose.

**Mobile notes:** `View` centred via `alignItems: "center"`, `Text`, `Pressable` for action.

### ButtonGroup

**Concept:** A set of related actions that share visual attachment — presented as a single compound control.

**Web implementation:** CSS border-radius manipulation on first/last children, `overflow-hidden` container.

**Mobile notes:** `View` with `flexDirection: "row"`, first/last child border radius applied manually.

### Field

**Concept:** A form field pairing a label with an input, description, and error message in a consistent vertical stack.

**Web implementation:** `htmlFor` association between `<label>` and `<input>`. Radix `Label`.

**Mobile notes:** No `htmlFor` — accessibility via `accessibilityLabel` or `aria-*` equivalents.

### Item / ItemGroup

**Concept:** A flexible list row pairing media (avatar or icon) with title, description, and optional trailing actions.

**Web implementation:** Flex row, `role="listitem"`, hover state.

**Mobile notes:** `Pressable` + `View` + `Text`. No `role="listitem"` — use `accessibilityRole="none"` or infer from context.

---

## Layer 1: Curated shadcn/ui Primitives

These are web-only. They wrap Radix UI and are deeply coupled to the browser. Their mobile equivalents would be entirely different primitives (React Native built-ins or libraries like RNUI, Tamagui).

| Component | Web coupling | Mobile strategy |
|---|---|---|
| Button | `<button>`, focus ring, onClick | `Pressable` |
| Input | `<input>`, onChange | `TextInput` |
| Dialog | Radix Dialog, browser focus trap | `Modal` |
| Sheet | Radix Dialog + CSS translate | `BottomSheet` |
| Popover | Radix Popover, DOM positioning | Platform popover |
| DropdownMenu | Radix DropdownMenu | `ActionSheet` |
| Tabs | Radix Tabs | `ScrollView` + `Pressable` |
| ScrollArea | Radix ScrollArea, CSS overflow | `ScrollView` |
| Toast / Toaster | Radix Toast, DOM portals | Toast from RN library |
| Tooltip | Radix Tooltip, `mouseenter` | `Pressable` + `Modal` |

---

## Web-Specific APIs to Document

The following props exist in web components and have no direct equivalent in `kkds-common` contracts. Future implementations should handle them per-platform:

| Prop | Component | Web binding | Mobile equivalent |
|---|---|---|---|
| `href` | RecipeCard | `<a href>` | `onPress` + navigator |
| `ref` | Button, Input, etc. | `React.forwardRef` + DOM ref | `React.forwardRef` + native ref |
| `className` | All | Tailwind CSS class strings | `style` prop |
| `onClick` | Many | `MouseEvent` handler | `onPress` |
| `MouseEvent` | Button internals | Browser mouse event | N/A |
| `htmlFor` | Label | `<label for>` | `accessibilityLabel` |
| `type="submit"` | Button | HTML form submission | N/A |
