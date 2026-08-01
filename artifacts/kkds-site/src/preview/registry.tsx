import type { ComponentType } from "react";
import { AccordionDemo } from "./demos/accordion";
import { AlertDemo } from "./demos/alert";
import { AlertDialogDemo } from "./demos/alert-dialog";
import { AspectRatioDemo } from "./demos/aspect-ratio";
import { AvatarDemo } from "./demos/avatar";
import { BadgeDemo } from "./demos/badge";
import { ButtonDemo } from "./demos/button";
import { ButtonGroupDemo } from "./demos/button-group";
import { CardDemo } from "./demos/card";
import { CheckboxDemo } from "./demos/checkbox";
import { DialogDemo } from "./demos/dialog";
import { DropdownMenuDemo } from "./demos/dropdown-menu";
import { EmptyDemo } from "./demos/empty";
import { FieldDemo } from "./demos/field";
import { InputDemo } from "./demos/input";
import { InputGroupDemo } from "./demos/input-group";
import { ItemDemo } from "./demos/item";
import { PopoverDemo } from "./demos/popover";
import { ProgressDemo } from "./demos/progress";
import { RadioGroupDemo } from "./demos/radio-group";
import { ScrollAreaDemo } from "./demos/scroll-area";
import { SelectDemo } from "./demos/select";
import { SeparatorDemo } from "./demos/separator";
import { SheetDemo } from "./demos/sheet";
import { SkeletonDemo } from "./demos/skeleton";
import { SliderDemo } from "./demos/slider";
import { SonnerDemo } from "./demos/sonner";
import { SpinnerDemo } from "./demos/spinner";
import { SwitchDemo } from "./demos/switch";
import { TableDemo } from "./demos/table";
import { TabsDemo } from "./demos/tabs";
import { TextareaDemo } from "./demos/textarea";
import { ToastDemo } from "./demos/toast";
import { ToggleDemo } from "./demos/toggle";
import { ToggleGroupDemo } from "./demos/toggle-group";
import { TooltipDemo } from "./demos/tooltip";
import { AllergenBadgeDemo } from "./demos/kkds/allergen-badge";
import { CategoryBadgeDemo } from "./demos/kkds/category-badge";
import { FavoriteButtonDemo } from "./demos/kkds/favorite-button";
import { RecipeAuthorDemo } from "./demos/kkds/recipe-author";
import { RecipeCardDemo } from "./demos/kkds/recipe-card";
import { RecipeCardSkeletonDemo } from "./demos/kkds/recipe-card-skeleton";
import { RecipeImageDemo } from "./demos/kkds/recipe-image";
import { RecipeMetadataDemo } from "./demos/kkds/recipe-metadata";
import { RecipeSearchBarDemo } from "./demos/kkds/recipe-search-bar";
import { CopyVoicePage } from "./demos/kkds/copy-voice";
import { RecipeDiscoveryPattern } from "./demos/kkds/patterns/recipe-discovery";
import { RecipeDetailPattern } from "./demos/kkds/patterns/recipe-detail";
import { ProfileTabsPattern } from "./demos/kkds/patterns/profile-tabs";
import { LoadingEmptyPattern } from "./demos/kkds/patterns/loading-empty";
import {
  ColorsPage,
  FontsPage,
  LayoutPage,
  LogoPage,
  OverviewPage,
} from "./foundations";
import { MotionTokensPage } from "./demos/kkds/motion-tokens";

export type PreviewEntry = {
  // Globally unique across every group — it is the deep-link slug (`#page=<id>`)
  // and the active-page key. Group-qualify names that repeat across groups
  // (e.g. `brand-icons` vs `components-icons`).
  id: string;
  name: string;
  description: string;
  Page: ComponentType;
};

export type NavGroup = {
  name: string;
  entries: PreviewEntry[];
};

export const DESIGN_SYSTEM = {
  title: "KitchenKin Design System",
  description:
    'The warm, food-forward visual language for KitchenKin — coral-orange primary, warm cream surfaces, Quicksand type, and a shadcn "new-york" component library.',
} as const;

export const OVERVIEW_ENTRY: PreviewEntry = {
  id: "overview",
  name: "Overview",
  description: "The visual foundations and principles that shape this system.",
  Page: OverviewPage,
};

