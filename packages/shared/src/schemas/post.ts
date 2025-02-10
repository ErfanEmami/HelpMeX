import { objectIdSchema } from "../util.js";
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

export const SaveManualPostSchema = z.object({
  text: z.string().nonempty("text is required"),
});

export const SaveGeneratedPostSchema = z.object({
  text: z.string().nonempty("text is required"),
  author: z.string().nonempty("author is required"),
  prompt: z.string().nonempty("prompt is required"), // User prompt for AI generation
});

const PostBaseSchema = z.object({
  id: objectIdSchema,
  userId: objectIdSchema,
  text: z.string(),
  createdAt: z.date(),
})

// db record
export const ManualPostSchema = PostBaseSchema.extend({
  author: z.null(),
  genMetadata: z.null(),
})
export const ManualPostsSchema = z.array(ManualPostSchema);

// db record
export const GeneratedPostSchema = PostBaseSchema.extend({
  author: z.string(),
  genMetadata: z.object({
    jobId: z.string(),
    prompt: z.string()
  }),
})
export const GeneratedPostsSchema = z.array(GeneratedPostSchema);

// db record used for either manual or generated posts
export const FlexiblePostSchema = PostBaseSchema.extend({
  author: z.string().nullable(),
  genMetadata: z.object({
    jobId: z.string(),
    prompt: z.string()
  }).nullable(),
})
export const FlexiblePostsSchema = z.array(FlexiblePostSchema);
