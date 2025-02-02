import "../../config.js";

import { Worker } from "bullmq";
import { TwitterApi } from "twitter-api-v2";
import { getUserById } from "../../models/User.js";
import { redisConnection } from "./queue.js";
import { refreshTwitterToken } from "../utils.js";
import { getScheduledPost } from "../../models/ScheduledPost.js";

new Worker(
  "postQueue",
  async (job) => {
    const { postId } = job.data;

    try {
      console.log("Attempting job for postId:", postId);

      const post = await getScheduledPost(postId);
      if (!post || post.status !== "pending") {
        console.log(`${postId} is not pending or is null`);
        return;
      }

      const user = await getUserById(post.userId);
      if (!user) {
        post.status = "failed";
        post.errorMessage = "User not found";
        console.error("User not found");
        await post.save();
        return;
      }

      try {
        // If token is expired, refresh it
        if (Date.now() > user.expiresAt) {
          console.log("Refreshing Twitter token...");
          user.accessToken = await refreshTwitterToken(user);
        }

        const client = new TwitterApi(user.accessToken);
        // await client.v2.tweet(post.text);
        console.log("Successfully sent post for postId:", postId);

        post.status = "sent";
        await post.save();
      } catch (error) {
        console.error("Post failed:", error.response?.data || error);

        // Handle revoked access
        if (error.response?.status === 401) {
          await ScheduledTweet.updateMany(
            { userId: post.userId, status: "pending" },
            { status: "failed", errorMessage: "Twitter access revoked" }
          );
          user.accessToken = null;
          user.refreshToken = null;
          await user.save();
        }

        post.status = "failed";
        await post.save();
      }
    } catch (e) {
      console.error("postQueue worker failed:", e.response?.data || e);
    }
  },
  { connection: redisConnection }
);

console.log("postQueue worker started");
