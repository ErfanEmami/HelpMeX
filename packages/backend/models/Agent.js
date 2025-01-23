import mongoose from 'mongoose';

const agent = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true }, // fine-tune id
  trainingFileId: { type: String, required: true, unique: true },
  userId: { type: String, required: true }, // user._id
  author: { type: String, required: true, unique: true }, // twitter/x user the agent is trained on
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Agent = mongoose.model('Agent', agent);
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
