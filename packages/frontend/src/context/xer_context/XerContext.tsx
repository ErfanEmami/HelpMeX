import React, {
  createContext,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

import { initialState, reducer } from "./reducer";
import type { XerContextProps } from "./types";

const XerContext = createContext<XerContextProps | undefined>(undefined);

export const useXerContext = () => {
  const context = useContext(XerContext);
  if (!context) {
    throw new Error("useXerContext must be used within a <XerProvider>");
  }
  return context;
};

export const XerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [xerState, xerDispatch] = useReducer(reducer, initialState);

  const context = {
    xerState,
    xerDispatch,
  };

  return <XerContext.Provider value={context}>{children}</XerContext.Provider>;
};
