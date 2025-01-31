import axios from "axios";
import { useCallback } from "react";
import { GET_SCHEDULED_POSTS, SCHEDULE_POST } from "../lib/endpoints";
import { type ScheduledPost, type SchedulePost } from "@/lib/types";

export const useSchedulePosts = () => {
  const fetchScheduledPosts = useCallback(async () => {
    try {
      const { data }: { data: ScheduledPost[] } = await axios.get(
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

  const createScheduledPost = useCallback(async (body: SchedulePost) => {
    try {
      const { data }: { data: ScheduledPost } = await axios.post(
        SCHEDULE_POST,
        body,
        { withCredentials: true }
      );

      return { scheduledPost: data, error: null };
    } catch (err) {
      console.error("createScheduledPost error:", err);
      return {
        scheduledPost: null,
        error: "Unable to schedule post.",
      };
    }
  }, []);

  return {
    fetchScheduledPosts,
    createScheduledPost,
  };
};
