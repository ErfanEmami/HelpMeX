import { Author } from "@/lib/types";
import { cn } from "@/lib/utils";

export const AuthorPill = ({
  name,
  username,
  profileImage,
  selected,
  onClick,
}: Author & {
  profileImage: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    className={cn(
      `
      inline-flex flex-shrink-0 gap-3 
      items-center justify-between 
      p-1 px-2 pr-4 
      bg-background border rounded-full shadow-sm 
      hover:bg-muted cursor-pointer transition-colors
      text-foreground
      `,
      selected &&
        "bg-secondary border-secondary-foreground hover:bg-secondary"
    )}
    onClick={onClick}
  >
    <img
      src={profileImage}
      alt={`${username}'s profile`}
      className="w-8 h-8 rounded-full object-cover"
    />
    <div className="flex flex-col">
      <div className="font-medium text-sm text-foreground text-ellipsis whitespace-nowrap overflow-hidden w-20">
        {name}
      </div>
      <div className="text-sm text-muted-foreground">@{username}</div>
    </div>
  </div>
);
