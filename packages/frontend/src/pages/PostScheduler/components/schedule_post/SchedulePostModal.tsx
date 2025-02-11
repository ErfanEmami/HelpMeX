import Modal from "@/components/Modal";
import { SchedulePostForm } from "./SchedulePostForm";

import { useEffect, useState } from "react";

import { FlexiblePost, GeneratedPost, type SchedulePostFormProps } from "@/lib/types";
import { combineDateAndTime } from "@/lib/utils";
import { useSchedulePosts } from "@/hooks/useSchedulePosts";
import { usePostSchedulerContext } from "../../context/PostSchedulerContext";
import { contentTypes } from "../../context/types";

export const SchedulePostModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const formId = "SchedulePostForm";
  const defaultContentType: keyof typeof contentTypes = contentTypes.existing

  const [schedulablePosts, setSchedulablePosts] = useState<FlexiblePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentType, setContentType] = useState<keyof typeof contentTypes>(contentTypes.existing)

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
          disabled: isLoading,
          text:
            contentType === contentTypes.existing
              ? "Schedule Existing Post"
              : "Schedule Manual Entry",
        },
      }}
    >
      <SchedulePostForm
        defaultContentType={defaultContentType}
        setContentType={setContentType}
        schedulablePosts={schedulablePosts}
        formId={formId}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
