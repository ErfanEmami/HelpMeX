import React, {
  createContext,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

import { initialState, reducer } from "./reducer";
import type { AppContextProps } from "./types";
import { ErrorModal } from "@/components/ui/ErrorModal";

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

  const context = {
    appState,
    appDispatch,
  };

  return (
    <AppContext.Provider value={context}>
      {appState.error && <ErrorModal {...appState.error} />}
      {children}
    </AppContext.Provider>
  );
};
