/**
 * Allergen and dietary constraint domain model.
 *
 * Platform-neutral — no DOM, no React, no framework dependencies.
 * The web implementation (AllergenBadge) renders this as a muted outline badge.
 * A future mobile implementation would render it as a native label or chip.
 */

/**
 * Canonical allergen / dietary constraint identifiers used across KitchenKin.
 * Values are stable — do not rename them; they may be stored in databases and
 * transmitted over APIs.
 */
export type AllergenTag =
  | 'GLUTEN_FREE'
  | 'DAIRY_FREE'
  | 'NUT_FREE'
  | 'EGG_FREE'
  | 'SOY_FREE'
  | 'SHELLFISH_FREE'
  | 'VEGAN'
  | 'VEGETARIAN'
  | 'PALEO'
  | 'KETO'
  | 'HALAL'
  | 'KOSHER'
  | (string & {}); // allow unknown future tags without breaking the type

/** Display metadata for a single allergen tag. */
export interface AllergenTagMeta {
  /** Short display label shown in the badge. */
  label: string;
  /** Longer accessible description for screen readers. */
  description: string;
}

/**
 * Lookup table for well-known allergen tags.
 * Unknown tags fall back to a humanised version of the raw identifier.
 */
export const ALLERGEN_META: Record<string, AllergenTagMeta> = {
  GLUTEN_FREE:    { label: 'Gluten free',    description: 'Free from gluten-containing grains' },
  DAIRY_FREE:     { label: 'Dairy free',     description: 'Free from dairy and lactose' },
  NUT_FREE:       { label: 'Nut free',       description: 'Free from tree nuts and peanuts' },
  EGG_FREE:       { label: 'Egg free',       description: 'Free from eggs and egg derivatives' },
  SOY_FREE:       { label: 'Soy free',       description: 'Free from soy and soy derivatives' },
  SHELLFISH_FREE: { label: 'Shellfish free', description: 'Free from shellfish and crustaceans' },
  VEGAN:          { label: 'Vegan',          description: 'No animal products of any kind' },
  VEGETARIAN:     { label: 'Vegetarian',     description: 'No meat or fish' },
  PALEO:          { label: 'Paleo',          description: 'Whole-food, grain-free diet' },
  KETO:           { label: 'Keto',           description: 'Low-carbohydrate, high-fat diet' },
  HALAL:          { label: 'Halal',          description: 'Prepared according to Islamic dietary law' },
  KOSHER:         { label: 'Kosher',         description: 'Prepared according to Jewish dietary law' },
} as const;

/**
 * Returns the display label for a tag, falling back to a humanised form
 * for unknown identifiers (e.g. `"MY_TAG"` → `"My tag"`).
 */
export function allergenLabel(tag: string): string {
  const meta = ALLERGEN_META[tag];
  if (meta) return meta.label;
  return tag
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());
}
