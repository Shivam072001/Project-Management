import { Edit3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import EditProjectForm from "./edit-project-form";
import { ProjectType } from "@/types/api.type";
import { useState } from "react";

const EditProjectDialog = (props: { project?: ProjectType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        {/* DialogTrigger button for opening the dialog */}
        <DialogTrigger className="mt-1.5" asChild>
          <button aria-label="Edit Project">
            <Edit3 className="w-5 h-5" />
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg border-0">
          {/* Accessibility improvement with DialogTitle */}
          <VisuallyHidden>
            <DialogTitle>Edit Project</DialogTitle>
          </VisuallyHidden>

          {/* Description for Dialog to improve accessibility */}
          <DialogDescription className="sr-only">
            Use the form below to edit the details of the project.
          </DialogDescription>

          {/* Form for editing project */}
          <EditProjectForm project={props.project} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProjectDialog;
