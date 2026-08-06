import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "../../lib/utils";
import { RecipeImage, type RecipeImageProps } from "./recipe-image";
import { RecipeMetadata } from "./recipe-metadata";
import { CategoryBadge } from "./category-badge";

export interface RecipeCardLinkRenderProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

export interface RecipeCardProps {
  /** Recipe title. Displayed as the card heading. */
  title: string;
  /** Short recipe description. Clamped to 2 lines. */
  description?: string | null;
  /** URL of the food photograph. Falls back to a branded placeholder. */
  imageUrl?: string | null;
  /** Category/tag labels, e.g. `["Italian", "GLUTEN_FREE"]`. Each rendered as a CategoryBadge. */
  tags?: string[];
  /** Preparation time label, e.g. `"15 min"`. */
  prepTime?: string | null;
  /** Cooking time label, e.g. `"30 min"`. */
  cookTime?: string | null;
  /**
   * Optional URL. When provided, wraps the entire card in an `<a>` tag so the
   * card is keyboard-navigable as a link.
   */
  href?: string;
  className?: string;
  /**
   * Optional card-level action rendered above the primary navigation surface.
   * Intended for controls.
   */
  action?: React.ReactNode;
  /**
   * Overrides the navigation element while preserving the canonical
   * RecipeCard link surface and focus treatment.
   */
  renderLink?: (props: RecipeCardLinkRenderProps) => React.ReactNode;
  /**
   * Passed through to RecipeImage for framework-specific rendering.
   */
  renderImage?: RecipeImageProps["renderImage"];
}

const LINK_CLASSNAME =
  "block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * RecipeCard
 *
 * The primary content unit of KitchenKin. Displays a recipe's food photograph,
 * title, category tags, description, and timing information in a consistent
 * layout that works identically across recipe discovery, my-recipes, and
 * favorites surfaces.
 *
 * **When to use:** Any grid or list that presents recipes as browseable items.
 * Pair with `RecipeCardSkeleton` while content is loading.
 *
 * **When not to use:** Recipe detail pages — those compose the individual
 * sub-components (`RecipeImage`, `RecipeMetadata`, `RecipeAuthor`, etc.)
 * directly in a two-column layout.
 *
 * **Navigation:** Pass `href` to make the entire card a link. The focus ring
 * appears on the wrapping anchor rather than the card itself.
 *
 * **RSC compatible:** Yes — all composed components are RSC-compatible.
 */
export function RecipeCard({
  title,
  description,
  imageUrl,
  tags = [],
  prepTime,
  cookTime,
  href,
  action,
  className,
  renderLink,
  renderImage,
}: RecipeCardProps) {
  const content = (
    <>
      <RecipeImage src={imageUrl} alt={title} renderImage={renderImage} />

      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>

        {tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Tags">
            {tags.map((tag) => (
              <li key={tag}>
                <CategoryBadge label={tag} />
              </li>
            ))}
          </ul>
        )}
      </CardHeader>

      {description && (
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </CardContent>
      )}

      <CardFooter>
        <RecipeMetadata prepTime={prepTime} cookTime={cookTime} />
      </CardFooter>
    </>
  );

  return (
    <Card
      className={cn(
        "relative h-full overflow-hidden transition-shadow hover:shadow-lg",
        className,
      )}
    >
      {action && <div className="absolute right-2 top-2 z-10">{action}</div>}
      {href ? (
        renderLink ? (
          renderLink({
            href,
            className: LINK_CLASSNAME,
            children: content,
          })
        ) : (
          <a href={href} className={LINK_CLASSNAME}>
            {content}
          </a>
        )
      ) : (
        content
      )}
    </Card>
  );
}
