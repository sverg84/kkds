import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';

export type RecipeAuthorSize = 'default' | 'sm';

export interface RecipeAuthorProps {
  /** Display name of the author. Used for the initials fallback. */
  name: string;
  /** URL of the author's profile image. Falls back to initials when omitted. */
  avatarUrl?: string | null;
  /** Secondary line below the name — email, username, or role. */
  subtitle?: string | null;
  /** Visual size. `sm` is used inline (e.g. inside a card); `default` is used on profile headers. */
  size?: RecipeAuthorSize;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * RecipeAuthor
 *
 * A compact identity row combining a circular avatar with the author's display
 * name and an optional subtitle. Used on recipe detail pages for attribution and
 * on profile pages for the user's own header — two surfaces, same visual pattern.
 *
 * **When to use:** Any place where a person's identity is attributed to a recipe
 * or content item.
 *
 * **When not to use:** Navigation controls or menus where user identity is a
 * secondary concern. Use the application's `UserMenu` for those.
 *
 * **Sizes:**
 * - `default` — 40px avatar, `text-base` name. Used on profile headers.
 * - `sm` — 32px avatar, `text-sm` name. Used inline on recipe cards or lists.
 *
 * **Accessibility:** Avatar images should have a meaningful `alt` attribute;
 * this component uses `name` as the alt text automatically.
 *
 * **RSC compatible:** Yes. The `Avatar` primitive owns its own `"use client"`
 * boundary (Radix UI).
 */
export function RecipeAuthor({
  name,
  avatarUrl,
  subtitle,
  size = 'default',
  className,
}: RecipeAuthorProps) {
  const isSm = size === 'sm';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar className={cn(isSm ? 'size-8' : 'size-10')}>
        {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
        <AvatarFallback className={cn(isSm ? 'text-xs' : 'text-sm')}>
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p
          className={cn(
            'font-medium leading-tight truncate',
            isSm ? 'text-sm' : 'text-base',
          )}
        >
          {name}
        </p>
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
