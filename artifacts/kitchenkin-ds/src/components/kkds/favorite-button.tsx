"use client";

import * as React from 'react';
import { Heart } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { cn } from '../../lib/utils';

export interface FavoriteButtonProps {
  /** Whether the recipe is currently favorited. Controls the filled heart state. */
  isFavorited?: boolean;
  /** Called when the user toggles the button. Receives the new favorited state. */
  onToggle?: (next: boolean) => void;
  /** Disables the button during async operations. */
  disabled?: boolean;
  /** Visual size. Matches Toggle sizes. */
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

/**
 * FavoriteButton
 *
 * A heart-shaped toggle for saving recipes to a user's favorites collection.
 * The heart fills with the destructive colour when pressed, giving immediate
 * visual feedback. The button manages its own optimistic pressed state and
 * syncs with the `isFavorited` prop when it changes externally.
 *
 * **When to use:** On recipe cards, recipe detail pages, or anywhere a user
 * can save a recipe to their favorites.
 *
 * **When not to use:** For non-recipe bookmarking actions — reach for a generic
 * `Toggle` with a Bookmark icon instead.
 *
 * **Accessibility:** Announces "Add to favorites" / "Remove from favorites"
 * via `aria-label`. Ensure the button has a visible focus ring (provided by
 * the underlying `Toggle`).
 *
 * **`"use client"` boundary:** This component must run on the client. In a
 * Next.js app, do not import it from a Server Component file without a
 * client boundary between them.
 *
 * **Composing primitives:** `Toggle`
 */
export function FavoriteButton({
  isFavorited = false,
  onToggle,
  disabled,
  size = 'default',
  className,
}: FavoriteButtonProps) {
  const [pressed, setPressed] = React.useState(isFavorited);

  // Sync when the external prop changes (e.g. after server confirmation)
  React.useEffect(() => {
    setPressed(isFavorited);
  }, [isFavorited]);

  const handlePressedChange = (next: boolean) => {
    setPressed(next);
    onToggle?.(next);
  };

  return (
    <Toggle
      pressed={pressed}
      onPressedChange={handlePressedChange}
      disabled={disabled}
      size={size}
      aria-label={pressed ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        // Override the default data-[state=on] accent colour
        'data-[state=on]:bg-transparent data-[state=on]:text-destructive',
        className,
      )}
    >
      <Heart
        className={cn(
          'transition-all duration-150',
          pressed && 'fill-destructive text-destructive scale-110',
        )}
      />
    </Toggle>
  );
}
