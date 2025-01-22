import * as React from "react";

import { NavMain } from "@/components/sidebar/NavMain";
import { NavMuted } from "@/components/sidebar/NavMuted";
import { NavUser } from "@/components/sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { HELP_DEF, TOOLS_DEF } from "./NavItems";
import { ToolSwitcher } from "./toolSwitcher";

export function AppSidebar({ children, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ToolSwitcher def={TOOLS_DEF} />
      </SidebarHeader>
        <SidebarContent>
          {/* <NavMain def={MARKET_ANALYSIS_DEF} /> */}
          <NavMuted def={HELP_DEF} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="h-screen overflow-auto">
        <div className="p-2">
          <SidebarTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
