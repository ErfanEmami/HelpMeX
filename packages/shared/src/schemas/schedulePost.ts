import { z } from "zod";

export const SchedulePostSchema = z.object({
  text: z.string().nonempty("Required"),
  date: z.date(),
  time: z
    .string()
    .nonempty("Required")
    .regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Required format: HH:MM AM/PM")
});
