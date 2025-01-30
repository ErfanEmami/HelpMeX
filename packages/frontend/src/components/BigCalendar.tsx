import {
  Calendar,
  dateFnsLocalizer,
  ToolbarProps,
  type View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US"; // Import locale
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
import { CalendarEvent } from "@/lib/types";

import "react-big-calendar/lib/css/react-big-calendar.css";

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

const VIEW_DEFS: { value: View; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export const BigCalendar = ({ events }: { events: CalendarEvent[] }) => {
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
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView="week"
      view={view}
      components={{
        toolbar: ToolBar,
      }}
      className="
        w-full [&_.rbc-day-slot_.rbc-time-slot]:border-none [&_.rbc-today]:bg-gray-100 overflow-auto
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
  );
};
