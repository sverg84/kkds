# @sverg84/kkds-common

## 0.3.0

### Minor Changes

- 5d8e2b8: Improve accessibility before broader adoption: restore RecipeSearchBar clear focus, name Combobox icon controls, raise light-theme contrast for primary/muted/ring tokens, align focus rings, and honor prefers-reduced-motion.

## 0.2.2

### Patch Changes

- 9e1a6f6: Remove the unused in-package Vite preview SPA; the package is library-only and docs live in kkds-site.

## 0.2.1

### Patch Changes

- d16e1b4: Align package README and barrel docs with the public API after stabilization: correct hook naming (`useIsMobile`), remove inaccurate API claims, and clarify FavoriteButton as a composition pattern rather than an export.

## 0.2.0

### Minor Changes

- c3317ac: Stabilize the pre-adoption KKDS public API.

  - Export the Combobox component family.
  - Add Spinner size and accessible label APIs.
  - Standardize RecipeAuthor sizing and RecipeSearchBar value-change naming.
  - Rename the shared recipe tag formatter.
  - Require explicit RecipeImage alt text.
  - Align shared component contracts with the current React APIs.
