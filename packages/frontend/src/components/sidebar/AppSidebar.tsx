import * as React from "react";

import { IdeaSwitcher } from "@/components/sidebar/IdeaSwitcher";
import { NavMain } from "@/components/sidebar/NavMain";
import { NavMuted } from "@/components/sidebar/NavMuted";
import { NavUser } from "@/components/sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { CRM_DEF, HELP_DEF, MARKET_ANALYSIS_DEF } from "./NavItems";

export function AppSidebar({ children, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          {/* <IdeaSwitcher /> */}
        </SidebarHeader>
        <SidebarContent>
          <NavMain def={MARKET_ANALYSIS_DEF} />
          <NavMain def={CRM_DEF} />
          <NavMuted def={HELP_DEF} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="-mb-2 p-2">
          <SidebarTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
