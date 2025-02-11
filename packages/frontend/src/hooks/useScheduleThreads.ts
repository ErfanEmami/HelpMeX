import axios from "axios";
import { useCallback } from "react";
import { GET_SCHEDULED_THREADS, SCHEDULE_THREAD, GET_SCHEDULABLE_THREADS } from "../lib/endpoints";
import { FlexibleThread, ScheduledThreadExtended, ScheduleThread } from "@/lib/types";

export const useScheduleThreads = () => {
  const fetchScheduledThreads = useCallback(async () => {
    try {
      const { data }: { data: ScheduledThreadExtended[] } = await axios.get(
        GET_SCHEDULED_THREADS,
        { withCredentials: true }
      );

      return { scheduledThreads: data, error: null };
    } catch (err) {
      console.error("fetchScheduledThreads error:", err);
      return {
        scheduledThreads: null,
        error: "Unable to fetch scheduled threads.",
      };
    }
  }, []);

  // threads not scheduled yet
  const fetchSchedulableThreads = useCallback(async () => {
    try {
      const { data }: { data: FlexibleThread[] } = await axios.get(
        GET_SCHEDULABLE_THREADS,
        { withCredentials: true }
      );

      return { schedulableThreads: data, error: null };
    } catch (err) {
      console.error("fetchSchedulableThreads error:", err);
      return {
        schedulableThreads: null,
        error: "Unable to fetch schedulable threads.",
      };
    }
  }, []);

  const setThreadSchedule = useCallback(async (body: ScheduleThread) => {
    try {
      const { data }: { data: ScheduledThreadExtended } = await axios.post(
        SCHEDULE_THREAD,
        body,
        { withCredentials: true }
      );

      return { scheduledThread: data, error: null };
    } catch (err) {
      console.error("setThreadSchedule error:", err);
      return {
        scheduledThread: null,
        error: "Unable to schedule thread.",
      };
    }
  }, []);

  return {
    fetchScheduledThreads,
    fetchSchedulableThreads,
    setThreadSchedule,
  };
};
