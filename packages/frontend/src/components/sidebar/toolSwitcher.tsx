import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebarContext,
} from "@/components/ui/sidebar";
import { ChevronsUpDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { type NavToolDef } from "./NavItems";
import { cn } from "@/lib/utils";

export function ToolSwitcher({ def }: { def: NavToolDef }) {
  const { isMobile, state } = useSidebarContext();

  const location = useLocation();
  const selectedTool = def.find((tool) => tool.url === location.pathname);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarGroupLabel
            className={cn(state === "collapsed" ? "hidden" : null)}
          >
            X Tools
          </SidebarGroupLabel>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {selectedTool && (
                <>
                  <ToolLogo logo={selectedTool.icon} />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span
                      className="truncate font-bold"
                      style={{ fontWeight: "700" }}
                    >
                      {selectedTool.name}
                    </span>
                    <span className="truncate text-xs">
                      {selectedTool.description}
                    </span>
                  </div>
                </>
              )}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              X Tools
            </DropdownMenuLabel>
            {def.map((tool, index) => (
              <Link to={tool.url}>
                <DropdownMenuItem className="gap-2 p-2">
                  <ToolLogo logo={tool.icon} />
                  <div className="grid flex-1 leading-tight">
                    <div className="line-clamp-1 font-medium">{tool.name}</div>
                    <div className="overflow-hidden text-xs text-muted-foreground">
                      <div className="line-clamp-1">{tool.description}</div>
                    </div>
                  </div>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

const ToolLogo = ({ logo: Logo }: { logo: React.ElementType }) => (
  <Avatar className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
    <Logo />
  </Avatar>
);
