import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: String, required: true, unique: true }, // fine-tune id
  trainingFileId: { type: String, required: true, unique: true },
  author: { type: String, required: true }, // twitter username the agent is trained on
  name: { type: String, required: true }, // display name
  createdAt: { type: Date, default: Date.now },
});

// Ensure virtuals (like .id) are included when logged or in API response
agentSchema.set('toObject', { virtuals: true });
agentSchema.set('toJSON', { virtuals: true });

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;

export const createAgent = async ({ jobId, userId, trainingFileId, author, name }) => {
  const newAgent = new Agent({ jobId, userId, trainingFileId, author, name });
  return await newAgent.save();
}

export const getAgentByAuthor = async (userId, author) => {
  const agent = await Agent.findOne({ userId, author });
  return agent
} 

export const getAgents = async (userId) => {
  const agents = await Agent.find({ userId });
  return agents;
}
