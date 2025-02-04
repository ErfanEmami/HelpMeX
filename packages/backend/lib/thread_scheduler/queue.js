import { Queue } from "bullmq";
import { redisConnection } from "../../redis.js";

export const threadQueue = new Queue("threadQueue", {
  connection: redisConnection,
});

// Add a thread to the queue
export const enqueueThread = async (scheduledFor, threadId) => {
  const delay = new Date(scheduledFor).getTime() - Date.now();
  await threadQueue.add("sendThread", { threadId }, { delay });
};
