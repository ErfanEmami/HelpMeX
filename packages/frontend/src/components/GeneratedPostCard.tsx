import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

export const GeneratedPostCard = ({
  createdAt,
  prompt,
  text,
}: {
  createdAt: string;
  prompt: string;
  text: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col  gap-2 w-full p-4 bg-background rounded-lg shadow-sm border border-border">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between"
      >
        <div className="text-sm text-muted-foreground text-end">
          {formatDate(createdAt)}
        </div>
        <ChevronRight
          size={16}
          className={`ml-auto transition-transform duration-200 ${
            open ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>
      {open && (
        <div className="flex flex-col gap-1 border-t">
          <div className="mt-2">
            <b className="text-xs text-muted-foreground">Prompt</b>
            <p>{prompt}</p>
          </div>
          <div>
            <b className="text-xs text-muted-foreground">Generated Post</b>
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};
