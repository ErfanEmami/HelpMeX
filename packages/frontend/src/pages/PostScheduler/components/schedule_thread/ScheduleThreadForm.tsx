import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FlexibleThread, ScheduleThreadFormProps } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/DatePicker";
import { ScheduleThreadFormSchema } from "shared";
import { isBefore } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Content } from "@/components/ControlPanel";
import { contentTypes } from "../../context/types";
import { ThreadButton } from "./ThreadButton";
import { CreateManualThread } from "./CreateManualThread";

export const ScheduleThreadForm = ({
  formId,
  schedulableThreads,
  defaultContentType,
  onSubmit,
  setContentType,
}: {
  formId: string;
  schedulableThreads: FlexibleThread[];
  defaultContentType: keyof typeof contentTypes;
  onSubmit: (values: ScheduleThreadFormProps) => void;
  setContentType: (contentType: keyof typeof contentTypes) => void;
}) => {
  const form = useForm<ScheduleThreadFormProps>({
    resolver: zodResolver(ScheduleThreadFormSchema),
    defaultValues: {
      contentType: defaultContentType,
      posts: [{ text: "" }]
    }
  });

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full gap-2 flex-col"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
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

        <Tabs
          className="flex flex-col overflow-auto h-full"
          defaultValue={defaultContentType}
          onValueChange={(value) => {
            setContentType(value as keyof typeof contentTypes);
            form.setValue("contentType", value as keyof typeof contentTypes);
          }}
        >
          <Label className="mt-1 mb-2">Content</Label>

          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={contentTypes.existing}>Select Existing</TabsTrigger>
            <TabsTrigger value={contentTypes.manual}>Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value={contentTypes.manual} className="h-full overflow-auto">
            <FormField
              control={form.control}
              name="posts"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="h-full flex flex-col flex-1">
                  <FormControl>
                  <CreateManualThread
                    posts={form.watch("posts")} 
                    setPosts={field.onChange}
                  />
                  </FormControl>
                  <FormMessage>
                    {
                      Array.isArray(error) && error.length ? (
                        error[error.length-1]?.text?.message
                      ) : (
                        error?.message
                      )
                    }
                  </FormMessage>
                </FormItem> 
              )}
            />
          </TabsContent>

          <TabsContent value={contentTypes.existing} className="h-full overflow-auto">
            <FormField
              control={form.control}
              name="threadId"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col flex-1">
                  <FormControl>
                    <Content>
                        {schedulableThreads.length ? (
                          schedulableThreads.map((o) => (
                            <ThreadButton
                              posts={o.posts}
                              selected={form.watch("threadId") === o.id}
                              onClick={() => field.onChange(o.id)}
                            />
                          ))
                        ) : (
                          <div>No existing posts to schedule.</div>
                        )}
                    </Content>
                  </FormControl>
                  <FormMessage />
                </FormItem> 
              )}
            />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

