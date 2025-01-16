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
      bg-slate-50 border border-gray-200 rounded-full shadow-sm hover:bg-slate-100 cursor-pointer
      `,
      selected && "bg-slate-200 border-gray-300 hover:bg-slate-200 "
    )}
    onClick={onClick}
  >
    <img
      src={profileImage}
      alt={`${username}'s profile`}
      className="w-8 h-8 rounded-full object-cover"
    />
    <div className="flex flex-col">
      <div className="font-medium text-sm text-ellipsis whitespace-nowrap overflow-hidden w-20">
        {name}
      </div>
      <div className="text-xs text-gray-500">@{username}</div>
    </div>
  </div>
);
