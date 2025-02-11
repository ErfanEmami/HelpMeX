import { ActionButton } from "@/components/ActionButton";
import { Content } from "@/components/ControlPanel";
import { Textarea } from "@/components/ui/textarea";
import { ManualThreadPost } from "@/lib/types";

export const CreateManualThread = ({
  posts,
  setPosts,
}: {
  posts: ManualThreadPost[];
  setPosts: React.Dispatch<React.SetStateAction<ManualThreadPost[]>>;
}) => {
  const addPost = () => {
    setPosts([...posts, { text: "" }]);
  };

  const updatePost = (index: number, newText: string) => {
    setPosts(
      posts.map((post, i) => (i === index ? { text: newText } : post))
    );
  };

  const removePost = (index: number) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 flex flex-col gap-1 overflow-hidden">
      <ActionButton
        type="button"
        actionType="plus"
        className="self-end"
        onClick={addPost}
      />
      <Content>
        {posts.map((post, idx) => (
          <div className="bg-background flex flex-col w-full border border-border rounded-md overflow-hidden min-h-[200px]">
            <ActionButton
              type="button"
              actionType="minus"
              className="self-end h-5 w-5 m-1"
              onClick={() => removePost(idx)}
            />
            <Textarea
              key={idx}
              value={post.text}
              placeholder="Post content..."
              onChange={(e) => updatePost(idx, e.target.value)}
              className="h-full py-0 border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        ))}
      </Content>
    </div>
  );
};