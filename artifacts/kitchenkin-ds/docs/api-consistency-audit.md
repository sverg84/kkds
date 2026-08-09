# KKDS Public Component API Consistency Audit

Read-only audit of every public component exported from `@sverg84/kkds-react`.
No runtime behavior was changed in the phase that produced this document.
Combobox barrel export + demo are scheduled for migration Phase 1 (required;
deletion is not an option).

## Scope and method

Audited every export from `artifacts/kitchenkin-ds/src/index.ts`:

- Layer 3 — KitchenKin semantic components (8)
- Layer 2 — KKDS custom primitives (`Empty`, `Field`, `InputGroup`, `Spinner`)
- Layer 1 — curated shadcn / Base UI primitives
- Platform-neutral contracts from `lib/kkds-common/src/types/components.ts`

Checked for each public root (and compound parts where relevant):

- Prop naming consistency
- `className` support
- Ref forwarding
- Render-prop / polymorphism conventions
- Controlled vs uncontrolled APIs
- Event naming
- Optional props that should be required
- Duplicate props / unnecessary abstraction
- Missing documentation

### Chosen conventions for recommendations

Aligned with package architecture (web-first, Base UI primitives, avoid
premature cross-platform abstraction):

| Concern | Convention |
|---|---|
| Size tokens | `"default" \| "sm" \| "lg" \| "icon"` on primitives; Layer 3 maps to `"default" \| "sm"` |
| Controlled values | `value` / `defaultValue` + `onValueChange` (Base UI) |
| Boolean controls | `checked`/`defaultChecked`/`onCheckedChange`; `pressed`/`defaultPressed`/`onPressedChange`; `open`/`defaultOpen`/`onOpenChange` |
| Slot override | Base UI `render` (not Radix `asChild`) |
| Domain overrides | Named `renderX` (e.g. `renderImage`, `renderLink`) |
| Styling escape hatch | Always accept `className` on public roots |
| Refs | React 19 `ref` as prop via DOM / `ComponentProps` / Base UI; Layer 3 optional unless composition requires it |
| Contracts | Update `kkds-common` contracts to match current web APIs; drop speculative mobile-only props until a second platform exists |

**Decision locked in:** `Combobox` **must** be a public Layer 1 export.

---

## Cross-cutting findings

1. **Public surface docs were wrong.** `src/index.ts` listed `Toggle` under
   “Excluded” while exporting it. `Combobox` exists at
   `src/components/ui/combobox.tsx` with a full compound API but is **not**
   re-exported from the package barrel — a required public gap. `docs/AGENTS.md`
   previously described `./components/*` subpath exports that `package.json`
   does not expose.
2. **Documentation quality split.** Layer 3 has rich JSDoc; Layer 1/2 have
   almost none (rely on demos in `kkds-site`).
3. **Contract drift.** Several `*Contract` types disagree with web props
   (`RecipeAuthor` size, `RecipeImage.alt`, `RecipeCard.onPress`,
   `RecipeMetadata.servings`, `Empty` / `Spinner` shape).
4. **Event naming split.** Base UI uses `onValueChange` / `onCheckedChange` /
   etc.; `RecipeSearchBar` uses `onChange: (value: string) => void`.
5. **Size vocabulary split.** Primitives use `sm`; `RecipeAuthor` uses
   `compact`; contract uses `sm`.
6. **No `forwardRef`.** Correct for React 19 + Base UI, but Layer 3 roots do
   not accept `ref` at all.
7. **`className` nearly universal** except `RecipeCardSkeleton` ignores
   `className` when `count === 1`.

```mermaid
flowchart TB
  subgraph layer3 [Layer 3 KKDS]
    RC[RecipeCard]
    RI[RecipeImage]
    RSB[RecipeSearchBar]
  end
  subgraph contracts [kkds-common contracts]
    RCC[RecipeCardContract]
    RIC[RecipeImageContract]
    RSBC[RecipeSearchBarContract]
  end
  subgraph layer1 [Layer 1 Base UI]
    Tabs
    Switch
    Select
  end
  RC -.->|drifts: onPress vs href| RCC
  RI -.->|drifts: alt required vs optional| RIC
  RSB -.->|onChange vs onValueChange| RSBC
  Tabs -->|onValueChange| layer1
  Switch -->|onCheckedChange| layer1
  Select -->|onValueChange| layer1
```

