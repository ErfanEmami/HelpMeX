import {
  BookA,
  LifeBuoy,
  type LucideIcon,
  CalendarDays,
  BookText,
  Send,
} from "lucide-react";

import XLogo from "@/assets/logo-white.png";

export type NavToolDef = {
  name: string;
  url: string;
  description: string;
  icon: LucideIcon | (() => React.ReactNode);
  navItems?: NavMainDef[];
}[];

export type NavMainDef = {
  name?: string;
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
    navItems: [
      {
        items: [
          {
            name: "Generated Summaries",
            url: "/bookmarks-summary/generated-summaries",
            icon: BookText,
          },
        ],
      },
    ],
  },
  {
    name: "Post Scheduler",
    url: "/post-scheduler",
    description: "Plan and Schedule Your Posts",
    icon: CalendarDays,
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
