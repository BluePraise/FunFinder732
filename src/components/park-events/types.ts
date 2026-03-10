export type Month = "Mar" | "Apr" | "May" | "Jun" | "Ongoing";
export type AgeBucket = "babies" | "toddlers" | "preschool" | "elementary" | "teens" | "adults";
export type Category =
  | "Nature"
  | "Arts & Crafts"
  | "History & Tours"
  | "Adventure & Fitness"
  | "Family Programs"
  | "Festivals & Culture";

export type SortBy = "date-asc" | "date-desc" | "alpha" | "free-first";

export interface EventSession {
  code: string;
  time: string;
  dates: string[];
}

export interface ParkEvent {
  name: string;
  location: string;
  dates: string;
  price: string;
  isFree: boolean;
  ages: string;
  category: Category;
  series?: string;
  months: Month[];
  note?: string;
  sessions?: EventSession[];
}

export interface EventRow {
  event: ParkEvent;
  dateStr: string;
  dateObj: Date;
  /** True when every date of the event is in the past */
  isEventFullyPast: boolean;
  /** True when at least one event date falls in the current month */
  hasCurrentMonthDate: boolean;
  /** The next upcoming session date string, or null if all past */
  nextUpcomingSessionDate: string | null;
}
