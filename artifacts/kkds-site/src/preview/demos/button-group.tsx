import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@sverg84/kkds-react';
import { Bold, Italic, Underline } from 'lucide-react';
import { Row } from '../parts';

export function ButtonGroupDemo() {
  return (
    <div className="space-y-6 rounded-xl border bg-card p-6">
      <Row label="Grouped actions">
        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label="Bold">
            <Bold />
          </Button>
          <ButtonGroupSeparator />
          <Button variant="outline" size="icon" aria-label="Italic">
            <Italic />
          </Button>
          <Button variant="outline" size="icon" aria-label="Underline">
            <Underline />
          </Button>
        </ButtonGroup>
      </Row>
      <Row label="Attached label">
        <ButtonGroup>
          <ButtonGroupText>https://</ButtonGroupText>
          <Button variant="outline">Copy link</Button>
        </ButtonGroup>
      </Row>
    </div>
  );
}
