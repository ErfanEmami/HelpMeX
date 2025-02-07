import Modal from "@/components/Modal";
import { SchedulePostForm } from "./SchedulePostForm";

import { useEffect, useState } from "react";

import { GeneratedPost, type SchedulePostFormProps } from "@/lib/types";
import { combineDateAndTime } from "@/lib/utils";
import { useSchedulePosts } from "@/hooks/useSchedulePosts";
import { usePostSchedulerContext } from "../../context/PostSchedulerContext";

export const postTypes = {
  existing: "existing",
  manual: "manual"  
} as const

export const SchedulePostModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const formId = "SchedulePostForm";
  const defaultPostType: keyof typeof postTypes = postTypes.existing

  const [schedulablePosts, setSchedulablePosts] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postType, setPostType] = useState<keyof typeof postTypes>(postTypes.existing)

  const { setPostSchedule, fetchSchedulablePosts } = useSchedulePosts();
  const { postSchedulerDispatch } = usePostSchedulerContext()

  useEffect(() => {
    const loadGeneratedPosts = async () => {
      setError(null);
      setIsLoading(true);

      const res = await fetchSchedulablePosts();

      setIsLoading(false);

      if (res.error) {
        setError(res.error);
      } else {
        setSchedulablePosts(res.schedulablePosts!);
      }
    };

    loadGeneratedPosts();
  }, []);

  const handleSubmit = async (value: SchedulePostFormProps) => {
    setError(null);
    setIsLoading(true);

    const res = await setPostSchedule({
      postId: value.postId,
      scheduledFor: combineDateAndTime(value.date, value.time),
    });

    setIsLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      postSchedulerDispatch({
        type: "ADD_SCHEDULED_POST",
        payload: res.scheduledPost!,
      });
      onClose();
    }
  };

  return (
    <Modal
      error={error}
      isLoading={isLoading}
      title="Schedule Post"
      width="md"
      height="full"
      control={{
        onCancel: { text: "Cancel", onClick: onClose },
        onFormSubmit: {
          formId: formId,
          text:
            postType === postTypes.existing
              ? "Schedule Existing Post"
              : "Schedule Manual Entry",
        },
      }}
    >
      <SchedulePostForm
        defaultPostType={defaultPostType}
        setPostType={setPostType}
        schedulablePosts={schedulablePosts}
        formId={formId}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
