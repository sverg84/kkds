import { Guidelines, Row, Stack } from '../../parts';

const VOICE_TRAITS = [
  {
    trait: 'Warm',
    description:
      'Speak to cooks as fellow food lovers. Avoid clinical or transactional language. "Your favourite flavours" beats "Selected items".',
  },
  {
    trait: 'Encouraging',
    description:
      'Every empty state is an invitation, not a failure. Frame absence as possibility: "Ready to discover something delicious?" not "No recipes found."',
  },
  {
    trait: 'Food-forward',
    description:
      'Reach for food metaphors and sensory language when they fit naturally. "Stir in a recipe" or "A fresh start." Never forced.',
  },
  {
    trait: 'Concise',
    description:
      'Microcopy should be scannable. Headings under 5 words; descriptions under 20. Recipes are about doing, not reading.',
  },
];

const BUTTON_LABELS = [
  { kind: 'do' as const, text: 'Save recipe — specific to the object being saved' },
  { kind: 'do' as const, text: 'Add to favourites — action + target, no ambiguity' },
  { kind: 'do' as const, text: 'Start cooking — present tense, forward motion' },
  { kind: 'dont' as const, text: 'Submit — generic, cold' },
  { kind: 'dont' as const, text: 'OK — communicates nothing about the outcome' },
  { kind: 'dont' as const, text: 'Click here — inaccessible and direction-unaware' },
];

const EMPTY_STATES = [
  {
    context: 'Discovery — no recipes yet',
    heading: 'Ready to discover something delicious?',
    description: 'Browse by category, search for an ingredient, or let us surprise you.',
  },
  {
    context: 'My Recipes — empty collection',
    heading: 'Your recipe box is empty',
    description:
      'Start building your collection by creating your first recipe.',
  },
  {
    context: 'Favourites — nothing saved',
    heading: 'No favourites yet',
    description: 'Tap the heart on any recipe to save it here.',
  },
  {
    context: 'Search — no results',
    heading: 'No recipes match "%s"',
    description: 'Try a different ingredient or browse by category.',
  },
];

const ERROR_MESSAGES = [
  {
    context: 'Network / server error',
    copy: 'Something went wrong loading your recipes. Try again in a moment.',
    action: 'Try again',
  },
  {
    context: 'Save failed',
    copy: 'We couldn\'t save your recipe right now. Your changes are safe — try again shortly.',
    action: 'Retry',
  },
  {
    context: 'Image upload failed',
    copy: 'That image couldn\'t be uploaded. Check the file size (max 5 MB) and try again.',
    action: 'Choose another file',
  },
];

const LOADING_COPY = [
  { context: 'Recipe list', copy: 'Finding delicious recipes…' },
  { context: 'Recipe detail', copy: 'Loading recipe…' },
  { context: 'Saving', copy: 'Saving your recipe…' },
  { context: 'Searching', copy: 'Searching…' },
];

const PLACEHOLDER_TEXT = [
  { field: 'Search bar', copy: 'Search recipes, ingredients, or cuisines…' },
  { field: 'Recipe name', copy: 'e.g. Spiced tomato soup' },
  { field: 'Description', copy: 'What makes this recipe special?' },
  { field: 'Ingredient', copy: 'e.g. 2 cups plain flour' },
  { field: 'Instruction step', copy: 'e.g. Bring to a boil, then reduce heat…' },
  { field: 'Profile bio', copy: 'Tell other cooks about yourself…' },
];

export function CopyVoicePage() {
  return (
    <div className="space-y-10">
      {/* Voice traits */}
      <div className="rounded-xl border bg-card p-6 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Editorial voice
          </p>
          <p className="text-sm text-muted-foreground">
            KitchenKin speaks like a knowledgeable friend who loves food — not a food-delivery
            app or a nutrition tracker. Every word should feel like it was written by someone
            who genuinely cares about cooking.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VOICE_TRAITS.map(({ trait, description }) => (
            <div key={trait} className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-semibold text-foreground mb-1">{trait}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Button labels */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Button labels
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Use verb + object. Be specific about what happens when the button is pressed.
          </p>
        </div>
        <Guidelines items={BUTTON_LABELS} />
      </div>

      {/* Empty states */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Empty state copy
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Headings invite action. Descriptions explain the simplest next step.
            Never apologise for an empty state — make it feel like potential.
          </p>
        </div>
        <div className="space-y-3">
          {EMPTY_STATES.map(({ context, heading, description }) => (
            <div key={context} className="rounded-lg border p-4 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">{context}</p>
              <p className="text-sm font-semibold text-foreground">"{heading}"</p>
              <p className="text-xs text-muted-foreground">"{description}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Error messages */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Error messages
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Acknowledge the problem, reassure the user their work is safe, and
            give them one clear recovery action.
          </p>
        </div>
        <div className="space-y-3">
          {ERROR_MESSAGES.map(({ context, copy, action }) => (
            <div key={context} className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">{context}</p>
              <p className="text-sm text-foreground">"{copy}"</p>
              <p className="text-xs text-primary font-medium">→ Action: "{action}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Loading copy */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Loading copy
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Use progressive present tense. For recipe discovery, food-forward
            language is appropriate ("Finding delicious recipes…").
            For mutations, be direct ("Saving your recipe…").
          </p>
        </div>
        <Row>
          {LOADING_COPY.map(({ context, copy }) => (
            <div key={context} className="rounded-lg bg-muted/50 px-3 py-2 text-xs">
              <span className="text-muted-foreground">{context}: </span>
              <span className="font-medium text-foreground">"{copy}"</span>
            </div>
          ))}
        </Row>
      </div>

      {/* Placeholder text */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Placeholder text
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Placeholders show the format, not the label. Use a realistic food example
            rather than "Enter text here". Never repeat the field label.
          </p>
        </div>
        <div className="divide-y rounded-lg border overflow-hidden">
          {PLACEHOLDER_TEXT.map(({ field, copy }) => (
            <div key={field} className="flex items-center gap-4 px-4 py-3 text-sm">
              <span className="w-28 shrink-0 text-xs font-medium text-muted-foreground">
                {field}
              </span>
              <span className="text-muted-foreground italic">"{copy}"</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