---

## Layer 3 — per component

### RecipeCard — `src/components/kkds/recipe-card.tsx`

| Check | Status |
|---|---|
| Props | `title` required; `id?`, `description?`, `imageUrl?`, `tags?`, `prepTime?`, `cookTime?`, `href?`, `className?`, `action?`, `renderLink?`, `renderImage?` |
| className | Yes |
| ref | No |
| Render props | `renderLink`, `renderImage` |
| Controlled | N/A |
| Docs | Strong JSDoc |

**Suggestions**

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Align contract: remove speculative `onPress`; document `href`/`renderLink` as web-only (or add optional web `onPress` later with mobile) | Contract-only (type consumers) | **High** |
| Pass `servings` through to `RecipeMetadata` for parity with detail surfaces | No (additive) | **Medium** |
| Document that `tags` are always rendered as `CategoryBadge` (allergens in tags lose visual distinction) | No | **High** |
| Accept and forward `ref` to root `Card` for measurement/focus | Possibly type-level | **Low** |
| Require `id` when `href` is set (stable `aria-labelledby`) | Yes | **Medium** |

---

### RecipeImage — `src/components/kkds/recipe-image.tsx`

| Check | Status |
|---|---|
| Props | `src?`, `alt?`, `aspectRatio?`, `priority?`, `className?`, `renderImage?` |
| Contract mismatch | Contract requires `alt: string`; impl allows `alt?: string \| null` |
| Render props | `renderImage` — good named convention |
| className | Yes |
| ref | No |
| Docs | Strong JSDoc |

**Suggestions**

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Make `alt` required in props (match contract + a11y docs); allow empty string if needed | **Yes** | **High** |
| Keep `src` (image primitive) vs card’s `imageUrl` — document as intentional | No | **High** |
| Document that `priority` only affects default `<img>`; `renderImage` consumers must honor it | No | **High** |

---

### RecipeMetadata — `src/components/kkds/recipe-metadata.tsx`

| Check | Status |
|---|---|
| Props | All optional (`prepTime`, `cookTime`, `servings`, `className`); returns `null` if all empty |
| Contract | Missing `servings` |
| className | Yes |
| ref | No |
| Docs | Strong JSDoc |

**Suggestions**

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Add `servings` to `RecipeMetadataContract` | No | **High** |
| Keep all-optional + null render (valid empty composition) | — | **High** |
| Consider distinct icons for prep vs cook (both use `Clock`) — visual, not API | No | **Low** |

---

### RecipeAuthor — `src/components/kkds/recipe-author.tsx`

| Check | Status |
|---|---|
| Size | Impl: `'default' \| 'compact'`; Contract: `'default' \| 'sm'`; Avatar primitive: `'default' \| 'sm' \| 'lg'` |
| Props | `name` required; `avatarUrl?`, `subtitle?`, `size?`, `className?` |
| className | Yes |
| ref | No |
| Docs | Strong JSDoc |

**Suggestions**

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Rename `compact` → `sm` to match Avatar/Button/Switch and contract | **Yes** | **High** |
| Ship one-release alias: accept both `compact` and `sm`, deprecate `compact` | Soft-break | **High** |
| Optional `href`/`renderLink` for author profile navigation (parity with card) | No (additive) | **Medium** |

---

### RecipeSearchBar — `src/components/kkds/recipe-search-bar.tsx`

| Check | Status |
|---|---|
| Controlled | Controlled-only: `value` + `onChange` required |
| Events | `onChange(value: string)` — not DOM `ChangeEvent`; differs from Base UI `onValueChange` |
| Uncontrolled | No `defaultValue` |
| className | Yes |
| ref | No |
| Docs | Strong; notes `"use client"` |

**Suggestions**

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Rename `onChange` → `onValueChange` (align Tabs/Select/Base UI); dual-support then remove | **Yes** (after deprecation) | **High** |
| Add optional uncontrolled `defaultValue` only if product needs it — otherwise keep controlled-only and document | No if skipped | **Medium** |
| Expose `disabled`, `name`, `id`, `autoFocus` passthrough for forms | No | **Medium** |
| Allow overriding hardcoded `aria-label="Search recipes"` | No | **Medium** |

