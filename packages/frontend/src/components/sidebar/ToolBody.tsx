import { useSidebarContext } from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { getSelectedTool } from "@/lib/utils";

export const ToolBody = ({
  BodyComponent,
}: {
  BodyComponent?: React.ReactNode;
}) => {
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

      {BodyComponent}

      <div>{navBody}</div>
    </div>
  );
};
