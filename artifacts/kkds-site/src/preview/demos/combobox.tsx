import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@sverg84/kkds-react";
import { DocBlock, Stack } from "../parts";

const CUISINES = [
  "Italian",
  "Mexican",
  "Japanese",
  "Indian",
  "Thai",
  "French",
  "Mediterranean",
] as const;

const DIETARY = ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Nut-free"] as const;

function BasicCombobox() {
  return (
    <Combobox items={[...CUISINES]}>
      <ComboboxInput placeholder="Choose a cuisine" />
      <ComboboxContent>
        <ComboboxEmpty>No cuisines match.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function ClearableCombobox() {
  return (
    <Combobox items={[...CUISINES]} defaultValue="Italian">
      <ComboboxInput placeholder="Choose a cuisine" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No cuisines match.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function EmptyResultsCombobox() {
  return (
    <Combobox items={["Only this option"]}>
      <ComboboxInput placeholder="Type something that will not match" />
      <ComboboxContent>
        <ComboboxEmpty>No results. Try a different query.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function ChipsCombobox() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Combobox
      items={[...DIETARY]}
      multiple
      value={value}
      onValueChange={(next) => setValue(next ?? [])}
    >
      <ComboboxChips>
        <ComboboxValue>
          {(selected: string[]) =>
            selected.map((item) => (
              <ComboboxChip key={item}>{item}</ComboboxChip>
            ))
          }
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Add dietary tags" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No tags match.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxDemo() {
  return (
    <div className="space-y-6">
      <DocBlock
        purpose="Searchable, filterable option selection built on Base UI Combobox. Users type to narrow a known option list, then pick one or more values. Distinct from Select (closed list, no search) and RecipeSearchBar (free-text recipe filter, not option picking)."
        whenToUse={[
          "Picking from a known option set with type-ahead filtering",
          "Multi-select tags with chips when multiple={true}",
          "Forms that need clearable selection from a finite list",
        ]}
        whenNotToUse={[
          "Closed lists without search — use Select",
          "Free-text recipe discovery — use RecipeSearchBar",
          "Command palettes or arbitrary app actions — keep those app-level",
        ]}
        composition="Root owns value/defaultValue/onValueChange (and multiple). ComboboxInput wraps InputGroup with optional showClear. Popup content is ComboboxContent → ComboboxEmpty + ComboboxList → ComboboxItem. Multi-select uses ComboboxChips + ComboboxValue + ComboboxChip + ComboboxChipsInput. Polymorphism uses Base UI render, not asChild."
        accessibility="Root provides combobox semantics; items are keyboard-navigable. Provide meaningful placeholders and ensure empty states announce when the filter yields no matches. Chip remove controls are keyboard-accessible."
        example={`<Combobox items={cuisines}>
  <ComboboxInput placeholder="Choose a cuisine" showClear />
  <ComboboxContent>
    <ComboboxEmpty>No cuisines match.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
      />

      <div className="max-w-md space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
        <Stack label="Basic single-select (type to filter)">
          <BasicCombobox />
        </Stack>
        <Stack label="Clearable selection">
          <ClearableCombobox />
        </Stack>
        <Stack label="Empty results">
          <EmptyResultsCombobox />
        </Stack>
        <Stack label="Chips / multi-value">
          <ChipsCombobox />
        </Stack>
      </div>
    </div>
  );
}
