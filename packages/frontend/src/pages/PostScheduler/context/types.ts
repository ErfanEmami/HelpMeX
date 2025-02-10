import {  ScheduledPostExtended } from "@/lib/types";

type Loading = {
  isLoadingScheduledPosts?: boolean;
};

export type PostSchedulerState = {
  scheduledPosts: ScheduledPostExtended[];
  loadingState: Loading;
};

export type Action =
  | { type: "SET_SCHEDULED_POSTS"; payload: ScheduledPostExtended[] }
  | { type: "ADD_SCHEDULED_POST"; payload: ScheduledPostExtended }
  | { type: "SET_LOADING"; payload: Loading };

export type PostSchedulerReducer = {
  postSchedulerState: PostSchedulerState;
  postSchedulerDispatch: React.Dispatch<Action>;
};

export type PostSchedulerContextProps = PostSchedulerReducer;
