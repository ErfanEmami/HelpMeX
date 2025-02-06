import {
  BookA,
  LifeBuoy,
  type LucideIcon,
  CalendarDays,
  BookText,
  Book,
  BookCopy,
  Send,
  FilePlus,
  BotMessageSquare
} from "lucide-react";

export type NavToolDef = {
  name: string;
  baseUrl: string;
  defaultPath: string;
  description: string;
  icon: LucideIcon | (() => React.ReactNode);
  navItems: NavMainDef[];
}[];

export type NavMainDef = {
  name?: string;
  baseUrl?: string;
  items: {
    name: string;
    url?: string;
    path?: string;
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
    name: "Content Assistant",
    baseUrl: "/content-assistant",
    defaultPath: "/generate-post",
    description: "Your Content Assistant",
    icon: BotMessageSquare,
    navItems: [
      {
        baseUrl: "/content-assistant",
        items: [
          {
            name: "Generate Post",
            path: "/generate-post",
            icon: Book,
          },
          {
            name: "Generate Thread",
            path: "/generate-thread",
            icon: BookCopy,
          },
        ],
      },
    ],
  },
  {
    name: "Bookmarks Summary",
    baseUrl: "/bookmarks-summary",
    defaultPath: "/generate-summary",
    description: "Summary of Your Bookmarks",
    icon: BookA,
    navItems: [
      {
        baseUrl: "/bookmarks-summary",
        items: [
          {
            name: "New Summary",
            path: "/generate-summary",
            icon: FilePlus,
          },
          {
            name: "Generated Summaries",
            path: "/generated-summaries",
            icon: BookText,
          },
        ],
      },
    ],
  },
  {
    name: "Post Scheduler",
    baseUrl: "/post-scheduler",
    defaultPath: "",
    description: "Plan and Schedule Your Posts",
    icon: CalendarDays,
    navItems: [
      {
        baseUrl: "/post-scheduler",
        items: [
          {
            name: "Post Scheduler",
            path: "",
            icon: CalendarDays,
          },
        ],
      },
    ],
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
