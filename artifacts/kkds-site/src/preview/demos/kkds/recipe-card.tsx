import { RecipeCard } from "@sverg84/kkds-react";
import { DocBlock, Stack } from "../../parts";
import { FavoriteButton } from "./favorite-button";

const SAMPLE_RECIPES = [
  {
    title: "Pasta Carbonara",
    description:
      "A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and black pepper. Rich, silky, and deeply satisfying.",
    imageUrl:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=640&h=360&fit=crop",
    tags: ["Italian", "Dinner", "QUICK"],
    prepTime: "10 min",
    cookTime: "20 min",
    action: <FavoriteButton />,
  },
  {
    id: "recipe-mango-avocado-salad",
    title: "Mango Avocado Salad",
    description:
      "Bright, fresh, and full of tropical flavour. A weeknight salad that comes together in minutes.",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=640&h=360&fit=crop",
    tags: ["VEGAN", "GLUTEN_FREE", "Salad"],
    prepTime: "15 min",
    cookTime: null,
    action: <FavoriteButton />,
  },
  {
    title: "Chocolate Lava Cake",
    description:
      "Warm individual chocolate cakes with a molten centre. The ultimate dinner party dessert.",
    imageUrl: null,
    tags: ["Dessert", "French"],
    prepTime: "15 min",
    cookTime: "12 min",
    action: <FavoriteButton />,
  },
];

export function RecipeCardDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Primary recipe content unit composed from RecipeImage, CategoryBadge, RecipeMetadata, and the Card primitive. Used identically across discovery, my-recipes, and favourites surfaces — any change to the card's visual design propagates everywhere automatically."
        whenToUse={[
          "Recipe discovery feed and search results",
          "My Recipes and Favourites collection grids",
          "Any surface that presents multiple recipes in a grid layout",
        ]}
        whenNotToUse={[
          "Compact list rows where an Item primitive is more space-efficient",
          "Search result snippets or autocomplete suggestions",
          "Related-recipe references that only need a title and thumbnail",
        ]}
        composition="Always render in a responsive grid: grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3. Provide href to make the entire card a navigable link (the recipe title becomes the accessible link name). Pair with RecipeCardSkeleton count={n} for loading states — use the identical grid class so skeleton and live card occupy the same columns at every breakpoint."
        accessibility="When href is provided the card is wrapped in a semantic <a> and its title becomes the accessible link label. Avoid nesting interactive elements inside an href card — that creates nested interactive regions which fail WCAG 2.1."
        example={`<RecipeCard
  title={recipe.title}
  description={recipe.description}
  imageUrl={recipe.imageUrl}
  tags={recipe.tags}
  prepTime={recipe.prepTime}
  cookTime={recipe.cookTime}
  href={'/recipe/' + recipe.id}
/>`}
      />

      <div className="rounded-xl border bg-card p-6 space-y-10">
        <Stack label="Single card — full props">
          <div className="max-w-sm">
            <RecipeCard {...SAMPLE_RECIPES[0]} />
          </div>
        </Stack>

        <Stack label="Without image — placeholder">
          <div className="max-w-sm">
            <RecipeCard {...SAMPLE_RECIPES[2]} />
          </div>
        </Stack>

        <Stack label="With href — keyboard navigable link card">
          <div className="max-w-sm">
            <RecipeCard {...SAMPLE_RECIPES[1]} href="#recipe-2" />
          </div>
        </Stack>

        <Stack label="Responsive card grid (1→2→3 columns)">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_RECIPES.map((r) => (
              <RecipeCard key={r.title} {...r} />
            ))}
          </div>
        </Stack>
      </div>
    </div>
  );
}
