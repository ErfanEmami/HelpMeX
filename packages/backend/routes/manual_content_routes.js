import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateResponse } from "../lib/utils.js";
import {
  ManualPostSchema,
  SavedManualThreadSchema,
  SaveManualPostSchema,
  SaveManualThreadSchema,
} from "shared";
import { createManualPost } from "../models/Post.js";
import { createManualThread } from "../models/Thread.js";

const router = express.Router();

// Apply the authMiddleware to all routes in this router
router.use(authMiddleware);

// create post manually
router.post("/create/post", async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Validate the input using Zod
    const validateInput = SaveManualPostSchema.safeParse(req.body);

    if (!validateInput.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validateInput.error.errors,
      });
    }

    const validatedInput = validateInput.data;

    const manualPost = await createManualPost({
      ...validatedInput,
      userId: userId,
    });

    // validate response
    const validatedRes = validateResponse(ManualPostSchema, manualPost);

    res.json(validatedRes);
  } catch (error) {
    console.error("Error scheduling post:", error);
    res.status(500).json({ message: error.message });
  }
});

// create thread manually
router.post("/create/thread", async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Validate the input using Zod
    const validateInput = SaveManualThreadSchema.safeParse(req.body);

    if (!validateInput.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validateInput.error.errors,
      });
    }

    const validatedInput = validateInput.data;

    const manualThread = await createManualThread({
      ...validatedInput,
      userId: userId,
    });

    // validate response
    const validatedRes = validateResponse(SavedManualThreadSchema, manualThread);

    res.json(validatedRes);
  } catch (error) {
    console.error("Error scheduling thread:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
