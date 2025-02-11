import { z } from "zod";
import { FlexiblePostSchema } from "./post.js";
import { statusSchema } from "./scheduledThread.js";
import { objectIdSchema } from "../util.js";

export const CONTENT_TYPE_VALUES = ["existing", "manual"] as const;
export const contentTypes = z.enum(CONTENT_TYPE_VALUES);

export const SchedulePostFormSchema = z.discriminatedUnion("contentType", [
  z.object({
    contentType: z.literal("existing"),
    postId: z.string().nonempty("You must select a post."),
    date: z.date(),
    time: z
      .string()
      .nonempty("Required")
      .regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Required format: HH:MM AM/PM"),
  }),
  z.object({
    contentType: z.literal("manual"),
    text: z.string().nonempty("You must enter text for a manual post."),
    date: z.date(),
    time: z
      .string()
      .nonempty("Required")
      .regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Required format: HH:MM AM/PM"),
  }),
]);

// UI payload
export const SchedulePostSchema = z.object({
  postId: z.string().nonempty("Required"),
  scheduledFor: z.string().nonempty("Required"), // combined date and time
});

// db record
export const ScheduledPostSchema = z.object({
  id: objectIdSchema,
  userId: objectIdSchema,
  postId: objectIdSchema,
  scheduledFor: z.string(),
  status: statusSchema,
  errorMessage: z.string().optional().nullable(),
  createdAt: z.date(),
});
export const ScheduledPostsSchema = z.array(ScheduledPostSchema);

// db record extended
export const ScheduledPostExtendedSchema = ScheduledPostSchema.omit({
  postId: true,
}).merge(
  z.object({
    postId: FlexiblePostSchema,
  })
);
export const ScheduledPostsExtendedSchema = z.array(
  ScheduledPostExtendedSchema
);
