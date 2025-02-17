import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CreateTaskForm from "./create-task-form";

const CreateTaskDialog = (props: { projectId?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button aria-label="Create New Task">
            <Plus />
            New Task
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
          {/* Title for the Dialog */}
          <VisuallyHidden>
            <DialogTitle>Create New Task</DialogTitle>
          </VisuallyHidden>

          {/* Description for the Dialog to resolve accessibility warning */}
          <DialogDescription className="sr-only">
            Please fill in the form below to create a new task for the project.
          </DialogDescription>

          {/* Form for creating a new task */}
          <CreateTaskForm projectId={props.projectId} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
