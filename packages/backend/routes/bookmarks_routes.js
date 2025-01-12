import express from "express";
import { TwitterApi } from "twitter-api-v2";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// get bookmarks
router.get("/", async (req, res) => {
  const { accessToken } = req.user;

  try {
    const twitterClient = new TwitterApi(accessToken);
   
    const res = await twitterClient.v2.bookmarks();
    const bookmarks = res
    
    // const bookmarks = res.bookmarks._realData.data

    // const bookmarks = await twitterClient.v2.bookmarks({
    //   expansions: ["author_id", "attachments.media_keys"],
    //   "tweet.fields": ["created_at", "text", "entities"],
    //   "user.fields": ["username", "name"],
    // });

    res.json({ user: req.user, bookmarks: bookmarks });
    // res.json(bookmarks.data);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/test", async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