---

### CategoryBadge — `src/components/kkds/category-badge.tsx`

| Check | Status |
|---|---|
| Props | `label` required; `className?` |
| className | Yes |
| ref | No (does not forward Badge/`render`) |
| Docs | Strong JSDoc |
| Helper | Exports `formatCategoryLabel` |

**Suggestions** — see shared badge section below.

---

### AllergenBadge — `src/components/kkds/allergen-badge.tsx`

| Check | Status |
|---|---|
| Props | `label` required; `className?` |
| className | Yes |
| ref | No |
| Docs | Strong JSDoc |
| Composition | `Badge variant="outline"` + muted foreground; reuses `formatCategoryLabel` |

---

### CategoryBadge / AllergenBadge (shared)

Nearly identical wrappers around `Badge` (`secondary` vs `outline` + muted).
Share `formatCategoryLabel` from the category module (name misleading for
allergens).

**Suggestions**

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Keep two components (semantic distinction is intentional per `audit-phase2.md`) | — | **High** |
| Rename shared helper to `formatTagLabel` (or move to `kkds-common` next to `categoryLabel`/`allergenLabel`) | Soft | **High** |
| Prefer typed `AllergenTag` / `RecipeCategory` props with `label: string` overload for freeform | Soft | **Medium** |
| Avoid merging into one `variant` prop — would erase domain API | — | **High** |

---

### RecipeCardSkeleton — `src/components/kkds/recipe-card-skeleton.tsx`

| Check | Status |
|---|---|
| Props | `count?` (default `1`), `className?` |
| className | **Bug:** applied only when `count > 1`; ignored for default `count={1}` |
| ref | No |
| Docs | Strong JSDoc |

**Suggestions**

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Always apply `className` to the outermost element | No (fixes dead prop) | **High** |
| Split `RecipeCardSkeleton` (single) vs `RecipeCardSkeletonGrid` (count+grid) to remove layout abstraction in one API | Soft | **Medium** |

---

## Layer 2 — per family

### Empty — compound

Parts: `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`,
`EmptyContent`.

| Issue | Detail | Confidence |
|---|---|---|
| Contract mismatch | `EmptyContract` is flat (`title`, `icon`, `actionLabel`); impl is compound composition | **High** |
| Element/type mismatch | `EmptyDescription` types as `ComponentProps<"p">` but renders `<div>` | **High** |
| Slot naming | Component `EmptyMedia`, `data-slot="empty-icon"` | **Medium** |
| Docs | No JSDoc on components | **High** |
| className | Yes on all parts | **High** |

**Suggestions:** Update/remove misleading `EmptyContract`; fix description
element to `<p>` or widen types; rename slot to `empty-media`; add JSDoc +
DocBlock. Prefer keeping compound API (matches shadcn) over collapsing to flat
props.

---

### Field — compound

Parts: `Field`, `FieldSet`, `FieldGroup`, `FieldLegend`, `FieldLabel`,
`FieldTitle`, `FieldDescription`, `FieldSeparator`, `FieldContent`, `FieldError`.

| Issue | Detail | Confidence |
|---|---|---|
| Duplicate abstraction | `FieldLabel` and `FieldTitle` both use `data-slot="field-label"` | **High** |
| Docs | Missing | **High** |
| `FieldError` | Dual API: `children` or `errors[]` — useful but undocumented | **Medium** |
| className | Yes on all parts | **High** |

**Suggestions:** Document when to use Label vs Title; consider distinct slots;
add JSDoc. No merge/removal unless unused in demos.

---

### InputGroup — compound

Parts: `InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupText`,
`InputGroupInput`, `InputGroupTextarea`.

Solid composition for `RecipeSearchBar`. `InputGroupButton` redefines `size`
(`xs`, `icon-xs`, …) separately from `Button` — intentional but undocumented.

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Document size override table vs `Button` sizes | No | **High** |

---

