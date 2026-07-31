import { RecipeImage } from '../../../components/kkds/recipe-image';
import { Row, Stack } from '../../parts';

export function RecipeImageDemo() {
  return (
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
  );
}
