import { z } from "zod";
import { SystemResponseSchema, SummaryThemeSchema,CreateAssistantSchema  } from "shared";

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
  id: string
  jobId: string
  trainingFileId: string
  userId: string
  author: string
  name: string
  createdAt: string
};

export type CreateAssistant = z.infer<typeof CreateAssistantSchema>;
