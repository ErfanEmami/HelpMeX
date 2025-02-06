import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Outlet } from "react-router-dom";
import { PostSchedulerProvider } from "./context/PostSchedulerContext";

export const PostSchedulerLayout = () => {
  return (
    <PostSchedulerProvider>
      <AppSidebar>
        <Outlet />
      </AppSidebar>
    </PostSchedulerProvider>
  );
};
