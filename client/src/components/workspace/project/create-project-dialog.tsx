import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CreateProjectForm from "@/components/workspace/project/create-project-form";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CreateProjectDialog = () => {
  const { open, onClose } = useCreateProjectDialog();

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-0">
        {/* Ensure accessibility for screen readers by wrapping the DialogTitle in VisuallyHidden */}
        <VisuallyHidden>
          <DialogTitle>Create Project</DialogTitle>
        </VisuallyHidden>

        {/* Adding a DialogDescription for better accessibility */}
        <DialogDescription className="sr-only">
          Fill out the form below to create a new project.
        </DialogDescription>

        {/* Project creation form */}
        <CreateProjectForm {...{ onClose }} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
