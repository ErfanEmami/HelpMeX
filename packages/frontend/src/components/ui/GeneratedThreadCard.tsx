import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { SavedGeneratedThread } from "@/lib/types";

export const GeneratedThreadCard = (generatedThread: SavedGeneratedThread) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col  gap-2 w-full p-4 bg-background rounded-lg shadow-sm border border-border">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between"
      >
        <div className="text-sm text-muted-foreground text-end">
          {formatDate(generatedThread.createdAt.toString())}
        </div>
        <ChevronRight
          size={16}
          className={`ml-auto transition-transform duration-200 ${
            open ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>
      {open && (
        <div className="flex flex-col gap-4 mt-2">
          {generatedThread.posts.map((o) => (
            <div className="border border-border rounded-md p-2">{o.text}</div>
          ))}
        </div>
      )}
    </div>
  );
};
