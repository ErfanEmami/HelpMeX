import { objectIdSchema } from '../util.js';
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

// db record
export const agentSchema = z.object({
  id: objectIdSchema,
  userId: objectIdSchema,
  jobId: z.string(),
  trainingFileId: z.string(),
  author: z.string(),
  name: z.string(),
  createdAt: z.date(),
})
export const agentsSchema = z.array(agentSchema);


