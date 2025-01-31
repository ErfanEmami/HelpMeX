import { z } from "zod";
import {
  GeneratedSummarySchema,
  SummaryThemeSchema,
  CreateAssistantSchema,
  GeneratePostSchema,
  SaveGeneratedPostSchema,
  BookmarkSchema,
  SaveSummarySchema,
  SavedSummarySchema,
  AuthorSchema,
  BookmarksAuthorsSchema,
  GeneratedPostSchema,
  agentSchema,
  SchedulePostSchema,
  ScheduledPostSchema,
  SchedulePostFormSchema,
} from "shared";

export type Author = z.infer<typeof AuthorSchema>;
export type Bookmark = z.infer<typeof BookmarkSchema>;
export type BookmarksAuthors = z.infer<typeof BookmarksAuthorsSchema>;

// Bookmarks GPT Summary
export type BookmarksSummary = z.infer<typeof GeneratedSummarySchema>;
export type SummaryTheme = z.infer<typeof SummaryThemeSchema>;
export type SaveSummary = z.infer<typeof SaveSummarySchema>;
export type SavedSummary = z.infer<typeof SavedSummarySchema>;
export type CreateAssistant = z.infer<typeof CreateAssistantSchema>;
export type Assistant = z.infer<typeof agentSchema>;

// posting assistant
export type GeneratePost = z.infer<typeof GeneratePostSchema>;
export type SaveGeneratedPost = z.infer<typeof SaveGeneratedPostSchema>;
export type GeneratedPost = z.infer<typeof GeneratedPostSchema>;

// scheduling posts
export type SchedulePostForm = z.infer<typeof SchedulePostFormSchema>;
export type SchedulePost = z.infer<typeof SchedulePostSchema>;
export type ScheduledPost = z.infer<typeof ScheduledPostSchema>;

export type CalendarEvent = {
  title?: string;
  start: Date;
  end: Date;
};