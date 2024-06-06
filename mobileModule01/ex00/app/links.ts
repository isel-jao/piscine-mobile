import { TTime } from "./store";
import {
  CalendarRangeIcon,
  CalendarCheckIcon,
  CalendarClockIcon,
} from "lucide-react-native";

export const links: {
  title: TTime;
  path: string;
  icon: any;
}[] = [
  {
    title: "currently",
    path: "/",
    icon: CalendarClockIcon,
  },
  {
    title: "today",
    path: "/today",
    icon: CalendarCheckIcon,
  },
  {
    title: "weekly",
    path: "/weekly",
    icon: CalendarRangeIcon,
  },
];
