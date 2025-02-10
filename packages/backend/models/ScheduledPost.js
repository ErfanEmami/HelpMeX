import mongoose from "mongoose";
import { STATUS_VALUES } from "shared";

export const STATUS_COLUMN = {
  type: String,
  enum: [...STATUS_VALUES],
  default: "pending",
};

const scheduledPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  scheduledFor: { type: String, required: true },
  status: STATUS_COLUMN,
  errorMessage: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Ensure virtuals (like .id) are included in API response
scheduledPostSchema.set("toObject", { virtuals: true });
scheduledPostSchema.set("toJSON", { virtuals: true });

const ScheduledPost = mongoose.model("ScheduledPost", scheduledPostSchema);
export default ScheduledPost;

export const createScheduledPost = async ({ postId, scheduledFor, userId }) => {
  const scheduledPost = await ScheduledPost.create({ postId, scheduledFor, userId });
  return await ScheduledPost.findById(scheduledPost._id).populate("postId");
};

export const getScheduledPost = async (_id) => {
  return await ScheduledPost.findOne({ _id }).populate("postId");
};

export const getScheduledPosts = async (userId) => {
  return await ScheduledPost.find({ userId }).populate("postId");
};

export const deleteScheduledPost = async (_id) => {
  return await ScheduledPost.findOneAndDelete({ _id });
};