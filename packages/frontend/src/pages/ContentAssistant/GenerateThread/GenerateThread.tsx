import { useEffect, useState } from "react";
import { useAssistants } from "@/hooks/useAssistants";
import { Content, Control, ControlPanel } from "@/components/ControlPanel";
import { Button } from "@/components/ui/button";
import { SavedGeneratedThread, SaveGeneratedThread } from "@/lib/types";
import { withAssistants } from "../components/withAssistants";
import { useContentAssistantContext } from "@/pages/ContentAssistant/context/ContentAssistantContext";
import { GenerateThreadModal } from "./newThreadModal";
import { GeneratedThreadCard } from "@/components/ui/GeneratedThreadCard";
import { useDispatchHelpers } from "@/context/app_context/useDispatchHelpers";

export const GenerateThread = withAssistants(() => {
  const { setAppError } = useDispatchHelpers();
  const {
    contentAssistantState: { selectedAssistant },
  } = useContentAssistantContext();

  const { saveGeneratedThread, fetchGeneratedThreads } = useAssistants();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingThreads, setIsLoadingThreads] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [generatedThread, setGeneratedThread] =
    useState<SaveGeneratedThread | null>(null);
  const [generatedThreads, setGeneratedThreads] = useState<
    SavedGeneratedThread[]
  >([]);

  const resetState = () => {
    setGeneratedThread(null);
    setIsLoading(false);
  };

  // reset state if selectedAssistant changes
  useEffect(() => {
    if (!selectedAssistant) {
      return;
    }

    const _fetchGeneratedThreads = async () => {
      setIsLoadingThreads(true);
      const res = await fetchGeneratedThreads(selectedAssistant.author);
      setIsLoadingThreads(false);
      if (res.error) {
        setAppError({
          text: res.error,
          onRetry: _fetchGeneratedThreads,
        });
      } else {
        setGeneratedThreads(res.generatedThreads!);
        setAppError(null);
      }
    };

    _fetchGeneratedThreads();
    resetState();
  }, [selectedAssistant]);

  const handleSaveThread = async () => {
    if (!generatedThread || !selectedAssistant) {
      return;
    }

    setIsLoading(true);
    const res = await saveGeneratedThread(generatedThread);
    if (res.error) {
      setAppError({
        text: res.error,
        onRetry: handleSaveThread,
      });
    } else {
      setGeneratedThread(null);
      setGeneratedThreads((prev) => [...prev, res.generatedThread!]);
      setAppError(null);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 overflow-y-hidden">
      {showModal && selectedAssistant && (
        <GenerateThreadModal
          selectedAssistant={selectedAssistant}
          onClose={() => setShowModal(false)}
          onCreate={(generatedThread) => {
            setGeneratedThread(generatedThread);
          }}
        />
      )}
      <ControlPanel half title="Generate Thread" isLoading={isLoading}>
        <Content>
          <div className="w-full flex flex-col gap-4 font-mono whitespace-pre-wrap">
            {generatedThread?.posts.map((o) => (
              <div className="border border-border p-2">{o.text}</div>
            ))}
          </div>
        </Content>
        <Control>
          {generatedThread ? (
            <div className="flex w-full gap-2">
              <Button
                onClick={() => {
                  setGeneratedThread(null);
                  setShowModal(true);
                }}
                size="full"
                variant="destructive"
              >
                Retry
              </Button>
              <Button onClick={handleSaveThread} size="full" variant="accept">
                Save Thread
              </Button>
            </div>
          ) : (
            <Button onClick={() => setShowModal(true)} size="full">
              Generate Thread
            </Button>
          )}
        </Control>
      </ControlPanel>
      <ControlPanel half title="Saved Threads" isLoading={isLoadingThreads}>
        <Content>
          <div className="w-full flex flex-col gap-2">
            {generatedThreads.map((o) => (
              <GeneratedThreadCard {...o} />
            ))}
          </div>
        </Content>
      </ControlPanel>
    </div>
  );
});
