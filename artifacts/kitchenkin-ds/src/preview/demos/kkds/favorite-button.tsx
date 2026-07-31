"use client";

import * as React from 'react';
import { FavoriteButton } from '../../../components/kkds/favorite-button';
import { Row, Stack } from '../../parts';

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
  );
}
