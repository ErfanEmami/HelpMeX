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
  ThreadConstraintsSchema,
  GeneratedThreadSchema,
  SaveGeneratedThreadSchema,
  SavedGeneratedThreadSchema,
  ScheduleThreadSchema,
  ScheduledPostExtendedSchema,
  FlexiblePostSchema,
} from "shared";
import { TOOLS_DEF } from "@/components/sidebar/NavItems";

export type ToolBaseUrls = (typeof TOOLS_DEF)[number]["baseUrl"];

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

// content assistant
export type GeneratePost = z.infer<typeof GeneratePostSchema>;
export type SaveGeneratedPost = z.infer<typeof SaveGeneratedPostSchema>;
export type GeneratedPost = z.infer<typeof GeneratedPostSchema>;
export type FlexiblePost = z.infer<typeof FlexiblePostSchema>;

export type ThreadConstraints = z.infer<typeof ThreadConstraintsSchema>;
export type GeneratedThread = z.infer<typeof GeneratedThreadSchema>;
export type SaveGeneratedThread = z.infer<typeof SaveGeneratedThreadSchema>;
export type SavedGeneratedThread = z.infer<typeof SavedGeneratedThreadSchema>;

// scheduling posts
export type SchedulePostFormProps = z.infer<typeof SchedulePostFormSchema>;
export type SchedulePost = z.infer<typeof SchedulePostSchema>;
export type ScheduledPostExtended = z.infer<typeof ScheduledPostExtendedSchema>;
export type ScheduledPost = z.infer<typeof ScheduledPostSchema>;

// scheduling threads
export type ScheduleThread = z.infer<typeof ScheduleThreadSchema>;

export type CalendarEvent = {
  title?: string;
  start: Date;
  end: Date;
};