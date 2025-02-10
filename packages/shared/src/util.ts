import { z } from "zod";
import mongoose from "mongoose";

// for mongodb objedId fields - converts them to string
export const objectIdSchema = z
  .any()
  .refine((val) => mongoose.isValidObjectId(val) || typeof val === "string", {
    message: "Invalid ObjectId",
  })
  .transform((val) => (typeof val === "string" ? val : val.toString()));
