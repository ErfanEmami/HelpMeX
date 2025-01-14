"use client";

import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type NavMutedDef } from "./NavItems";

export function NavMuted({
  def,
  className,
}: { def: NavMutedDef } & React.ComponentProps<"ul">) {
  return (
    <SidebarGroup collapse_hide className={className}>
      <SidebarGroupLabel>{def.name}</SidebarGroupLabel>
      <SidebarMenu className="gap-0.2 grid">
        {def.items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                {item.icon && <item.icon />}
                <span className="text-xs font-medium text-muted-foreground">
                  {item.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
