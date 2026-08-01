import { RecipeMetadata } from '@sverg84/kkds-react';
import { DocBlock, Stack } from '../../parts';

export function RecipeMetadataDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Compact time and servings row that standardises the Clock/Users icon treatment and muted typographic style across all recipe surfaces. Returns null when all props are empty — safe to forward raw API data without null-checking."
        whenToUse={[
          'Recipe card footer area',
          'Recipe detail page header, below the title',
          'Any surface that displays preparation time, cook time, or serving count',
        ]}
        whenNotToUse={[
          'Running text inline with prose — use a plain sentence instead',
          'Filter controls or search result snippets where space is at a premium',
          'Non-recipe timing contexts (e.g. event scheduling)',
        ]}
        composition="Place in CardFooter for recipe cards, or directly below the title and CategoryBadge row on detail pages. All three props are optional and independently nullable — pass them directly from your API response."
        accessibility="The Clock and Users icons carry aria-hidden; visible text carries the semantic meaning. Ensure surrounding context (e.g. a recipe title heading) establishes association for screen reader users."
        example={`<RecipeMetadata
  prepTime={recipe.prepTime}
  cookTime={recipe.cookTime}
  servings={recipe.servings}
/>`}
      />

      <div className="rounded-xl border bg-card p-6 space-y-8">
        <Stack label="Prep and cook time">
          <RecipeMetadata prepTime="15 min" cookTime="30 min" />
        </Stack>

        <Stack label="With servings">
          <RecipeMetadata prepTime="10 min" cookTime="45 min" servings={4} />
        </Stack>

        <Stack label="Cook time only">
          <RecipeMetadata cookTime="1 hr 20 min" />
        </Stack>

        <Stack label="Custom servings label">
          <RecipeMetadata
            prepTime="5 min"
            cookTime="20 min"
            servings="2–3 servings"
          />
        </Stack>

        <Stack label="Empty — renders nothing">
          <div className="text-xs text-muted-foreground italic">
            (No output when all props are omitted)
          </div>
          <RecipeMetadata />
        </Stack>
      </div>
    </div>
  );
}
