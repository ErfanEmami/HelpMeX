import { cn } from "@/lib/utils";
import Title from "./Title";
import { Loading } from "./Loading";

const ControlPanel = ({
  title,
  half,
  isLoading,
  children,
}: {
  title?: string;
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
    {title && <Title>{title}</Title>}
    {isLoading ? <Loading/> : children}
  </div>
);

const Content = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-border rounded-md bg-primary-foreground p-4 flex flex-col gap-4 overflow-y-auto items-center h-full">
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
