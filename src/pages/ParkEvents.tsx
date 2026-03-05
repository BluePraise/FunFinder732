import { useState, useMemo } from "react";
import EVENTS_RAW from "../data/events.json";

// ─── Types ────────────────────────────────────────────────────────────────────

type Month = "Mar" | "Apr" | "May" | "Jun" | "Ongoing";
type AgeBucket = "babies" | "toddlers" | "preschool" | "elementary" | "teens" | "adults";
type Category =
  | "Nature"
  | "Arts & Crafts"
  | "History & Tours"
  | "Adventure & Fitness"
  | "Family Programs"
  | "Festivals & Culture";

interface ParkEvent {
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
}

// ─── Age bucket helper ────────────────────────────────────────────────────────

function getAgeBuckets(ages: string): AgeBucket[] {
  const s = ages.toLowerCase();
  const ALL: AgeBucket[] = ["babies", "toddlers", "preschool", "elementary", "teens", "adults"];
  if (s.includes("all ages")) return ALL;

  const buckets = new Set<AgeBucket>();

  // Explicit adult-only strings
  if (/^adults?$/.test(s.trim()) || /^teens and adults$/.test(s.trim())) {
    if (/teens/.test(s)) buckets.add("teens");
    buckets.add("adults");
    return [...buckets];
  }
  // Grades K-8 → preschool-ready + elementary
  if (/^grades k/.test(s)) {
    buckets.add("preschool"); buckets.add("elementary");
    return [...buckets];
  }

  // Extract numeric values as potential ages (ignore anything ≥ 100)
  const hasMonths = /months?/.test(s);
  const nums = [...s.matchAll(/\b(\d+(?:\.\d+)?)\b/g)]
    .map((m) => parseFloat(m[1]))
    .filter((n) => n < 100);

  let lo = hasMonths ? 0 : nums.length ? Math.min(...nums) : 0;
  let hi = nums.length ? Math.max(...nums) : 100;

  // "under 18 with adult" supervision cap
  if (s.includes("under 18")) hi = Math.min(hi, 17);

  // Open-ended "X+" — extend hi unless capped above
  if (/\d+\+/.test(s) && !s.includes("under 18")) hi = 100;

  // Babies     0–2
  if (lo <= 2)                           buckets.add("babies");
  // Toddlers   2–3
  if (lo <= 3 && hi >= 2)                buckets.add("toddlers");
  // Preschool  3–5
  if (lo <= 5 && hi >= 3)                buckets.add("preschool");
  // Elementary 6–12
  if (lo <= 12 && hi >= 6)               buckets.add("elementary");
  // Teens      13–17
  if (lo <= 17 && hi >= 13)              buckets.add("teens");
  // Adults — only genuine adult events, not supervision notes
  if (hi >= 18 && !s.includes("with adult") && !/adult$/.test(s.trim()))
                                         buckets.add("adults");

  return buckets.size ? [...buckets] : ALL;
}

// ─── Date parsing helper ─────────────────────────────────────────────────────

