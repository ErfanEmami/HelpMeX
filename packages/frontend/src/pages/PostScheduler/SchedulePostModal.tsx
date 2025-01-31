import Modal from "@/components/Modal";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { type SchedulePostForm } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/DatePicker";
import { SchedulePostFormSchema } from "shared";
import { isBefore } from "date-fns";

export const SchedulePostModal = ({
  isLoading,
  error,
  onSubmit,
  onClose,
}: {
  isLoading: boolean;
  error: string | null;
  onSubmit: (values: SchedulePostForm) => void;
  onClose: () => void;
}) => {
  const formId = "SchedulePostForm";

  return (
    <Modal
      error={error}
      isLoading={isLoading}
      title="Schedule Post"
      width="sm"
      control={{
        onFormSubmit: { text: "Schedule", formId: formId },
        onCancel: { text: "Cancel", onClick: onClose },
      }}
    >
      <SchedulePostForm formId={formId} onSubmit={onSubmit} />
    </Modal>
  );
};

const SchedulePostForm = ({
  formId,
  onSubmit,
}: {
  formId: string;
  onSubmit: (values: SchedulePostForm) => void;
}) => {
  const form = useForm<SchedulePostForm>({
    resolver: zodResolver(SchedulePostFormSchema),
  });

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 flex-col"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <Label>Post Content</Label>
              <FormControl>
                <Textarea {...field} placeholder="Post content" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <Label>Date</Label>
              <FormControl>
                <DatePicker
                  disabled={(date) => isBefore(date, new Date())}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <Label>Time</Label>
              <FormControl>
                <Input {...field} placeholder="HH:TT AM/PM" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
