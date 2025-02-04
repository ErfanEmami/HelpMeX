import { z } from "zod";

// export const SchedulePostFormSchema = z.object({
//   text: z.string().nonempty("Required"),
//   date: z.date(),
//   time: z
//     .string()
//     .nonempty("Required")
//     .regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Required format: HH:MM AM/PM")
// });

export const ScheduleThreadPost = z.object({
  text: z.string().nonempty("Required"),
})

// db record
export const ScheduledThreadPost = ScheduleThreadPost.extend({
  status: z.string(),
})

export const ScheduleThreadSchema = z.object({
  posts: z.array(ScheduleThreadPost).nonempty(),
  scheduledFor: z.string(),
});

// db record
export const ScheduledThreadSchema = z.object({
  id: z.string(),
  userId: z.string(),
  posts: z.array(ScheduledThreadPost),
  scheduledFor: z.string(),
  status: z.string(),
  createdAt: z.date(),
});
export const ScheduledThreadsSchema = z.array(ScheduledThreadSchema);
