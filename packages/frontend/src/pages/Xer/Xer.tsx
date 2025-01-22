import { Loading } from "@/components/Loading";
import { useXer } from "@/hooks/useXer";
import { useEffect, useState } from "react";
import { CreateModal } from "./CreateModal";
import { Page } from "@/components/page";
import { useSidebarContext } from "@/components/ui/sidebar";
import { NavAssistants } from "./NavAssistants";

export const Xer = () => {
  const { isLoadingAssistants, assistants } = useXer();
  const { setNavBody } = useSidebarContext();

  const [showModal, setShowModal] = useState(false);

  const hasAssistants = assistants.length > 0;

  useEffect(() => {
    if (hasAssistants) {
      setNavBody(
        <NavAssistants
          onNewAssistant={() => setShowModal(true)}
          assistants={assistants}
        />
      );
    }

    return () => setNavBody(null);
  }, [hasAssistants, assistants]);

  if (isLoadingAssistants) {
    return <Loading />;
  }

  return (
    <Page>
      {showModal || !hasAssistants ? (
        <CreateModal
          onClose={hasAssistants ? () => setShowModal(false) : null}
        />
      ) : null}
      <div className="p-2">
        {assistants.map((assistant) => (
          <div key={assistant.id}>{JSON.stringify(assistant)}</div>
        ))}
      </div>
    </Page>
  );
};
