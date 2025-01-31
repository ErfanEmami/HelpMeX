import { Bookmark } from "@/lib/types";
import { Separator } from "./ui/separator";

export const BookmarkCard = ({
  author,
  text,
}: Bookmark
) => (
  <div className="flex flex-col w-full p-4 bg-background rounded-lg shadow-sm border border-border">
    <div className="flex gap-2 items-center mb-2">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={author.profileImage}
        alt="User profile"
      />
      <div>
        <div className="font-medium text-foreground">{author.name}</div>
        <div className="text-sm text-muted-foreground">@{author.username}</div>
      </div>
    </div>
    <Separator />
    <div className="mt-2 whitespace-pre-wrap">{text}</div>
  </div>
);
