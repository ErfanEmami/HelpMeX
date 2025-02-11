import Modal from "@/components/Modal";
import { ScheduleThreadForm } from "./ScheduleThreadForm";

import { useEffect, useState } from "react";

import {  FlexibleThread, ScheduleThreadFormProps } from "@/lib/types";
import { combineDateAndTime } from "@/lib/utils";
import { usePostSchedulerContext } from "../../context/PostSchedulerContext";
import { useScheduleThreads } from "@/hooks/useScheduleThreads";
import { contentTypes } from "../../context/types";

export const ScheduleThreadModal = ({ onClose }: { onClose: () => void }) => {
  const formId = "ScheduleThreadForm";
  const defaultContentType: keyof typeof contentTypes = contentTypes.existing;

  const [schedulablePosts, setSchedulablePosts] = useState<FlexibleThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentType, setContentType] = useState<keyof typeof contentTypes>(
    contentTypes.existing
  );

  const { setThreadSchedule, fetchSchedulableThreads } = useScheduleThreads();
  const { postSchedulerDispatch } = usePostSchedulerContext();

  useEffect(() => {
    const loadGeneratedPosts = async () => {
      setError(null);
      setIsLoading(true);

      const res = await fetchSchedulableThreads();

      setIsLoading(false);

      if (res.error) {
        setError(res.error);
      } else {
        setSchedulablePosts(res.schedulableThreads!);
      }
    };

    loadGeneratedPosts();
  }, []);

  const handleSubmit = async (value: ScheduleThreadFormProps) => {
    setError(null);
    setIsLoading(true);

    const res = await setThreadSchedule({
      threadId: value.threadId,
      scheduledFor: combineDateAndTime(value.date, value.time),
    });

    setIsLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      postSchedulerDispatch({
        type: "ADD_SCHEDULED_THREAD",
        payload: res.scheduledThread!,
      });
      onClose();
    }
  };

  return (
    <Modal
      error={error}
      isLoading={isLoading}
      title="Schedule Thread"
      width="md"
      height="full"
      control={{
        onCancel: { text: "Cancel", onClick: onClose },
        onFormSubmit: {
          formId: formId,
          disabled: isLoading,
          text:
            contentType === contentTypes.existing
              ? "Schedule Existing Thread"
              : "Schedule Manual Entry",
        },
      }}
    >
      <ScheduleThreadForm
        defaultThreadType={defaultContentType}
        setContentType={setContentType}
        schedulableThreads={schedulablePosts}
        formId={formId}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
