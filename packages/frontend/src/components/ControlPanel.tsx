import { cn } from "@/lib/utils";
import Title from "./Title";
import { Loading } from "./Loading";

const ControlPanel = ({
  title,
  half,
  isLoading,
  children,
}: {
  title: string;
  half?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}) => (
  <div 
    className={cn(
      "px-4 flex flex-col gap-2",
      half ? "w-1/2" : "w-full"
    )}
  >
    <Title>{title}</Title>
    {isLoading ? <Loading/> : children}
  </div>
);

const Content = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-gray-200  bg-gray-50 p-4 flex flex-col gap-4 overflow-y-auto items-center flex-1">
    {children}
  </div>
);

const Control = ({ children }: { children: React.ReactNode }) => (
  <div>
    {children}
  </div>
);

export {
  ControlPanel,
  Content,
  Control,
}
