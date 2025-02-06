import { Page } from "@/components/page";
import { useContentAssistantContext } from "@/pages/ContentAssistant/context/ContentAssistantContext";
import Title from "@/components/Title";

export const withAssistants = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function WrappedComponent(props: P): React.ReactElement {
    const { contentAssistantState } = useContentAssistantContext();

    const {
      selectedAssistant,
      loadingState: { isLoadingAssistants },
    } = contentAssistantState;

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
