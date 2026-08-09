/**
 * Platform-neutral component contracts for the KitchenKin Design System.
 *
 * These interfaces describe what each semantic component represents and what
 * data it needs — independent of how it is rendered on any platform.
 *
 * Rules for contracts:
 *   - NO DOM types (HTMLElement, MouseEvent, href, etc.)
 *   - NO React types (ReactNode, RefObject, etc.)
 *   - NO CSS class strings
 *   - Prefer callbacks named onX that carry platform-neutral payloads
 *   - Props that are web-only (href, ref, renderLink) remain in the web
 *     implementation only
 *
 * Each contract is intentionally minimal. Platform implementations may extend
 * them with platform-specific props (e.g. RecipeCardWebProps extends
 * RecipeCardContract and adds href, className, etc.).
 */

import type { AllergenTag } from "./allergens";
import type { RecipeCategory } from "./recipe";

// ─── Layer 3: KitchenKin Semantic Components ──────────────────────────────────

/**
 * RecipeCard — primary recipe content unit.
 *
 * Concept:
 *   A canonical recipe summary that displays the food photograph, title,
 *   category/dietary tags, a short description, and timing metadata in a
 *   consistent hierarchy that works across discovery, favorites, and profile grids.
 *
 * Navigation is platform-specific and intentionally omitted here:
 *   - Web: `href` and/or `renderLink` on `@sverg84/kkds-react` RecipeCard
 *   - Mobile (future): press/navigation handlers on the native implementation
 *
 * Intentionally NOT in this contract:
 *   - href / url / onPress — platform navigation
 *   - className / style — platform styling
 */
export interface RecipeCardContract {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  tags?: (RecipeCategory | AllergenTag)[];
  prepTime?: string | null;
  cookTime?: string | null;
}

/** RecipeImage — aspect-ratio constrained food photograph. */
export interface RecipeImageContract {
  src?: string | null;
  /**
   * Accessible alt text. Required.
   * Pass an empty string for intentionally decorative images.
   */
  alt: string;
  /**
   * Aspect ratio expressed as a decimal (width / height).
   * Default: 16/9. Common values: 1 (square), 4/3, 3/2.
   */
  aspectRatio?: number;
}

/** RecipeMetadata — compact prep/cook time (and optional servings) row. */
export interface RecipeMetadataContract {
  prepTime?: string | null;
  cookTime?: string | null;
  /** Servings count or label, e.g. 4 or "4 servings". */
  servings?: string | number | null;
}

/** RecipeAuthor — avatar and display name identity row. */
export interface RecipeAuthorContract {
  name: string;
  avatarUrl?: string | null;
  /** Short subtitle, e.g. "Home baker · 42 recipes". */
  subtitle?: string | null;
  /** Visual size. `"sm"` for inline layouts; `"default"` for profile headers. */
  size?: "default" | "sm";
}

/** RecipeSearchBar — controlled search input with clear action. */
export interface RecipeSearchBarContract {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

/** AllergenBadge — dietary constraint and allergen warning label. */
export interface AllergenBadgeContract {
  /** Raw allergen tag identifier, e.g. `"GLUTEN_FREE"`. */
  label: string;
}

/** CategoryBadge — recipe category / cuisine label. */
export interface CategoryBadgeContract {
  /** Raw category identifier, e.g. `"ITALIAN"`. */
  label: string;
}

// ─── Layer 2: KKDS Custom Primitives ─────────────────────────────────────────

/**
 * Empty state — platform-neutral *content model* for absent content.
 *
 * Web implements this as a compound component (`Empty`, `EmptyHeader`,
 * `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`), not a single
 * prop bag. These fields describe the semantic content those parts compose.
 */
export interface EmptyContract {
  /** Icon or media hint (platform maps to an icon name or node). */
  icon?: string;
  title?: string;
  description?: string;
  /** Label for the primary call-to-action, if present. */
  actionLabel?: string;
  onAction?: () => void;
}

/** Spinner — indeterminate loading indicator. */
export interface SpinnerContract {
  size?: "sm" | "default" | "lg";
  /** Accessible label for screen readers. */
  label?: string;
}
