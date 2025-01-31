import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateResponse } from "../lib/utils.js";
import {
  createScheduledPost,
  getScheduledPosts,
} from "../models/ScheduledPost.js";
import {
  ScheduledPostSchema,
  ScheduledPostsSchema,
  SchedulePostSchema,
} from "shared";

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// get all scheduled posts
router.get("/", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const scheduledPosts = await getScheduledPosts(userId);

    // validate response
    const validatedRes = validateResponse(ScheduledPostsSchema, scheduledPosts);

    res.json(validatedRes);
  } catch (error) {
    console.error("Error getting scheduled posts:", error);
    res.status(500).json({ message: error.message });
  }
});

// create scheduled post
router.post("/create", async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Validate the input using Zod
    const validateInput = SchedulePostSchema.safeParse(req.body);

    if (!validateInput.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validateInput.error.errors,
      });
    }

    const validatedInput = validateInput.data;

    const scheduledPost = await createScheduledPost({
      userId,
      ...validatedInput,
    });

    // validate response
    const validatedRes = validateResponse(ScheduledPostSchema, scheduledPost);

    res.json(validatedRes);
  } catch (error) {
    console.error("Error scheduling post:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
