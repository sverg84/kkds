import { Clock, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface RecipeMetadataProps {
  /** Preparation time label, e.g. "15 min". */
  prepTime?: string | null;
  /** Cooking time label, e.g. "30 min". */
  cookTime?: string | null;
  /** Servings count or label, e.g. 4 or "4 servings". */
  servings?: string | number | null;
  className?: string;
}

/**
 * RecipeMetadata
 *
 * A compact horizontal row of recipe timing and serving information, each item
 * accompanied by an appropriate icon. Appears on both the recipe card footer and
 * the recipe detail page, ensuring a consistent visual vocabulary for
 * time-at-a-glance information.
 *
 * **When to use:** Anywhere recipe timing or yield information is displayed inline.
 *
 * **When not to use:** Full nutritional data panels or detailed recipe breakdowns
 * — those are application-level UI, not this component.
 *
 * **Composition:** Combine with RecipeCard (in the footer) or place beneath
 * RecipeAuthor on a detail page.
 *
 * **RSC compatible:** Yes.
 */
export function RecipeMetadata({
  prepTime,
  cookTime,
  servings,
  className,
}: RecipeMetadataProps) {
  if (!prepTime && !cookTime && !servings) return null;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-4 text-sm text-muted-foreground',
        className,
      )}
    >
      {prepTime && (
        <div className="flex items-center gap-1">
          <Clock className="size-4 shrink-0" aria-hidden="true" />
          <span>Prep: {prepTime}</span>
        </div>
      )}
      {cookTime && (
        <div className="flex items-center gap-1">
          <Clock className="size-4 shrink-0" aria-hidden="true" />
          <span>Cook: {cookTime}</span>
        </div>
      )}
      {servings && (
        <div className="flex items-center gap-1">
          <Users className="size-4 shrink-0" aria-hidden="true" />
          <span>
            {typeof servings === 'number' ? `${servings} servings` : servings}
          </span>
        </div>
      )}
    </div>
  );
}
