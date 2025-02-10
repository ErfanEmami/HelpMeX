import axios from "axios";
import { useCallback } from "react";
import { GET_SCHEDULED_POSTS, SCHEDULE_POST, GET_SCHEDULABLE_POSTS } from "../lib/endpoints";
import { FlexiblePost, ScheduledPostExtended, type SchedulePost } from "@/lib/types";

export const useSchedulePosts = () => {
  const fetchScheduledPosts = useCallback(async () => {
    try {
      const { data }: { data: ScheduledPostExtended[] } = await axios.get(
        GET_SCHEDULED_POSTS,
        { withCredentials: true }
      );

      return { scheduledPosts: data, error: null };
    } catch (err) {
      console.error("fetchScheduledPosts error:", err);
      return {
        scheduledPosts: null,
        error: "Unable to fetch scheduled posts.",
      };
    }
  }, []);

  // posts not scheduled yet
  const fetchSchedulablePosts = useCallback(async () => {
    try {
      const { data }: { data: FlexiblePost[] } = await axios.get(
        GET_SCHEDULABLE_POSTS,
        { withCredentials: true }
      );

      return { schedulablePosts: data, error: null };
    } catch (err) {
      console.error("fetchSchedulablePosts error:", err);
      return {
        schedulable: null,
        error: "Unable to fetch schedulable posts.",
      };
    }
  }, []);

  const setPostSchedule = useCallback(async (body: SchedulePost) => {
    try {
      const { data }: { data: ScheduledPostExtended } = await axios.post(
        SCHEDULE_POST,
        body,
        { withCredentials: true }
      );

      return { scheduledPost: data, error: null };
    } catch (err) {
      console.error("setPostSchedule error:", err);
      return {
        scheduledPost: null,
        error: "Unable to schedule post.",
      };
    }
  }, []);

  return {
    fetchScheduledPosts,
    fetchSchedulablePosts,
    setPostSchedule,
  };
};
