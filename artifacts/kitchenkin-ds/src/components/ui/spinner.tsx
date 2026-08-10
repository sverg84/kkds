import { cn } from "#lib/utils";
import { Loader2Icon } from "lucide-react";

const spinnerSizeClass = {
  sm: "size-3",
  default: "size-4",
  lg: "size-6",
} as const;

export type SpinnerSize = keyof typeof spinnerSizeClass;

/**
 * Spinner — indeterminate loading indicator.
 *
 * Uses `role="status"` with an accessible `label` (default `"Loading"`).
 * Prefer `size` over ad-hoc width/height classes unless a one-off scale is needed.
 */
function Spinner({
  className,
  size = "default",
  label = "Loading",
  ...props
}: React.ComponentProps<"svg"> & {
  size?: SpinnerSize;
  /** Accessible name announced to assistive tech. */
  label?: string;
}) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn(
        "animate-spin motion-reduce:animate-none",
        spinnerSizeClass[size],
        className,
      )}
      {...props}
    />
  );
}

export { Spinner };
