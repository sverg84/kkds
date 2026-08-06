"use client";

import * as React from 'react';
import {
  RecipeCard,
  RecipeCardSkeleton,
  RecipeSearchBar,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@sverg84/kkds-react';

const ALL_RECIPES = [
  {
    title: 'Pasta Carbonara',
    description: 'A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and black pepper.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=640&h=360&fit=crop',
    tags: ['Italian', 'Dinner', 'Quick'],
    prepTime: '10 min',
    cookTime: '20 min',
  },
  {
    title: 'Mango Avocado Salad',
    description: 'Bright, fresh, and full of tropical flavour. A weeknight salad that comes together in minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=640&h=360&fit=crop',
    tags: ['Vegan', 'Salad', 'Quick'],
    prepTime: '15 min',
    cookTime: null,
  },
  {
    title: 'Chocolate Lava Cake',
    description: 'Warm individual chocolate cakes with a molten centre. The ultimate dinner party dessert.',
    imageUrl: null,
    tags: ['Dessert', 'French'],
    prepTime: '15 min',
    cookTime: '12 min',
  },
  {
    title: 'Avocado Toast',
    description: 'Creamy avocado on sourdough with chilli flakes and a squeeze of lemon.',
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=640&h=360&fit=crop',
    tags: ['Breakfast', 'Vegan', 'Quick'],
    prepTime: '5 min',
    cookTime: null,
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Tender chicken in a rich, spiced tomato-cream sauce. A Friday night favorite.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=640&h=360&fit=crop',
    tags: ['Indian', 'Dinner'],
    prepTime: '20 min',
    cookTime: '35 min',
  },
  {
    title: 'Mushroom Risotto',
    description: 'Silky arborio rice with wild mushrooms, white wine, and aged Parmesan.',
    imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=640&h=360&fit=crop',
    tags: ['Italian', 'Dinner', 'Vegetarian'],
    prepTime: '10 min',
    cookTime: '30 min',
  },
];

const CATEGORIES = ['All', 'Italian', 'Vegan', 'Quick', 'Breakfast', 'Dessert'];

export function RecipeDiscoveryPattern() {
  const [query, setQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [showLoading, setShowLoading] = React.useState(false);

  const filteredRecipes = ALL_RECIPES.filter((recipe) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      recipe.title.toLowerCase().includes(q) ||
      recipe.tags.some((t) => t.toLowerCase().includes(q));
    const matchesCategory =
      activeCategory === 'All' || recipe.tags.includes(activeCategory);
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Pattern notes */}
      <div className="rounded-xl border bg-card p-5 space-y-3 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pattern — Recipe Discovery
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A filterable, searchable recipe grid. RecipeSearchBar feeds a query string into your
          data hook; category filters narrow results further. RecipeCardSkeleton holds the grid
          shape while data is pending, preventing layout shift when results arrive.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeSearchBar</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeCard</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeCardSkeleton</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">Empty</code>
        </div>
        <div className="pt-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowLoading((v) => !v)}
          >
            {showLoading ? 'Show loaded state' : 'Show loading state'}
          </Button>
        </div>
      </div>

      {/* Live composition */}
      <div className="space-y-5">
        {/* Search bar */}
        <RecipeSearchBar
          value={query}
          onChange={setQuery}
          onClear={() => {
            setQuery('');
            setActiveCategory('All');
          }}
          placeholder="Search recipes, ingredients, or cuisines…"
        />

        {/* Category filter row */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid / loading / empty */}
        {showLoading ? (
          <div aria-busy="true" aria-label="Loading recipes">
            <RecipeCardSkeleton count={6} />
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.title} {...recipe} href="#" />
            ))}
          </div>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>
                {query
                  ? `No recipes match "${query}"`
                  : `No ${activeCategory} recipes yet`}
              </EmptyTitle>
              <EmptyDescription>
                Try a different ingredient or browse by category.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('All');
                }}
              >
                Clear filters
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  );
}
