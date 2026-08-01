"use client";

import * as React from 'react';
import { FavoriteButton } from '@sverg84/kkds-react';
import { DocBlock, Row, Stack } from '../../parts';

function InteractiveDemo() {
  const [favorited, setFavorited] = React.useState(false);
  return (
    <div className="flex items-center gap-3">
      <FavoriteButton isFavorited={favorited} onToggle={setFavorited} />
      <span className="text-sm text-muted-foreground">
        {favorited ? 'Saved to favorites ❤️' : 'Not favorited'}
      </span>
    </div>
  );
}

export function FavoriteButtonDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Client-side heart toggle for adding and removing recipes from a user's favourites collection. Manages pressed state internally and syncs with the isFavorited prop on remount — safe to re-render with updated server data."
        whenToUse={[
          'Recipe detail page action bar, alongside share and print',
          'Recipe card overlay or footer when per-card favouriting is a product feature',
        ]}
        whenNotToUse={[
          'Batch selection interfaces where a checkbox is more appropriate',
          'Unauthenticated surfaces — gate behind an auth check before rendering',
          "Non-recipe bookmark actions — the heart icon carries recipe-specific semantics in KitchenKin's visual language",
        ]}
        composition="Connect onToggle to your favouriting mutation. Set disabled={true} while the mutation is in flight to prevent double-toggles. Do not nest FavoriteButton inside a RecipeCard that has an href — nested interactive regions fail WCAG 2.1."
        accessibility="The button announces its state via an aria-label that reads 'Add to favorites' when unpressed and 'Remove from favorites' when pressed. No additional labelling is needed."
        example={`<FavoriteButton
  isFavorited={recipe.isFavorited}
  onToggle={(next) =>
    mutateFavorite({ recipeId: recipe.id, favorited: next })
  }
/>`}
      />

      <div className="rounded-xl border bg-card p-6 space-y-8">
        <Stack label="Interactive toggle">
          <InteractiveDemo />
        </Stack>

        <Row label="Sizes">
          <FavoriteButton size="sm" />
          <FavoriteButton size="default" />
          <FavoriteButton size="lg" />
        </Row>

        <Row label="States">
          <div className="flex flex-col gap-1 items-center">
            <FavoriteButton isFavorited={false} />
            <span className="text-xs text-muted-foreground">Default</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <FavoriteButton isFavorited={true} />
            <span className="text-xs text-muted-foreground">Favorited</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <FavoriteButton disabled />
            <span className="text-xs text-muted-foreground">Disabled</span>
          </div>
        </Row>
      </div>
    </div>
  );
}
