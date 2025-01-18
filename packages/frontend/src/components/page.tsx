import { cn } from "../lib/utils";
import Title from "./Title";

export const Page = ({
  center,
  hcenter,
  vcenter,
  title,
  children,
}: {
  center?: boolean;
  hcenter?: boolean;
  vcenter?: boolean;
  title?: { text: string; isTyped?: boolean };
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "flex flex-1 w-full flex-col  max-h-screen overflow-y-hidden py-4",
      hcenter && "items-center",
      vcenter && "justify-center",
      center && "items-center justify-center"
    )}
  >
    {title && <Title isTyped={title.isTyped}>{title.text}</Title>}
    {children}
  </div>
);
