"use client";

import * as React from 'react';
import { RecipeSearchBar } from '@sverg84/kkds-react';
import { DocBlock, Stack } from '../../parts';

function ControlledDemo() {
  const [value, setValue] = React.useState('');
  return (
    <div className="space-y-2">
      <RecipeSearchBar
        value={value}
        onValueChange={setValue}
        placeholder="Search recipes…"
      />
      {value && (
        <p className="text-xs text-muted-foreground">
          Searching for: <span className="font-medium text-foreground">{value}</span>
        </p>
      )}
    </div>
  );
}

export function RecipeSearchBarDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Client-side controlled search input with a Search icon prefix and an inline clear button. Framework-agnostic — wire value and onValueChange to local React state or URL search params. The clear button renders automatically when value is non-empty. Distinct from Combobox (option picking) and Select (closed lists)."
        whenToUse={[
          'Recipe discovery page as the primary search entry point',
          'Any KitchenKin surface implementing recipe search or ingredient filtering',
        ]}
        whenNotToUse={[
          'Non-recipe search flows — use a plain InputGroup instead',
          'Searchable option picking — use Combobox',
          'Closed predefined lists — use Select',
          'Multi-field filter forms where search is one of many inputs and should not dominate',
        ]}
        composition="Control via React state or URL search params. Connect onClear to reset both the input value and any active query state (results, pagination). The clear button appears automatically when value is truthy."
        accessibility="Uses type='search' with aria-label (default 'Search recipes', overridable via ariaLabel). Clearing returns focus to the input. Pair with a live region (aria-live='polite') that announces result counts: '12 recipes found' or 'No results for chicken pasta'."
        example={`<RecipeSearchBar
  value={query}
  onValueChange={setQuery}
  onClear={() => setQuery('')}
  placeholder="Search recipes, ingredients, or cuisines…"
/>`}
      />

      <div className="rounded-xl border bg-card p-6 space-y-8">
        <Stack label="Interactive (controlled)">
          <div className="max-w-md">
            <ControlledDemo />
          </div>
        </Stack>

        <Stack label="Empty state — placeholder visible">
          <div className="max-w-md">
            <RecipeSearchBar value="" onValueChange={() => {}} />
          </div>
        </Stack>

        <Stack label="With value — clear button appears">
          <div className="max-w-md">
            <RecipeSearchBar
              value="chicken pasta"
              onValueChange={() => {}}
            />
          </div>
        </Stack>

        <Stack label="Custom placeholder">
          <div className="max-w-md">
            <RecipeSearchBar
              value=""
              onValueChange={() => {}}
              placeholder="Try 'pasta', 'vegan', or 'quick dinner'…"
            />
          </div>
        </Stack>
      </div>
    </div>
  );
}
