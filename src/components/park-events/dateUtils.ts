import { parse, isBefore, startOfDay, isSameMonth } from "date-fns";

const REFERENCE_YEAR = 2026;

/**
 * Parse a date string like "Sat Mar 7", "Fri Apr 24", or "Sat Mar 7 11AM-3PM"
 * into a Date object (assuming year 2026). Returns null if unparseable.
 */
export function parseEventDate(dateStr: string): Date | null {
  const match = dateStr.match(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/
  );
  if (!match) return null;
  return parse(
    `${match[1]} ${match[2]} ${REFERENCE_YEAR}`,
    "MMM d yyyy",
    new Date()
  );
}

/**
 * Check if a date is in the past (before start of today).
 */
export function isDatePast(date: Date, today: Date): boolean {
  return isBefore(date, startOfDay(today));
}

/**
 * Check if a date falls in the same month & year as `today`.
 */
export function isInCurrentMonth(date: Date, today: Date): boolean {
  return isSameMonth(date, today);
}

/**
 * Collect all individual date strings from an event's sessions.
 */
export function getAllSessionDates(
  sessions: { dates: string[] }[]
): string[] {
  return sessions.flatMap((s) => s.dates);
}

/**
 * Given an array of date strings, find the earliest one that is today or later.
 * Returns the original string or null if all dates are past.
 */
export function getNextUpcomingDateStr(
  dateStrs: string[],
  today: Date
): string | null {
  const todayStart = startOfDay(today);
  let earliest: { str: string; date: Date } | null = null;

  for (const str of dateStrs) {
    const date = parseEventDate(str);
    if (!date) continue;
    if (!isBefore(date, todayStart)) {
      if (!earliest || isBefore(date, earliest.date)) {
        earliest = { str, date };
      }
    }
  }

  return earliest?.str ?? null;
}

/**
 * Given an event's sessions (or a flat dates string), determine:
 * - isFullyPast: all dates are before today
 * - hasCurrentMonthDate: at least one date is in the current month
 * - nextUpcomingDate: the earliest upcoming date string (or null)
 */
export function getEventDateStatus(
  dateSegments: string[],
  sessions: { dates: string[] }[] | undefined,
  today: Date
): {
  isFullyPast: boolean;
  hasCurrentMonthDate: boolean;
  nextUpcomingDate: string | null;
} {
  // Collect all date strings (prefer sessions if available, else use segments)
  const allDateStrs = sessions
    ? getAllSessionDates(sessions)
    : dateSegments;

  const todayStart = startOfDay(today);
  let isFullyPast = true;
  let hasCurrentMonthDate = false;
  let nextUpcoming: { str: string; date: Date } | null = null;

  for (const str of allDateStrs) {
    const date = parseEventDate(str);
    if (!date) continue;

    if (!isBefore(date, todayStart)) {
      isFullyPast = false;
      if (!nextUpcoming || isBefore(date, nextUpcoming.date)) {
        nextUpcoming = { str, date };
      }
    }

    if (isInCurrentMonth(date, today)) {
      hasCurrentMonthDate = true;
    }
  }

  return {
    isFullyPast,
    hasCurrentMonthDate,
    nextUpcomingDate: nextUpcoming?.str ?? null,
  };
}
