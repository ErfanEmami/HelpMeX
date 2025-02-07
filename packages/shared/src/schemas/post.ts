import { z } from "zod";

export const GeneratePostSchema = z.object({
  author: z
    .string()
    .nonempty("Author is required")
    .regex(/^[a-zA-Z0-9_]{1,15}$/, "Must be a valid username without @"),
  prompt: z
    .string()
    .nonempty("Prompt is required")
});

export const SaveGeneratedPostSchema = z.object({
  jobId: z.string().nonempty("jobId is required"),
  author: z.string().nonempty("author is required"),
  userId: z.string().nonempty("userId is required"),
  prompt: z.string().nonempty("prompt is required"),
  text: z.string().nonempty("text is required"),
});

// db record
export const GeneratedPostSchema = z.object({
  jobId: z.string(),
  author: z.string(),
  userId: z.string(),
  prompt: z.string(),
  text: z.string(),

  id: z.string(),
  status: z.string(),
  scheduledFor: z.string().nullable().optional(),
  errorMessage: z.string().nullable().optional(),
  createdAt: z.date(),
})
export const GeneratedPostsSchema = z.array(GeneratedPostSchema);

/* ------- scheduling ------- */

// UI payload
export const SchedulePostSchema = z.object({
  postId: z.string().nonempty("Required"),
  scheduledFor: z.string().nonempty("Required"),
});

// db record
export const ScheduledPostSchema = GeneratedPostSchema.extend({
  scheduledFor: z.string().nonempty("Required"),
});
export const ScheduledPostsSchema = z.array(ScheduledPostSchema);

export const SchedulePostFormSchema = z.object({
  postId: z.string().nonempty("Required"),
  date: z.date(),
  time: z
    .string()
    .nonempty("Required")
    .regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Required format: HH:MM AM/PM")
});

