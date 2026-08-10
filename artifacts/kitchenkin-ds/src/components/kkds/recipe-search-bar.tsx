"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { cn } from "../../lib/utils";

export interface RecipeSearchBarProps {
  /** The current search query value (controlled). */
  value: string;
  /** Called on every keystroke with the new value. */
  onValueChange: (value: string) => void;
  /** Placeholder text shown when the input is empty. */
  placeholder?: string;
  /**
   * Called when the user clicks the clear button.
   * If omitted, clearing still calls `onValueChange('')`.
   */
  onClear?: () => void;
  /**
   * Accessible name for the search input.
   * Defaults to `"Search recipes"`.
   */
  ariaLabel?: string;
  className?: string;
}

/**
 * RecipeSearchBar
 *
 * A controlled search input with a Search icon prefix and an inline clear
 * button that appears once the user has typed something. Extracted from the
 * KitchenKin home page, stripped of Next.js router coupling so it works in any
 * React app.
 *
 * **When to use:** Recipe discovery surfaces where users filter a list by
 * keyword. Wire `value` and `onValueChange` to your local state or URL search params.
 *
 * **When not to use:** Command palette or autocomplete interactions — use a
 * command-palette library such as `cmdk` directly (`Command` is not part of
 * the `@sverg84/kkds-react` public API). Prefer Combobox for searchable option picking.
 *
 * **Framework integration:** This component is intentionally framework-agnostic.
 * In a Next.js app, wrap it with a client component that syncs `value` with
 * `useSearchParams()` and `router.push()`.
 *
 * **Accessibility:** Uses `type="search"` with `aria-label` (default
 * `"Search recipes"`, overridable via `ariaLabel`). The clear button announces
 * itself as "Clear search". Activating clear returns focus to the input so
 * keyboard users are not stranded when the clear control unmounts.
 *
 * **`"use client"` boundary:** Required — managed via controlled props.
 *
 * **Composing primitives:** `InputGroup`, `InputGroupAddon`, `InputGroupInput`,
 * `InputGroupButton`
 */
export function RecipeSearchBar({
  value,
  onValueChange,
  placeholder = "Search recipes…",
  onClear,
  ariaLabel = "Search recipes",
  className,
}: RecipeSearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onValueChange("");
    onClear?.();
    // Clear unmounts when value becomes empty — restore focus to the input.
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <InputGroup className={cn(className)}>
      <InputGroupAddon align="inline-start">
        <Search className="size-4" aria-hidden="true" />
      </InputGroupAddon>

      <InputGroupInput
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />

      {value && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
