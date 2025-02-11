import { useDispatchHelpers } from "@/context/app_context/useDispatchHelpers";
import { useSchedulePosts } from "@/hooks/useSchedulePosts";
import React, { createContext, type ReactNode, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { PostSchedulerContextProps, ScheduledContent } from "./types";
import { useScheduleThreads } from "@/hooks/useScheduleThreads";

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
  const { fetchScheduledThreads } = useScheduleThreads();
  const { setAppError } = useDispatchHelpers();

  // load scheduled content
  useEffect(() => {
    const _fetchScheduledContent = async () => {
      postSchedulerDispatch({
        type: "SET_LOADING",
        payload: { isLoadingScheduledPosts: true },
      });
  
      const [resPosts, resThreads] = await Promise.all([
        fetchScheduledPosts(),
        fetchScheduledThreads(),
      ]);
  
      postSchedulerDispatch({
        type: "SET_LOADING",
        payload: { isLoadingScheduledPosts: false },
      });
  
      if (resPosts.error || resThreads.error) {
        setAppError({
          text: (resPosts.error || resThreads.error) as string,
          onRetry: _fetchScheduledContent,
        });
      } else {
        const scheduledContent: ScheduledContent[] = [
          ...resPosts.scheduledPosts!.map((post) => ({
            id: post.id,
            contentType: "post" as const,
            scheduledFor: post.scheduledFor,
            contentObject: post,
          })),
          ...resThreads.scheduledThreads!.map((thread) => ({
            id: thread.id,
            contentType: "thread" as const,
            scheduledFor: thread.scheduledFor,
            contentObject: thread,
          })),
        ];
    
        postSchedulerDispatch({
          type: "SET_SCHEDULED_CONTENT",
          payload: scheduledContent,
        });
      }
    };
  
    _fetchScheduledContent();
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
