import { RecipeMetadata } from '../../../components/kkds/recipe-metadata';
import { Stack } from '../../parts';

export function RecipeMetadataDemo() {
  return (
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
  );
}
