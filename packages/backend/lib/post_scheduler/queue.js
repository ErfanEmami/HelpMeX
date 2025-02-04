import { Queue } from "bullmq";
import { redisConnection } from "../../redis.js";

export const postQueue = new Queue("postQueue", {
  connection: redisConnection,
});

export const enqueuePost = async (scheduledFor, postId) => {
  const delay = new Date(scheduledFor).getTime() - Date.now();
  await postQueue.add("sendPost", { postId }, { delay });
};
