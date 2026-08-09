import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@sverg84/kkds-react";
import { Search, Send } from "lucide-react";
import { DocBlock, Stack } from "../parts";

export function InputGroupDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Compose text inputs and textareas with inline or block addons (icons, helper text, action buttons)."
        whenToUse={[
          "Search fields with leading icons (RecipeSearchBar builds on this)",
          "Inputs with trailing clear/send actions",
          "Multiline composers with a bottom action row",
        ]}
        whenNotToUse={[
          "Bare inputs without addons — use Input / Textarea directly",
          "Option picking — use Select or Combobox",
        ]}
        composition="InputGroup → InputGroupAddon + InputGroupInput/Textarea. InputGroupButton sizes (xs, sm, icon-xs, …) are local to this compound and are not the same as Button’s default/sm/lg/icon scale."
        accessibility="Give icon-only InputGroupButton an aria-label. Keep the underlying input labeled via Field or aria-label."
        example={`<InputGroup>
  <InputGroupAddon><Search /></InputGroupAddon>
  <InputGroupInput placeholder="Search" />
</InputGroup>`}
      />

      <div className="max-w-lg space-y-6 rounded-xl border bg-card p-6">
        <Stack label="Inline addons">
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search projects" />
          </InputGroup>
        </Stack>
        <Stack label="Multiline action">
          <InputGroup>
            <InputGroupTextarea placeholder="Write a message" />
            <InputGroupAddon align="block-end" className="justify-between">
              <InputGroupText>Markdown supported</InputGroupText>
              <InputGroupButton size="icon-xs" aria-label="Send message">
                <Send />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Stack>
      </div>
    </div>
  );
}
