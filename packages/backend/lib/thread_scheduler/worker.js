import "../../config.js";

import { Worker } from "bullmq";
import { TwitterApi } from "twitter-api-v2";
import { getUserById } from "../../models/User.js";
import { redisConnection } from "../../redis.js";
import { getAccessToken, safeTweet, sleep } from "../utils.js";
import { getScheduledThread } from "../../models/ScheduledThread.js";

new Worker(
  "threadQueue",
  async (job) => {
    const { threadId } = job.data;

    try {
      console.log(`Attempting job for threadId: ${threadId}`);

      const thread = await getScheduledThread(threadId);
      if (!thread || thread.status !== "pending") {
        console.log(`Thread ${threadId} is not pending or does not exist.`);
        return;
      }

      const user = await getUserById(thread.userId);
      if (!user) {
        thread.status = "failed";
        thread.errorMessage = "User not found";
        console.error("User not found");
        await thread.save();
        return;
      }

      // Get the valid access token
      const accessToken = await getAccessToken(user);
      if (!accessToken) {
        const errorMessage = "Failed to retrieve access token"
        console.error(errorMessage);
        thread.status = "failed";
        thread.errorMessage = errorMessage;
        await thread.save();
        return;
      }

      const client = new TwitterApi(accessToken);
      let lastTweetId = null;
      let allPostsSuccessful = true;

      // Post tweets sequentially
      for (const post of thread.posts) {
        if (post.status !== "pending") continue; // Skip already processed tweets
        /*
          TODO: handle rate limits
          - reschedule thread for 15 minutes later and add "rescheduled=true" db column and store lastTweetId
        */
        try {
          await sleep(5000) // 5 seconds between posts

          const response = await safeTweet(
            client,
            post.text,
            lastTweetId ? { reply: { in_reply_to_tweet_id: lastTweetId } } : {}
          );

          lastTweetId = response.data.id;

          post.status = "sent";
          console.log(`Successfully posted tweet: ${post.text}`);
        } catch (error) {
          console.error(
            `Failed to post tweet: ${post.text}`,
            error.response?.data || error
          );

          post.status = "failed";
          allPostsSuccessful = false;
        }
      }

      thread.status = allPostsSuccessful ? "sent" : "failed"

      await thread.save();
      console.log(`Thread ${threadId} status updated to: ${thread.status}`);
    } catch (e) {
      console.error("threadQueue worker failed:", e.response?.data || e);
    }
  },
  { connection: redisConnection }
);

console.log("threadQueue worker started!");
