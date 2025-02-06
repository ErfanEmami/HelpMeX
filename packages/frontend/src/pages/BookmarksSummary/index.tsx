import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Outlet } from "react-router-dom";
import { BookmarksSummaryProvider } from "./context/BookmarksSummaryContext";

export const BookmarksLayout = () => {
  return (
    <BookmarksSummaryProvider>
      <AppSidebar>
        <Outlet />
      </AppSidebar>
    </BookmarksSummaryProvider>
  );
};
