import { z } from "zod";
import { SystemResponseSchema, SummaryThemeSchema } from 'shared';

export type Author = {
  id: string,
  name: string;
  username: string;
  profileImage: string;
};

export type Bookmark = {
  id: string,
  name: string,
  username: string,
  profileImage: string,
  authorId: string,
  createdAt: string,
  text: string,
};

// Bookmarks GPT Summary
export type BookmarksSummary = z.infer<typeof SystemResponseSchema>;
export type SummaryTheme = z.infer<typeof SummaryThemeSchema>;