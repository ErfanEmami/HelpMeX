import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  authorId: { type: String, required: true }, // from Twitter API
  name: { type: String, required: true },
  username: { type: String, required: true },
  profileImage: { type: String, required: true },
});

const BookmarkSchema = new mongoose.Schema({
  author: { type: AuthorSchema, required: true },
  bookmarkId: { type: String, required: true }, // from Twitter API
  postedAt: { type: String, required: true }, 
  text: { type: String, required: true },
});

const SummaryThemeSchema = new mongoose.Schema({
  themeTitle: { type: String, required: true },
  keyInsights: { type: [String], required: true },
  actionableItems: { type: [String], required: true },
  bookmarkRefs: { type: [String], required: true },
});

const GeneratedSummarySchema = new mongoose.Schema({
  themes: { type: [SummaryThemeSchema], required: true },
});

const BookmarksSummarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookmarks: { type: [BookmarkSchema], required: true },
  authors: { type: [AuthorSchema], required: true }, // duplicate data (from bookmarks field), included here for lookup convenience 
  summary: { type: GeneratedSummarySchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the model
const BookmarksSummary = mongoose.model("BookmarksSummary", BookmarksSummarySchema);
export default BookmarksSummary;

// Ensure virtuals (like .id) are included when logged or in API response
BookmarksSummarySchema.set('toObject', { virtuals: true });
BookmarksSummarySchema.set('toJSON', { virtuals: true });


export const createBookmarksSummary = async ({ userId, bookmarks, summary, authors }) => {
  const newBS = new BookmarksSummary({ userId, bookmarks, summary, authors });
  return await newBS.save();
}

export const getBookmarksSummaries = async (userId) => {
  const BookmarksSummaries = await BookmarksSummary.find({ userId });
  return BookmarksSummaries;
}
