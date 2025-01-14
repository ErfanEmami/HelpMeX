import {
  BookA,
  ChartBar,
  ChartNoAxesColumn,
  LifeBuoy,
  type LucideIcon,
  Proportions,
  Send,
} from "lucide-react";

export type NavMainDef = {
  name: string;
  items: {
    name: string;
    url: string;
    icon?: LucideIcon;
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
  name: "Market Analysis",

  items: [
    {
      name: "Idea Definiton",
      url: "/app/idea-definition",
      icon: BookA,
    },
    {
      name: "Market Report",
      url: "/app/market-report",
      icon: ChartBar,
    },
    {
      name: "Competitor Analysis",
      url: "/app/competitor-analysis",
      icon: Proportions,
    },
  ],
};

export const CRM_DEF: NavMainDef = {
  name: "CRM",

  items: [
    {
      name: "Lead Gen",
      url: "/app/lead-gen",
      icon: ChartNoAxesColumn,
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
