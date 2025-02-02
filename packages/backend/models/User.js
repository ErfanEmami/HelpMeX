import mongoose from 'mongoose';
import { decrypt, encrypt } from '../lib/utils.js';

const userSchema = new mongoose.Schema({
  twitterId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  username: { type: String, required: true },
  photos: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  accessToken: { type: String, required: true, unique: true },
  refreshToken: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

// Encrypt Refresh Token before saving
// cannot be arrow function due to 'this' context
userSchema.pre("save", function (next) {
  if (this.isModified("refreshToken")) {
    this.refreshToken = encrypt(this.refreshToken);
  }
  next();
});

// Decrypt Refresh Token when retrieving
// cannot be arrow function due to 'this' context
userSchema.methods.getDecryptedRefreshToken = function () {
  return decrypt(this.refreshToken);
};

// Ensure virtuals are included in console.log
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);
export default User;

export const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user
} 

export const getUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  return user
} 
