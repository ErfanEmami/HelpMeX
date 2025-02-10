import mongoose from "mongoose";
import { LENGTH_VALUES, TONE_VALUES } from "shared";

const genConstraintsSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  targetAudience: { type: String, required: true },
  tone: { type: String, enum: [...TONE_VALUES], required: true },
  length: { type: String, enum: [...LENGTH_VALUES], required: true },
});

const ThreadPostSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const ThreadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  posts: { type: [ThreadPostSchema], required: true },
  author: { type: String, default: null }, // twitter username the fine-tuned model was trained on 

  // if thread was generated
  genMetadata: {
    type: {
      jobId: { type: String, default: true },
      constraints: { type: genConstraintsSchema, required: true },
    },
    required: function () { return this.author !== null; },
    default: null,
  },

  createdAt: { type: Date, default: Date.now },
});

// Ensure virtuals (like .id) are included when logged or in API response
ThreadSchema.set("toObject", { virtuals: true });
ThreadSchema.set("toJSON", { virtuals: true });

const Thread = mongoose.model("Thread", ThreadSchema);
export default Thread;

export const createThread = async ({ userId, posts }) => {
  const newThread = new Thread({ userId, posts });
  return await newThread.save();
};

export const createGeneratedThread = async ({ userId, posts, jobId, author, constraints }) => {
  if (!author) {
    throw new Error("AI-generated threads must have an author.");
  }

  const newGeneratedThread = new Thread({
    userId,
    posts,
    author,
    genMetadata: { jobId, constraints },
  });

  return await newGeneratedThread.save();
};

export const getThread = async (id) => {
  const generatedPost = await Thread.findOne({ _id: id });
  return generatedPost;
};

export const getGeneratedThreads = async (userId, author) => {
  if (!author) {
    throw new Error("AI-generated posts must have an author.");
  }

  const generatedPosts = await Thread.find({ userId, author });
  return generatedPosts;
};

export const getAllThreads = async (userId) => {
  const threads = await Thread.find({ userId });
  return threads;
};

export const getSchedulableThreads = async (userId) => {
  const schedulableThreads = await Thread.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(String(userId)) } // Step 1: Filter only threads for this user
    },
    {
      $lookup: {
        from: "scheduledthreads",   // Join with ScheduledThread collection
        localField: "_id",          // `_id` from Post
        foreignField: "threadId",   // `threadId` from ScheduledThread
        as: "scheduleData"          // Store results in `scheduleData`
      }
    },
    {
      $match: {
        $or: [
          { scheduleData: { $size: 0 } },     // No matching entry in ScheduledThread
          { "scheduleData.status": "failed" } // Exists in ScheduledThread but failed
        ]
      }
    },
    {
      $set: {
        id: { $toString: "$_id" }, // aggregate() doesnt keep virtual fields
      },
    },
  ]);

  return schedulableThreads;
};
