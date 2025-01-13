export type User = {
  id: string,
  displayName: string,
  username: string,
  photos: string[],
}

export interface AppState {
  user: User | null,
  isLoading: boolean;
}

export type Action =
  | { type: "SET_USER"; payload: User }
  | { type: "SET_LOADING"; payload: boolean }

export type AppReducer = {
  appState: AppState;
  appDispatch: React.Dispatch<Action>;
};

export type AppContextProps = AppReducer;
