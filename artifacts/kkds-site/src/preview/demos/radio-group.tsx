import { Label } from '@sverg84/kkds';
import {
  RadioGroup,
  RadioGroupItem,
} from '@sverg84/kkds';
import { Stack } from '../parts';

export function RadioGroupDemo() {
  return (
    <div className="max-w-sm rounded-xl border bg-card p-6">
      <Stack label="Plan">
        <RadioGroup defaultValue="pro">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="free" id="radio-free" />
            <Label htmlFor="radio-free">Free</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="pro" id="radio-pro" />
            <Label htmlFor="radio-pro">Pro</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="enterprise" id="radio-enterprise" disabled />
            <Label htmlFor="radio-enterprise">Enterprise</Label>
          </div>
        </RadioGroup>
      </Stack>
    </div>
  );
}
