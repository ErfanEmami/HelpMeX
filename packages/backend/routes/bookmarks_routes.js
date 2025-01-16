import express from "express";
import { TwitterApi } from "twitter-api-v2";
import authMiddleware from "../middleware/authMiddleware.js";
import { GPTClient } from "../lib/openai.js";
import { BOOKMARKS } from "../test/test_data.js";

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


    // const obj = {
    //   userPostPairs: [
    //     {
    //       user: {
    //         id,
    //         name,
    //         username,
    //         profileImage,
    //       }
    //       posts: [
    //         id,
    //         created_at,
    //         text
    //       ]
    //     }
    //   ],
    //   users: []
    //   posts: []
    // } 

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
