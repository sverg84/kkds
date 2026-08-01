/**
 * @sverg84/kkds-react — Public API surface
 *
 * ─── KKDS Semantic Components (Layer 3) ──────────────────────────────────────
 * Domain-specific building blocks for KitchenKin UIs. These are the primary
 * reason to install this package.
 *   AllergenBadge, CategoryBadge, FavoriteButton, RecipeAuthor, RecipeCard,
 *   RecipeCardSkeleton, RecipeImage, RecipeMetadata, RecipeSearchBar
 *
 * ─── KKDS Custom Primitives (Layer 2) ────────────────────────────────────────
 * Custom components built for KKDS, not part of upstream shadcn/ui:
 *   ButtonGroup, Empty, Field, InputGroup, Item / ItemGroup / ItemSeparator,
 *   Kbd / KbdGroup, Spinner
 *
 * ─── Curated shadcn/ui Primitives (Layer 1) ──────────────────────────────────
 * A deliberately small subset of shadcn/ui — only components that are either
 * direct dependencies of Layer 2/3 or high-value primitives for building
 * KitchenKin-consistent UIs. Components NOT listed here are intentionally
 * omitted from the public surface to keep the install footprint small and
 * the API stable:
 *
 *   Included: Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge,
 *     Button, Card, Checkbox, Dialog, DropdownMenu, Input, Label, Popover,
 *     Progress, RadioGroup, ScrollArea, Select, Separator, Sheet, Skeleton,
 *     Slider, Sonner, Switch, Table, Tabs, Textarea, Toast / Toaster,
 *     Toggle, ToggleGroup, Tooltip
 *
 *   Excluded (too heavy, undocumented, or app-specific):
 *     Breadcrumb, Calendar, Carousel, Chart, Collapsible, Command,
 *     ContextMenu, Drawer, Form, HoverCard, InputOtp, Menubar,
 *     NavigationMenu, Pagination, Resizable, Sidebar
 *
 * ─── Hooks ───────────────────────────────────────────────────────────────────
 *   useMobile, useToast
 *
 * ─── Utilities ───────────────────────────────────────────────────────────────
 *   cn
 *
 * ─── Tokens ──────────────────────────────────────────────────────────────────
 *   tokens  (also available as @sverg84/kkds-react/tokens and @sverg84/kkds-react/tokens.json)
 */

// ── Layer 3: KKDS semantic components ────────────────────────────────────────
export * from "./components/kkds/allergen-badge";
export * from "./components/kkds/category-badge";
export * from "./components/kkds/favorite-button";
export * from "./components/kkds/recipe-author";
export * from "./components/kkds/recipe-card";
export * from "./components/kkds/recipe-card-skeleton";
export * from "./components/kkds/recipe-image";
export * from "./components/kkds/recipe-metadata";
export * from "./components/kkds/recipe-search-bar";

// ── Layer 2: KKDS custom primitives ──────────────────────────────────────────
export * from "./components/ui/button-group";
export * from "./components/ui/empty";
export * from "./components/ui/field";
export * from "./components/ui/input-group";
export * from "./components/ui/item";
export * from "./components/ui/kbd";
export * from "./components/ui/spinner";

// ── Layer 1: Curated shadcn/ui primitives ────────────────────────────────────
export * from "./components/ui/accordion";
export * from "./components/ui/alert";
export * from "./components/ui/alert-dialog";
export * from "./components/ui/aspect-ratio";
export * from "./components/ui/avatar";
export * from "./components/ui/badge";
export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./components/ui/checkbox";
export * from "./components/ui/dialog";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/input";
export * from "./components/ui/label";
export * from "./components/ui/popover";
export * from "./components/ui/progress";
export * from "./components/ui/radio-group";
export * from "./components/ui/scroll-area";
export * from "./components/ui/select";
export * from "./components/ui/separator";
export * from "./components/ui/sheet";
export * from "./components/ui/skeleton";
export * from "./components/ui/slider";
// sonner's Toaster exported as SonnerToaster to avoid conflict with radix Toaster
export { Toaster as SonnerToaster } from "./components/ui/sonner";
export * from "./components/ui/switch";
export * from "./components/ui/table";
export * from "./components/ui/tabs";
export * from "./components/ui/textarea";
export * from "./components/ui/toast";
export * from "./components/ui/toaster";
export * from "./components/ui/toggle";
export * from "./components/ui/toggle-group";
export * from "./components/ui/tooltip";

// ── Hooks ─────────────────────────────────────────────────────────────────────
export * from "./hooks/use-mobile";
export * from "./hooks/use-toast";

// ── Utilities ─────────────────────────────────────────────────────────────────
export * from "./lib/utils";

// ── Tokens ────────────────────────────────────────────────────────────────────
export { tokens, type Tokens } from '@sverg84/kkds-common';

// ── Motion (semantic, platform-neutral) ───────────────────────────────────────
export { motion } from '@sverg84/kkds-common';
export type { Motion, MotionSpec } from '@sverg84/kkds-common';

// ── Domain types and constants (platform-neutral) ─────────────────────────────
export { ALLERGEN_META, allergenLabel, RECIPE_CATEGORIES, categoryLabel } from '@sverg84/kkds-common';
export type {
  AllergenTag,
  AllergenTagMeta,
  RecipeCategory,
  RecipeSummary,
  RecipeDetail,
  /** The recipe author data shape — aliased to avoid clash with the RecipeAuthor component. */
  RecipeAuthor as RecipeAuthorProfile,
  RecipeIngredient,
  RecipeStep,
} from '@sverg84/kkds-common';

// ── Platform-neutral component contracts ──────────────────────────────────────
export type {
  RecipeCardContract,
  RecipeImageContract,
  RecipeMetadataContract,
  RecipeAuthorContract,
  RecipeSearchBarContract,
  FavoriteButtonContract,
  AllergenBadgeContract,
  CategoryBadgeContract,
  EmptyContract,
  SpinnerContract,
} from '@sverg84/kkds-common';
