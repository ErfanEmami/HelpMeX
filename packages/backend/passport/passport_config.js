import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByUsername, getUserById } from '../models/User.js';

// Initialize the local strategy (username/password auth method)
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error("User not found.")
    }

    const is_valid_password = await bcrypt.compare(password, user.password);
    if (!is_valid_password) {
      throw new Error("Password incorrect.")
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// serialize and store user id into session
passport.serializeUser((user, done) => {
  done(null, user._id.toString()); 
});

// attach user to request object (req.user)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id)

    if (!user) {
      throw new Error("User not found.")
    }

    done(null, user); 
  } catch (error) {
    done(error, null);
  }
});

// Export the configured passport instance
export default passport;