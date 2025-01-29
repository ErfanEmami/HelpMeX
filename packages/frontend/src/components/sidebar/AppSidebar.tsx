import * as React from "react";

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
import { ToolBody } from "./ToolBody";

export function AppSidebar({ children, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ToolSwitcher def={TOOLS_DEF} />
      </SidebarHeader>
        <SidebarContent>
          <ToolBody />
          <NavMuted def={HELP_DEF} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="h-screen overflow-auto">
        <div className="flex border-b items-center justify-center h-[65px] bg-[hsl(var(--sidebar-background))]">
          <SidebarTrigger className="absolute left-2" />
          <h2 className="font-semibold">Xer™</h2>
        </div>
        
        {/* <div className="p-2">
          <SidebarTrigger />
        </div> */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
