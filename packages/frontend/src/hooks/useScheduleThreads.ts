import axios from "axios";
import { useCallback } from "react";
import { GET_SCHEDULED_THREADS, SCHEDULE_THREAD, GET_SCHEDULABLE_THREADS, CREATE_MANUAL_THREAD } from "../lib/endpoints";
import { FlexibleThread, ManualThread, SaveManualThread, ScheduledThreadExtended, ScheduleThread } from "@/lib/types";

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

  const createManualThread = useCallback(async (body: SaveManualThread) => {
    try {
      const { data }: { data: ManualThread } = await axios.post(
        CREATE_MANUAL_THREAD,
        body,
        { withCredentials: true }
      );

      return { manualPost: data, error: null };
    } catch (err) {
      console.error("createManualThread error:", err);
      return {
        manualPost: null,
        error: "Unable to create manual thread.",
      };
    }
  }, []);

  return {
    fetchScheduledThreads,
    fetchSchedulableThreads,
    setThreadSchedule,
    createManualThread,
  };
};
