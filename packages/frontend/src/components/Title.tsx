import { useEffect, useRef, useState } from "react";

const TYPING_SPEED = 30;

export default function Title({
  isTyped,
  children,
}: {
  isTyped?: boolean;
  children: string;
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
      className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl"
      style={{ visibility: displayedText ? "visible" : "hidden" }}
    >
      {displayedText || children}
    </h1>
  );
}
