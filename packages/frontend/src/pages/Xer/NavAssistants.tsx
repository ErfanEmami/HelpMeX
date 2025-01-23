import { Plus } from "lucide-react";

import { Assistant } from "@/lib/types";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useXerContext } from "@/context/xer_context/XerContext";
import { useCallback, useState } from "react";
import { CreateAssistantModal } from "./CreateAssistantModal";

export const NavAssistants = () => {
  const [showModal, setShowModal] = useState(false);

  const { xerState, xerDispatch } = useXerContext();
  const {
    selectedAssistant,
    assistants,
    loadingState: { isLoadingAssistants },
  } = xerState;

  const handleAssistantClick = useCallback((assistant: Assistant) => {
    xerDispatch({
      type: "SELECT_ASSISTANT",
      payload: assistant,
    });
  }, []);

  const renderModal = useCallback(() => {
    const hasAssistants = assistants.length;
    if (isLoadingAssistants) return;
    if (!showModal && hasAssistants) return;

    return <CreateAssistantModal onClose={() => setShowModal(false)} />;
  }, [assistants, showModal]);

  return (
    <SidebarGroup collapse_hide>
      {renderModal()}
      <SidebarGroupLabel>Assistants</SidebarGroupLabel>
      <SidebarMenu className="gap-0.2 grid max-h-96 overflow-y-auto">
        {assistants.map((o) => (
          <SidebarMenuItem key={o.author}>
            <SidebarMenuButton
              asChild
              isActive={o.id === selectedAssistant?.id}
              onClick={() => handleAssistantClick(o)}
            >
              <div className="font-medium font-">{o.author}</div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarMenuButton
        onClick={() => setShowModal(true)}
        className="text-sidebar-foreground/70"
      >
        <Plus className="text-sidebar-foreground/70" />
        <span>New Assistant</span>
      </SidebarMenuButton>
    </SidebarGroup>
  );
};
