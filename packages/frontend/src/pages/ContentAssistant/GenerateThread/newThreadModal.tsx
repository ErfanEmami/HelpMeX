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
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Assistant, SaveGeneratedThread, type ThreadConstraints } from "@/lib/types";
import { LENGTH_VALUES, ThreadConstraintsSchema, TONE_VALUES } from "shared";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAssistants } from "@/hooks/useAssistants";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const TONE_SELECT_VALUES: SelectOption[] = TONE_VALUES.map((tone) => ({
  value: tone,
  label: tone,
}));

const LENGTH_SELECT_VALUES: SelectOption[] = LENGTH_VALUES.map((length) => ({
  value: length,
  label: length,
}));

export const GenerateThreadModal = ({
  selectedAssistant,
  onClose,
  onCreate,
}: {
  selectedAssistant: Assistant
  onClose: () => void;
  onCreate: (generatedThread: SaveGeneratedThread) => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { generateThread } = useAssistants();

  const handleGenerateThread = async (constraints: ThreadConstraints) => {
    setIsLoading(true)
    const res = await generateThread(selectedAssistant.author, constraints)

    if (res.error) {
      setError(res.error)
    } else {
      onCreate({
        author: selectedAssistant.author,
        posts: res.generatedThread!.posts,
        constraints: constraints,
      });
      onClose();
    }
    setIsLoading(false)
  };

  return (
    <Modal width="sm" isLoading={isLoading} error={error}>
      <div className="flex flex-col gap-2 mb-4">
        <CardTitle>New Thread</CardTitle>
        <CardDescription>
          Answer the below questions about your thread.
        </CardDescription>
      </div>
      <div>
        <GenerateThreadForm
          onClose={onClose}
          onCreate={handleGenerateThread}
        />
      </div>
    </Modal>
  );
};

const GenerateThreadForm = ({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (values: ThreadConstraints) => void;
}) => {
  const form = useForm<ThreadConstraints>({
    resolver: zodResolver(ThreadConstraintsSchema),
    defaultValues: {
      topic: "How to grow your following on X",
      targetAudience: "Users aspiring to grow their personal brand.",
      tone: "casual",
      length: "around 7 posts"
    }
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
          name="topic"
          render={({ field }) => (
            <FormItem>
              <Label>Thread Topic</Label>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={`Example: How to grow on X`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <Label>Target Audience</Label>
              <FormControl>
                <Input {...field} placeholder="Example: Businesses" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <Label>Tone</Label>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONE_SELECT_VALUES.map((o) => (
                      <SelectItem value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <Label>Length</Label>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LENGTH_SELECT_VALUES.map((o) => (
                      <SelectItem value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button
            disabled={form.formState.isSubmitting}
            onClick={onClose}
            variant="outline"
          >
            close
          </Button>
          <Button disabled={form.formState.isSubmitting} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
