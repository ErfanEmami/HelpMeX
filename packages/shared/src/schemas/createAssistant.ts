import { z } from 'zod';

export const CreateAssistantSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .regex(/^[a-zA-Z0-9_]{1,15}$/, "Must be a valid username without @"),
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
});

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
