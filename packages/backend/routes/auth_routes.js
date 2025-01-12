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
router.get("/twitter/return", passport.authenticate("twitter"), (req, res) => {
  res.redirect("/api/auth/user");
});

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
      res.redirect("/");
    });

  });
});

// get oath'd user
router.get("/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json(req.user);
});

export default router;
