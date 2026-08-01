import { RecipeCardSkeleton } from '@sverg84/kkds-react';
import { DocBlock, Stack } from '../../parts';

export function RecipeCardSkeletonDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Loading placeholder that exactly matches RecipeCard's layout and dimensions. Prevents cumulative layout shift when recipe data resolves — the skeleton must share the same grid class and count as the live card grid it replaces."
        whenToUse={[
          'Suspense fallback for any RecipeCard grid',
          'Initial loading state before the first data fetch completes',
          'Optimistic UI while a mutation (e.g. delete) is in flight',
        ]}
        whenNotToUse={[
          'After content loads — swap to RecipeCard immediately; never show both',
          'Full-page loading states — use a page-level Spinner instead',
          'Non-recipe loading states where the skeleton shape would not match live content',
        ]}
        composition="Set count to match the expected number of live cards (typically the page size). Apply the same grid class as the live RecipeCard grid: grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3. The component renders the grid wrapper with these exact breakpoints internally when count > 1 — use the same class on the live grid to prevent layout shift at every breakpoint."
        accessibility="Wrap in a container with aria-busy='true' and a visually-hidden 'Loading recipes…' label. Remove aria-busy once content has replaced the skeleton."
        example={`<div aria-busy="true" aria-label="Loading recipes">
  <RecipeCardSkeleton count={6} />
</div>`}
      />

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
              {/* Inline stub to keep this demo self-contained */}
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
    </div>
  );
}
