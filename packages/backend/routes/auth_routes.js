import express from 'express';
import { createUser, getUserByUsername } from '../models/User.js';
import passport from '../passport/passport_config.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existing_user = await getUserByUsername(username);
    if (existing_user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // create user
    const new_user = await createUser({ username, password });

    // Log the user in after registration
    req.logIn(new_user, (error) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json({ user: new_user, error: null });
    });
  } catch (error) {
    return res.status(500).json({ user: null, error: error.message });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error); // Unexpected error
    }
    if (!user) {
      return res.status(401).json({ user: null, error: info.message || "Login failed" }); // Incorrect credentials
    }

    // Log the user in after successful authentication
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      return res.status(200).json({ user: user, error: null });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    } 

    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: 'Error logging out' });
      res.clearCookie('connect.sid');
      res.status(200).json({ error: null });
    });
  });
});

// Check if the user is authenticated
router.get('/check-auth', (req, res) => {
    res.status(200).json({ user: req.user }); // passportJS creates req.user object if authenticated
});

export default router;
