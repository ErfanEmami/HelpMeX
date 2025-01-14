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

export type AppState = {
  user: User | null,
  loadingState: Loading;
}

export type Action =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: Loading }


export type AppReducer = {
  appState: AppState;
  appDispatch: React.Dispatch<Action>;
};

export type AppContextProps = AppReducer;
