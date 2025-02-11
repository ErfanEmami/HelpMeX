import { FlexibleThread } from "@/lib/types";

import { cn } from "@/lib/utils";

export const ThreadButton = ({
  posts,
  selected,
  onClick,
}: {
  posts: FlexibleThread["posts"];
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={cn(
      `w-full hover:bg-muted cursor-pointer transition-colors border rounded-lg 
    bg-background border-border p-4 flex flex-col gap-4`,
      selected && "bg-secondary border-secondary-foreground hover:bg-secondary"
    )}
  >
    {posts.map((post) => (
      <div className="border border-border p-4 whitespace-pre-wrap rounded-lg ">
        {post.text}
      </div>
    ))}
  </div>
);
