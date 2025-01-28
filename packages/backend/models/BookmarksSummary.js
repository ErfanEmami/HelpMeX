import mongoose from "mongoose";

// Bookmark schema
const BookmarkSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  profileImage: { type: String, required: true },
  authorId: { type: String, required: true },
  createdAt: { type: String, required: true },
  text: { type: String, required: true },
});

// Summary Theme schema
const SummaryThemeSchema = new mongoose.Schema({
  themeTitle: { type: String, required: true },
  keyInsights: { type: [String], required: true },
  actionableItems: { type: [String], required: true },
  bookmarkRefs: { type: [String], required: true }, // Could also be [Number] if needed
});

// System Response schema
const GeneratedSummarySchema = new mongoose.Schema({
  themes: { type: [SummaryThemeSchema], required: true },
});

// BookmarksSummary schema
const BookmarksSummarySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookmarks: { type: [BookmarkSchema], required: true },
  summary: { type: GeneratedSummarySchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the model
const BookmarksSummary = mongoose.model("BookmarksSummary", BookmarksSummarySchema);
export default BookmarksSummary;

// Ensure virtuals (like .id) are included when logged or in API response
BookmarksSummarySchema.set('toObject', { virtuals: true });
BookmarksSummarySchema.set('toJSON', { virtuals: true });


export const createBookmarksSummary = async ({ userId, bookmarks, summary }) => {
  const newBS = new BookmarksSummary({ userId, bookmarks, summary });
  return await newBS.save();
}

export const getBookmarksSummaries = async (userId) => {
  const BookmarksSummaries = await BookmarksSummary.find({ userId });
  return BookmarksSummaries;
}
