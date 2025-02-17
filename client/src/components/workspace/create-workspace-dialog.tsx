import WorkspaceForm from "./create-workspace-form";
import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialog";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CreateWorkspaceDialog = () => {
  const { open, onClose } = useCreateWorkspaceDialog();

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl !p-0 overflow-hidden border-0">
        {/* Ensure accessibility for screen readers by wrapping the DialogTitle in VisuallyHidden */}
        <VisuallyHidden>
          <DialogTitle>Create Workspace</DialogTitle>
        </VisuallyHidden>

        {/* Adding a DialogDescription for better accessibility */}
        <DialogDescription className="sr-only">
          Fill out the form below to create a new workspace.
        </DialogDescription>

        {/* Workspace form component */}
        <WorkspaceForm {...{ onClose }} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
