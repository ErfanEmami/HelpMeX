import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
import { TOOLS_DEF } from "@/components/sidebar/NavItems";
import { useLocation } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  return format(new Date(dateString), "MM/dd/yy h:mm a");
}

export function getSelectedTool() {
  const location = useLocation();
  const selectedTool = TOOLS_DEF.find((tool) => location.pathname.startsWith(tool.url));
  return selectedTool
}