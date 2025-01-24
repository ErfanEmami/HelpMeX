import { z } from "zod";
import {
  SystemResponseSchema,
  SummaryThemeSchema,
  CreateAssistantSchema,
  GeneratePostSchema,
  SaveGeneratedPostSchema,
} from "shared";

export type Author = {
  id: string;
  name: string;
  username: string;
  profileImage: string;
};

export type Bookmark = {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  authorId: string;
  createdAt: string;
  text: string;
};

// Bookmarks GPT Summary
export type BookmarksSummary = z.infer<typeof SystemResponseSchema>;
export type SummaryTheme = z.infer<typeof SummaryThemeSchema>;

export type Assistant = {
  id: string;
  jobId: string;
  trainingFileId: string;
  userId: string;
  author: string;
  name: string;
  createdAt: string;
};

export type CreateAssistant = z.infer<typeof CreateAssistantSchema>;

export type GeneratePost = z.infer<typeof GeneratePostSchema>;
export type SaveGeneratedPost = z.infer<typeof SaveGeneratedPostSchema>;

export type GeneratedPost = {
  id: string;
  jobId: string;
  author: string;
  userId: string;
  prompt: string;
  text: string;
  createdAt: string;
};
