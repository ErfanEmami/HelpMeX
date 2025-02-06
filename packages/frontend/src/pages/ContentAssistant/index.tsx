import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { ContentAssistantProvider } from "./context/ContentAssistantContext";
import { AssistantsSidebarBody } from "./components/AssistantsSidebarBody";
import { Outlet } from "react-router-dom";

export const ContentAssistantLayout = () => {
  return (
    <ContentAssistantProvider>
      <AppSidebar BodyComponent={<AssistantsSidebarBody />}>
        <Outlet />
      </AppSidebar>
    </ContentAssistantProvider>
  );
};
