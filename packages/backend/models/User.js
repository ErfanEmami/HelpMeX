import mongoose from 'mongoose';
import { hashPassword } from '../lib/utils.js';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  // Only hash if password is new or changed
  if (!this.isModified('password')) return next(); 
  this.password = await hashPassword(this.password)
  next();
});

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
