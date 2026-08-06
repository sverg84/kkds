import { Toggle } from "@sverg84/kkds-react";
import { Heart } from "lucide-react";

export function FavoriteButton() {
  return (
    <Toggle
      aria-label="Toggle favorite"
      className="bg-background"
      size="sm"
      variant="outline"
    >
      <Heart className="group-aria-pressed/toggle:fill-red-500 group-aria-pressed/toggle:text-red-500" />
    </Toggle>
  );
}
