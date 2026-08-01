import {
  Button,
  Spinner,
} from '@sverg84/kkds-react';
import { Row } from '../parts';

export function SpinnerDemo() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <Row label="Sizes and context">
        <Spinner className="size-4" />
        <Spinner className="size-6" />
        <Spinner className="size-8" />
        <Button disabled>
          <Spinner /> Saving
        </Button>
      </Row>
    </div>
  );
}
