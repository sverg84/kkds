import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@sverg84/kkds-react";
export function DialogDemo() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <Dialog>
        <DialogTrigger>
          <Button>Edit profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Update the details shown to your teammates.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border bg-muted/40 p-4 text-sm">
            Profile settings appear here.
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose>
              <Button>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
