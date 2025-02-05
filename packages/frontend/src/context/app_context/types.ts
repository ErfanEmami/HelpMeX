export type User = {
  id: string,
  displayName: string,
  username: string,
  photos: string[],
}

type Loading = {
  appLoading?: boolean,
  requestLoading?: boolean,
}

export type ErrorModalProps = {
  error: string;
  onCancel?: { text: string, onClick: () => void}
  onAccept?: { text: string, onClick: () => void}
};

export type AppState = {
  user: User | null,
  error: ErrorModalProps | null
  loadingState: Loading;
}

export type Action =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: Loading }
  | { type: "SET_ERROR"; payload: ErrorModalProps | null }

export type AppReducer = {
  appState: AppState;
  appDispatch: React.Dispatch<Action>;
};

export type AppContextProps = AppReducer;