function parseFirstDate(dates: string): Date {
  const match = dates.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
  if (match) {
    return new Date(`${match[1]} ${match[2]} 2026`);
  }
  // No recognisable date (e.g. open-ended "Ongoing") → sort to end
  return new Date(8640000000000000);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EVENTS = EVENTS_RAW as ParkEvent[];

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS: { label: string; value: Month | "all" }[] = [
  { label: "All months",  value: "all" },
  { label: "March",       value: "Mar" },
  { label: "April",       value: "Apr" },
  { label: "May",         value: "May" },
  { label: "June",        value: "Jun" },
  { label: "Ongoing",     value: "Ongoing" },
];

const CATEGORIES: { label: string; value: Category | "all"; icon: string }[] = [
  { label: "All",                value: "all",                icon: "🌎" },
  { label: "Nature",             value: "Nature",             icon: "🌿" },
  { label: "Arts & Crafts",      value: "Arts & Crafts",      icon: "🎨" },
  { label: "History & Tours",    value: "History & Tours",    icon: "🏚️" },
  { label: "Adventure & Fitness",value: "Adventure & Fitness",icon: "🧗" },
  { label: "Family Programs",    value: "Family Programs",    icon: "👨‍👩‍👧" },
  { label: "Festivals & Culture",value: "Festivals & Culture",icon: "🎭" },
];

const AGE_BUCKETS: { label: string; value: AgeBucket | "all"; icon: string }[] = [
  { label: "All ages",      value: "all",         icon: "👤" },
  { label: "Babies (0–2)",  value: "babies",      icon: "👶" },
  { label: "Toddlers",      value: "toddlers",    icon: "🐣" },
  { label: "Preschool",     value: "preschool",   icon: "🎒" },
  { label: "Elementary",    value: "elementary",  icon: "🧒" },
  { label: "Teens",         value: "teens",       icon: "🧑" },
  { label: "Adults",        value: "adults",      icon: "🧑‍🦱" },
];

const CAT_COLORS: Record<Category, string> = {
  "Nature":              "bg-[var(--ff-green-pale)] text-[var(--ff-green)]",
  "Arts & Crafts":       "bg-purple-50 text-purple-700",
  "History & Tours":     "bg-amber-50 text-amber-700",
  "Adventure & Fitness": "bg-blue-50 text-blue-700",
  "Family Programs":     "bg-pink-50 text-pink-700",
  "Festivals & Culture": "bg-orange-50 text-orange-700",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ParkEvents() {
  const [search, setSearch]       = useState("");
  const [month, setMonth]         = useState<Month | "all">("all");
  const [category, setCategory]   = useState<Category | "all">("all");
  const [ageGroup, setAgeGroup]   = useState<AgeBucket | "all">("all");
  const [freeOnly, setFreeOnly]   = useState(false);

  const today = new Date();
  const todayStr = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // Each entry in `rows` is a single date occurrence for an event.
  const rows = useMemo(() => {
    const q = search.toLowerCase();
    const MONTH_ABBRS: Record<string, string> = {
      Mar: "Mar", Apr: "Apr", May: "May", Jun: "Jun",
    };
    const result: { event: ParkEvent; dateStr: string; dateObj: Date }[] = [];

    for (const e of EVENTS) {
      if (freeOnly && !e.isFree) continue;
      if (month !== "all" && !e.months.includes(month as Month)) continue;
      if (category !== "all" && e.category !== category) continue;
      if (ageGroup !== "all" && !getAgeBuckets(e.ages).includes(ageGroup as AgeBucket)) continue;
      if (q && !`${e.name} ${e.location} ${e.note ?? ""}`.toLowerCase().includes(q)) continue;

      const segments = e.dates.split(";").map((s) => s.trim()).filter(Boolean);

      // Detect trailing "(all HH…)" shared time and propagate it to earlier segments
      const lastSeg = segments[segments.length - 1];
      const sharedTime = lastSeg?.match(/\(all ([^)]+)\)/)?.[1];

      for (let si = 0; si < segments.length; si++) {
        let seg = segments[si];

        // Append shared time to segments that have no time of their own
        if (sharedTime && si < segments.length - 1 && !/\d+(AM|PM)/i.test(seg)) {
          seg = `${seg} (${sharedTime})`;
        }

        // When a month filter is active, skip segments that don't belong to it
        if (month !== "all" && month !== "Ongoing") {
          const abbr = MONTH_ABBRS[month as string];
          if (abbr && !seg.includes(abbr)) continue;
        }

        result.push({ event: e, dateStr: seg, dateObj: parseFirstDate(seg) });
      }
    }

    return result.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
  }, [search, month, category, ageGroup, freeOnly]);

  const uniqueEventCount = useMemo(
    () => new Set(rows.map((r) => r.event.name)).size,
    [rows]
  );

  const clearFilters = () => {
    setSearch("");
    setMonth("all");
    setCategory("all");
    setAgeGroup("all");
    setFreeOnly(false);
  };

  const isFiltered = search || month !== "all" || category !== "all" || ageGroup !== "all" || freeOnly;

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Page Intro */}
      <div className="page-intro">
        <h2>Monmouth County Park System — Spring 2026</h2>
        <p>
          Programs, events &amp; demonstrations from March through June 2026.
          Registration opens <strong>Wednesday, February 11, 2026 at 8:00 AM</strong> at{" "}
          <a href="https://www.MonmouthCountyParks.com" target="_blank" rel="noopener noreferrer"
             className="text-[var(--ff-green)] underline">
            MonmouthCountyParks.com
          </a>{" "}
          or call 732-842-4000 ext. 1.
        </p>
      </div>

      {/* ── Filter Panel ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5 flex flex-col gap-3">
        {/* Search row */}
        <div className="flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, locations, activities…"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
          />
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="text-xs text-[var(--ff-gray)] hover:text-[var(--ff-green)] underline whitespace-nowrap"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Filter chips row */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Month */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value as Month | "all")}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)]"
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(({ label, value, icon }) => (
              <button
                key={value}
                onClick={() => setCategory(value as Category | "all")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all
                  ${category === value
                    ? "bg-[var(--ff-green)] text-white border-[var(--ff-green)]"
                    : "bg-white text-[var(--ff-gray)] border-gray-300 hover:border-[var(--ff-green)] hover:text-[var(--ff-green)]"
                  }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Age row */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {AGE_BUCKETS.map(({ label, value, icon }) => (
            <button
              key={value}
              onClick={() => setAgeGroup(value as AgeBucket | "all")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all
                ${ageGroup === value
                  ? "bg-[var(--ff-green)] text-white border-[var(--ff-green)]"
                  : "bg-white text-[var(--ff-gray)] border-gray-300 hover:border-[var(--ff-green)] hover:text-[var(--ff-green)]"
                }`}
            >
              {icon} {label}
            </button>
          ))}

          {/* Free toggle */}
          <button
            onClick={() => setFreeOnly(!freeOnly)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ml-auto
              ${freeOnly
                ? "bg-[var(--ff-green)] text-white border-[var(--ff-green)]"
                : "bg-white text-[var(--ff-gray)] border-gray-300 hover:border-[var(--ff-green)] hover:text-[var(--ff-green)]"
              }`}
          >
            ✅ Free only
          </button>
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-[var(--ff-gray)] mb-3 flex items-center gap-3">
        <span className="font-medium text-[var(--ff-green)]">Today: {todayStr}</span>
        <span className="text-gray-300">|</span>
        <span>
          {uniqueEventCount} event{uniqueEventCount !== 1 ? "s" : ""}
          {isFiltered ? " match your filters" : " total"}
          {" "}· {rows.length} occurrence{rows.length !== 1 ? "s" : ""}
        </span>
      </p>

      {/* ── Table ── */}
      {rows.length === 0 ? (
        <div className="gym-card p-10 text-center text-[var(--ff-gray)]">
          No events match your filters.{" "}
          <button onClick={clearFilters} className="underline text-[var(--ff-green)]">Clear filters</button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full table-auto text-sm border-collapse bg-white">
            <thead>
              <tr className="bg-[var(--ff-green)] text-white text-left">
                <th className="px-4 py-3 font-semibold whitespace-nowrap w-[100px]">Date</th>
                <th className="px-4 py-3 font-semibold w-[360px]">Event</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Location</th>
                <th className="px-4 py-3 font-semibold w-[100px]">Price</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Ages</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ event, dateStr }, i) => (
                <tr
                  key={`${event.name}-${dateStr}`}
                  className={`border-t border-gray-100 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[var(--ff-green-pale)] transition-colors`}
                >
                  {/* Date */}
                  <td className="px-4 py-3 whitespace-nowrap text-[var(--ff-gray)] font-medium align-middle w-[100px]">
                    {dateStr}
                  </td>

                  {/* Event name + category badge + note */}
                  <td className="px-4 py-3 w-[360px]">
                    <div className="font-semibold text-[var(--ff-green)] leading-snug">
                      {event.name}
                    </div>
                    {event.note && (
                      <div className="text-xs text-[var(--ff-gray)] mt-0.5 leading-snug">
                        {event.note}
                      </div>
                    )}
                    <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[event.category]}`}>
                      {event.category}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="px-4 py-3 text-[var(--ff-gray)] hidden sm:table-cell min-w-[160px] leading-snug">
                    {event.location}
                  </td>

                  {/* Price */}
                  <td className="px-3 py-3 whitespace-nowrap w-[100px]">
                    {event.isFree ? (
                      <span className="font-semibold text-[var(--ff-green)]">Free</span>
                    ) : (
                      <span className="text-[var(--ff-gray)]">{event.price}</span>
                    )}
                  </td>

                  {/* Ages */}
                  <td className="px-4 py-3 text-[var(--ff-gray)] hidden md:table-cell whitespace-nowrap">
                    {event.ages}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="data-note mt-5">
        Source: Spring 2026 Parks &amp; Programs Guide (co.monmouth.nj.us). Registration opens Feb 11 at 8 AM.
        For June &amp; summer programs check the Summer 2026 guide. Always verify dates before visiting.
      </p>
    </div>
  );
}
