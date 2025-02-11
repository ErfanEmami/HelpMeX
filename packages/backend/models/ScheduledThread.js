import "./Thread.js"; // Ensure it's registered for populate()

import mongoose from "mongoose";
import { STATUS_COLUMN } from "./ScheduledPost.js";

const scheduledThreadPost = new mongoose.Schema({
  threadPostId: { type: mongoose.Schema.Types.ObjectId, required: true }, // References id of ThreadPostSchema
  status: STATUS_COLUMN,
});

const ScheduledThreadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  threadId: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: true },
  scheduledFor: { type: String, required: true },
  posts: { type: [scheduledThreadPost], required: true }, // post-level statuses
  status: STATUS_COLUMN, // thread-level status
  errorMessage: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Ensure virtuals (like .id) are included when logged or in API response
ScheduledThreadSchema.set("toObject", { virtuals: true });
ScheduledThreadSchema.set("toJSON", { virtuals: true });

const ScheduledThread = mongoose.model("ScheduledThread", ScheduledThreadSchema);
export default ScheduledThread;

export const createScheduledThread = async ({ threadId, scheduledFor, userId, posts }) => {
  const scheduledThread = await ScheduledThread.create({ threadId, scheduledFor, userId, posts });
  return await ScheduledThread.findById(scheduledThread._id).populate("threadId");
};

export const getScheduledThread = async (_id) => {
  return await ScheduledThread.findOne({ _id }).populate("threadId");
};

export const getScheduledThreads = async (userId) => {
  return await ScheduledThread.find({ userId }).populate("threadId");
};

export const deleteScheduledThread = async (_id) => {
  return await ScheduledThread.findOneAndDelete({ _id });
};