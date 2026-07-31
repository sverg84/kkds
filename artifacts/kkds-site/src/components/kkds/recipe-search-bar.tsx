"use client";

import { Search, X } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { cn } from '../../lib/utils';

export interface RecipeSearchBarProps {
  /** The current search query value (controlled). */
  value: string;
  /** Called on every keystroke with the new value. */
  onChange: (value: string) => void;
  /** Placeholder text shown when the input is empty. */
  placeholder?: string;
  /**
   * Called when the user clicks the clear button.
   * If omitted, clearing still calls `onChange('')`.
   */
  onClear?: () => void;
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
 * keyword. Wire `value` and `onChange` to your local state or URL search params.
 *
 * **When not to use:** Command palette or autocomplete interactions — use a
 * command-palette library such as `cmdk` directly (`Command` is not part of
 * the `@sverg84/kkds` public API).
 *
 * **Framework integration:** This component is intentionally framework-agnostic.
 * In a Next.js app, wrap it with a client component that syncs `value` with
 * `useSearchParams()` and `router.push()`.
 *
 * **Accessibility:** The input has `aria-label="Search recipes"` by default.
 * The clear button announces itself as "Clear search".
 *
 * **`"use client"` boundary:** Required — managed via controlled props.
 *
 * **Composing primitives:** `InputGroup`, `InputGroupAddon`, `InputGroupInput`,
 * `InputGroupButton`
 */
export function RecipeSearchBar({
  value,
  onChange,
  placeholder = 'Search recipes…',
  onClear,
  className,
}: RecipeSearchBarProps) {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <InputGroup className={cn(className)}>
      <InputGroupAddon align="inline-start">
        <Search className="size-4" aria-hidden="true" />
      </InputGroupAddon>

      <InputGroupInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search recipes"
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
