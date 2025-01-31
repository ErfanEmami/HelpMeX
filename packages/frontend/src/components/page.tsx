import { cn } from "../lib/utils";
import { Loading } from "./Loading";
import Modal from "./Modal";
import { Overlay } from "./Overlay";
import Title from "./Title";

export const Page = ({
  center,
  hcenter,
  vcenter,
  title,
  overlay,
  children,
  error,
  isLoading,
}: {
  center?: boolean;
  hcenter?: boolean;
  vcenter?: boolean;
  title?: { text: string; isTyped?: boolean };
  overlay?: React.ReactNode | null;
  children: React.ReactNode;
  error?: { text: string; onClick: () => void } | null;
  isLoading?: boolean;
}) => (
  <div
    className={cn(
      "relative flex flex-1 w-full flex-col overflow-auto max-h-screen py-4",
      hcenter && "items-center",
      vcenter && "justify-center",
      center && "items-center justify-center"
    )}
  >
    {isLoading ? (
      <Loading />
    ) : (
      <>
        {overlay && <Overlay>{overlay}</Overlay>}

        {error && (
          <Modal
            title="Error"
            width="sm"
            control={{ onAccept: { text: "Close", onClick: error.onClick } }}
          >
            <div className="text-destructive text-center">{error.text}</div>
          </Modal>
        )}

        {title && (
          <div className="mb-4">
            <Title isTyped={title.isTyped}>{title.text}</Title>
          </div>
        )}

        {children}
      </>
    )}
  </div>
);
