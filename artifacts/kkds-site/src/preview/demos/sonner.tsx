import { toast } from 'sonner';
import { Button, SonnerToaster } from '@sverg84/kkds-react';
import { Row } from '../parts';

export function SonnerDemo() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <Row label="Notifications">
        <Button onClick={() => toast.success('Project published')}>Success</Button>
        <Button
          variant="outline"
          onClick={() =>
            toast('Invitation sent', {
              description: 'alex@example.com can now join the workspace.',
              action: { label: 'Undo', onClick: () => undefined },
            })
          }
        >
          With action
        </Button>
      </Row>
      <SonnerToaster />
    </div>
  );
}
