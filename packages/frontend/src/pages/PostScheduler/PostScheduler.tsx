import { Page } from "@/components/page";
import {  useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

import { SchedulePostModal } from "./components/schedule_post/SchedulePostModal";
import { BigCalendar } from "@/components/BigCalendar";
import {
  ScheduledPost,
  type CalendarEvent,
} from "@/lib/types";
import { PlusIcon } from "lucide-react";
import { usePostSchedulerContext } from "./context/PostSchedulerContext";
import { ScheduleThreadModal } from "./components/schedule_thread/ScheduleThreadModal";
import { ScheduleCampaignModal } from "./components/schedule_campaign/ScheduleCampaignModal";

const spToCalendarEvent = (sp: ScheduledPost): CalendarEvent => ({
  start: new Date(sp.scheduledFor),
  end: new Date(new Date(sp.scheduledFor).getTime() + 60 * 60 * 1000), // 1 hour ahead
});

const convertScheduledPostsToCalendarEvents = (
  scheduledPosts: ScheduledPost[]
): CalendarEvent[] => scheduledPosts.map((o) => spToCalendarEvent(o));

type ModalType = "campaign" | "post" | "thread"

export const PostScheduler = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const {
    postSchedulerState: {
      scheduledPosts,
      loadingState: { isLoadingScheduledPosts },
    },
  } = usePostSchedulerContext();

  const calendarEvents = useMemo(
    () => convertScheduledPostsToCalendarEvents(scheduledPosts),
    [scheduledPosts]
  );

  const renderModal = () => {
    switch (activeModal) {
      case "post":
        return <SchedulePostModal onClose={() => setActiveModal(null)} />
  
      case "thread":
        return <ScheduleThreadModal onClose={() => setActiveModal(null)} />
  
      case "campaign":
        return <ScheduleCampaignModal onClose={() => setActiveModal(null)} />
  
      default:
        return null
    }
  }

  return (
    <Page title={{ text: "Scheduled Posts" }} isLoading={isLoadingScheduledPosts}>
      {renderModal()}
      <div className="flex flex-col flex-1 px-4 gap-4 items-center w-full overflow-y-hidden">
        <div className="flex gap-4 w-full justify-center">
          <Button size="full" onClick={() => setActiveModal("post")}>
            <PlusIcon /> Post
          </Button>
          <Button size="full" onClick={() => setActiveModal("thread")}>
            <PlusIcon /> Thread
          </Button>
          <Button size="full" onClick={() => setActiveModal("campaign")}>
            <PlusIcon /> Campaign
          </Button>
        </div>
        <BigCalendar events={calendarEvents} />
      </div>
    </Page>
  );
};
