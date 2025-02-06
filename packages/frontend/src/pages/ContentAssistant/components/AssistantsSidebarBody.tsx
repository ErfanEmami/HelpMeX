import { ChevronRight, Plus } from "lucide-react";

import { Assistant } from "@/lib/types";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useXerContext } from "@/pages/ContentAssistant/context/XerContext";
import { useCallback, useState } from "react";
import { CreateAssistantModal } from "./CreateAssistantModal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const AssistantsSidebarBody = () => {
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
      <Collapsible className="group/collapsible" defaultOpen>
        <CollapsibleTrigger asChild>
          <div className="flex items-center w-full justify-between">
            <SidebarGroupLabel>Assistants</SidebarGroupLabel>
            <ChevronRight
              size={16}
              className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="gap-0.2 grid max-h-96 overflow-y-auto">
            {assistants.map((o) => (
              <SidebarMenuItem key={o.author}>
                <SidebarMenuButton
                  asChild
                  isActive={o.id === selectedAssistant?.id}
                  onClick={() => handleAssistantClick(o)}
                >
                  <div className="font-medium font-">{o.name}</div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
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
