import { cn } from '../../lib/utils';
import { AspectRatio } from '../ui/aspect-ratio';

export interface RecipeImageProps {
  /** URL of the food photograph. When omitted a warm branded placeholder is shown. */
  src?: string | null;
  /** Accessible description of the image. Also used to generate the placeholder text. */
  alt?: string | null;
  /** Width-to-height ratio. Defaults to 16/9 — the standard card ratio in KitchenKin. */
  aspectRatio?: number;
  /**
   * Hint that this image is above the fold and should load eagerly.
   * Maps to the HTML `loading` attribute; has no effect on the placeholder.
   */
  priority?: boolean;
  className?: string;
}

/**
 * RecipeImage
 *
 * Aspect-ratio-constrained food photograph with object-cover framing and a
 * warm branded placeholder. Every recipe in KitchenKin uses this component on
 * both the card grid and the detail page, ensuring consistent framing regardless
 * of whether a photo exists.
 *
 * **When to use:** Any surface that displays a recipe's primary image.
 *
 * **When not to use:** Thumbnails for non-recipe content (use a plain `<img>`
 * or the AspectRatio primitive directly).
 *
 * **Accessibility:** Always provide a meaningful `alt` string. The placeholder
 * uses the `alt` value as its text label.
 *
 * **RSC compatible:** Yes — no hooks or client-side interactivity.
 */
export function RecipeImage({
  src,
  alt,
  aspectRatio = 16 / 9,
  priority = false,
  className,
}: RecipeImageProps) {
  const displayAlt = alt ?? 'Recipe image';
  const imgSrc =
    src ??
    `https://placeholder.pics/svg/640x480/FCEFD5/C07E4A-f4ead5/${encodeURIComponent(displayAlt)}`;

  return (
    <AspectRatio
      ratio={aspectRatio}
      className={cn('overflow-hidden bg-muted', className)}
    >
      <img
        src={imgSrc}
        alt={displayAlt}
        loading={priority ? 'eager' : 'lazy'}
        className="h-full w-full object-cover"
      />
    </AspectRatio>
  );
}
