import { Page } from "@/components/page";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

import { SchedulePostModal } from "./components/SchedulePostModal";
import { BigCalendar } from "@/components/BigCalendar";
import {
  ScheduledPost,
  type CalendarEvent,
  type SchedulePostForm,
} from "@/lib/types";
import { combineDateAndTime } from "@/lib/utils";
import { useSchedulePosts } from "@/hooks/useSchedulePosts";
import { useDispatchHelpers } from "@/context/app_context/useDispatchHelpers";
import { PlusIcon } from "lucide-react";

const spToCalendarEvent = (sp: ScheduledPost): CalendarEvent => ({
  start: new Date(sp.scheduledFor),
  end: new Date(new Date(sp.scheduledFor).getTime() + 60 * 60 * 1000), // 1 hour ahead
});

const convertScheduledPostsToCalendarEvents = (
  scheduledPosts: ScheduledPost[]
): CalendarEvent[] => scheduledPosts.map((o) => spToCalendarEvent(o));

export const PostScheduler = () => {
  const [showModal, setShowModal] = useState(false);
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<null | string>(null);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

  const { createScheduledPost, fetchScheduledPosts } = useSchedulePosts();
  const { setAppError } = useDispatchHelpers();

  useEffect(() => {
    loadScheduledPosts();
  }, []);

  const loadScheduledPosts = async () => {
    setIsFetchingPosts(true);
    const res = await fetchScheduledPosts();
    setIsFetchingPosts(false);

    if (res.error) {
      setAppError({
        text: res.error,
        onRetry: loadScheduledPosts,
      });
    } else {
      setScheduledPosts(res.scheduledPosts || []);
      setAppError(null);
    }
  };

  const handleSubmit = async (value: SchedulePostForm) => {
    setSubmitError(null);
    setIsSubmitting(true);

    const res = await createScheduledPost({
      text: value.text,
      scheduledFor: combineDateAndTime(value.date, value.time),
    });

    if (res.error) {
      setSubmitError(res.error);
    } else {
      setScheduledPosts((prev) => [...prev, res.scheduledPost!]);
      setShowModal(false);
    }

    setIsSubmitting(false);
  };

  const calendarEvents = useMemo(
    () => convertScheduledPostsToCalendarEvents(scheduledPosts),
    [scheduledPosts]
  );

  return (
    <Page title={{ text: "Scheduled Posts" }} isLoading={isFetchingPosts}>
      {showModal && (
        <SchedulePostModal
          error={submitError}
          isLoading={isSubmitting}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowModal(false);
            setSubmitError(null);
          }}
        />
      )}

      <div className="flex flex-col flex-1 px-4 gap-4 items-center w-full overflow-y-hidden">
        <div className="flex gap-4 w-full justify-center">
          <Button size="full" onClick={() => setShowModal(true)}>
            <PlusIcon /> Post
          </Button>
          <Button size="full" onClick={() => setShowModal(true)}>
            <PlusIcon /> Thread
          </Button>
          <Button size="full" onClick={() => setShowModal(true)}>
            <PlusIcon /> Campaign
          </Button>
        </div>
        <BigCalendar events={calendarEvents} />
      </div>
    </Page>
  );
};
