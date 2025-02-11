import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const actionButtonVariants = cva("transition-colors", {
  variants: {
    actionType: {
      minus:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      plus: "bg-green-700 text-white hover:bg-green-700/90 hover:text-white",
    },
  },
  defaultVariants: {
    actionType: "plus",
  },
});

interface ActionButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof actionButtonVariants> {
  actionType: "plus" | "minus";
}

export function ActionButton({
  actionType,
  size,
  className,
  ...props
}: ActionButtonProps) {
  const Icon = actionType === "plus" ? Plus : Minus;

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(actionButtonVariants({ actionType }), className)}
      {...props}
    >
      <Icon />
    </Button>
  );
}
