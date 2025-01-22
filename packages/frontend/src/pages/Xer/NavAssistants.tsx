import { Plus } from "lucide-react";

import { Assistant } from "@/lib/types";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const NavAssistants = ({
  assistants,
  onNewAssistant,
}: {
  assistants: Assistant[];
  onNewAssistant: () => void;
}) => (
  <SidebarGroup collapse_hide>
    <SidebarGroupLabel>Assistants</SidebarGroupLabel>
    <SidebarMenu className="gap-0.2 grid max-h-96 overflow-y-auto">
      {assistants.map((o) => (
        <SidebarMenuItem key={o.author}>
          <SidebarMenuButton asChild>
            <div className="font-medium font-">{o.author}</div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
    <SidebarMenuButton
      onClick={onNewAssistant}
      className="text-sidebar-foreground/70"
    >
      <Plus className="text-sidebar-foreground/70" />
      <span>New Assistant</span>
    </SidebarMenuButton>
  </SidebarGroup>
);
