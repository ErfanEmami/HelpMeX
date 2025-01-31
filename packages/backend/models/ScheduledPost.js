import mongoose from "mongoose";

const scheduledPostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  scheduledFor: { type: String, required: true }, // having issues with storing UTC Date object and converting to local on UI, but works when UTC string
  createdAt: { type: Date, default: Date.now },
});

// Ensure virtuals (like .id) are included when logged or in API response
scheduledPostSchema.set("toObject", { virtuals: true });
scheduledPostSchema.set("toJSON", { virtuals: true });

const ScheduledPost = mongoose.model("ScheduledPost", scheduledPostSchema);
export default ScheduledPost;

export const createScheduledPost = async ({ userId, text, scheduledFor }) => {
  const newScheduledPost = new ScheduledPost({ userId, text, scheduledFor });
  return await newScheduledPost.save();
};

export const getScheduledPost = async (id) => {
  const scheduledPost = await ScheduledPost.findOne({ id });
  return scheduledPost;
};

export const getScheduledPosts = async (userId) => {
  const scheduledPosts = await ScheduledPost.find({ userId });
  return scheduledPosts;
};