### Spinner — `src/components/ui/spinner.tsx`

| Check | Status |
|---|---|
| Props | `React.ComponentProps<"svg">` |
| Contract mismatch | `SpinnerContract` has `size`/`label`; impl is fixed `size-4` and hardcoded `aria-label="Loading"` |
| className | Yes |
| Docs | None |

**Suggestions:** Add `size?: "sm" \| "default" \| "lg"` and `label?: string` to
match contract, or shrink contract to reality. Prefer implementing size/label
(additive). Confidence **High**.

---

## Layer 1 — family summary

Pattern: thin Base UI / DOM wrappers; almost all support `className`; refs via
Base UI / `ComponentProps` (React 19); controlled APIs inherited from Base UI;
little/no JSDoc.

| Family | Controlled API | Render override | Notable inconsistency |
|---|---|---|---|
| Button | N/A | Base UI props (no local `asChild`) | No JSDoc; variants via CVA |
| Badge | N/A | `render` via `useRender` | Explicit public `render` polymorphism |
| Input / Textarea / Label | native | — | Consistent |
| Switch | `checked` / `defaultChecked` / `onCheckedChange` | — | Size `sm\|default` OK |
| Toggle | `pressed` / `defaultPressed` / `onPressedChange` | — | Exported; inventory comment previously wrong |
| Tabs | `value` / `defaultValue` / `onValueChange` | — | Part names `TabsTrigger`/`TabsContent` vs Base UI `Tab`/`Panel` — shadcn naming, keep |
| Select | Base UI value/open | internal `render` for icons | Size on trigger only |
| Dialog / AlertDialog / Popover | `open` / `defaultOpen` / `onOpenChange` | internal `render` | Consistent |
| DropdownMenu | open/change via Base UI | — | Consistent compound |
| Avatar | — | — | Size `default\|sm\|lg` — RecipeAuthor should align |
| Card | — | — | `size` on root; titles are `div` not headings (callers supply semantics — RecipeCard uses `h3`) |
| AspectRatio | — | — | `ratio` **required** (good) |
| Skeleton / Separator / ScrollArea | — | — | Fine |
| Combobox | Base UI value/open (compound) | internal `render` + InputGroup composition | **Must be public** — source complete, barrel export missing; no kkds-site demo/registry yet |

---

### Combobox — required public export — `src/components/ui/combobox.tsx`

Already implemented compound parts: `Combobox`, `ComboboxInput`,
`ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxGroup`,
`ComboboxLabel`, `ComboboxCollection`, `ComboboxEmpty`, `ComboboxSeparator`,
`ComboboxChips`, `ComboboxChip`, `ComboboxChipsInput`, `ComboboxTrigger`,
`ComboboxValue`, `useComboboxAnchor`.

| Check | Status |
|---|---|
| className | Yes on styled parts |
| ref | Via Base UI / `useComboboxAnchor` |
| Controlled | Inherited Base UI (`value` / `defaultValue` / `onValueChange`, open state) |
| Render | Base UI `render` (aligned with Badge/Select) |
| Docs | None; no preview demo |
| Public barrel | **Missing** (required gap) |

**Suggestions**

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Re-export all Combobox parts from `src/index.ts` Layer 1 section | No (additive) | **High** |
| List Combobox in the index inventory comment (Included) | Docs | **High** |
| Add kkds-site Combobox demo + registry covering single-select, chips, empty, and clear | No | **High** |
| Document relationship to Select (closed list) vs Combobox (filterable/searchable) and vs RecipeSearchBar (free-text recipe filter, not option picking) | No | **High** |

**Layer 1 suggestions (mostly non-breaking)**

| Suggestion | Breaking? | Confidence |
|---|---|---|
| Fix `index.ts` inventory: Toggle included; **Combobox must be exported** | Additive export | **High** |
| Add brief JSDoc or link each family demo as canonical docs | No | **High** |
| Document Base UI `render` as the polymorphism convention (not `asChild`) | No | **High** |
| Do not rename Tabs/Dialog part names — match shadcn ecosystem | — | **High** |

---

## Suggested API improvements (priority)

**P0 — correctness / honesty (low risk)**

