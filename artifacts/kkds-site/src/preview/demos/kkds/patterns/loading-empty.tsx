"use client";

import * as React from 'react';
import { RecipeCardSkeleton } from '../../../../components/kkds/recipe-card-skeleton';
import { Alert, AlertDescription, AlertTitle } from '../../../../components/ui/alert';
import { Button } from '../../../../components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '../../../../components/ui/empty';
import { AlertCircle, ChefHat, Search } from 'lucide-react';
import {
  EmptyMedia,
} from '../../../../components/ui/empty';

type State = 'loading' | 'empty' | 'no-results' | 'error';

const STATES: { value: State; label: string }[] = [
  { value: 'loading', label: 'Loading' },
  { value: 'empty', label: 'Empty' },
  { value: 'no-results', label: 'No results' },
  { value: 'error', label: 'Error' },
];

export function LoadingEmptyPattern() {
  const [activeState, setActiveState] = React.useState<State>('loading');

  return (
    <div className="space-y-10">
      {/* Pattern notes */}
      <div className="rounded-xl border bg-card p-5 space-y-3 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pattern — Loading & Empty State Philosophy
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Skeleton layouts must match live content dimensions exactly — use the same count as
          your page size and the same responsive grid class. Empty states are warm and
          encouraging, not apologetic. Every empty state has exactly one primary CTA.
          Error states acknowledge the problem, reassure that data is safe, and offer a single
          recovery action.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <code className="rounded bg-muted px-2 py-0.5 text-xs">RecipeCardSkeleton</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">Empty</code>
          <code className="rounded bg-muted px-2 py-0.5 text-xs">Alert</code>
        </div>
      </div>

      {/* State switcher */}
      <div className="flex flex-wrap gap-2">
        {STATES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveState(value)}
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeState === value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* State display */}
      {activeState === 'loading' && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Loading state.</strong>{' '}
            RecipeCardSkeleton count matches the page size (6). Wrap in{' '}
            <code className="rounded bg-muted px-1 py-0.5">aria-busy="true"</code> for
            accessibility.
          </p>
          <div aria-busy="true" aria-label="Loading recipes">
            <RecipeCardSkeleton count={6} />
          </div>
        </div>
      )}

      {activeState === 'empty' && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Intrinsically empty state.</strong>{' '}
            The collection exists but has no items. Heading invites action — never
            apologises. CTA leads to the creation flow.
          </p>
          <Empty className="border bg-card">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ChefHat />
              </EmptyMedia>
              <EmptyTitle>Your recipe box is empty</EmptyTitle>
              <EmptyDescription>
                Start building your collection by creating your first recipe.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>Create a recipe</Button>
            </EmptyContent>
          </Empty>
        </div>
      )}

      {activeState === 'no-results' && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">No-results state.</strong>{' '}
            The search or filter yielded zero matches. Heading is contextual (includes the
            query). CTA clears filters so the user can start over.
          </p>
          <Empty className="border bg-card">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>No recipes match "quinoa"</EmptyTitle>
              <EmptyDescription>
                Try a different ingredient or browse by category.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline">Clear filters</Button>
            </EmptyContent>
          </Empty>
        </div>
      )}

      {activeState === 'error' && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Error state.</strong>{' '}
            Query or mutation failed. Acknowledge, reassure (data is safe), single
            recovery action. Use the KKDS Alert in{' '}
            <code className="rounded bg-muted px-1 py-0.5">destructive</code> variant.
          </p>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Couldn't load your recipes</AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
              <p>Something went wrong. Your data is safe — try again in a moment.</p>
              <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Philosophy reference table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="px-5 py-3 bg-muted/50 border-b">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            State taxonomy
          </p>
        </div>
        <div className="divide-y text-sm">
          {[
            {
              state: 'Loading',
              trigger: 'Data fetch in progress',
              component: 'RecipeCardSkeleton count={n}',
              copy: 'No copy — skeleton communicates state visually',
            },
            {
              state: 'Empty',
              trigger: 'Collection has no items',
              component: 'Empty + EmptyTitle + CTA',
              copy: '"Your recipe box is empty" + invitation copy',
            },
            {
              state: 'No results',
              trigger: 'Search/filter yields 0 matches',
              component: 'Empty + contextual EmptyTitle + clear CTA',
              copy: '"No recipes match \\"X\\"" + suggestion',
            },
            {
              state: 'Error',
              trigger: 'Query or mutation failed',
              component: 'Alert variant="destructive" + retry Button',
              copy: 'Acknowledge + reassure + "Try again"',
            },
          ].map(({ state, trigger, component, copy }) => (
            <div key={state} className="grid grid-cols-[80px_1fr_1fr_1fr] gap-4 px-5 py-3 text-xs">
              <span className="font-medium text-foreground">{state}</span>
              <span className="text-muted-foreground">{trigger}</span>
              <code className="text-muted-foreground">{component}</code>
              <span className="text-muted-foreground">{copy}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
