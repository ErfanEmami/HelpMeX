import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateResponse } from "../lib/utils.js";
import {
  GeneratedPostsSchema,
  ScheduledPostSchema,
  ScheduledPostsSchema,
  SchedulePostSchema,
} from "shared";
import { postQueue, enqueuePost } from "../lib/post_scheduler/queue.js";
import { getSchedulablePosts, getScheduledPosts, setPostSchedule } from "../models/GeneratedPost.js";

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

// schedule a thread
router.post("/new", async (req, res) => {
  try {
    // Validate the input using Zod
    const validateInput = SchedulePostSchema.safeParse(req.body);

    if (!validateInput.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validateInput.error.errors,
      });
    }

    const validatedInput = validateInput.data;

    const scheduledPost = await setPostSchedule(validatedInput);

    // validate response
    const validatedRes = validateResponse(ScheduledPostSchema, scheduledPost);

    // // Schedule job in BullMQ
    await enqueuePost(validatedInput.scheduledFor, scheduledPost._id)

    res.json(validatedRes);
  } catch (error) {
    console.error("Error scheduling post:", error);
    res.status(500).json({ message: error.message });
  }
});

// get posts that can be scheduled
router.get("/schedulable", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const generatedPosts = await getSchedulablePosts(userId);

    // validate response
    const validatedRes = validateResponse(GeneratedPostsSchema, generatedPosts)
    
    res.json(validatedRes);
  } catch (error) {
    console.error("Error getting schedulable posts:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/queue-status", async (req, res) => {
  const waiting = await postQueue.getWaiting();
  const active = await postQueue.getActive();
  const completed = await postQueue.getCompleted();
  const failed = await postQueue.getFailed();

  res.json({ waiting, active, completed, failed });
});

export default router;
