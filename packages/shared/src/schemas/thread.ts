import { objectIdSchema } from "../util.js";
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
export const SaveManualThreadSchema = z.object({
  posts: z.array(ThreadPostSchema),
});

// UI payload
export const SaveGeneratedThreadSchema = z.object({
  posts: z.array(ThreadPostSchema),
  author: z.string().nonempty("Required"),
  constraints: ThreadConstraintsSchema.required(),
});

const SavedThreadBaseSchema = z.object({
  id: objectIdSchema,
  userId: objectIdSchema,
  posts: z.array(ThreadPostSchema.extend({ _id: objectIdSchema })),
  createdAt: z.date(),
})

// db record
export const SavedManualThreadSchema = SavedThreadBaseSchema.extend({
  author: z.null(),
  genMetadata: z.null(),
})
export const SavedManualThreadsSchema = z.array(SavedManualThreadSchema);

// db record
export const SavedGeneratedThreadSchema = SavedThreadBaseSchema.extend({
  author: z.string(),
  genMetadata: z.object({
    jobId: z.string(),
    constraints: ThreadConstraintsSchema,
  }),
});
export const SavedGeneratedThreadsSchema = z.array(SavedGeneratedThreadSchema);

// db record used for either manual or generated posts
export const FlexibleThreadSchema = SavedThreadBaseSchema.extend({
  author: z.string().nullable(),
  genMetadata: z.object({
    jobId: z.string(),
    constraints: ThreadConstraintsSchema
  }).nullable(),
})
export const FlexibleThreadsSchema = z.array(FlexibleThreadSchema);
