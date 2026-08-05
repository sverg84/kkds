import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "#lib/utils";

const buttonVariants = cva(
  [
    "relative z-0",
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "hover-elevate active-elevate-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border border-primary-border bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/85",
        destructive:
          "border border-destructive-border bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/85",
        outline:
          "border [border-color:var(--button-outline)] shadow-xs hover:bg-muted active:bg-muted/80 active:shadow-none",
        secondary:
          "border border-secondary-border bg-secondary text-secondary-foreground hover:bg-secondary/85 active:bg-secondary/75",
        ghost:
          "border border-transparent hover:bg-accent/40 active:bg-accent/55",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
