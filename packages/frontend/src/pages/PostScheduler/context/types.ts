import {  ScheduledPost } from "@/lib/types";

type Loading = {
  isLoadingScheduledPosts?: boolean;
};

export type PostSchedulerState = {
  scheduledPosts: ScheduledPost[];
  loadingState: Loading;
};

export type Action =
  | { type: "SET_SCHEDULED_POSTS"; payload: ScheduledPost[] }
  | { type: "ADD_SCHEDULED_POST"; payload: ScheduledPost }
  | { type: "SET_LOADING"; payload: Loading };

export type PostSchedulerReducer = {
  postSchedulerState: PostSchedulerState;
  postSchedulerDispatch: React.Dispatch<Action>;
};

export type PostSchedulerContextProps = PostSchedulerReducer;
