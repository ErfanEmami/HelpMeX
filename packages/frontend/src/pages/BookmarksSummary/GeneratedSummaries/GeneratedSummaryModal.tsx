import { BookmarksSummary } from "@/lib/types";
import { SummaryCard } from "../components/SummaryCard";
import Modal from "@/components/Modal";

export const GeneratedSummaryModal = ({
  bookmarksSummary,
  onClose,
}: {
  bookmarksSummary: BookmarksSummary;
  onClose: () => void;
}) => {
  return (
    <Modal
      title="Generated Summary"
      control={{
        onAccept: { text: "Close", onClick: onClose },
      }}
    >
      <div className="flex flex-col gap-4">
        {bookmarksSummary.themes.map((theme) => (
          <SummaryCard {...theme} />
        ))}
      </div>
    </Modal>
  );
};
