import { CategoryBadge } from '@sverg84/kkds-react';
import { DocBlock, Row, Stack } from '../../parts';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Brunch'];
const CUISINES = ['Italian', 'Mexican', 'Japanese', 'Indian', 'French', 'Greek'];
const DIETS = ['Vegetarian', 'VEGAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'KETO', 'PALEO'];

export function CategoryBadgeDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Warm secondary badge for recipe categories, meal types, and cuisines. The built-in formatCategoryLabel normaliser converts database enum values (SCREAMING_SNAKE_CASE) to Title Case — pass raw API values directly without pre-processing."
        whenToUse={[
          'Recipe card tag row below the title',
          'Recipe detail page category section',
          'Filter chip lists for browsing by category or cuisine',
        ]}
        whenNotToUse={[
          'Allergen or dietary-restriction labelling — use AllergenBadge (outline treatment signals safety significance)',
          'Status indicators (active, draft, published)',
          'Navigation chips or tabs',
        ]}
        composition="Render a flex-wrap row of badges. Pass database enum values directly — normalisation is built in. Never mix with AllergenBadge in the same badge row; the visual distinction between warm-secondary and outline carries semantic meaning."
        accessibility="Badges are presentational. The containing section should have a visible or visually-hidden heading ('Categories') so screen reader users have context for the labels."
        example={`<div className="flex flex-wrap gap-1">
  {recipe.tags.map(tag => (
    <CategoryBadge key={tag} label={tag} />
  ))}
</div>`}
      />

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
    </div>
  );
}
