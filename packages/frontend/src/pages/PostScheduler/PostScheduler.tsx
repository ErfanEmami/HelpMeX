import { Page } from "@/components/page";
import {  useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

import { SchedulePostModal } from "./components/schedule_post/SchedulePostModal";
import { BigCalendar } from "@/components/BigCalendar";
import {
  ScheduledPostExtended,
  type CalendarEvent,
} from "@/lib/types";
import { PlusIcon } from "lucide-react";
import { usePostSchedulerContext } from "./context/PostSchedulerContext";
import { ScheduleThreadModal } from "./components/schedule_thread/ScheduleThreadModal";
import { ScheduleCampaignModal } from "./components/schedule_campaign/ScheduleCampaignModal";
import { ScheduledContent } from "./context/types";

const scToCalendarEvent = (sc: ScheduledContent): CalendarEvent => ({
  start: new Date(sc.scheduledFor),
  end: new Date(new Date(sc.scheduledFor).getTime() + 60 * 60 * 1000), // 1 hour ahead
});

const convertScheduledPostsToCalendarEvents = (
  scheduledPosts: ScheduledContent[]
): CalendarEvent[] => scheduledPosts.map((o) => scToCalendarEvent(o));

type ModalType = "campaign" | "post" | "thread"

export const PostScheduler = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const {
    postSchedulerState: {
      scheduledContent,
      loadingState: { isLoadingScheduledPosts },
    },
  } = usePostSchedulerContext();

  const calendarEvents = useMemo(
    () => convertScheduledPostsToCalendarEvents(scheduledContent),
    [scheduledContent]
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
    <Page title={{ text: "Scheduled Content" }} isLoading={isLoadingScheduledPosts}>
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
