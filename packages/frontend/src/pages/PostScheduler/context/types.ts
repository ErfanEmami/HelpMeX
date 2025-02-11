import {  ScheduledPostExtended, ScheduledThreadExtended } from "@/lib/types";

type Loading = {
  isLoadingScheduledPosts?: boolean;
};

export const contentTypes = {
  existing: "existing",
  manual: "manual",
} as const;

export type PostSchedulerState = {
  scheduledContent: ScheduledContent[];
  loadingState: Loading;
};

export type ScheduledContent =
  | { id: string; contentType: "post"; scheduledFor: string, contentObject: ScheduledPostExtended }
  | { id: string; contentType: "thread"; scheduledFor: string, contentObject: ScheduledThreadExtended };


export type Action =
  | { type: "SET_SCHEDULED_CONTENT"; payload: ScheduledContent[] }
  | { type: "ADD_SCHEDULED_POST"; payload: ScheduledPostExtended }
  | { type: "ADD_SCHEDULED_THREAD"; payload: ScheduledThreadExtended }
  | { type: "SET_LOADING"; payload: Loading };

export type PostSchedulerReducer = {
  postSchedulerState: PostSchedulerState;
  postSchedulerDispatch: React.Dispatch<Action>;
};

export type PostSchedulerContextProps = PostSchedulerReducer;
