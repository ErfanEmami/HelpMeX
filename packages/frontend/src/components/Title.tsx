import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TYPING_SPEED = 25;

export default function Title({
  isTyped,
  children,
  white,
}: {
  isTyped?: boolean;
  children: string;
  white?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState(isTyped ? "" : children);
  const currentIndex = useRef(0);

  // render heading 1 charactor at a time
  useEffect(() => {
    if (!isTyped) return;

    const interval = setInterval(() => {
      if (currentIndex.current > children.length) {
        return clearInterval(interval);
      }
      setDisplayedText(children.substring(0, currentIndex.current));
      currentIndex.current++;
    }, TYPING_SPEED);

    return () => (isTyped ? clearInterval(interval) : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h1
      className={cn(
        "text-center font-bold",
        displayedText ? "visible" : "hidden",
        white && "text-white"
      )}
    >
      {displayedText || children}
    </h1>
  );
}
