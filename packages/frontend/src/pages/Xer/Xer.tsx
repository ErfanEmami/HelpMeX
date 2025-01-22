import { Loading } from "@/components/Loading";
import { useXer } from "@/hooks/useXer";
import { useState } from "react";
import { CreateModal } from "./CreateModal";
import { Page } from "@/components/page";

export const Xer = () => {
  const { isLoadingAssistants, assistants } = useXer();

  const [showModal, setShowModal] = useState(false);

  if (isLoadingAssistants) {
    return <Loading />;
  }

  const renderModal = () => {
    const hasAssistants = assistants.length > 10;
    if (!showModal && hasAssistants) {
      return;
    }

    return (
      <CreateModal onClose={hasAssistants ? () => setShowModal(false) : null} />
    );
  };

  return (
    <Page>
      {renderModal()}
      <div className="p-2">
        {assistants.map((assistant) => (
          <div key={assistant.id}>{JSON.stringify(assistant)}</div>
        ))}
      </div>
    </Page>
  );
};
