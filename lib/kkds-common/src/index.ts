/**
 * @sverg84/kkds-common — Public API surface
 *
 * Platform-neutral tokens, types, motion semantics, and domain contracts for
 * the KitchenKin Design System. This package has zero framework dependencies —
 * no React, no React Native, no DOM, no CSS.
 *
 * ─── Tokens ──────────────────────────────────────────────────────────────────
 *   tokens  — portable design token object (colors as hex, motion as CSS strings)
 *   Tokens  — TypeScript type for the tokens object
 *
 * ─── Motion ──────────────────────────────────────────────────────────────────
 *   motion    — semantic motion intents composed from duration + easing primitives
 *   MotionSpec — { duration: number, ease: string }
 *   Motion    — typeof motion
 *
 * ─── Domain types ────────────────────────────────────────────────────────────
 *   AllergenTag, AllergenTagMeta, ALLERGEN_META, allergenLabel
 *   RecipeCategory, RECIPE_CATEGORIES, categoryLabel
 *   RecipeSummary, RecipeDetail, RecipeAuthor, RecipeIngredient, RecipeStep
 *
 * ─── Component contracts ─────────────────────────────────────────────────────
 *   RecipeCardContract, RecipeImageContract, RecipeMetadataContract,
 *   RecipeAuthorContract, RecipeSearchBarContract, FavoriteButtonContract,
 *   AllergenBadgeContract, CategoryBadgeContract,
 *   EmptyContract, SpinnerContract
 */

// ── Tokens ─────────────────────────────────────────────────────────────────────
export { tokens, type Tokens } from './generated/tokens';
export { default as defaultTokens } from './generated/tokens';

// ── Motion ─────────────────────────────────────────────────────────────────────
export { motion, type Motion, type MotionSpec } from './motion';

// ── Allergen domain ────────────────────────────────────────────────────────────
export {
  ALLERGEN_META,
  allergenLabel,
  type AllergenTag,
  type AllergenTagMeta,
} from './types/allergens';

// ── Recipe domain ──────────────────────────────────────────────────────────────
export {
  RECIPE_CATEGORIES,
  categoryLabel,
  type RecipeCategory,
  type RecipeSummary,
  type RecipeDetail,
  type RecipeAuthor,
  type RecipeIngredient,
  type RecipeStep,
} from './types/recipe';

// ── Component contracts ────────────────────────────────────────────────────────
export type {
  RecipeCardContract,
  RecipeImageContract,
  RecipeMetadataContract,
  RecipeAuthorContract,
  RecipeSearchBarContract,
  FavoriteButtonContract,
  AllergenBadgeContract,
  CategoryBadgeContract,
  EmptyContract,
  SpinnerContract,
} from './types/components';
