import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  twitterId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  username: { type: String, required: true },
  photos: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// Add token and tokenSecret as virtual fields (won't be stored in DB)
userSchema.virtual('accessToken');
userSchema.virtual('refreshToken');

// Ensure virtuals are included in console.log
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);
export default User;

export const createUser = async ({ username, password }) => {
  const newUser = new User({ username, password });
  return await newUser.save();
}

export const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user
} 

export const getUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  return user
} 
