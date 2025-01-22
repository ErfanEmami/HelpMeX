import {
  useSidebarContext,
} from "@/components/ui/sidebar";

export const ToolBody = () => {
  const { navBody } = useSidebarContext();

  if (navBody) {
    return navBody
  }
  
  return null
}