import {
  Calendar,
  dateFnsLocalizer,
  ToolbarProps,
  type View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US"; // Import locale
import { Page } from "@/components/page";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Date-fns localization
const locales = {
  "en-US": enUS, // Assign imported locale
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

// Example events
const events: CalendarEvent[] = [
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

const VIEW_DEFS: { value: View; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export const PostScheduler = () => {
  const [view, setView] = useState<View>("week");
  const isMobile = useIsMobile();

  const ToolBar = memo(function ToolBar({
    onNavigate,
    label,
  }: ToolbarProps<CalendarEvent, object>) {
    return (
      <div
        className={cn(
          "flex justify-between items-center mb-4 gap-4",
          isMobile ? "flex-col text-center" : "flex-row"
        )}
      >
        <div className={cn("flex gap-1", isMobile && "order-1 w-full")}>
          <Button
            size={isMobile ? "full" : "default"}
            variant="outline"
            onClick={() => onNavigate("PREV")}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "full" : "default"}
            onClick={() => onNavigate("TODAY")}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "full" : "default"}
            onClick={() => onNavigate("NEXT")}
          >
            <ChevronRight />
          </Button>
        </div>
        <div
          className={cn("whitespace-nowrap uppercase", isMobile && "order-3")}
        >
          {label}
        </div>
        <Select
          defaultValue={view} // Set the default value
          onValueChange={(value: View) => setView(value)} // Update state when the value changes
        >
          <SelectTrigger
            className={cn(isMobile ? "w-full order-2" : "w-[180px]")}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {VIEW_DEFS.map((o) => (
              <SelectItem value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  });

  return (
    <Page title={{ text: "Scheduled Posts" }}>
      <div className="flex flex-col flex-1 px-4 gap-4 items-center w-full">
        <Button size="full" variant="accept">
          Schedule New Post
        </Button>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          view={view}
          components={{
            toolbar: ToolBar, // Custom toolbar with navigation and view switching
          }}
          className="w-full [&_.rbc-day-slot_.rbc-time-slot]:border-none [&_.rbc-today]:bg-gray-100
          [&_.rbc-event]:bg-black [&_.rbc-selected]:bg-black 
          [&_.rbc-timeslot-group]:border-gray-100 [&_.rbc-day-slot.rbc-today_.rbc-timeslot-group]:border-gray-200
          [&_.rbc-time-slot]:text-xs [&_.rbc-time-slot]:font-light [&_.rbc-time-slot]:text-gray-600 [&_.rbc-time-slot]:p-2 [&_.rbc-time-slot]:pb-0
          [&_.rbc-time-view]:rounded-lg
          [&_.rbc-header]:p-4 [&_.rbc-header]:flex [&_.rbc-header]:flex-col [&_.rbc-header]:justify-center [&_.rbc-header]:font-medium [&_.rbc-header]:text-gray-600
          [&_.rbc-time-content]:border-t
          [&_.rbc-allday-cell]:hidden
           [&_.rbc-header]:border-b-0
          "
        />
      </div>
    </Page>
  );
};
