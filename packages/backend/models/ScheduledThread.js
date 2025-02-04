import mongoose from "mongoose";

const statusEnum = {
  type: String,
  enum: ["pending", "sent", "failed"],
  default: "pending",
};

const PostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  status: statusEnum
});

const scheduledThreadSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  posts: { type: [PostSchema], required: true },
  scheduledFor: { type: String, required: true },
  status: statusEnum,
  createdAt: { type: Date, default: Date.now },
  errorMessage: { type: String },
});

// Ensure virtuals (like .id) are included when logged or in API response
scheduledThreadSchema.set("toObject", { virtuals: true });
scheduledThreadSchema.set("toJSON", { virtuals: true });

const ScheduledThread = mongoose.model("ScheduledThread", scheduledThreadSchema);
export default ScheduledThread;

export const createScheduledThread = async ({ userId, text, scheduledFor }) => {
  const newScheduledThread = new ScheduledThread({ userId, text, scheduledFor });
  return await newScheduledThread.save();
};

export const getScheduledThread = async (id) => {
  const scheduledThread = await ScheduledThread.findOne({ _id: id });
  return scheduledThread;
};

export const getScheduledThreads = async (userId) => {
  const scheduledThreads = await ScheduledThread.find({ userId });
  return scheduledThreads;
};
