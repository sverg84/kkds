import { RecipeCard } from '../../../components/kkds/recipe-card';
import { Stack } from '../../parts';

const SAMPLE_RECIPES = [
  {
    title: 'Pasta Carbonara',
    description:
      'A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and black pepper. Rich, silky, and deeply satisfying.',
    imageUrl:
      'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=640&h=360&fit=crop',
    tags: ['Italian', 'Dinner', 'QUICK'],
    prepTime: '10 min',
    cookTime: '20 min',
  },
  {
    title: 'Mango Avocado Salad',
    description:
      'Bright, fresh, and full of tropical flavour. A weeknight salad that comes together in minutes.',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=640&h=360&fit=crop',
    tags: ['VEGAN', 'GLUTEN_FREE', 'Salad'],
    prepTime: '15 min',
    cookTime: null,
  },
  {
    title: 'Chocolate Lava Cake',
    description:
      'Warm individual chocolate cakes with a molten centre. The ultimate dinner party dessert.',
    imageUrl: null,
    tags: ['Dessert', 'French'],
    prepTime: '15 min',
    cookTime: '12 min',
  },
];

export function RecipeCardDemo() {
  return (
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
  );
}
