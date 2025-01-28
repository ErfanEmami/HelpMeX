import { z } from 'zod';

export const SummaryThemeSchema = z.object({
  themeTitle: z.string(),
  keyInsights: z.array(z.string()),
  actionableItems: z.array(z.string()),
  bookmarkRefs: z.array(z.string()), // or z.number() depending on your data
});

export const GeneratedSummarySchema = z.object({
  themes: z.array(SummaryThemeSchema),
});

export const BookmarkSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  profileImage: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  text: z.string(),
});

export const SaveSummarySchema = z.object({
  summary: GeneratedSummarySchema,
  bookmarks: z.array(BookmarkSchema)
})

export const SavedSummarySchema = z.object({
  summary: GeneratedSummarySchema,
  bookmarks: z.array(BookmarkSchema),
  userId: z.string(),
  createdAt: z.date(),
})