import { Badge } from '@sverg84/kkds-react';
import { Row } from '../parts';

export function BadgeDemo() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <Row label="Variants">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </Row>
    </div>
  );
}
