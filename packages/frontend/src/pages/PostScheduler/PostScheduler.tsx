import { Page } from "@/components/page";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

import { SchedulePostModal } from "./SchedulePostModal";
import { BigCalendar } from "@/components/BigCalendar";
import {
  ScheduledPost,
  type CalendarEvent,
  type SchedulePostForm,
} from "@/lib/types";
import { combineDateAndTime } from "@/lib/utils";
import { useSchedulePosts } from "@/hooks/useSchedulePosts";

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
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [submitError, setSubmitError] = useState<null | string>(null);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

  const { createScheduledPost, fetchScheduledPosts } = useSchedulePosts();

  useEffect(() => {
    loadScheduledPosts();
  }, []);

  const loadScheduledPosts = async () => {
    setIsFetchingPosts(true);
    const res = await fetchScheduledPosts();
    setIsFetchingPosts(false);

    if (res.error) {
      setFetchError(res.error);
    } else {
      setScheduledPosts(res.scheduledPosts || []);
      setFetchError(null);
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
    <Page
      title={{ text: "Scheduled Posts" }}
      isLoading={isFetchingPosts}
      error={
        fetchError
          ? { text: fetchError, onClick: () => loadScheduledPosts() }
          : null
      }
    >
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
        <Button size="full" variant="accept" onClick={() => setShowModal(true)}>
          Schedule New Post
        </Button>
        <BigCalendar events={calendarEvents} />
      </div>
    </Page>
  );
};
