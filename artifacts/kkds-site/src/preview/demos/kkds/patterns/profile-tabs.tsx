import {
  RecipeAuthor,
  RecipeCard,
  RecipeCardSkeleton,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Button,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@sverg84/kkds-react';
const MY_RECIPES = [
  {
    title: 'Pasta Carbonara',
    description: 'A classic Roman pasta dish — rich, silky, and deeply satisfying.',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=640&h=360&fit=crop',
    tags: ['Italian', 'Dinner'],
    prepTime: '10 min',
    cookTime: '20 min',
  },
  {
    title: 'Mushroom Risotto',
    description: 'Silky arborio rice with wild mushrooms and aged Parmesan.',
    imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=640&h=360&fit=crop',
    tags: ['Italian', 'Vegetarian'],
    prepTime: '10 min',
    cookTime: '30 min',
  },
  {
    title: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone.',
    imageUrl: null,
    tags: ['Italian', 'Dessert'],
    prepTime: '30 min',
    cookTime: null,
  },
];

const FAVOURITES = [
  {
    title: 'Avocado Toast',
    description: 'Creamy avocado on sourdough with chilli flakes and lemon.',
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=640&h=360&fit=crop',
    tags: ['Breakfast', 'Vegan'],
    prepTime: '5 min',
    cookTime: null,
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Tender chicken in a rich, spiced tomato-cream sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=640&h=360&fit=crop',
    tags: ['Indian', 'Dinner'],
    prepTime: '20 min',
    cookTime: '35 min',
  },
];

export function ProfileTabsPattern() {
  return (
    <div className="space-y-10">
      {/* Pattern notes */}
      <div className="rounded-xl border bg-card p-5 space-y-3 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pattern — Profile Tabs
        </p>
        <p className="text-muted-foreground leading-relaxed">
          RecipeAuthor header sits outside and above the Tabs component so it remains
          visible during tab switching. Each TabsContent panel uses the same responsive grid
          as Recipe Discovery. The KKDS Tabs component uses a CSS-driven indicator by default;
          for a spring-animated indicator see the animation note in{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">docs/patterns.md</code>.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeAuthor</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">Tabs</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeCard</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeCardSkeleton</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">Empty</code>
        </div>
      </div>

      {/* Live composition */}
      <div className="space-y-6">
        {/* Profile header — outside tabs so it persists across tab switches */}
        <div className="flex items-start justify-between">
          <RecipeAuthor
            name="Maria Santos"
            avatarUrl="https://i.pravatar.cc/80?img=5"
            subtitle="3 recipes · 2 favourites"
          />
          <Button variant="outline" size="sm">
            Edit profile
          </Button>
        </div>

        <Separator />

        {/* Tabbed content */}
        <Tabs defaultValue="my-recipes">
          <TabsList>
            <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
            <TabsTrigger value="favourites">Favourites</TabsTrigger>
          </TabsList>

          <TabsContent value="my-recipes" className="pt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {MY_RECIPES.map((recipe) => (
                <RecipeCard key={recipe.title} {...recipe} href="#" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favourites" className="pt-6">
            {FAVOURITES.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {FAVOURITES.map((recipe) => (
                  <RecipeCard key={recipe.title} {...recipe} href="#" />
                ))}
              </div>
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>No favourites yet</EmptyTitle>
                  <EmptyDescription>
                    Tap the heart on any recipe to save it here.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline">Browse recipes</Button>
                </EmptyContent>
              </Empty>
            )}
          </TabsContent>
        </Tabs>

        {/* Loading state reference */}
        <div className="rounded-xl border bg-muted/30 p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Loading state — use as Suspense fallback inside each tab panel
          </p>
          <RecipeCardSkeleton count={3} />
        </div>
      </div>
    </div>
  );
}
