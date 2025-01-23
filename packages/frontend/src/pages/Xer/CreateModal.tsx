import Modal from "@/components/Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateAssistantForm } from "./form";
import { CreateAssistant } from "@/lib/types";

export const CreateModal = ({
  onClose,
  onCreate,
}: {
  onClose?: (() => void) | null;
  onCreate: (values: CreateAssistant) => void;
}) => {
  return (
    <Modal>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Assistant</CardTitle>
          <CardDescription>
            Have an assistant help with your posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateAssistantForm onClose={onClose} onSubmit={onCreate} />
        </CardContent>
      </Card>
    </Modal>
  );
};
