import { useEffect, useState } from "react";
import { useAssistants } from "@/hooks/useAssistants";
import { Content, Control, ControlPanel } from "@/components/ControlPanel";
import ChatInput from "@/components/ChatInput";
import { Button } from "@/components/ui/button";
import { Assistant, GeneratedPost } from "@/lib/types";

export const GeneratePost = ({
  selectedAssistant,
}: {
  selectedAssistant: Assistant;
}) => {
  const { 
    generatePost, 
    saveGeneratedPost, 
    fetchGeneratedPosts 
  } = useAssistants();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [awaitingAccept, setAwaitingAccept] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);

  const resetState = () => {
    setPrompt("");
    setGeneratedPost("");
    setIsLoading(false);
    setAwaitingAccept(false);
  }

  // reset state if selectedAssistant changes
  useEffect(() => {
    const _fetchGeneratedPosts = async () => {
      setIsLoadingPosts(true)
      const res = await fetchGeneratedPosts(selectedAssistant.author)
      setIsLoadingPosts(false)
      
      if (res.error) {
        // TODO: handle error
      } else {
        setGeneratedPosts(res.generatedPosts!)
      }
    }

    _fetchGeneratedPosts()
    resetState()
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
      // doesn't do another API call, optimistically updates list
      setGeneratedPosts(prev => [...prev, res.generatedPost]);
    }
    setAwaitingAccept(false);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 overflow-y-hidden">
      <ControlPanel half title="Generate Post" isLoading={isLoading}>
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
      <ControlPanel half title="History" isLoading={isLoadingPosts}>
        <Content>
          <div>
            {generatedPosts.map(o => (
              <div className="p-2 text-wrap">{JSON.stringify(o)}</div>
            ))}
          </div>
        </Content>
      </ControlPanel>
    </div>
  );
};
