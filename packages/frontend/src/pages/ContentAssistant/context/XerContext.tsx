import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { initialState, reducer } from "./reducer";
import type { XerContextProps } from "./types";
import { useAssistants } from "@/hooks/useAssistants";
import { useDispatchHelpers } from "@/context/app_context/useDispatchHelpers";

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

  const { fetchAssistants } = useAssistants();
  const { setAppError } = useDispatchHelpers();

  // load assistants
  useEffect(() => {
    const _fetchAssistants = async () => {
      xerDispatch({
        type: "SET_LOADING",
        payload: { isLoadingAssistants: true },
      });

      const res = await fetchAssistants();

      xerDispatch({
        type: "SET_LOADING",
        payload: { isLoadingAssistants: false },
      });

      if (res.error) {
        setAppError({
          text: res.error,
          onRetry: _fetchAssistants,
        });
      } else {
        setAppError(null);
        xerDispatch({
          type: "SET_ASSISTANTS",
          payload: res.assistants!,
        });
      }
    };

    _fetchAssistants();
  }, []);

  const context = {
    xerState,
    xerDispatch,
  };

  return <XerContext.Provider value={context}>{children}</XerContext.Provider>;
};
