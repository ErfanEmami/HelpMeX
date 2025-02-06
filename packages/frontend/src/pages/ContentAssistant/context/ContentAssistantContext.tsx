import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { initialState, reducer } from "./reducer";
import type { ContentAssistantContextProps } from "./types";
import { useAssistants } from "@/hooks/useAssistants";
import { useDispatchHelpers } from "@/context/app_context/useDispatchHelpers";

const ContentAssistantContext = createContext<
  ContentAssistantContextProps | undefined
>(undefined);

export const useContentAssistantContext = () => {
  const context = useContext(ContentAssistantContext);
  if (!context) {
    throw new Error("useContentAssistantContext must be used within a <ContentAssistantProvider>");
  }
  return context;
};

export const ContentAssistantProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contentAssistantState, contentAssistantDispatch] = useReducer(
    reducer,
    initialState
  );

  const { fetchAssistants } = useAssistants();
  const { setAppError } = useDispatchHelpers();

  // load assistants
  useEffect(() => {
    const _fetchAssistants = async () => {
      contentAssistantDispatch({
        type: "SET_LOADING",
        payload: { isLoadingAssistants: true },
      });

      const res = await fetchAssistants();

      contentAssistantDispatch({
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
        contentAssistantDispatch({
          type: "SET_ASSISTANTS",
          payload: res.assistants!,
        });
      }
    };

    _fetchAssistants();
  }, []);

  const context = {
    contentAssistantState,
    contentAssistantDispatch,
  };

  return (
    <ContentAssistantContext.Provider value={context}>
      {children}
    </ContentAssistantContext.Provider>
  );
};
