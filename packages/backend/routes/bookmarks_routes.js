import express from "express";
import { TwitterApi } from "twitter-api-v2";
import authMiddleware from "../middleware/authMiddleware.js";
import { BookmarksAnalyzer } from "../lib/openai/bookmarks_analyzer.js";
import { BOOKMARKS, BOOKMARKS_SUMMARY } from "../test/test_data.js";
import { SystemResponseSchema } from "shared";

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
        name: user.name,
        username: user.username,
        profileImage: user.profile_image_url,
      }

      return {
        ...authorsMap[user.id],
        id: user.id,
      }
    })

    const bookmarks = BOOKMARKS.bookmarks._realData.data.map(bookmark => ({
      ...authorsMap[bookmark.author_id],
      id: bookmark.id,
      authorId: bookmark.author_id,
      createdAt: bookmark.created_at,
      text: bookmark.text,
    }))

    res.json({ authors, bookmarks });
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
    // const { response } = await bookmarksAnalyzer.analyzeBookmarks(bookmarks);
    // const gptResponse = JSON.parse(response.choices[0].message.content)

    /*** Not making real API call due to rate limits ***/
    const gptResponse = BOOKMARKS_SUMMARY
    
    // validate GPT response
    const validationResult = SystemResponseSchema.safeParse(gptResponse);

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid response format from GPT API",
        errors: validationResult.error.errors,
      });
    }

    res.json(validationResult.data);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
