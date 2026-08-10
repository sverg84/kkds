import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  Input,
  Switch,
} from "@sverg84/kkds-react";
import { DocBlock } from "../parts";

export function FieldDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Form-field composition: labels, descriptions, errors, and orientation variants around inputs and controls."
        whenToUse={[
          "Any labeled control that needs description or error text",
          "Grouped account/settings forms with FieldSet + FieldLegend",
          "Horizontal control + copy layouts (e.g. Switch + title)",
        ]}
        whenNotToUse={[
          "Standalone unlabeled inputs in dense toolbars",
          "Empty-state messaging — use Empty",
        ]}
        composition="Use FieldLabel with htmlFor for native inputs. Use FieldTitle for non-label headings beside switches/checkboxes. FieldError accepts children or an errors array of { message?: string }."
        accessibility="Associate FieldLabel via htmlFor/id. Mark invalid fields with aria-invalid and surface FieldError with role=alert. Prefer FieldTitle + aria-labelledby for composite controls without a native label target."
        example={`<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" />
  <FieldDescription>Used for notifications.</FieldDescription>
</Field>`}
      />

      <div className="max-w-lg rounded-xl border bg-card p-6">
        <FieldSet>
          <FieldLegend>Account details</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-email">Email</FieldLabel>
              <Input id="field-email" defaultValue="alex@example.com" />
              <FieldDescription>
                Used for account notifications.
              </FieldDescription>
            </Field>
            <Field data-invalid="true">
              <FieldLabel htmlFor="field-handle">Handle</FieldLabel>
              <Input id="field-handle" defaultValue="a" aria-invalid="true" />
              <FieldError>Use at least three characters.</FieldError>
            </Field>
            <FieldSeparator>Preferences</FieldSeparator>
            <Field orientation="horizontal">
              <Switch
                id="field-marketing"
                aria-labelledby="field-marketing-title"
                defaultChecked
              />
              <FieldContent>
                <FieldTitle id="field-marketing-title">
                  Product updates
                </FieldTitle>
                <FieldDescription>
                  Monthly product and release notes.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
}
