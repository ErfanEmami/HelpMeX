import type { Action, AppState } from "./types";

export const initialState: AppState = {
  user: null,
  loadingState: {
    appLoading: true, // by default true so loading is triggered when app is initially mounted
    requestLoading: false
  }
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loadingState: action.payload };

    case "SET_USER":
      return { ...state, user: action.payload };

    default:
      console.warn("No action type found for reducer", action);
      return state;
  }
};
