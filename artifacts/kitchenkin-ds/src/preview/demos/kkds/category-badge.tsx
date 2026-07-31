import { CategoryBadge } from '../../../components/kkds/category-badge';
import { Row, Stack } from '../../parts';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Brunch'];
const CUISINES = ['Italian', 'Mexican', 'Japanese', 'Indian', 'French', 'Greek'];
const DIETS = ['Vegetarian', 'VEGAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'KETO', 'PALEO'];

export function CategoryBadgeDemo() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-8">
      <Row label="Meal types">
        {MEAL_TYPES.map((tag) => (
          <CategoryBadge key={tag} label={tag} />
        ))}
      </Row>

      <Row label="Cuisines">
        {CUISINES.map((tag) => (
          <CategoryBadge key={tag} label={tag} />
        ))}
      </Row>

      <Stack label="Auto-normalised strings (underscore → Title Case)">
        <Row>
          {DIETS.map((tag) => (
            <CategoryBadge key={tag} label={tag} />
          ))}
        </Row>
      </Stack>
    </div>
  );
}
