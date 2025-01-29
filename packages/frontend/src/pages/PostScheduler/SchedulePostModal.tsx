import Modal from "@/components/Modal";

export const SchedulePostModal = ({
  onAccept,
  onClose,
}: {
  onAccept: () => void;
  onClose: () => void;
}) => {
  return (
    <Modal
      title="Schedule Post"
      control={{
        onAccept: { text: "Schedule", onClick: onAccept },
        onCancel: { text: "Cancel", onClick: onClose },
      }}
    >
      <div>asd</div>
    </Modal>
  );
};
