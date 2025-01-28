import ReactDOM from "react-dom";
import { Loading } from "./Loading";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const modalVariants = cva(
  "flex flex-col bg-white rounded-lg shadow-lg z-[1001] max-h-[80vh]", // Base styles
  {
    variants: {
      width: {
        fit: "w-fit",
        sm: "w-1/4",
        md: "w-1/2",
        lg: "w-3/4",
        xl: "w-full max-w-4xl",
      },
    },
    defaultVariants: {
      width: "md",
    },
  }
);

interface ModalProps extends VariantProps<typeof modalVariants> {
  error?: string | null;
  isLoading?: boolean;
  children: React.ReactNode;
  control?: {
    onCancel?: { text: string; onClick: () => void };
    onAccept?: { text: string; onClick: () => void };
  };
}

const Modal = ({ error, isLoading, children, width, control }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-[1000] bg-black bg-opacity-50">
      <div
        className={cn(modalVariants({ width }))}
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && <Loading />}
        {error && <div className="text-red-700 text-center pb-2">{error}</div>}

        <div className="flex-1 overflow-y-auto">{children}</div>

        {control && (
          <div className="flex gap-2 justify-end items-center border-t mt-2 p-2">
            {control.onCancel && (
              <Button
                variant="outline"
                disabled={!control.onCancel.onClick}
                onClick={control.onCancel.onClick}
              >
                {control.onCancel.text}
              </Button>
            )}
            {control.onAccept && (
              <Button
                disabled={!control.onAccept.onClick}
                onClick={control.onAccept.onClick}
              >
                {control.onAccept.text}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body // Render modal outside of the root DOM node
  );
};

export default Modal;
