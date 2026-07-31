import { RecipeCardSkeleton } from '../../../components/kkds/recipe-card-skeleton';
import { Stack } from '../../parts';

export function RecipeCardSkeletonDemo() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-10">
      <Stack label="Single skeleton">
        <div className="max-w-sm">
          <RecipeCardSkeleton />
        </div>
      </Stack>

      <Stack label="Grid of 6 (matches live recipe list layout)">
        <RecipeCardSkeleton count={6} />
      </Stack>

      <Stack label="Side-by-side: skeleton vs live card">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs text-muted-foreground uppercase tracking-wide">
              Loading state
            </p>
            <RecipeCardSkeleton />
          </div>
          <div>
            <p className="mb-2 text-xs text-muted-foreground uppercase tracking-wide">
              Loaded state (same dimensions)
            </p>
            {/* Imported lazily to keep this demo self-contained */}
            <div className="rounded-xl border bg-card overflow-hidden shadow text-sm">
              <div className="bg-muted aspect-video flex items-center justify-center text-muted-foreground text-xs">
                RecipeCard here
              </div>
              <div className="p-6 space-y-2">
                <p className="font-semibold text-lg">Pasta Carbonara</p>
                <div className="flex gap-1.5">
                  <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold">Italian</span>
                  <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold">Dinner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
}
