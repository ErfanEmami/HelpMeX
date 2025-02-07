import mongoose from "mongoose";
import { STATUS_COLUMN } from "./GeneratedThread.js";

const generatedPostSchema = new mongoose.Schema({
  jobId: { type: String, required: true }, // fine-tune id
  author: { type: String, required: true }, // inpso account username
  userId: { type: String, required: true },
  prompt: { type: String, required: true },
  text: { type: String, required: true },
  scheduledFor: { type: String, default: null },
  status: STATUS_COLUMN,
  errorMessage: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Ensure virtuals (like .id) are included when logged or in API response
generatedPostSchema.set("toObject", { virtuals: true });
generatedPostSchema.set("toJSON", { virtuals: true });

const GeneratedPost = mongoose.model("GeneratedPost", generatedPostSchema);
export default GeneratedPost;

export const createGeneratedPost = async ({ jobId, userId, text, author, prompt }) => {
  const newGeneratedPost = new GeneratedPost({ jobId, userId, text, author, prompt });
  return await newGeneratedPost.save();
};

export const getGeneratedPost = async (id) => {
  const generatedPost = await GeneratedPost.findOne({ _id: id });
  return generatedPost;
};

export const getGeneratedPosts = async (userId, author) => {
  const generatedPosts = await GeneratedPost.find({ userId, author });
  return generatedPosts;
};

export const getSchedulablePosts = async (userId) => {
  const schedulablePosts = await GeneratedPost.find({ 
    userId, 
    status: { $in: ["not_scheduled", "failed"] } 
  });

  return schedulablePosts;
};

export const setPostSchedule = async ({postId, scheduledFor}) => {
  const updatedPost = await GeneratedPost.findByIdAndUpdate(
    postId, 
    { scheduledFor: scheduledFor, status: "pending" },
    { new: true }
  );

  return updatedPost
}

export const getScheduledPost = async (id) => {
  const scheduledPost = await GeneratedPost.findOne({
    _id: id,
    scheduledFor: { $ne: null }, // scheduledFor not null
  });

  return scheduledPost;
};

export const getScheduledPosts = async (userId) => {
  const scheduledPosts = await GeneratedPost.find({
    userId,
    scheduledFor: { $ne: null }, // scheduledFor not null
  });

  return scheduledPosts;
};