export const NAV_GROUPS: NavGroup[] = [
  {
    name: "Brand",
    entries: [
      {
        id: "brand-logo",
        name: "Logo",
        description:
          "The KitchenKin primary mark, size guide, and usage rules.",
        Page: LogoPage,
      },
    ],
  },
  {
    name: "Colors",
    entries: [
      {
        id: "color-roles",
        name: "Color roles",
        description: "Brand, semantic, text, background, and border colors.",
        Page: ColorsPage,
      },
    ],
  },
  {
    name: "Fonts",
    entries: [
      {
        id: "type-scale",
        name: "Type scale",
        description:
          "Font families, headings, body text, labels, and captions.",
        Page: FontsPage,
      },
    ],
  },
  {
    name: "Layout",
    entries: [
      {
        id: "spacing-radius",
        name: "Spacing and radius",
        description:
          "The spacing rhythm and corner treatments used by the system.",
        Page: LayoutPage,
      },
    ],
  },
  {
    name: "Actions",
    entries: [
      {
        id: "button",
        name: "Buttons",
        description: "Button variants, sizes, icon treatments, and states.",
        Page: ButtonDemo,
      },
      {
        id: "button-group",
        name: "Button group",
        description: "Attached actions, labels, and separators.",
        Page: ButtonGroupDemo,
      },
      {
        id: "toggle",
        name: "Toggle",
        description: "Pressed controls in multiple variants and sizes.",
        Page: ToggleDemo,
      },
      {
        id: "toggle-group",
        name: "Toggle group",
        description: "Single and multiple selection toggle sets.",
        Page: ToggleGroupDemo,
      },
    ],
  },
  {
    name: "Forms & inputs",
    entries: [
      {
        id: "input",
        name: "Input",
        description: "Text, email, file, and validation states.",
        Page: InputDemo,
      },
      {
        id: "input-group",
        name: "Input group",
        description: "Inputs with inline and block addons.",
        Page: InputGroupDemo,
      },
      {
        id: "textarea",
        name: "Textarea",
        description: "Multiline text entry and states.",
        Page: TextareaDemo,
      },
      {
        id: "checkbox",
        name: "Checkbox",
        description: "Checked, unchecked, and disabled options.",
        Page: CheckboxDemo,
      },
      {
        id: "radio-group",
        name: "Radio group",
        description: "Exclusive choices with labels and disabled states.",
        Page: RadioGroupDemo,
      },
      {
        id: "select",
        name: "Select",
        description:
          "Selection controls, grouped options, and disabled states.",
        Page: SelectDemo,
      },
      {
        id: "slider",
        name: "Slider",
        description: "Single values, ranges, and disabled states.",
        Page: SliderDemo,
      },
      {
        id: "switch",
        name: "Switch",
        description: "Binary preference controls and states.",
        Page: SwitchDemo,
      },
      {
        id: "field",
        name: "Field",
        description: "Labels, descriptions, errors, and grouped fields.",
        Page: FieldDemo,
      },
    ],
  },
  {
    name: "Overlays",
    entries: [
      {
        id: "dialog",
        name: "Dialog",
        description: "Modal content with header, footer, and actions.",
        Page: DialogDemo,
      },
      {
        id: "alert-dialog",
        name: "Alert dialog",
        description: "Confirmation for consequential actions.",
        Page: AlertDialogDemo,
      },
      {
        id: "sheet",
        name: "Sheet",
        description: "Edge-aligned overlay panels.",
        Page: SheetDemo,
      },
      {
        id: "popover",
        name: "Popover",
        description: "Anchored interactive content.",
        Page: PopoverDemo,
      },
      {
        id: "tooltip",
        name: "Tooltip",
        description: "Brief labels for focused or hovered controls.",
        Page: TooltipDemo,
      },
    ],
  },
  {
    name: "Menus & navigation",
    entries: [
      {
        id: "dropdown-menu",
        name: "Dropdown menu",
        description: "Actions, choices, shortcuts, and submenus.",
        Page: DropdownMenuDemo,
      },
      {
        id: "tabs",
        name: "Tabs",
        description: "Switch between related content views.",
        Page: TabsDemo,
      },
    ],
  },
  {
    name: "Data display",
    entries: [
      {
        id: "avatar",
        name: "Avatar",
        description: "Profile images, fallbacks, and sizes.",
        Page: AvatarDemo,
      },
      {
        id: "badge",
        name: "Badge",
        description: "Compact status and category labels.",
        Page: BadgeDemo,
      },
      {
        id: "card",
        name: "Card",
        description: "Grouped content with header, body, and footer.",
        Page: CardDemo,
      },
      {
        id: "table",
        name: "Table",
        description: "Structured tabular data and summaries.",
        Page: TableDemo,
      },
      {
        id: "accordion",
        name: "Accordion",
        description: "Expandable sections for progressive disclosure.",
        Page: AccordionDemo,
      },
      {
        id: "item",
        name: "Item",
        description: "Flexible rows with media, metadata, and actions.",
        Page: ItemDemo,
      },
      {
        id: "empty",
        name: "Empty state",
        description: "Guidance and actions when content is absent.",
        Page: EmptyDemo,
      },
      {
        id: "aspect-ratio",
        name: "Aspect ratio",
        description: "Responsive proportional media containers.",
        Page: AspectRatioDemo,
      },
    ],
  },
  {
    name: "Feedback",
    entries: [
      {
        id: "alert",
        name: "Alert",
        description: "Informational and destructive messages.",
        Page: AlertDemo,
      },
      {
        id: "progress",
        name: "Progress",
        description: "Completion indicators for ongoing work.",
        Page: ProgressDemo,
      },
      {
        id: "skeleton",
        name: "Skeleton",
        description: "Placeholder shapes for loading content.",
        Page: SkeletonDemo,
      },
      {
        id: "spinner",
        name: "Spinner",
        description: "Indeterminate loading indicators.",
        Page: SpinnerDemo,
      },
      {
        id: "toast",
        name: "Toast",
        description: "Provider-backed transient notifications and actions.",
        Page: ToastDemo,
      },
      {
        id: "sonner",
        name: "Sonner",
        description: "Stacked notifications with status and actions.",
        Page: SonnerDemo,
      },
    ],
  },
  {
    name: "Structure",
    entries: [
      {
        id: "separator",
        name: "Separator",
        description: "Horizontal and vertical visual dividers.",
        Page: SeparatorDemo,
      },
      {
        id: "scroll-area",
        name: "Scroll area",
        description: "Bounded vertical and horizontal scrolling.",
        Page: ScrollAreaDemo,
      },
    ],
  },
  {
    name: "KitchenKin",
    entries: [
      {
        id: "kkds-recipe-image",
        name: "Recipe image",
        description:
          "Aspect-ratio-constrained food photograph with object-cover framing and a warm branded placeholder.",
        Page: RecipeImageDemo,
      },
      {
        id: "kkds-recipe-metadata",
        name: "Recipe metadata",
        description:
          "Compact prep time, cook time, and servings row with Clock and Users icons.",
        Page: RecipeMetadataDemo,
      },
      {
        id: "kkds-category-badge",
        name: "Category badge",
        description:
          "Warm secondary badge for recipe categories, cuisines, and dietary styles.",
        Page: CategoryBadgeDemo,
      },
      {
        id: "kkds-allergen-badge",
        name: "Allergen badge",
        description:
          "Muted outline badge for dietary constraints and allergen warnings.",
        Page: AllergenBadgeDemo,
      },
      {
        id: "kkds-recipe-author",
        name: "Recipe author",
        description:
          "Avatar + display name identity row in default and compact sizes.",
        Page: RecipeAuthorDemo,
      },
      {
        id: "kkds-recipe-card",
        name: "Recipe card",
        description:
          "Primary recipe content unit — image, title, tags, description, and metadata.",
        Page: RecipeCardDemo,
      },
      {
        id: "kkds-recipe-card-skeleton",
        name: "Recipe card skeleton",
        description:
          "Loading placeholder that matches the RecipeCard layout to prevent layout shift.",
        Page: RecipeCardSkeletonDemo,
      },
      {
        id: "kkds-favorite-button",
        name: "Favorite button",
        description:
          "Heart toggle for saving recipes to a favorites collection.",
        Page: FavoriteButtonDemo,
      },
      {
        id: "kkds-recipe-search-bar",
        name: "Recipe search bar",
        description:
          "Controlled search input with Search icon prefix and inline clear button.",
        Page: RecipeSearchBarDemo,
      },
    ],
  },
  {
    name: "Content",
    entries: [
      {
        id: "content-copy-voice",
        name: "Copy voice",
        description:
          "KitchenKin editorial tone, button label rules, empty state copy, error messages, and placeholder text.",
        Page: CopyVoicePage,
      },
    ],
  },
  {
    name: "Motion",
    entries: [
      {
        id: "motion-tokens",
        name: "Motion tokens",
        description:
          "Duration scale, easing curves, and semantic motion intents — platform-neutral, mapped to Framer Motion on web.",
        Page: MotionTokensPage,
      },
    ],
  },
  {
    name: "Applied examples",
    entries: [
      {
        id: "pattern-recipe-discovery",
        name: "Recipe discovery",
        description:
          "RecipeSearchBar + category filters + responsive RecipeCard grid + app-level pagination. Interactive loading and empty state toggling.",
        Page: RecipeDiscoveryPattern,
      },
      {
        id: "pattern-recipe-detail",
        name: "Recipe detail",
        description:
          "Two-column layout with RecipeImage, FavoriteButton, RecipeAuthor, RecipeMetadata, badges, ingredients, and instructions.",
        Page: RecipeDetailPattern,
      },
      {
        id: "pattern-profile-tabs",
        name: "Profile tabs",
        description:
          "RecipeAuthor header with tabbed My Recipes and Favourites panels, each showing a RecipeCard grid.",
        Page: ProfileTabsPattern,
      },
      {
        id: "pattern-loading-empty",
        name: "Loading & empty states",
        description:
          "KitchenKin loading philosophy: RecipeCardSkeleton, Empty (intrinsic), Empty (no results), and Alert (error) — all four states in one page.",
        Page: LoadingEmptyPattern,
      },
    ],
  },
];

export const ALL_ENTRIES: PreviewEntry[] = [
  OVERVIEW_ENTRY,
  ...NAV_GROUPS.flatMap((group) => group.entries),
];

// A duplicate id would make one page unreachable (its deep link and highlight
// resolve to the first match), so fail loudly instead of shipping a dead page.
const duplicateIds = ALL_ENTRIES.map((entry) => entry.id).filter(
  (id, index, ids) => ids.indexOf(id) !== index,
);
if (duplicateIds.length > 0) {
  throw new Error(
    `Duplicate preview page id(s): ${[...new Set(duplicateIds)].join(
      ", ",
    )}. Every page id must be unique across all nav groups.`,
  );
}
