import express from "express";
import passport from "../passport/twitter_strategy.js";

const router = express.Router();

// Start Twitter login flow
router.get(
  "/twitter",
  passport.authenticate("twitter", {
    scope: ["tweet.read", "bookmark.read", "users.read"],
  })
);

// Handle Twitter callback
router.get("/twitter/return", passport.authenticate("twitter", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: "/api/auth/login/failed"
}));

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    } 
    
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging out' });
      } 
      res.clearCookie('connect.sid');
      res.json({message: "Successfully logged out"})
    });

  });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({message: "Authentication failed."});
});

// get oath'd user
router.get("/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({user: null, message: "Not authenticated."});
  }
  res.json({user: req.user});
});

export default router;
