"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebarContext,
} from "@/components/ui/sidebar";
import { useAppContext } from "@/contexts/AppContext";
import { ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export function IdeaSwitcher() {
  const { isMobile } = useSidebarContext();
  const {
    appState,
    appState: { allIdeas },
    getSelectedIdea,
    handleSelectIdea,
  } = useAppContext();

  const selectedIdea = getSelectedIdea(appState);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {selectedIdea && (
                <>
                  {/* {activeIdea.logo && <IdeaLogo logo={activeIdea.logo} />} */}
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {selectedIdea.name}
                    </span>
                    <span className="truncate text-xs">
                      {selectedIdea.description}
                    </span>
                  </div>
                </>
              )}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Ideas
            </DropdownMenuLabel>
            {allIdeas.map((idea, index) => (
              <DropdownMenuItem
                key={idea.createdAt.toString()}
                onClick={() => handleSelectIdea(idea.id)}
                className="gap-2 p-2"
              >
                {/* {idea.logo && <IdeaLogo logo={idea.logo} />} */}
                <div className="grid flex-1 leading-tight">
                  <div className="line-clamp-1 font-medium">{idea.name}</div>
                  <div className="overflow-hidden text-xs text-muted-foreground">
                    <div className="line-clamp-1">{idea.description}</div>
                  </div>
                </div>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <Link href="/app/new-idea">
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  New Idea
                </div>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

const IdeaLogo = ({ logo: Logo }: { logo: React.ElementType }) => (
  <Avatar className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
    <Logo />
  </Avatar>
);
