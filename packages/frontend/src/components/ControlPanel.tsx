import { cn } from "@/lib/utils";
import Title from "./Title";
import { ReactElement } from "react";

const ControlPanel = ({
  title,
  half,
  children,
}: {
  title: string;
  half?: boolean;
  children: [ReactElement<typeof Content>, ReactElement<typeof Control>];
}) => (
  <div 
    className={cn(
      "px-4 flex flex-col gap-2",
      half ? "w-1/2" : "w-full"
    )}
  >
    <Title>{title}</Title>
    {children}
  </div>
);

const Content = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-gray-200  bg-gray-50 p-4 flex flex-col gap-4 overflow-y-auto items-center flex-1">
    {children}
  </div>
);

const Control = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col overflow-hidden">
    {children}
  </div>
);

export {
  ControlPanel,
  Content,
  Control,
}
