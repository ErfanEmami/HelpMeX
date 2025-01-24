"use client";

import { ArrowUp, Globe, Paperclip } from "lucide-react";
import { type ChangeEvent, type KeyboardEvent, useRef } from "react";

type ChatInputProps = {
  input: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const LINE_HEIGHT = 24;
const MAX_LINES = 10;
const MAX_HEIGHT = LINE_HEIGHT * MAX_LINES;

export default function ChatInput({
  input,
  placeholder,
  onChange,
  onSubmit,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Shift+Enter = new line
  // Enter = submit
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) return;
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, MAX_HEIGHT)}px`;
    }
  };

  const _onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit();

    // Reset height after submit
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Focus textarea when parent is clicked
  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div
      className="flex cursor-text flex-col gap-3 rounded-lg border bg-gray-100 p-3 shadow-sm"
      onClick={focusTextarea} // Trigger focus on click
    >
      <textarea
        ref={textareaRef}
        className="w-full resize-none overflow-y-auto border-none bg-transparent text-sm placeholder-gray-500 outline-none"
        placeholder={placeholder}
        rows={1}
        value={input}
        onChange={_onChange}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        style={{ lineHeight: `${LINE_HEIGHT}px`, maxHeight: `${MAX_HEIGHT}px` }} // Limit height to 10 lines
      ></textarea>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-300">
            <Paperclip size={20} />
          </button>
          <button className="text-gray-400 hover:text-gray-300">
            <Globe size={20} />
          </button>
        </div>

        <div>
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 ${
              input?.trim() ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
            onClick={handleSubmit}
            disabled={!input?.trim()}
          >
            <ArrowUp size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
