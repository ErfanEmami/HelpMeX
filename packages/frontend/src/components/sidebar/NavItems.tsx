import {
  BookA,
  LifeBuoy,
  type LucideIcon,
  Send,
} from "lucide-react";

import XLogo from "@/assets/logo-white.png"

export type NavToolDef = {
  name: string;
  url: string;
  description: string,
  icon: LucideIcon | (() => React.ReactNode);
}[];

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

export const TOOLS_DEF: NavToolDef = [
  {
    name: "Xer™",
    url: "/xer",
    description: "Your Posting Assistant",
    icon: () => <img src={XLogo} alt="X Logo" className="w-5 h-5" />,
  },
  {
    name: "Bookmarks Summary",
    url: "/bookmarks-summary",
    description: "Summary of Your Bookmarks",
    icon: BookA,
  },
];

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
