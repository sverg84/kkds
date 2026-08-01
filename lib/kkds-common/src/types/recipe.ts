/**
 * KitchenKin recipe domain model.
 *
 * Platform-neutral — no DOM, no React, no framework dependencies.
 * These types describe the data layer; rendering is left to platform packages.
 */

import type { AllergenTag } from './allergens';

// ─── Primitive recipe vocabulary ──────────────────────────────────────────────

/**
 * Recipe category / cuisine identifier. Values here are examples from the first
 * release; the system uses open-ended strings so the backend can extend the list
 * without requiring a client update.
 */
export type RecipeCategory =
  | 'ITALIAN'
  | 'MEXICAN'
  | 'ASIAN'
  | 'MEDITERRANEAN'
  | 'AMERICAN'
  | 'FRENCH'
  | 'INDIAN'
  | 'JAPANESE'
  | 'THAI'
  | 'GREEK'
  | 'MIDDLE_EASTERN'
  | 'DESSERT'
  | 'BREAKFAST'
  | 'LUNCH'
  | 'DINNER'
  | 'SNACK'
  | 'DRINK'
  | (string & {});

/** Well-known category display labels. Falls back to a humanised raw value. */
export const RECIPE_CATEGORIES: Record<string, string> = {
  ITALIAN:        'Italian',
  MEXICAN:        'Mexican',
  ASIAN:          'Asian',
  MEDITERRANEAN:  'Mediterranean',
  AMERICAN:       'American',
  FRENCH:         'French',
  INDIAN:         'Indian',
  JAPANESE:       'Japanese',
  THAI:           'Thai',
  GREEK:          'Greek',
  MIDDLE_EASTERN: 'Middle Eastern',
  DESSERT:        'Dessert',
  BREAKFAST:      'Breakfast',
  LUNCH:          'Lunch',
  DINNER:         'Dinner',
  SNACK:          'Snack',
  DRINK:          'Drink',
} as const;

/**
 * Returns the display label for a category identifier.
 * Falls back to a humanised form for unknown identifiers.
 */
export function categoryLabel(category: string): string {
  const known = RECIPE_CATEGORIES[category];
  if (known) return known;
  return category
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Recipe summary (list / card view) ────────────────────────────────────────

/**
 * The minimal data shape required to render a recipe summary card.
 * This is what the list API returns and what RecipeCard / its mobile equivalent
 * consumes as data — not as props (those may differ per platform).
 */
export interface RecipeSummary {
  id: string;
  title: string;
  description?: string | null;
  /** Absolute URL to the primary food photograph. */
  imageUrl?: string | null;
  /** Preparation time as a human-readable string, e.g. `"15 min"`. */
  prepTime?: string | null;
  /** Cooking time as a human-readable string, e.g. `"30 min"`. */
  cookTime?: string | null;
  /** Category and dietary constraint labels. Mix of RecipeCategory and AllergenTag values. */
  tags?: (RecipeCategory | AllergenTag)[];
}

// ─── Recipe detail (full recipe view) ─────────────────────────────────────────

/** A single measured ingredient. */
export interface RecipeIngredient {
  name: string;
  quantity: string;
  unit?: string | null;
  note?: string | null;
}

/** A single recipe instruction step. */
export interface RecipeStep {
  step: number;
  instruction: string;
  /** Optional tip or note for the step. */
  tip?: string | null;
}

/** A recipe author / creator profile. */
export interface RecipeAuthor {
  id: string;
  displayName: string;
  /** Absolute URL to the author's avatar photograph. */
  avatarUrl?: string | null;
  /** Short author bio or subtitle, e.g. `"Home baker · 42 recipes"`. */
  subtitle?: string | null;
}

/** Full recipe detail — superset of RecipeSummary. */
export interface RecipeDetail extends RecipeSummary {
  author?: RecipeAuthor | null;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  servings?: number | null;
  totalTime?: string | null;
  /** Number of times the recipe has been saved to favorites. */
  favoriteCount?: number | null;
  isFavorited?: boolean;
}
