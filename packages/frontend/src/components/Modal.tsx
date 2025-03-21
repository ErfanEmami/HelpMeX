import ReactDOM from "react-dom";
import { Loading } from "./Loading";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const modalVariants = cva(
  "flex flex-col bg-background border rounded-lg shadow-lg max-h-[80vh] overflow-hidden", // Base styles
  {
    variants: {
      width: {
        fit: "w-fit",
        sm: "w-[350px]",
        md: "w-[600px]",
        lg: "w-[800px]",
        xl: "w-full",
      },
      height: {
        fit: "h-fit",
        full: "h-full"
      },
    },
    defaultVariants: {
      width: "md",
      height: "fit",
    },
  }
);

interface ModalProps extends VariantProps<typeof modalVariants> {
  error?: string | null;
  isLoading?: boolean;
  children: React.ReactNode;
  title?: string;
  control?: {
    onCancel?: { text: string; onClick: () => void, disabled?: boolean, };
    onAccept?: { text: string; onClick: () => void, disabled?: boolean, };
    onFormSubmit?: { formId: string; text: string, disabled?: boolean, };
  };
}

const Modal = ({
  error,
  isLoading,
  children,
  width,
  height,
  control,
  title,
}: ModalProps) => {
  const isMobile = useIsMobile();
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-[50] bg-black/50 dark:bg-black/80">
      <div
        className={cn(modalVariants({ width, height }), "mx-4", isMobile && "w-full max-w-[400px]")}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex gap-2 items-center justify-center border-b border-border p-3 bg-primary-foreground">
            <h2 className="font-semibold">{title}</h2>
          </div>
        )}

        {error && <div className="text-destructive text-center pt-4">{error}</div>}

        <div className="flex-1 overflow-auto p-4">
          {isLoading ?  <Loading /> : children}
        </div>

        {control && (
          <div className="flex gap-2 justify-end items-center border-t border-border p-3 bg-primary-foreground">
            {control.onCancel && (
              <Button
                variant="outline"
                disabled={!control.onCancel.onClick || control.onCancel.disabled}
                onClick={control.onCancel.onClick}
              >
                {control.onCancel.text}
              </Button>
            )}
            {control.onAccept && (
              <Button
                disabled={!control.onAccept.onClick || control.onAccept.disabled}
                onClick={control.onAccept.onClick}
              >
                {control.onAccept.text}
              </Button>
            )}
            {control.onFormSubmit && (
              <Button 
                type="submit" 
                disabled={control.onFormSubmit.disabled}
                form={control.onFormSubmit.formId}
              >
                {control.onFormSubmit.text}
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
