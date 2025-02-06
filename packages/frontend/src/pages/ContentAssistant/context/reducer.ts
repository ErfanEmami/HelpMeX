import type { Action, ContentAssistantState } from "./types";

export const initialState: ContentAssistantState = {
  selectedAssistant: null,
  assistants: [],
  loadingState: {
    isLoadingAssistants: true, // default true
    isLoadingCreateAssistant: false,
  },
};

export const reducer = (
  state: ContentAssistantState,
  action: Action
): ContentAssistantState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loadingState: { ...state.loadingState, ...action.payload },
      };

    case "SET_ASSISTANTS":
      return {
        ...state,
        assistants: action.payload,
      };

    case "ADD_ASSISTANT":
      return {
        ...state,
        assistants: [...state.assistants, action.payload],
      };

    case "SELECT_ASSISTANT":
      return {
        ...state,
        selectedAssistant: action.payload,
      };

    default:
      console.warn("No action type found for reducer", action);
      return state;
  }
};
