import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

export interface CategoryBadgeProps {
  /**
   * Raw tag string from the KitchenKin data layer, e.g. `"GLUTEN_FREE"` or
   * `"italian"`. Automatically title-cased and underscore-converted for display.
   */
  label: string;
  className?: string;
}

/**
 * Normalises a raw KitchenKin tag string to a human-readable label.
 * "GLUTEN_FREE" → "Gluten Free", "italian" → "Italian"
 *
 * Shared by CategoryBadge and AllergenBadge for generalized tag vocabulary.
 */
export function formatTagLabel(tag: string): string {
  return tag
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * CategoryBadge
 *
 * A warm secondary Badge encoding a KitchenKin recipe category or tag —
 * Breakfast, Italian, Vegetarian, etc. Uses the KKDS secondary colour role
 * (warm cream background) so that category labels feel food-forward rather
 * than system-UI.
 *
 * **When to use:** Recipe tags, cuisine types, meal-type labels on cards or
 * detail pages.
 *
 * **When not to use:** Dietary restrictions or allergen warnings — use
 * `AllergenBadge` for those, which carries a visual distinction that
 * communicates constraint rather than description.
 *
 * **RSC compatible:** Yes.
 */
export function CategoryBadge({ label, className }: CategoryBadgeProps) {
  return (
    <Badge variant="secondary" className={cn(className)}>
      {formatTagLabel(label)}
    </Badge>
  );
}
