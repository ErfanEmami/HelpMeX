import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateResponse } from "../lib/utils.js";
import {
  FlexibleThreadsSchema,
  ScheduledThreadExtendedSchema,
  ScheduledThreadsExtendedSchema,
  ScheduleThreadSchema,
} from "shared";
import { enqueueThread, threadQueue } from "../lib/thread_scheduler/queue.js";
import { getSchedulableThreads, getThread } from "../models/Thread.js";
import { createScheduledThread, getScheduledThreads } from "../models/ScheduledThread.js";

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// get all scheduled threads
router.get("/", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const scheduledThreads = await getScheduledThreads(userId);

    // validate response
    const validatedRes = validateResponse(ScheduledThreadsExtendedSchema, scheduledThreads);

    res.json(validatedRes);
  } catch (error) {
    console.error("Error getting scheduled threads:", error);
    res.status(500).json({ message: error.message });
  }
});

// schedule a thread
router.post("/new", async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Validate the input using Zod
    const validateInput = ScheduleThreadSchema.safeParse(req.body);

    if (!validateInput.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validateInput.error.errors,
      });
    }

    const validatedInput = validateInput.data;

    const { posts } = await getThread(validatedInput.threadId);
    const scheduledThread = await createScheduledThread({ 
      ...validatedInput, 
      userId: userId, 
      posts: posts.map(post => ({ threadPostId: post._id }))
    });

    // validate response
    const validatedRes = validateResponse(ScheduledThreadExtendedSchema, scheduledThread);

    // Schedule job in BullMQ
    await enqueueThread(validatedInput.scheduledFor, scheduledThread._id)

    res.json(validatedRes);
  } catch (error) {
    console.error("Error scheduling post:", error);
    res.status(500).json({ message: error.message });
  }
});

// get threads that can be scheduled
router.get("/schedulable", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const generatedThreads = await getSchedulableThreads(userId);

    // validate response
    const validatedRes = validateResponse(FlexibleThreadsSchema, generatedThreads)
    
    res.json(validatedRes);
  } catch (error) {
    console.error("Error getting schedulable threads:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/queue-status", async (req, res) => {
  const waiting = await threadQueue.getWaiting();
  const active = await threadQueue.getActive();
  const completed = await threadQueue.getCompleted();
  const failed = await threadQueue.getFailed();

  res.json({ waiting, active, completed, failed });
});

export default router;
