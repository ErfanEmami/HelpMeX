"use client";

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
  SidebarRail,
} from "@/components/ui/sidebar";
import { CRM_DEF, HELP_DEF, MARKET_ANALYSIS_DEF } from "./NavItems";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <IdeaSwitcher />
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
  );
}
