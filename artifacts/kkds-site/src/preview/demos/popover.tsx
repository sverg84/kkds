import { Button } from '@sverg84/kkds';
import { Input } from '@sverg84/kkds';
import { Label } from '@sverg84/kkds';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@sverg84/kkds';

export function PopoverDemo() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Set dimensions</Button>
        </PopoverTrigger>
        <PopoverContent className="space-y-3">
          <div>
            <p className="font-medium">Dimensions</p>
            <p className="text-sm text-muted-foreground">
              Set a fixed width for the panel.
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor="popover-width">Width</Label>
            <Input id="popover-width" defaultValue="320" className="col-span-2" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
