import { useCallback, useEffect, useState } from "react";
import { useSidebarContext } from "@/components/ui/sidebar";
import { useXerContext } from "@/context/xer_context/XerContext";
import { useAssistants } from "@/hooks/useAssistants";
import { Loading } from "@/components/Loading";
import { Content, Control, ControlPanel } from "@/components/ControlPanel";
import ChatInput from "@/components/ChatInput";
import { Button } from "@/components/ui/button";
import { Assistant } from "@/lib/types";

export const GeneratePost = ({
  selectedAssistant,
}: {
  selectedAssistant: Assistant;
}) => {
  const { generatePost, saveGeneratedPost } = useAssistants();

  const [isLoading, setIsLoading] = useState(false);
  const [awaitingAccept, setAwaitingAccept] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);

  // reset state if selectedAssistant changes
  useEffect(() => {
    setPrompt("");
    setGeneratedPost("");
    setIsLoading(false);
    setAwaitingAccept(false);
  }, [selectedAssistant]);

  const handleGeneratePost = async () => {
    if (!prompt.length) {
      return;
    }

    setIsLoading(true);
    const res = await generatePost({
      author: selectedAssistant.author,
      prompt: prompt,
    });
    if (res.error || !res.generatedPost) {
      // TODO: handle error
    } else {
      setGeneratedPost(res.generatedPost);
      setAwaitingAccept(true);
    }
    setIsLoading(false);
  };

  const handleSavePost = async () => {
    if (!generatedPost) {
      return;
    }

    setIsLoading(true);
    const res = await saveGeneratedPost({
      author: selectedAssistant.author,
      jobId: selectedAssistant.jobId,
      userId: selectedAssistant.userId,
      text: generatedPost,
      prompt: prompt
    });
    if (res.error || !res.generatedPost) {
      // TODO: handle error
    } else {
      // setGeneratedPost(res.generatedPost);
    }
    setAwaitingAccept(false);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 overflow-y-hidden">
      <ControlPanel title="Generate Post" isLoading={isLoading}>
        <Content>
          <div className="w-full font-mono text-gray-700">
            {generatedPost ?? "What is your post idea?"}
          </div>
        </Content>
        <Control>
          {awaitingAccept ? (
            <div className="flex w-full   gap-2">
              <Button
                onClick={() => setAwaitingAccept(false)}
                size="full"
                variant="destructive"
              >
                Retry
              </Button>
              <Button onClick={handleSavePost} size="full" variant="accept">
                Save Post
              </Button>
            </div>
          ) : (
            <ChatInput
              placeholder="Input a post idea..."
              input={prompt}
              onChange={setPrompt}
              onSubmit={handleGeneratePost}
            />
          )}
        </Control>
      </ControlPanel>
      <ControlPanel title="History">
        <Content>
          <div>asd</div>
        </Content>
      </ControlPanel>
    </div>
  );
};
