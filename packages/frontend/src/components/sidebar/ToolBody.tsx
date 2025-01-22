import {
  useSidebarContext,
} from "@/components/ui/sidebar";

export const ToolBody = () => {
  const { navBody } = useSidebarContext();

  if (navBody) {
    return <div className="mt-4">{navBody}</div>
  }

  return null
}