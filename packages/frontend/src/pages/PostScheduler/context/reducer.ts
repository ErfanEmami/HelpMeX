import type { Action, PostSchedulerState } from "./types";

export const initialState: PostSchedulerState = {
  scheduledContent: [],
  loadingState: {
    isLoadingScheduledPosts: true, // default true
  },
};

export const reducer = (
  state: PostSchedulerState,
  action: Action
): PostSchedulerState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loadingState: { ...state.loadingState, ...action.payload },
      };

    case "SET_SCHEDULED_CONTENT":
      return {
        ...state,
        scheduledContent: action.payload,
      };

    case "ADD_SCHEDULED_POST":
      return {
        ...state,
        scheduledContent: [...state.scheduledContent, {
          id: action.payload.id,
          contentType: "post",
          scheduledFor: action.payload.scheduledFor,
          contentObject: action.payload
        }],
      };

    case "ADD_SCHEDULED_THREAD":
      return {
        ...state,
        scheduledContent: [...state.scheduledContent, {
          id: action.payload.id,
          contentType: "thread",
          scheduledFor: action.payload.scheduledFor,
          contentObject: action.payload
        }],
      };
    default:
      console.warn("No action type found for reducer", action);
      return state;
  }
};
