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

export const AuthorSchema = z.object({
  authorId: z.string(), // from twitter API
  name: z.string(),
  username: z.string(),
  profileImage: z.string(),
});

export const BookmarkSchema = z.object({
  author: AuthorSchema,
  bookmarkId: z.string(), // from twitter API
  postedAt: z.string(),
  text: z.string(),
});

export const BookmarksAuthorsSchema = z.object({
  bookmarks: z.array(BookmarkSchema),
  authors: z.array(AuthorSchema),
})

export const SaveSummarySchema = z.object({
  summary: GeneratedSummarySchema,
  bookmarks: z.array(BookmarkSchema)
})

// db record
export const SavedSummarySchema = z.object({
  id: z.string(),
  userId: z.string(),
  bookmarks: z.array(BookmarkSchema),
  summary: GeneratedSummarySchema,
  authors: z.array(AuthorSchema),
  createdAt: z.date(),
})
export const SavedSummariesSchema = z.array(SavedSummarySchema)
