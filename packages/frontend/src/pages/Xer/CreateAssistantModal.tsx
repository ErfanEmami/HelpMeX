import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Modal from "@/components/Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateAssistant } from "@/lib/types";
import { CreateAssistantSchema } from "shared";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAssistants } from "@/hooks/useAssistants";
import { useState } from "react";
import { useXerContext } from "@/context/xer_context/XerContext";

export const CreateAssistantModal = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { createAssistant } = useAssistants();

  const {
    xerState: { assistants },
    xerDispatch,
  } = useXerContext();

  const handleCreateAssistant = async (values: CreateAssistant) => {
    setIsLoading(true);
    const res = await createAssistant(values);
    setIsLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      xerDispatch({
        type: "ADD_ASSISTANT",
        payload: res.assistant!,
      });
      xerDispatch({
        type: "SELECT_ASSISTANT",
        payload: res.assistant!,
      });
      onClose();
    }
  };

  return (
    <Modal width="sm" isLoading={isLoading} error={error}>
        <div className="flex flex-col gap-2 mb-4">
          <CardTitle>Create Assistant</CardTitle>
          <CardDescription>
            Have an assistant help with your posts.
          </CardDescription>
        </div>
        <div>
          <CreateAssistantForm
            onClose={assistants.length ? onClose : null}
            onCreate={handleCreateAssistant}
          />
        </div>
    </Modal>
  );
};

const CreateAssistantForm = ({
  onClose,
  onCreate,
}: {
  onClose: (() => void) | null;
  onCreate: (values: CreateAssistant) => void;
}) => {
  const form = useForm<CreateAssistant>({
    resolver: zodResolver(CreateAssistantSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onCreate)}
        className="flex gap-6 flex-col"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label>Assistant Name</Label>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label>Inspiration Account</Label>
              <FormControl>
                <Input {...field} placeholder="@username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          {onClose && (
            <Button
              disabled={form.formState.isSubmitting}
              onClick={onClose}
              variant="outline"
            >
              close
            </Button>
          )}
          <Button disabled={form.formState.isSubmitting} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
