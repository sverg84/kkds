"use client";

import * as React from 'react';
import { RecipeSearchBar } from '../../../components/kkds/recipe-search-bar';
import { Stack } from '../../parts';

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
  );
}
