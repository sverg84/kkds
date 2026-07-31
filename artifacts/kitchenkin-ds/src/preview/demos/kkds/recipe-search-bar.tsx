"use client";

import * as React from 'react';
import { RecipeSearchBar } from '../../../components/kkds/recipe-search-bar';
import { DocBlock, Stack } from '../../parts';

function ControlledDemo() {
  const [value, setValue] = React.useState('');
  return (
    <div className="space-y-2">
      <RecipeSearchBar
        value={value}
        onChange={setValue}
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
        purpose="Client-side controlled search input with a Search icon prefix and an inline clear button. Framework-agnostic — wire value and onChange to local React state or URL search params. The clear button renders automatically when value is non-empty."
        whenToUse={[
          'Recipe discovery page as the primary search entry point',
          'Any KitchenKin surface implementing recipe search or ingredient filtering',
        ]}
        whenNotToUse={[
          'Non-recipe search flows — use a plain InputGroup instead',
          'Site-level command palette — use the Command component',
          'Multi-field filter forms where search is one of many inputs and should not dominate',
        ]}
        composition="Control via React state or URL search params. Connect onClear to reset both the input value and any active query state (results, pagination). The clear button appears automatically when value is truthy."
        accessibility="The input has an implicit role='searchbox'. Pair with a live region (aria-live='polite') that announces result counts: '12 recipes found' or 'No results for chicken pasta'."
        example={`<RecipeSearchBar
  value={query}
  onChange={setQuery}
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
            <RecipeSearchBar value="" onChange={() => {}} />
          </div>
        </Stack>

        <Stack label="With value — clear button appears">
          <div className="max-w-md">
            <RecipeSearchBar
              value="chicken pasta"
              onChange={() => {}}
            />
          </div>
        </Stack>

        <Stack label="Custom placeholder">
          <div className="max-w-md">
            <RecipeSearchBar
              value=""
              onChange={() => {}}
              placeholder="Try 'pasta', 'vegan', or 'quick dinner'…"
            />
          </div>
        </Stack>
      </div>
    </div>
  );
}
