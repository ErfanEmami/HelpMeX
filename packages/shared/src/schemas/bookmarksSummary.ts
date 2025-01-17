import { z } from 'zod';

export const SummaryThemeSchema = z.object({
  themeTitle: z.string(),
  keyInsights: z.array(z.string()),
  actionableItems: z.array(z.string()),
  bookmarkRefs: z.array(z.string()), // or z.number() depending on your data
});

export const SystemResponseSchema = z.object({
  themes: z.array(SummaryThemeSchema),
});
