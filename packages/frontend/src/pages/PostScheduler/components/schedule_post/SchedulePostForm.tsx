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
import { SchedulePostFormSchema } from "shared";
import { isBefore } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Content } from "@/components/ControlPanel";
import { cn } from "@/lib/utils";
import { postTypes } from "./SchedulePostModal";

export const SchedulePostForm = ({
  formId,
  schedulablePosts,
  defaultPostType,
  onSubmit,
  setPostType,
}: {
  formId: string;
  schedulablePosts: FlexiblePost[];
  defaultPostType: keyof typeof postTypes;
  onSubmit: (values: SchedulePostFormProps) => void;
  setPostType: (postType: keyof typeof postTypes) => void
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
          name="postId"
          render={({ field }) => (
            <FormItem className="pt-1 flex flex-col flex-1 overflow-y-hidden ">
              <Label>Content</Label>
              <FormControl>
                <Tabs
                  className="flex flex-col overflow-auto h-full"
                  defaultValue={defaultPostType}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger onMouseDown={() => setPostType(postTypes.existing)} value={postTypes.existing}>Select Existing</TabsTrigger>
                    <TabsTrigger onMouseDown={() => setPostType(postTypes.manual)} value={postTypes.manual}>Manual Entry</TabsTrigger>
                  </TabsList>
                  <TabsContent value="manual" className="h-full overflow-auto">
                    {/* fix ring issue with textarea */}
                    <Textarea
                      {...field}
                      className="h-full"
                      placeholder="Manually enter post content... (this will create a new post)"
                    />
                  </TabsContent>
                  <TabsContent value="existing" className="h-full overflow-auto">
                    <Content>
                      {schedulablePosts.length ? (
                        schedulablePosts.map(o => (
                          <PostButton
                            text={o.text}
                            selected={form.watch("postId") === o.id}
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