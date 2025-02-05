import { z } from "zod";

/* ------- generating ------- */

export const TONE_VALUES = ["casual", "professional", "storytelling"] as const;
export const LENGTH_VALUES = [
  "around 3 posts",
  "around 5 posts",
  "around 7 posts",
] as const;

export const toneSchema = z.enum(TONE_VALUES);
export const lengthSchema = z.enum(LENGTH_VALUES);

// UI form input
export const ThreadConstraintsSchema = z.object({
  topic: z.string().nonempty("Required"),
  targetAudience: z.string().nonempty("Required"),
  tone: toneSchema,
  length: lengthSchema,
});

export const ThreadPostSchema = z.object({
  text: z.string().nonempty("Required"),
});

// AI response
export const GeneratedThreadSchema = z.object({
  posts: z.array(ThreadPostSchema),
});

// UI payload
export const SaveGeneratedThreadSchema = z.object({
  constraints: ThreadConstraintsSchema,
  posts: z.array(ThreadPostSchema),
  author: z.string().nonempty("Required"),
});

// db record
export const SavedGeneratedThreadSchema = z.object({
  constraints: ThreadConstraintsSchema,
  posts: z.array(ThreadPostSchema.extend({ status: z.string() })),
  author: z.string().nonempty("Required"),

  id: z.string(),
  userId: z.string(),
  jobId: z.string().nullable().optional(),
  status: z.string(),
  scheduledFor: z.string().nullable().optional(),
  errorMessage: z.string().nullable().optional(),
  createdAt: z.date(),
});
export const SavedGeneratedThreadsSchema = z.array(SavedGeneratedThreadSchema);

/* ------- scheduling ------- */

// UI payload
export const ScheduleThreadSchema = z.object({
  threadId: z.string().nonempty("Required"),
  scheduledFor: z.string().nonempty("Required"),
});

// db record
export const ScheduledThreadSchema = SavedGeneratedThreadSchema.extend({
  scheduledFor: z.string().nonempty("Required"),
});
export const ScheduledThreadsSchema = z.array(ScheduledThreadSchema);


