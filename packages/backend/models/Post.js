import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  author: { type: String, default: null }, // twitter username the fine-tuned model was trained on 

  // if post was generated
  genMetadata: {
    type: {
      jobId: { type: String, required: true }, // fine-tuning job ID
      prompt: { type: String, required: true },
    },
    required: function () { return this.author !== null; },
    default: null,
  },

  createdAt: { type: Date, default: Date.now },
});

// Ensure virtuals (like .id) are included when logged or in API response
postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });

const Post = mongoose.model("Post", postSchema);
export default Post;

export const createManualPost = async ({ userId, text }) => {
  const newPost = new Post({ userId, text });
  return await newPost.save();
};

export const createGeneratedPost = async ({ jobId, userId, text, author, prompt }) => {
  if (!author) {
    throw new Error("AI-generated posts must have an author.");
  }

  const newGeneratedPost = new Post({
    userId,
    text,
    author,
    genMetadata: { jobId, prompt },
  });

  return await newGeneratedPost.save();
};

export const getPost = async (id) => {
  const generatedPost = await Post.findOne({ _id: id });
  return generatedPost;
};

export const getGeneratedPosts = async (userId, author) => {
  if (!author) {
    throw new Error("AI-generated posts must have an author.");
  }

  const generatedPosts = await Post.find({ userId, author });
  return generatedPosts;
};

export const getAllPosts = async (userId) => {
  const posts = await Post.find({ userId });
  return posts;
};

export const getSchedulablePosts = async (userId) => {
  const schedulablePosts = await Post.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(String(userId)) } // Step 1: Filter only posts for this user
    },
    {
      $lookup: {
        from: "scheduledposts",   // Join with ScheduledPost collection
        localField: "_id",        // `_id` from Post
        foreignField: "postId",   // `postId` from ScheduledPost
        as: "scheduleData"        // Store results in `scheduleData`
      }
    },
    {
      $match: {
        $or: [
          { scheduleData: { $size: 0 } },     // No matching entry in ScheduledPost
          { "scheduleData.status": "failed" } // Exists in ScheduledPost but failed
        ]
      }
    },
    {
      $set: {
        id: { $toString: "$_id" }, // aggregate() doesnt keep virtual fields
      },
    },
  ]);

  return schedulablePosts;
};
