import { Info } from 'lucide-react';
import { Button } from '@sverg84/kkds';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@sverg84/kkds';

export function TooltipDemo() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="More information">
              <Info />
            </Button>
          </TooltipTrigger>
          <TooltipContent>More information</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
