import { cn } from "../utils";

export const Page = ({
  center,
  hcenter,
  vcenter,
  children,
}: {
  center?: boolean;
  hcenter?: boolean;
  vcenter?: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "flex h-full w-full flex-col p-4",
      hcenter && "items-center",
      vcenter && "justify-center",
      center && "items-center justify-center"
    )}
  >
    {children}
  </div>
);
