import {
  BookA,
  LifeBuoy,
  type LucideIcon,
  Send,
} from "lucide-react";

import XLogo from "@/assets/logo-black.png"

export type NavMainDef = {
  name: string;
  items: {
    name: string;
    url: string;
    icon?: LucideIcon | (() => React.ReactNode);
    isActive?: boolean;
    subItems?: {
      name: string;
      url: string;
    }[];
  }[];
};

export type NavMutedDef = {
  name: string;
  items: {
    name: string;
    url: string;
    icon?: LucideIcon;
  }[];
};

export const MARKET_ANALYSIS_DEF: NavMainDef = {
  name: "X Tools",

  items: [
    {
      name: "Bookmarks Summary",
      url: "/bookmarks-summary",
      icon: BookA,
    },
    {
      name: "Xer™",
      url: "/xer",
      icon: () => <img src={XLogo} alt="X Logo" className="w-3 h-3" />,
    },
  ],
};

export const HELP_DEF: NavMutedDef = {
  name: "Help",

  items: [
    {
      name: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      name: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};
