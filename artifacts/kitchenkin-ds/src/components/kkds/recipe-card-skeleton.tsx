import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { cn } from '../../lib/utils';

/**
 * A single skeleton card that matches the RecipeCard layout exactly,
 * preventing cumulative layout shift when real content loads.
 */
function RecipeCardSkeletonItem() {
  return (
    <Card className="h-full overflow-hidden">
      {/* Image area — 16:9 */}
      <div className="aspect-video w-full">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <CardHeader>
        {/* Title */}
        <Skeleton className="h-6 w-2/3" />
        {/* Tag chips */}
        <div className="mt-2 flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>
      </CardHeader>

      <CardContent>
        {/* Description lines */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-1.5 h-4 w-4/5" />
      </CardContent>

      <CardFooter className="flex justify-between">
        {/* Prep time */}
        <div className="flex items-center gap-1">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-20" />
        </div>
        {/* Cook time */}
        <div className="flex items-center gap-1">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardFooter>
    </Card>
  );
}

export interface RecipeCardSkeletonProps {
  /**
   * Number of skeleton cards to render.
   * - `1` (default): renders a single card.
   * - `> 1`: renders a responsive 1→2→3-column grid matching the KitchenKin
   *   recipe list layout.
   */
  count?: number;
  className?: string;
}

/**
 * RecipeCardSkeleton
 *
 * A loading placeholder that matches the RecipeCard layout exactly. Use inside
 * a React `Suspense` boundary (or any loading state) so users see a structured
 * placeholder rather than blank space while recipes are fetching.
 *
 * **When to use:** As the `fallback` for a `<Suspense>` wrapping a recipe list,
 * or as an optimistic placeholder while a new recipe is being saved.
 *
 * **When not to use:** As a permanent loading indicator — use `Spinner` for
 * indeterminate operations that do not correspond to a card-shaped result.
 *
 * **Layout:** `count > 1` renders the standard KitchenKin responsive grid
 * (`1 col → 2 col → 3 col`). Override with `className` for custom layouts.
 *
 * **RSC compatible:** Yes.
 */
export function RecipeCardSkeleton({
  count = 1,
  className,
}: RecipeCardSkeletonProps) {
  if (count === 1) {
    return <RecipeCardSkeletonItem />;
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <RecipeCardSkeletonItem key={i} />
      ))}
    </div>
  );
}