1. Fix public export comments and AGENTS export map.
2. **Export Combobox** from the package barrel; add demo + registry entry.
3. Apply `className` on `RecipeCardSkeleton` for `count === 1`.
4. Fix `EmptyDescription` element/type mismatch.
5. Sync contracts: `servings`, `alt`, RecipeAuthor size, Empty/Spinner,
   drop/adjust `onPress`.

**P1 — naming consistency (breaking with migration path)**

6. `RecipeAuthor` `compact` → `sm` (alias period).
7. `RecipeSearchBar` `onChange` → `onValueChange` (alias period).
8. Rename `formatCategoryLabel` → `formatTagLabel`.

**P2 — API completeness (additive)**

9. Spinner `size` + `label`.
10. RecipeSearchBar a11y/form passthroughs.
11. RecipeCard optional `servings`.
12. Layer 1/2 JSDoc + DocBlocks (including Combobox).

**P3 — structural (optional)**

13. Split skeleton single vs grid.
14. Layer 3 `ref` policy decision documented; implement only if consumers need it.

---

## Breaking changes register

| Change | Who breaks | Mitigation |
|---|---|---|
| `RecipeAuthor size="compact"` → `"sm"` | Any `compact` callers (kkds-site demos) | Accept both for one minor; warn in JSDoc |
| `RecipeSearchBar onChange` → `onValueChange` | All search bar callers | Dual props one minor; then remove `onChange` |
| `RecipeImage alt` required | Callers omitting `alt` | Type error; runtime already defaults display string |
| Contract field removals/renames (`onPress`, Empty flat shape) | Type-only importers of contracts | Semver minor if pre-1.0 (`0.1.0`); document in `migrating-web.md` |
| Combobox newly exported (required) | None | Additive; add demo/registry in same change |

Package is `0.1.0` — breaking renames are acceptable with a short dual-support
window and `docs/migrating-web.md` updates.

---

## Migration plan

```mermaid
flowchart LR
  phase0[Phase0 DocsAndContracts]
  phase1[Phase1 NonBreakingFixes]
  phase2[Phase2 AliasedRenames]
  phase3[Phase3 RemoveAliases]
  phase0 --> phase1 --> phase2 --> phase3
```

### Phase 0 — Audit artifact + surface honesty (this document)

- Write `docs/api-consistency-audit.md` (this file).
- Correct `index.ts` / AGENTS export claims.
- Document Combobox as a **required** missing public export.

### Phase 1 — Non-breaking fixes + required Combobox export

- Re-export Combobox compound API from `src/index.ts`.
- Add kkds-site Combobox demo + registry.
- Skeleton `className` for `count === 1`.
- EmptyDescription element/type fix.
- Contract sync; Spinner size/label.
- Docs for Field/InputGroup/Empty; JSDoc pass on Layer 1 roots including Combobox.

### Phase 2 — Aliased renames

- `compact`/`sm`, `onChange`/`onValueChange`, `formatTagLabel`.
- Update kkds-site demos; note in `migrating-web.md`.

### Phase 3 — Remove aliases

- Drop deprecated props.
- Optional skeleton split / RecipeCard `servings`.

Each phase: typecheck `@sverg84/kkds-react` + `@workspace/kkds-site`; update
demos/registry in the same PR; no visual/behavior changes except intentional
prop renames.

---

## Source inventory (public at audit time)

| Layer | Public components |
|---|---|
| 3 | `AllergenBadge`, `CategoryBadge`, `RecipeAuthor`, `RecipeCard`, `RecipeCardSkeleton`, `RecipeImage`, `RecipeMetadata`, `RecipeSearchBar` |
| 2 | `Empty` (+ parts), `Field` (+ parts), `InputGroup` (+ parts), `Spinner` |
| 1 | `AlertDialog`, `AspectRatio`, `Avatar`, `Badge`, `Button`, `Card`, `Dialog`, `DropdownMenu`, `Input`, `Label`, `Popover`, `ScrollArea`, `Select`, `Separator`, `Skeleton`, `Switch`, `Tabs`, `Textarea`, `Toggle` |
| 1 gap | `Combobox` (+ parts) — implemented, **must export** in Phase 1 |
