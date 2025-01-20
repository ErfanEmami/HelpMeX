import express from "express";
import { TwitterApi } from "twitter-api-v2";
import authMiddleware from "../middleware/authMiddleware.js";
import { USER_POSTS } from "../test/test_data.js";

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// get user tweets
router.get("/:username", async (req, res) => {
  try {
    /*** Not making real API call due to rate limits ***/
    // const { accessToken } = req.user;
    // const { username } = req.params;

    // const twitterClient = new TwitterApi(accessToken);

    // // 1. get user ID
    // const user = await twitterClient.v2.userByUsername(username);

    // if (!user || !user.data) {
    //   throw new Error(`X user not found: ${username}`);
    // }

    // // 2: Fetch the user's posts
    // const posts = await twitterClient.v2.userTimeline(user.data.id, {
    //   max_results: 5, // Maximum number of tweets to fetch (up to 100 per request)
    //   "tweet.fields": ["id", "text", "created_at", "public_metrics"], // Include additional fields
    //   exclude: ["retweets", "replies"], // Exclude retweets and replies
    // });

    const posts = USER_POSTS;

    res.json(posts);
  } catch (error) {
    console.error("Error fetching user or posts:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
