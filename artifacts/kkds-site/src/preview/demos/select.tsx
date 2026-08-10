import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@sverg84/kkds-react";
import { Guidelines, Stack } from "../parts";

export function SelectDemo() {
  return (
    <div className="max-w-sm space-y-6 rounded-xl border bg-card p-6 text-card-foreground">
      <Guidelines
        items={[
          {
            kind: "do",
            text: "Use Select for closed, predefined option lists without type-ahead search.",
          },
          {
            kind: "dont",
            text: "Use Select when users need to filter options by typing — use Combobox instead. For free-text recipe search, use RecipeSearchBar.",
          },
        ]}
      />
      <Stack label="Grouped">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <SelectItem value="carrot">Carrot</SelectItem>
              <SelectItem value="spinach" disabled>
                Spinach (out of stock)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Stack>
      <Stack label="Disabled">
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one">One</SelectItem>
          </SelectContent>
        </Select>
      </Stack>
    </div>
  );
}
