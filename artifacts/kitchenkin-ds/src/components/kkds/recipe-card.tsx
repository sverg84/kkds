import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "../../lib/utils";
import { RecipeImage, type RecipeImageProps } from "./recipe-image";
import { RecipeMetadata } from "./recipe-metadata";
import { CategoryBadge } from "./category-badge";

export interface RecipeCardLinkRenderProps {
  href: string;
  className: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  "data-slot": "recipe-card-link";
}

export interface RecipeCardProps {
  id?: string;
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

const LINK_CLASSNAME = "absolute inset-0 z-[2] rounded-[inherit] outline-none";

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
  id,
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
  const titleId = id ? `recipe-card-${id}-title` : undefined;
  const linkLabel = `View recipe: ${title}`;

  const linkAccessibilityProps = titleId
    ? { "aria-labelledby": titleId }
    : { "aria-label": linkLabel };

  const linkChildren = <span className="sr-only">{linkLabel}</span>;

  return (
    <Card
      className={cn(
        "relative h-full overflow-hidden transition-shadow",
        "hover:shadow-lg focus-within:shadow-lg",
        className,
      )}
    >
      {href &&
        (renderLink ? (
          renderLink({
            href,
            className: LINK_CLASSNAME,
            children: linkChildren,
            "data-slot": "recipe-card-link",
            ...linkAccessibilityProps,
          })
        ) : (
          <a
            data-slot="recipe-card-link"
            href={href}
            className={LINK_CLASSNAME}
            {...linkAccessibilityProps}
          >
            {linkChildren}
          </a>
        ))}

      {href && (
        <span
          data-slot="recipe-card-focus-indicator"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit]"
        />
      )}

      <div className="pointer-events-none relative z-[1] flex h-full min-w-0 flex-col gap-6">
        <RecipeImage src={imageUrl} alt={title} renderImage={renderImage} />

        <CardHeader>
          <h3 id={titleId} className="text-lg font-semibold">
            {title}
          </h3>

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
      </div>

      {action && (
        <div className="pointer-events-auto absolute right-2 top-2 z-10">
          {action}
        </div>
      )}
    </Card>
  );
}
