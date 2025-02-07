import { useDispatchHelpers } from "@/context/app_context/useDispatchHelpers";
import { useSchedulePosts } from "@/hooks/useSchedulePosts";
import React, { createContext, type ReactNode, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { PostSchedulerContextProps } from "./types";

const PostSchedulerContext = createContext<
PostSchedulerContextProps | undefined
>(undefined);

export const usePostSchedulerContext = () => {
  const context = useContext(PostSchedulerContext);
  if (!context) {
    throw new Error(
      "usePostSchedulerContext must be used within a <PostSchedulerProvider>"
    );
  }
  return context;
};

export const PostSchedulerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [postSchedulerState, postSchedulerDispatch] = useReducer(
    reducer,
    initialState
  );

  const { fetchScheduledPosts } = useSchedulePosts();
  const { setAppError } = useDispatchHelpers();

  // load scheduled posts
  useEffect(() => {
    const _fetchScheduledPosts = async () => {
      postSchedulerDispatch({
        type: "SET_LOADING",
        payload: { isLoadingScheduledPosts: true },
      });
  
      const res = await fetchScheduledPosts();
  
      postSchedulerDispatch({
        type: "SET_LOADING",
        payload: { isLoadingScheduledPosts: false },
      });
  
      if (res.error) {
        setAppError({
          text: res.error,
          onRetry: _fetchScheduledPosts,
        });
      } else {
        postSchedulerDispatch({
          type: "SET_SCHEDULED_POSTS",
          payload: res.scheduledPosts!,
        });
      }
    };

    _fetchScheduledPosts();
  }, []);

  const context = {
    postSchedulerState,
    postSchedulerDispatch,
  };

  return (
    <PostSchedulerContext.Provider value={context}>
      {children}
    </PostSchedulerContext.Provider>
  );
};
