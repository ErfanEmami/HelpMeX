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
    <div
      onClick={() => setOpen((prev) => !prev)}
      className="flex flex-col  gap-2 w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="flex w-full items-center justify-between">
        <div className="text-sm text-gray-500 text-end">
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
            <b className="text-xs text-gray-500">Prompt</b>
            <p className="leading-tight">{prompt}</p>
          </div>
          <div>
            <b className="text-xs text-gray-500">Generated Post</b>
            <p className="leading-tight">{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};
