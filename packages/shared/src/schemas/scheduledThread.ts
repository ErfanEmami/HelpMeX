import { z } from "zod";
import { FlexibleThreadSchema } from "./thread.js";
import { objectIdSchema } from "../util.js";

export const STATUS_VALUES = ["pending", "sent", "failed"] as const;
export const statusSchema = z.enum(STATUS_VALUES);

export const ScheduleThreadFormSchema = z.object({
  threadId: z.string().nonempty("Required"),
  date: z.date(),
  time: z
    .string()
    .nonempty("Required")
    .regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Required format: HH:MM AM/PM")
});

// UI payload
export const ScheduleThreadSchema = z.object({
  threadId: z.string().nonempty("Required"),
  scheduledFor: z.string().nonempty("Required"),
});

// db record
export const ScheduledThreadSchema = z.object({
  id: objectIdSchema,
  userId: objectIdSchema,
  threadId: objectIdSchema,
  scheduledFor: z.string(),
  postStatuses: z.array(z.object({
    threadPostId: objectIdSchema,
    status: statusSchema
  })),
  status: statusSchema,
  errorMessage: z.string().optional().nullable(),
  createdAt: z.date(),
});
export const ScheduledThreadsSchema = z.array(ScheduledThreadSchema);

// db record extended
export const ScheduledThreadExtendedSchema = ScheduledThreadSchema.omit({
  threadId: true,
}).merge(
  z.object({
    threadId: FlexibleThreadSchema,
  })
);
export const ScheduledThreadsExtendedSchema = z.array(ScheduledThreadExtendedSchema);
