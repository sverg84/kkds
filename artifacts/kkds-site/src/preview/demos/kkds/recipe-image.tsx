import { RecipeImage } from "@sverg84/kkds-react";
import { DocBlock, Row, Stack } from "../../parts";

export function RecipeImageDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="RSC-compatible recipe photograph container with fixed aspect ratio and warm branded placeholder. Food imagery is the primary visual driver of KitchenKin; consistent framing prevents layout shift across card grids and detail pages."
        whenToUse={[
          "Recipe card header image in any list or grid",
          "Recipe detail page hero image",
          "Any surface that renders a recipe photograph",
        ]}
        whenNotToUse={[
          "User profile photos — use RecipeAuthor instead",
          "General-purpose image containers outside recipe contexts",
          "Non-food UI photography",
        ]}
        composition="Always provide alt (required). Pass alt=\"\" only when the image is intentionally decorative. Use aspectRatio={4/3} on detail pages and the default 16/9 in card grids. For Next.js Image (or similar), pass renderImage — KKDS still owns aspect ratio, clipping, background, and sizing."
        accessibility="The alt prop is required. Meaningful alt describes the dish; alt=\"\" marks decorative images. Placeholder graphics use the alt value as their text label when present."
        example={`<RecipeImage
  src={recipe.imageUrl}
  alt={recipe.title}
  aspectRatio={16 / 9}
  renderImage={({ src, alt, priority, className }) => (
    <img src={src} alt={alt} className={className} loading={priority ? "eager" : "lazy"} />
  )}
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

        <Stack label="renderImage escape hatch (framework Image stand-in)">
          <p className="text-xs text-muted-foreground max-w-prose">
            KKDS keeps aspect ratio, clipping, and placeholder behavior. The
            callback replaces only the underlying image node — e.g. Next.js{" "}
            <code className="rounded bg-muted px-1">Image</code>. This demo uses
            a plain <code className="rounded bg-muted px-1">img</code> with a
            data attribute to show the hatch firing.
          </p>
          <div className="w-80">
            <RecipeImage
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&h=360&fit=crop"
              alt="Fresh salad bowl via renderImage"
              renderImage={({ src, alt, priority, className }) => (
                <img
                  src={src}
                  alt={alt}
                  className={className}
                  loading={priority ? "eager" : "lazy"}
                  data-kkds-render-image="true"
                />
              )}
            />
          </div>
        </Stack>
      </div>
    </div>
  );
}
