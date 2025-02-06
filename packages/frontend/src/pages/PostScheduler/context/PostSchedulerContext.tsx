import React, { createContext, type ReactNode, useContext } from "react";

const PostSchedulerContext = createContext<undefined>(undefined);

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
  const context = undefined;

  return (
    <PostSchedulerContext.Provider value={context}>
      {children}
    </PostSchedulerContext.Provider>
  );
};
