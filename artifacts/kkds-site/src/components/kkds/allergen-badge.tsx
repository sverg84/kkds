import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { formatCategoryLabel } from './category-badge';

export interface AllergenBadgeProps {
  /**
   * Raw allergen string, e.g. `"GLUTEN"`, `"DAIRY"`, `"TREE_NUTS"`.
   * Automatically title-cased and underscore-converted for display.
   */
  label: string;
  className?: string;
}

/**
 * AllergenBadge
 *
 * A muted outline Badge encoding a dietary constraint or allergen warning —
 * Gluten, Dairy, Tree Nuts, Eggs, Soy, etc. Uses the KKDS outline variant so
 * that allergen labels are visually distinct from category tags: informational
 * rather than descriptive, cautionary rather than celebratory.
 *
 * **When to use:** Dietary restriction and allergen information on recipe
 * detail pages and any surface where food safety information is relevant.
 *
 * **When not to use:** Recipe categories or cuisine types — use `CategoryBadge`
 * for those. Do not use AllergenBadge for decorative labelling.
 *
 * **Accessibility:** Allergen badges should be grouped under a heading such as
 * "Contains" or "Allergens" so screen reader users understand their context.
 *
 * **RSC compatible:** Yes.
 */
export function AllergenBadge({ label, className }: AllergenBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn('text-muted-foreground', className)}
    >
      {formatCategoryLabel(label)}
    </Badge>
  );
}
