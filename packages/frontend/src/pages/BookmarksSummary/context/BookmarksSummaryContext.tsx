import React, { createContext, type ReactNode, useContext } from "react";

const BookmarksSummaryContext = createContext<undefined>(undefined);

export const useBookmarksSummaryContext = () => {
  const context = useContext(BookmarksSummaryContext);
  if (!context) {
    throw new Error("useBookmarksSummaryContext must be used within a <BookmarksSummaryProvider>");
  }
  return context;
};

export const BookmarksSummaryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const context = undefined;

  return (
    <BookmarksSummaryContext.Provider value={context}>
      {children}
    </BookmarksSummaryContext.Provider>
  );
};
