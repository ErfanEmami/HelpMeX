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
import { FlexibleThread, ScheduleThreadFormProps } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/DatePicker";
import { ScheduleThreadFormSchema } from "shared";
import { isBefore } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Content } from "@/components/ControlPanel";
import { cn } from "@/lib/utils";
import { contentTypes } from "../../context/types";

export const ScheduleThreadForm = ({
  formId,
  schedulableThreads,
  defaultThreadType,
  onSubmit,
  setContentType,
}: {
  formId: string;
  schedulableThreads: FlexibleThread[];
  defaultThreadType: keyof typeof contentTypes;
  onSubmit: (values: ScheduleThreadFormProps) => void;
  setContentType: (contentType: keyof typeof contentTypes) => void;
}) => {
  const form = useForm<ScheduleThreadFormProps>({
    resolver: zodResolver(ScheduleThreadFormSchema),
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
        <FormField
          control={form.control}
          name="threadId"
          render={({ field }) => (
            <FormItem className="pt-1 flex flex-col flex-1 overflow-y-hidden ">
              <Label>Content</Label>
              <FormControl>
                <Tabs
                  className="flex flex-col overflow-auto h-full"
                  defaultValue={defaultThreadType}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      onMouseDown={() => setContentType(contentTypes.existing)}
                      value={contentTypes.existing}
                    >
                      Select Existing
                    </TabsTrigger>
                    <TabsTrigger
                      onMouseDown={() => setContentType(contentTypes.manual)}
                      value={contentTypes.manual}
                    >
                      Manual Entry
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="manual" className="h-full overflow-auto">
                    {/* fix ring issue with textarea */}
                    <Textarea
                      {...field}
                      className="h-full"
                      placeholder="Manually enter post content... (this will create a new post)"
                    />
                  </TabsContent>
                  <TabsContent
                    value="existing"
                    className="h-full overflow-auto"
                  >
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
                  </TabsContent>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const ThreadButton = ({
  posts,
  selected,
  onClick,
}: {
  posts: FlexibleThread["posts"];
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={cn(
      `w-full hover:bg-muted cursor-pointer transition-colors border rounded-lg 
    bg-background border-border p-4 flex flex-col gap-4`,
      selected && "bg-secondary border-secondary-foreground hover:bg-secondary"
    )}
  >
    {posts.map(post => (
      <div className="border border-border p-4 whitespace-pre-wrap rounded-lg ">
        {post.text}
      </div>
    ))}
  </div>
);
