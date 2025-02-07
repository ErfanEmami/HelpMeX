import type { Action, PostSchedulerState } from "./types";

export const initialState: PostSchedulerState = {
  scheduledPosts: [],
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

    case "SET_SCHEDULED_POSTS":
      return {
        ...state,
        scheduledPosts: action.payload,
      };

    case "ADD_SCHEDULED_POST":
      return {
        ...state,
        scheduledPosts: [...state.scheduledPosts, action.payload],
      };

    default:
      console.warn("No action type found for reducer", action);
      return state;
  }
};
