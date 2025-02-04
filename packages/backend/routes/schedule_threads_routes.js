import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateResponse } from "../lib/utils.js";

import {
  ScheduledThreadSchema,
  ScheduledThreadsSchema,
  ScheduleThreadSchema,
} from "shared";
import { createScheduledThread, getScheduledThreads } from "../models/ScheduledThread.js";
import { enqueueThread, threadQueue } from "../lib/thread_scheduler/queue.js";

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// get all scheduled threads
router.get("/", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const scheduledThreads = await getScheduledThreads(userId);

    // validate response
    const validatedRes = validateResponse(ScheduledThreadsSchema, scheduledThreads);

    res.json(validatedRes);
  } catch (error) {
    console.error("Error getting scheduled threads:", error);
    res.status(500).json({ message: error.message });
  }
});

// create scheduled thread
router.post("/create", async (req, res) => {
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

    const scheduledThread = await createScheduledThread({
      userId,
      ...validatedInput,
    });

    // Schedule job in BullMQ
    await enqueueThread(validatedInput.scheduledFor, scheduledThread._id)

    // validate response
    const validatedRes = validateResponse(ScheduledThreadSchema, scheduledThread);

    res.json(validatedRes);
  } catch (error) {
    console.error("Error scheduling post:", error);
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
