import { useSidebarContext } from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { getSelectedTool } from "@/lib/utils";

export const ToolBody = () => {
  const { navBody } = useSidebarContext();

  const selectedTool = getSelectedTool()

  if (!navBody && !selectedTool?.navItems) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-4 mt-4 mb-4">
      {selectedTool?.navItems?.map((o) => (
        <NavMain def={o} />
      ))}

      <div>{navBody}</div>
    </div>
  );
};
