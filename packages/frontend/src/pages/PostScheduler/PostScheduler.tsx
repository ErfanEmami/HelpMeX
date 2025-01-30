import { Page } from "@/components/page";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { SchedulePostModal } from "./SchedulePostModal";
import { BigCalendar } from "@/components/BigCalendar";
import { CalendarEvent, SchedulePost } from "@/lib/types";

// Example events
const TEST_EVENTS: CalendarEvent[] = [
  {
    title: "Leetcode",
    start: new Date(2025, 0, 28, 9, 0), // Jan 28, 2025, 9:00 AM
    end: new Date(2025, 0, 28, 11, 0), // Jan 28, 2025, 11:00 AM
  },
  {
    title: "Coding Project",
    start: new Date(2025, 0, 28, 12, 0), // Jan 28, 2025, 12:00 PM
    end: new Date(2025, 0, 28, 15, 0), // Jan 28, 2025, 3:00 PM
  },
  {
    title: "Gym",
    start: new Date(2025, 0, 28, 19, 0), // Jan 28, 2025, 7:00 PM
    end: new Date(2025, 0, 28, 21, 0), // Jan 28, 2025, 9:00 PM
  },
];

export const PostScheduler = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (value: SchedulePost) => {
    console.log(value);
  };

  const renderModal = () => {
    if (!showModal) return;

    return (
      <SchedulePostModal
        onSubmit={handleSubmit}
        onClose={() => setShowModal(false)}
      />
    );
  };

  return (
    <Page title={{ text: "Scheduled Posts" }}>
      {renderModal()}
      <div className="flex flex-col flex-1 px-4 gap-4 items-center w-full overflow-y-hidden">
        <Button size="full" variant="accept" onClick={() => setShowModal(true)}>
          Schedule New Post
        </Button>
        <BigCalendar events={TEST_EVENTS} />
      </div>
    </Page>
  );
};
