import { useEffect } from "react";
import { Page } from "@/components/page";
import { useXerContext } from "@/context/xer_context/XerContext";
import { useAssistants } from "@/hooks/useAssistants";
import { Loading } from "@/components/Loading";
import Title from "@/components/Title";

export const withAssistants = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function WrappedComponent(props: P): React.ReactElement {
    const { fetchAssistants } = useAssistants();
    const { xerState, xerDispatch } = useXerContext();

    const {
      selectedAssistant,
      loadingState: { isLoadingAssistants },
    } = xerState;

    // load assistants
    useEffect(() => {
      const _fetchAssistants = async () => {
        xerDispatch({
          type: "SET_LOADING",
          payload: { isLoadingAssistants: true },
        });

        const res = await fetchAssistants();

        xerDispatch({
          type: "SET_LOADING",
          payload: { isLoadingAssistants: false },
        });

        if (res.error) {
          // TODO handle error
        } else {
          xerDispatch({
            type: "SET_ASSISTANTS",
            payload: res.assistants!,
          });
        }
      };

      _fetchAssistants();

      return () =>
        xerDispatch({
          type: "SET_LOADING",
          payload: { isLoadingAssistants: true },
        });
    }, []);

    if (isLoadingAssistants) {
      return <Loading />;
    }

    const renderOverlay = () => {
      if (selectedAssistant) return null;

      return (
        <Title isTyped white>
          Select or create an assistant.
        </Title>
      );
    };

    return (
      <Page overlay={renderOverlay()}>
        <Component {...props} />
      </Page>
    );
  };
};
