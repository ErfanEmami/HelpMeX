import { cn } from "../lib/utils";
import { Overlay } from "./Overlay";
import Title from "./Title";

export const Page = ({
  center,
  hcenter,
  vcenter,
  title,
  overlay,
  children,
}: {
  center?: boolean;
  hcenter?: boolean;
  vcenter?: boolean;
  title?: { text: string; isTyped?: boolean };
  overlay?: React.ReactNode | null;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "flex flex-1 w-full flex-col overflow-auto max-h-screen py-4",
      hcenter && "items-center",
      vcenter && "justify-center",
      center && "items-center justify-center"
    )}
  >
    {overlay && <Overlay>{overlay}</Overlay>}
    {title && <Title isTyped={title.isTyped}>{title.text}</Title>}
    {children}
  </div>
);
