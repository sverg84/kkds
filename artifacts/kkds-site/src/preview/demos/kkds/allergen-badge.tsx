import {
  AllergenBadge,
  CategoryBadge,
} from '@sverg84/kkds-react';
import { DocBlock, Row, Stack } from '../../parts';

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
    <div className="space-y-6">
      <DocBlock
        purpose="Muted outline badge for dietary constraints and allergen warnings. Visually distinct from CategoryBadge — the border-only treatment signals safety significance without alarm. Uses the same formatCategoryLabel normaliser as CategoryBadge."
        whenToUse={[
          'Allergen section of recipe detail pages',
          'Any surface where dietary safety information must be visible',
        ]}
        whenNotToUse={[
          'General category labelling — the outline treatment implies a safety implication',
          'Mixing with CategoryBadge in the same badge row — visual distinction carries meaning',
          'Status badges, navigation chips, or filter controls',
        ]}
        composition="Always render in a dedicated section with a visible heading ('Contains' or 'Allergens'). The visual distinction from CategoryBadge is intentional and semantically meaningful — preserve it by keeping the two badge types in separate rows."
        accessibility="Place within a section labelled 'Contains allergens' or equivalent. Screen readers cannot infer safety significance from visual style alone — the section heading is load-bearing."
        example={`<div className="space-y-1">
  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
    Contains
  </p>
  <div className="flex flex-wrap gap-1">
    {recipe.allergens.map(a => (
      <AllergenBadge key={a} label={a} />
    ))}
  </div>
</div>`}
      />

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
    </div>
  );
}
