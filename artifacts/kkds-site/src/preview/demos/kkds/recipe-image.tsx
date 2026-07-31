import { RecipeImage } from '@sverg84/kkds';
import { DocBlock, Row, Stack } from '../../parts';

export function RecipeImageDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="RSC-compatible recipe photograph container with fixed aspect ratio and warm branded placeholder. Food imagery is the primary visual driver of KitchenKin; consistent framing prevents layout shift across card grids and detail pages."
        whenToUse={[
          'Recipe card header image in any list or grid',
          'Recipe detail page hero image',
          'Any surface that renders a recipe photograph',
        ]}
        whenNotToUse={[
          'User profile photos — use RecipeAuthor instead',
          'General-purpose image containers outside recipe contexts',
          'Non-food UI photography',
        ]}
        composition="Always provide an alt string derived from the recipe title — it is both the accessible alt text and the label rendered on the warm placeholder when src is absent. Use aspectRatio={4/3} on detail pages and the default 16/9 in card grids."
        accessibility="The alt prop is required. When src is absent it also populates the placeholder label. Never pass an empty string — describe the recipe the image represents."
        example={`<RecipeImage
  src={recipe.imageUrl}
  alt={recipe.title}
  aspectRatio={16 / 9}
/>`}
      />

      <div className="rounded-xl border bg-card p-6 space-y-8">
        <Row label="With photograph (16:9 default)">
          <div className="w-80">
            <RecipeImage
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&h=360&fit=crop"
              alt="Fresh salad bowl"
            />
          </div>
        </Row>

        <Row label="Placeholder — no src provided">
          <div className="w-80">
            <RecipeImage alt="Chocolate Lava Cake" />
          </div>
        </Row>

        <Stack label="Aspect ratio variants">
          <div className="flex flex-wrap gap-4">
            <div className="w-48">
              <p className="mb-1 text-xs text-muted-foreground">16:9 (default)</p>
              <RecipeImage alt="Pasta Carbonara" aspectRatio={16 / 9} />
            </div>
            <div className="w-48">
              <p className="mb-1 text-xs text-muted-foreground">4:3</p>
              <RecipeImage alt="Pasta Carbonara" aspectRatio={4 / 3} />
            </div>
            <div className="w-48">
              <p className="mb-1 text-xs text-muted-foreground">1:1</p>
              <RecipeImage alt="Pasta Carbonara" aspectRatio={1} />
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
}
