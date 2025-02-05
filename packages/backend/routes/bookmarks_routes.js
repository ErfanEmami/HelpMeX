import express from "express";
import { TwitterApi } from "twitter-api-v2";
import authMiddleware from "../middleware/authMiddleware.js";
import { BookmarksAnalyzer } from "../lib/openai/bookmarks_analyzer.js";
import { BOOKMARKS, BOOKMARKS_SUMMARY } from "../test/test_data.js";
import { GeneratedSummarySchema, SavedSummarySchema, SaveSummarySchema, BookmarksAuthorsSchema, SavedSummariesSchema } from "shared";
import { createBookmarksSummary, getBookmarksSummaries } from "../models/BookmarksSummary.js";
import { validateResponse } from "../lib/utils.js";

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// get bookmarks
router.get("/", async (req, res) => {

  try {

    /*** Not making real API call due to rate limits ***/

    // const { accessToken } = req.user;
    // const twitterClient = new TwitterApi(accessToken);

    // const res = await twitterClient.v2.bookmarks({
    //   expansions: ["author_id", "attachments.media_keys"],
    //   "tweet.fields": ["created_at", "text", "entities"],
    //   "user.fields": ["username", "name", "profile_image_url"],
    // });

    // helper for fast author lookup
    const authorsMap = {}

    const authors = BOOKMARKS.bookmarks._realData.includes.users.map(user => {
      authorsMap[user.id] = {
        authorId: user.id,
        name: user.name,
        username: user.username,
        profileImage: user.profile_image_url,
      }

      return authorsMap[user.id]
    })

    const bookmarks = BOOKMARKS.bookmarks._realData.data.map(bookmark => ({
      author: authorsMap[bookmark.author_id],
      bookmarkId: bookmark.id,
      postedAt: bookmark.created_at,
      text: bookmark.text,
    }))


    // Validate the response
    const response = { bookmarks, authors }
    const validatedRes = validateResponse(BookmarksAuthorsSchema, response)

    res.json(validatedRes);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: error.message });
  }
});

// analyze bookmarks
router.post("/analyze-bookmarks", async (req, res) => {

  try {
    // const { bookmarks } = req.body
    // const bookmarksAnalyzer = new BookmarksAnalyzer();
    // const gptResponseRaw = await bookmarksAnalyzer.analyzeBookmarks(bookmarks);
    // const gptResponse = JSON.parse(gptResponseRaw)

    /*** Not making real API call due to rate limits ***/
    const gptResponse = BOOKMARKS_SUMMARY
    
    // validate GPT response
    const validatedRes = validateResponse(GeneratedSummarySchema, gptResponse)

    res.json(validatedRes);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: error.message });
  }
});

// store summary
router.post("/save", async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Validate the input
    const validationResult = SaveSummarySchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validationResult.error.errors,
      });
    }

    // Extract and deduplicate authors from bookmarks
    const uniqueAuthors = Array.from(
      new Map(
        validationResult.data.bookmarks.map((bookmark) => [bookmark.author.authorId, bookmark.author])
      ).values()
    );

    const savedBookmarksSummary = await createBookmarksSummary({
      userId: userId,
      authors: uniqueAuthors,
      ...validationResult.data
    });

    // Validate the response
    const validatedRes = validateResponse(SavedSummarySchema, savedBookmarksSummary)

    res.json(validatedRes);
  } catch (error) {
    console.error("Error saving summary:", error);
    res.status(500).json({ message: error.message });
  }
});

// get all of saved summaries
router.get("/summaries", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const summaries = await getBookmarksSummaries(userId);

    // validate response
    const validatedRes = validateResponse(SavedSummariesSchema, summaries)
    
    res.json(validatedRes);    
  } catch (error) {
    console.error("Error getting summaries:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
