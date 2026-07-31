import { AllergenBadge } from '../../../components/kkds/allergen-badge';
import { CategoryBadge } from '../../../components/kkds/category-badge';
import { Row, Stack } from '../../parts';

const ALLERGENS = [
  'GLUTEN',
  'DAIRY',
  'EGGS',
  'TREE_NUTS',
  'PEANUTS',
  'SOY',
  'FISH',
  'SHELLFISH',
];

export function AllergenBadgeDemo() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-8">
      <Row label="Allergen badges (outline, muted)">
        {ALLERGENS.map((a) => (
          <AllergenBadge key={a} label={a} />
        ))}
      </Row>

      <Stack label="Contrast with CategoryBadge">
        <p className="text-xs text-muted-foreground">
          CategoryBadge (warm secondary) vs. AllergenBadge (outline, muted) — same
          normalisation logic, distinct visual weight.
        </p>
        <Row>
          <CategoryBadge label="Italian" />
          <CategoryBadge label="Dinner" />
          <AllergenBadge label="GLUTEN" />
          <AllergenBadge label="DAIRY" />
        </Row>
      </Stack>

      <Stack label="In context: 'Contains' section">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Contains
          </p>
          <Row>
            <AllergenBadge label="GLUTEN" />
            <AllergenBadge label="EGGS" />
            <AllergenBadge label="DAIRY" />
          </Row>
        </div>
      </Stack>
    </div>
  );
}
