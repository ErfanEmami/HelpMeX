import { ErrorModalProps } from "@/context/app_context/types";
import Modal from "../Modal";

export const ErrorModal = ({ error, onCancel, onAccept }: ErrorModalProps) => (
  <Modal title="Error" width="sm" control={{ onAccept, onCancel }}>
    <div className="text-destructive text-center">{error}</div>
  </Modal>
);