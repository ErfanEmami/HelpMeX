import "../../config.js";

import { Worker } from "bullmq";
import { TwitterApi } from "twitter-api-v2";
import { getUserById } from "../../models/User.js";
import { redisConnection } from "../../redis.js";
import {getAccessToken, safeTweet} from "../utils.js";
import GeneratedPost, { getScheduledPost } from "../../models/GeneratedPost.js";

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
        const accessToken = await getAccessToken(user);
        if (!accessToken) {
          const errorMessage = "Failed to retrieve access token"
          console.error(errorMessage);
          post.status = "failed";
          post.errorMessage = errorMessage
          await post.save();
          return;
        }

        const client = new TwitterApi(accessToken);
        /*
          TODO: handle rate limits
          - reschedule post for 15 minutes later and add "rescheduled=true" db column
        */
        // await safeTweet(client, post.text);
        console.log(`Successfully sent post for postId: ${postId}`);

        post.status = "sent";
        await post.save();
      } catch (error) {
        console.error("Post failed:", error.response?.data || error);

        // Handle revoked access
        if (error.response?.status === 401) {
          console.log(`Twitter access revoked. Marking all pending posts for userId ${post.userId} as failed.`);
          await GeneratedPost.updateMany(
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
