import express from "express";
import { TwitterApi } from "twitter-api-v2";
import authMiddleware from "../middleware/authMiddleware.js";
import { GPTClient } from "../lib/openai.js";

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// get bookmarks
router.get("/", async (req, res) => {
  const { accessToken } = req.user;

  try {
    const twitterClient = new TwitterApi(accessToken);
    const res = await twitterClient.v2.bookmarks({
      expansions: ["author_id", "attachments.media_keys"],
      "tweet.fields": ["created_at", "text", "entities"],
      "user.fields": ["username", "name", "profile_image_url"],
    });

    res.json(res);
    // res.json(bookmarks.data);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: error.message });
  }
});

// analyze bookmarks
router.post("/analyze-bookmarks", async (req, res) => {
  const { bookmarks } = req.body
  try {
    const gptClient = new GPTClient();
    const res = await gptClient.analyzeBookmarks(bookmarks);

    res.json(res);
    // res.json(bookmarks.data);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
