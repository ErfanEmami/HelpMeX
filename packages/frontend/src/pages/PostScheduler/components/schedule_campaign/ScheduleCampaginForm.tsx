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
import { FlexiblePost, type SchedulePostFormProps } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/DatePicker";
// import { ScheduleExistingPostSchema, ScheduleManualPostSchema } from "shared";
import { isBefore } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Content } from "@/components/ControlPanel";
import { cn } from "@/lib/utils";
import { contentTypes } from "../../context/types";
import { SchedulePostFormSchema } from "shared";

export const SchedulePostForm = ({
  formId,
  schedulablePosts,
  defaultContentType,
  onSubmit,
  setContentType,
}: {
  formId: string;
  schedulablePosts: FlexiblePost[];
  defaultContentType: keyof typeof contentTypes;
  contentType: keyof typeof contentTypes;
  onSubmit: (values: SchedulePostFormProps) => void;
  setContentType: (postType: keyof typeof contentTypes) => void;
}) => {

const form = useForm<SchedulePostFormProps>({
  resolver: zodResolver(SchedulePostFormSchema),
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
          name="contentType"
          render={() => (
            <FormItem className="pt-1 flex flex-col flex-1 overflow-y-hidden ">
              <Label>Content</Label>
              <FormControl>
                <Tabs
                  className="flex flex-col overflow-auto h-full"
                  defaultValue={defaultContentType}
                  onValueChange={(value) => {
                    setContentType(value as keyof typeof contentTypes);
                    form.setValue("contentType", value as keyof typeof contentTypes);
                  }}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value={contentTypes.existing}>Select Existing</TabsTrigger>
                    <TabsTrigger value={contentTypes.manual}>Manual Entry</TabsTrigger>
                  </TabsList>

                  {/* Manual Entry */}
                  <TabsContent value={contentTypes.manual} className="h-full overflow-auto">
                    <FormField
                      control={form.control}
                      name="text"
                      render={({ field }) => (
                        <Textarea {...field} className="h-full" placeholder="Enter your post content..." />
                      )}
                    />
                    <FormMessage />
                  </TabsContent>

                  {/* Select Existing */}
                  <TabsContent value={contentTypes.existing} className="h-full overflow-auto">
                    <Content>
                      {schedulablePosts.length ? (
                        schedulablePosts.map((o) => (
                          <PostButton
                            text={o.text}
                            selected={form.watch("postId") === o.id}
                            onClick={() => form.setValue("postId", o.id)}
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

const PostButton = ({
  text, selected, onClick
}: {
  text: string, selected: boolean, onClick: () => void
}) => (
  <div 
  onClick={onClick} 
  className={cn(
    `w-full hover:bg-muted cursor-pointer transition-colors border rounded-lg 
    bg-background border-border p-4 whitespace-pre-wrap`,
    selected && "bg-secondary border-secondary-foreground hover:bg-secondary"
  )}
  >
    {text}
  </div>
)