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
 *   - Props that are web-only (href, ref) remain in the web implementation only
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
 * Web implementation: <article> element with image, CardHeader, CardFooter, and
 *   optional <a> wrapper for keyboard-navigable linking.
 * Mobile implementation (future): <Pressable> with Image, Text, and Badge rows.
 *
 * Intentionally NOT in this contract:
 *   - href / url — web navigation prop; mobile uses onPress instead
 *   - className / style — platform styling
 */
export interface RecipeCardContract {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  tags?: (RecipeCategory | AllergenTag)[];
  prepTime?: string | null;
  cookTime?: string | null;
  /**
   * Platform-neutral navigation callback.
   * Web maps this to an <a href>; mobile maps it to a navigation action.
   * Either onPress OR a platform href prop should be used — not both.
   */
  onPress?: () => void;
}

/** RecipeImage — aspect-ratio constrained food photograph. */
export interface RecipeImageContract {
  src?: string | null;
  /** Accessible alt text. Falls back to a generic description if omitted. */
  alt: string;
  /**
   * Aspect ratio expressed as a decimal (width / height).
   * Default: 16/9. Common values: 1 (square), 4/3, 3/2.
   */
  aspectRatio?: number;
}

/** RecipeMetadata — compact prep/cook time row. */
export interface RecipeMetadataContract {
  prepTime?: string | null;
  cookTime?: string | null;
}

/** RecipeAuthor — avatar and display name identity row. */
export interface RecipeAuthorContract {
  name: string;
  avatarUrl?: string | null;
  /** Short subtitle, e.g. "Home baker · 42 recipes". */
  subtitle?: string | null;
  size?: "default" | "sm";
}

/** RecipeSearchBar — controlled search input with clear action. */
export interface RecipeSearchBarContract {
  value: string;
  onChange: (value: string) => void;
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

/** Empty state — guidance when content is absent. */
export interface EmptyContract {
  icon?: string;
  title: string;
  description?: string;
  /** Label for the primary call-to-action button, if present. */
  actionLabel?: string;
  onAction?: () => void;
}

/** Spinner — indeterminate loading indicator. */
export interface SpinnerContract {
  size?: "sm" | "default" | "lg";
  /** Accessible label for screen readers. */
  label?: string;
}
