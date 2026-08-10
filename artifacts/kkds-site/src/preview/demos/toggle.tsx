import { Bold, Italic } from "lucide-react";
import { Toggle } from "@sverg84/kkds-react";
import { DocBlock, Row, Stack } from "../parts";

export function ToggleDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Two-state pressed control for on/off affordances that are not form preferences. Built on Base UI Toggle with KKDS size and variant tokens."
        whenToUse={[
          "Icon or text controls that stay pressed while active (formatting, view modes)",
          "As a primitive inside app-owned compositions (e.g. a favorite heart control)",
          "Any binary pressed state that should announce aria-pressed",
        ]}
        whenNotToUse={[
          "Form preferences that should read as settings — use Switch",
          "Mutually exclusive option sets — ToggleGroup is not a public KKDS export; use Tabs, Select, or app-owned segmented controls",
          "Primary actions that navigate or submit — use Button",
        ]}
        composition="Always provide an accessible name via aria-label (icon-only) or visible text children. Pair with size sm/default/lg and variant default/outline as needed."
        accessibility="Toggle exposes aria-pressed. Icon-only toggles must set aria-label. Disabled toggles use the disabled prop and are not focus-activatable."
        example={`<Toggle aria-label="Bold" variant="outline" size="sm">
  <Bold />
</Toggle>`}
      />

      <div className="rounded-xl border bg-card p-6 space-y-8">
        <Row label="Default">
          <Toggle aria-label="Italic">
            <Italic />
          </Toggle>
        </Row>

        <Row label="Pressed (defaultPressed)">
          <Toggle aria-label="Bold" defaultPressed variant="outline">
            <Bold />
          </Toggle>
        </Row>

        <Row label="Disabled">
          <Toggle aria-label="Italic" disabled>
            <Italic />
          </Toggle>
        </Row>

        <Stack label="Sizes and variants">
          <div className="flex flex-wrap items-center gap-3">
            <Toggle aria-label="Bold small" size="sm" variant="outline">
              <Bold />
            </Toggle>
            <Toggle aria-label="Bold default" variant="outline">
              <Bold />
            </Toggle>
            <Toggle aria-label="Bold large" size="lg" variant="outline">
              <Bold />
            </Toggle>
            <Toggle aria-label="Text toggle" variant="outline">
              Preview
            </Toggle>
          </div>
        </Stack>
      </div>
    </div>
  );
}
