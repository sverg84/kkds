import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@sverg84/kkds-react";
import { FolderOpen } from "lucide-react";
import { DocBlock } from "../parts";

export function EmptyDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Compound empty-state layout for absent content, empty collections, or no-results surfaces. Keeps media, title, description, and actions in a consistent hierarchy."
        whenToUse={[
          "Intrinsic empty states (user has not created anything yet)",
          "No-results after filtering a list",
          "Placeholder guidance with a primary CTA",
        ]}
        whenNotToUse={[
          "Loading placeholders shaped like content — use Skeleton / RecipeCardSkeleton",
          "Inline form validation — use FieldError",
          "Transient toasts or banners",
        ]}
        composition="Empty → EmptyHeader (EmptyMedia, EmptyTitle, EmptyDescription) → EmptyContent for actions. EmptyDescription renders a semantic <p>."
        accessibility="Title and description should explain why the surface is empty and what to do next. Keep the primary action in EmptyContent and keyboard-focusable."
        example={`<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><FolderOpen /></EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>Create a project to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create project</Button>
  </EmptyContent>
</Empty>`}
      />

      <Empty className="max-w-xl border bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderOpen />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            Create a project to start organizing your work.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create project</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
