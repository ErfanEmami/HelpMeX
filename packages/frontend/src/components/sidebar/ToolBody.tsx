import { useSidebarContext } from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { getSelectedTool } from "@/lib/utils";
import { ToolBaseUrls } from "@/lib/types";
import { NavAssistants } from "@/pages/Xer/NavAssistants";

const TOOL_BODY_MAP: Record<ToolBaseUrls, React.ReactNode> = {
  "/xer": <NavAssistants />,
};

export const ToolBody = () => {
  const { navBody } = useSidebarContext();

  const selectedTool = getSelectedTool();

  if (!navBody && !selectedTool) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-4 my-4">
      {selectedTool?.navItems.map((o) => (
        <NavMain def={o} />
      ))}

      {TOOL_BODY_MAP[selectedTool?.baseUrl || ""]}

      <div>{navBody}</div>
    </div>
  );
};
