import mongoose from "mongoose";

const generatedPostSchema = new mongoose.Schema({
  jobId: { type: String, required: true }, // fine-tune id
  author: { type: String, required: true }, // inpso account username
  userId: { type: String, required: true },
  prompt: { type: String, required: true },
  text: { type: String, required: true },
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
