import { Assistant } from "@/lib/types";

type Loading = {
  isLoadingAssistants?: boolean;
  isLoadingCreateAssistant?: boolean;
};

export type XerState = {
  selectedAssistant: Assistant | null;
  assistants: Assistant[];
  loadingState: Loading;
};

export type Action =
  | { type: "SET_ASSISTANTS"; payload: Assistant[] }
  | { type: "ADD_ASSISTANT"; payload: Assistant }
  | { type: "SELECT_ASSISTANT"; payload: Assistant }
  | { type: "SET_LOADING"; payload: Loading };

export type XerReducer = {
  xerState: XerState;
  xerDispatch: React.Dispatch<Action>;
};


export type XerContextProps = XerReducer;
