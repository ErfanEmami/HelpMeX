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

      const scheduledThread = await getScheduledThread(threadId);
      if (!scheduledThread || scheduledThread.status !== "pending") {
        console.log(`Thread ${threadId} is not pending or does not exist.`);
        return;
      }

      const user = await getUserById(scheduledThread.userId);
      if (!user) {
        scheduledThread.status = "failed";
        scheduledThread.errorMessage = "User not found";
        console.error("User not found");
        await scheduledThread.save();
        return;
      }

      // Get the valid access token
      const accessToken = await getAccessToken(user);
      if (!accessToken) {
        const errorMessage = "Failed to retrieve access token"
        console.error(errorMessage);
        scheduledThread.status = "failed";
        scheduledThread.errorMessage = errorMessage;
        await scheduledThread.save();
        return;
      }

      const client = new TwitterApi(accessToken);
      let lastTweetId = null;
      let allPostsSuccessful = true;

      // Post tweets sequentially
      for (const scheduledPost of scheduledThread.posts) {
        if (scheduledPost.status !== "pending") continue; // Skip already processed tweets
        /*
          TODO: handle rate limits
          - reschedule thread for 15 minutes later and add "rescheduled=true" db column and store lastTweetId
        */
        try {
          const threadPost = scheduledThread.threadId.posts.find(o => o._id.toString() === scheduledPost.threadPostId.toString())
          if (!threadPost) {
            throw new Error(`threadPostId ${scheduledPost.threadPostId} has no corresponding post in thread ${scheduledThread.threadId?.id}`);
          }
          // await sleep(5000) // 5 seconds between posts
          // const response = await safeTweet(
          //   client,
          //   threadPost.text,
          //   lastTweetId ? { reply: { in_reply_to_tweet_id: lastTweetId } } : {}
          // );
          // lastTweetId = response.data.id;

          scheduledPost.status = "sent";
          console.log(`Successfully sent threadPostId ${threadPost._id} for threadId: ${threadId}`);
        } catch (error) {
          console.error(
            `Failed to post threadPostId: ${scheduledPost.threadPostId}`,
            // error.response?.data || error
          );

          scheduledPost.status = "failed";
          allPostsSuccessful = false;
        }
      }

      scheduledThread.status = allPostsSuccessful ? "sent" : "failed"

      await scheduledThread.save();
      console.log(`Thread ${threadId} status updated to: ${scheduledThread.status}`);
    } catch (e) {
      console.error("threadQueue worker failed:", e.response?.data || e);
    }
  },
  { connection: redisConnection }
);

console.log("threadQueue worker started!");
