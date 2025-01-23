import { useEffect } from "react";
import { Page } from "@/components/page";
import { useSidebarContext } from "@/components/ui/sidebar";
import { NavAssistants } from "./NavAssistants";
import { useXerContext } from "@/context/xer_context/XerContext";
import { useXer } from "@/hooks/useXer";
import { Loading } from "@/components/Loading";

export const Xer = () => {
  const { fetchAssistants } = useXer();
  const { setNavBody } = useSidebarContext();
  const { xerState } = useXerContext();

  const {
    assistants,
    selectedAssistant,
    loadingState: { isLoadingAssistants },
  } = xerState;
  const hasAssistants = assistants.length > 0;

  // load assistants
  useEffect(() => {
    fetchAssistants();
  }, []);

  // set sidebar
  useEffect(() => {
    setNavBody(<NavAssistants />);

    return () => setNavBody(null);
  }, [hasAssistants, assistants]);

  if (isLoadingAssistants) {
    return <Loading />;
  }

  return (
    <Page>
      <div className="p-2">
        {selectedAssistant ? (
          <div key={selectedAssistant.id}>
            {JSON.stringify(selectedAssistant)}
          </div>
        ) : (
          <div>Select an assistant</div>
        )}
      </div>
    </Page>
  );
};
