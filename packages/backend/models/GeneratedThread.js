import mongoose from "mongoose";
import { LENGTH_VALUES, TONE_VALUES } from "shared";

const STATUS_COLUMN = {
  type: String,
  enum: ["not_scheduled", "pending", "sent", "failed"],
  default: "not_scheduled",
};

const ThreadConstraintsSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  targetAudience: { type: String, required: true },
  tone: { type: String, enum: [...TONE_VALUES], required: true },
  length: { type: String, enum: [...LENGTH_VALUES], required: true },
});

const ThreadPostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  status: STATUS_COLUMN,
});

const GeneratedThreadSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  jobId: { type: String, default: null }, // not required to allow not using a fine-tuned model
  constraints: { type: ThreadConstraintsSchema, required: true },
  posts: { type: [ThreadPostSchema], required: true },
  author: { type: String, required: true },
  scheduledFor: { type: String, default: null },
  status: STATUS_COLUMN,
  errorMessage: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Ensure virtuals (like .id) are included when logged or in API response
GeneratedThreadSchema.set("toObject", { virtuals: true });
GeneratedThreadSchema.set("toJSON", { virtuals: true });

const GeneratedThread = mongoose.model("GeneratedThread", GeneratedThreadSchema);
export default GeneratedThread;

export const createGeneratedThread = async (values) => {
  const newGeneratedThread = new GeneratedThread(values);
  return await newGeneratedThread.save();
};

export const getGeneratedThread = async (id) => {
  const generatedThread = await GeneratedThread.findOne({ _id: id });
  return generatedThread;
};

export const getGeneratedThreads = async (userId) => {
  const generatedThreads = await GeneratedThread.find({ userId });
  return generatedThreads;
};

export const setThreadSchedule = async ({threadId, scheduledFor}) => {
  const updatedThread = await GeneratedThread.findByIdAndUpdate(
    threadId, 
    { scheduledFor: scheduledFor, status: "pending" },
    { new: true }
  );
  return updatedThread
}

export const getScheduledThread = async (id) => {
  const scheduledThread = await GeneratedThread.findOne({
    _id: id,
    scheduledFor: { $ne: null }, // scheduledFor not null
  });

  return scheduledThread;
};

export const getScheduledThreads = async (userId) => {
  const scheduledThreads = await GeneratedThread.find({
    userId,
    scheduledFor: { $ne: null }, // scheduledFor not null
  });

  return scheduledThreads;
};

