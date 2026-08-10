import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";

export interface RecipeImageRenderProps {
  src: string;
  alt: string;
  priority: boolean;
  className: string;
}

export interface RecipeImageProps {
  /** URL of the food photograph. When omitted a warm branded placeholder is shown. */
  src?: string | null;
  /**
   * Accessible description of the image. Required.
   * Pass `alt=""` for intentionally decorative images.
   * Also used as the placeholder graphic label when `src` is missing (falls
   * back to `"Recipe image"` for URL encoding when `alt` is empty).
   */
  alt: string;
  /** Width-to-height ratio. Defaults to 16/9 — the standard card ratio in KitchenKin. */
  aspectRatio?: number;
  /**
   * Hint that this image is above the fold and should load eagerly.
   * Maps to the HTML `loading` attribute; has no effect on the placeholder.
   */
  priority?: boolean;
  className?: string;

  /**
   * Overrides only the underlying image renderer.
   * KKDS continues to own the aspect ratio, clipping, background, and sizing.
   */
  renderImage?: (props: RecipeImageRenderProps) => ReactNode;
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
 * **Accessibility:** Always provide a meaningful `alt` string (or `alt=""` when
 * decorative). The placeholder graphic uses the alt value as its text label
 * when present.
 *
 * **RSC compatible:** Yes — no hooks or client-side interactivity.
 */
export function RecipeImage({
  src,
  alt,
  aspectRatio = 16 / 9,
  priority = false,
  className,
  renderImage,
}: RecipeImageProps) {
  const placeholderLabel = alt || "Recipe image";
  const imgSrc =
    src ??
    `https://placeholder.pics/svg/640x480/FCEFD5/C07E4A-f4ead5/${encodeURIComponent(
      placeholderLabel,
    )}`;

  const imageProps: RecipeImageRenderProps = {
    src: imgSrc,
    alt,
    priority,
    className: "h-full w-full object-cover",
  };

  return (
    <AspectRatio
      ratio={aspectRatio}
      className={cn("relative overflow-hidden bg-muted", className)}
    >
      {renderImage ? (
        renderImage(imageProps)
      ) : (
        <img
          src={imageProps.src}
          alt={imageProps.alt}
          loading={priority ? "eager" : "lazy"}
          className={imageProps.className}
        />
      )}
    </AspectRatio>
  );
}
