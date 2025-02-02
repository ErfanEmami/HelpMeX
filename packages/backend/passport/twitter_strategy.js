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
        const expiresAt = Date.now() + 7200 * 1000 // twitter token expires after 2 hours

        // Create a new user if not found
        if (!user) {
          user = new User({
            twitterId: profile.id,
            displayName: profile.displayName,
            username: profile.username,
            photos: profile.photos.map((photo) => photo.value),
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresAt: expiresAt,
          });
        } else {
          // Update access token on re-login
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          user.expiresAt = expiresAt;
        }

        await user.save();
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
