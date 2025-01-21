import mongoose from 'mongoose';

const agent = new mongoose.Schema({
  agentId: { type: String, required: true, unique: true }, // fine-tune id
  trainingFileId: { type: String, required: true, unique: true },
  userId: { type: String, required: true }, // user._id
  author: { type: String, required: true, unique: true }, // twitter/x user the agent is trained on
  createdAt: { type: Date, default: Date.now },
});

const Agent = mongoose.model('Agent', agent);
export default Agent;

export const createAgent = async ({ agentId, userId, trainingFileId, author }) => {
  const newAgent = new Agent({ agentId, userId, trainingFileId, author });
  return await newAgent.save();
}

export const getAgentByAuthor = async (userId, author) => {
  const agent = await Agent.findOne({ userId, author });
  return agent
} 
