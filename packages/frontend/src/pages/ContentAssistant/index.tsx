import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { XerProvider } from "./context/XerContext";
import { AssistantsSidebarBody } from "./components/AssistantsSidebarBody";
import { Outlet } from "react-router-dom";

export const ContentAssistantLayout = () => {
  return (
    <XerProvider>
      <AppSidebar BodyComponent={<AssistantsSidebarBody />}>
        <Outlet />
      </AppSidebar>
    </XerProvider>
  );
};
