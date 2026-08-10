import { Button, Spinner } from "@sverg84/kkds-react";
import { DocBlock, Row } from "../parts";

export function SpinnerDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Indeterminate loading indicator with an accessible status name. Prefer Spinner for non-card-shaped waits; use RecipeCardSkeleton when the result will be a recipe card grid."
        whenToUse={[
          "Inline saving / submitting states on buttons",
          "Generic page or section loading without a known layout skeleton",
        ]}
        whenNotToUse={[
          "Recipe list loading — use RecipeCardSkeleton",
          "Determinate progress — not supported here",
        ]}
        composition="SVG Loader icon with role=status. Use size sm|default|lg; override with className only for one-offs. Customize the accessible name via label (default Loading)."
        accessibility="Announces via aria-label (label prop). Keep nearby text if the spinner is decorative inside a labeled control."
        example={`<Spinner size="default" label="Loading recipes" />
<Button disabled>
  <Spinner size="sm" label="Saving" /> Saving
</Button>`}
      />

      <div className="rounded-xl border bg-card p-6 space-y-6">
        <Row label="Sizes">
          <Spinner size="sm" />
          <Spinner size="default" />
          <Spinner size="lg" />
        </Row>
        <Row label="Custom label + button context">
          <Spinner label="Fetching recipes" />
          <Button disabled>
            <Spinner size="sm" label="Saving" /> Saving
          </Button>
        </Row>
        <Row label="className override">
          <Spinner className="size-8 text-primary" label="Custom scale" />
        </Row>
      </div>
    </div>
  );
}
