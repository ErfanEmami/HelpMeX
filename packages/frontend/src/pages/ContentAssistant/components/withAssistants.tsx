import { Page } from "@/components/page";
import { useXerContext } from "@/pages/ContentAssistant/context/XerContext";
import Title from "@/components/Title";

export const withAssistants = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function WrappedComponent(props: P): React.ReactElement {
    const { xerState } = useXerContext();

    const {
      selectedAssistant,
      loadingState: { isLoadingAssistants },
    } = xerState;

    const renderOverlay = () => {
      if (selectedAssistant) return null;

      return (
        <Title isTyped white>
          Select or create an assistant.
        </Title>
      );
    };

    return (
      <Page isLoading={isLoadingAssistants} overlay={renderOverlay()}>
        <Component {...props} />
      </Page>
    );
  };
};
