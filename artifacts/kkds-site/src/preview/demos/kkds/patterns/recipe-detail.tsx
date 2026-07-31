"use client";

import * as React from 'react';
import { AllergenBadge } from '../../../../components/kkds/allergen-badge';
import { CategoryBadge } from '../../../../components/kkds/category-badge';
import { FavoriteButton } from '../../../../components/kkds/favorite-button';
import { RecipeAuthor } from '../../../../components/kkds/recipe-author';
import { RecipeImage } from '../../../../components/kkds/recipe-image';
import { RecipeMetadata } from '../../../../components/kkds/recipe-metadata';
import { Button } from '../../../../components/ui/button';
import {
  Item,
  ItemContent,
  ItemMedia,
} from '../../../../components/ui/item';
import { Separator } from '../../../../components/ui/separator';

const RECIPE = {
  title: 'Pasta Carbonara',
  imageUrl:
    'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop',
  author: { name: 'Maria Santos', avatarUrl: 'https://i.pravatar.cc/80?img=5' },
  prepTime: '10 min',
  cookTime: '20 min',
  servings: 2,
  tags: ['Italian', 'Dinner', 'Quick'],
  allergens: ['EGGS', 'DAIRY', 'GLUTEN'],
  description:
    'A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and freshly ground black pepper. Rich, silky, and deeply satisfying — no cream required.',
  ingredients: [
    '200g spaghetti or rigatoni',
    '100g guanciale (or pancetta), diced',
    '2 large eggs + 1 yolk',
    '50g Pecorino Romano, finely grated',
    '30g Parmesan, finely grated',
    'Freshly ground black pepper',
    'Salt for pasta water',
  ],
  instructions: [
    'Bring a large pot of salted water to a boil. Cook pasta until 2 minutes before al dente.',
    'Meanwhile, cook guanciale in a large skillet over medium heat until crispy. Remove from heat.',
    'Whisk eggs, yolk, Pecorino, and Parmesan in a bowl. Season generously with black pepper.',
    'Reserve 200ml pasta water. Drain pasta and add to skillet with guanciale.',
    'Add egg mixture off-heat, tossing constantly and adding pasta water a splash at a time until silky.',
    'Serve immediately with extra Pecorino and black pepper.',
  ],
};

export function RecipeDetailPattern() {
  const [favorited, setFavorited] = React.useState(false);

  return (
    <div className="space-y-10">
      {/* Pattern notes */}
      <div className="rounded-xl border bg-card p-5 space-y-3 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pattern — Recipe Detail
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Two-column layout: left column holds the recipe image and actions; right column
          holds title, attribution, metadata, badges, and content. Image column is{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">2fr</code>, content column
          is{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">3fr</code>. Stacks to a
          single column below the <code className="rounded bg-muted px-1 py-0.5 text-xs">lg</code> breakpoint.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeImage</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">FavoriteButton</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeAuthor</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeMetadata</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">CategoryBadge</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">AllergenBadge</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">Item</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">Separator</code>
        </div>
      </div>

      {/* Live composition */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr]">
        {/* Left column: image + actions */}
        <div className="space-y-3">
          <RecipeImage
            src={RECIPE.imageUrl}
            alt={RECIPE.title}
            aspectRatio={4 / 3}
          />
          <div className="flex items-center gap-2">
            <FavoriteButton isFavorited={favorited} onToggle={setFavorited} />
            <Button variant="outline" size="sm">
              Share
            </Button>
            <Button variant="outline" size="sm">
              Print
            </Button>
          </div>
        </div>

        {/* Right column: all content */}
        <div className="space-y-5">
          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {RECIPE.title}
          </h1>

          {/* Attribution */}
          <RecipeAuthor
            name={RECIPE.author.name}
            avatarUrl={RECIPE.author.avatarUrl}
            subtitle="12 recipes"
          />

          {/* Time + servings */}
          <RecipeMetadata
            prepTime={RECIPE.prepTime}
            cookTime={RECIPE.cookTime}
            servings={RECIPE.servings}
          />

          {/* Category tags */}
          <div className="flex flex-wrap gap-1.5">
            {RECIPE.tags.map((tag) => (
              <CategoryBadge key={tag} label={tag} />
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {RECIPE.description}
          </p>

          {/* Allergen row */}
          <div className="space-y-1.5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Contains
            </p>
            <div className="flex flex-wrap gap-1.5">
              {RECIPE.allergens.map((a) => (
                <AllergenBadge key={a} label={a} />
              ))}
            </div>
          </div>

          <Separator />

          {/* Ingredients */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-foreground">Ingredients</h2>
            <div className="divide-y rounded-lg border">
              {RECIPE.ingredients.map((ing, i) => (
                <Item key={i} className="px-4 py-2.5">
                  <ItemContent>
                    <p className="text-sm text-foreground">{ing}</p>
                  </ItemContent>
                </Item>
              ))}
            </div>
          </div>

          <Separator />

          {/* Instructions */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">Instructions</h2>
            <ol className="space-y-4">
              {RECIPE.instructions.map((step, i) => (
                <React.Fragment key={i}>
                  <li className="flex gap-4">
                    <span className="shrink-0 flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed pt-0.5">{step}</p>
                  </li>
                  {i < RECIPE.instructions.length - 1 && (
                    <Separator className="ml-10" />
                  )}
                </React.Fragment>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
