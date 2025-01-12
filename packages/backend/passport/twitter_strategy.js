import passport from 'passport';
import { Strategy } from '@superfaceai/passport-twitter-oauth2';

import User from '../models/User.js';

passport.use(
  new Strategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      clientType: 'confidential', // depends on your Twitter app settings, valid values are `confidential` or `public`
      callbackURL: process.env.TWITTER_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({ twitterId: profile.id });

        // Create a new user if not found
        if (!user) {
          user = new User({
            twitterId: profile.id,
            displayName: profile.displayName,
            username: profile.username,
            photos: profile.photos.map((photo) => photo.value),
          });
          await user.save();
        }

        // Add tokens to session (not stored in DB)
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        
        // can maybe just pass profile instead of user
        done(null, user);
      } catch (error) {
        console.error('Error during authentication:', error);
        done(error, null);
      }
    }
  )
);

// Serialize and deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
