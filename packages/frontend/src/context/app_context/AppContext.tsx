import React, {
  createContext,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

import { initialState, reducer } from "./reducer";
import type { AppContextProps } from "./types";
import { Loading } from "../../components/Loading";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a <AppProvider>");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appState, appDispatch] = useReducer(reducer, initialState);
  // const appHook = useApp({ appState, appDispatch });

  const context = {
    // ...appHook,
    appState,
    appDispatch,
  };

  if (appState.isLoading) {
    return <Loading />;
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
