import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import EVENTS_RAW from "../data/events.json";
import type { Month, AgeBucket, Category, SortBy, ParkEvent, EventRow } from "@/components/park-events/types";
import { getEventDateStatus } from "@/components/park-events/dateUtils";
import FilterSidebar from "@/components/park-events/FilterSidebar";
import EventsTable from "@/components/park-events/EventsTable";
import SavedPanel from "@/components/park-events/SavedPanel";
import MobileFilterDrawer from "@/components/park-events/MobileFilterDrawer";

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

  const lo = hasMonths ? 0 : nums.length ? Math.min(...nums) : 0;
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function ParkEvents() {
  const [search, setSearch]         = useState("");
  const [month, setMonth]           = useState<Month | "all">("all");
  const [category, setCategory]     = useState<Category | "all">("all");
  const [ageGroup, setAgeGroup]     = useState<AgeBucket | "all">("all");
  const [freeOnly, setFreeOnly]     = useState(false);
  const [sortBy, setSortBy]         = useState<SortBy>("date-asc");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const toggleRow = (key: string) =>
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const today = useMemo(() => new Date(), []);
  const todayStr = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // Each entry in `rows` is a single date occurrence for an event.
  const rows = useMemo(() => {
    const q = search.toLowerCase();
    const MONTH_ABBRS: Record<string, string> = {
      Mar: "Mar", Apr: "Apr", May: "May", Jun: "Jun",
    };
    const result: EventRow[] = [];

    for (const e of EVENTS) {
      if (freeOnly && !e.isFree) continue;
      if (month !== "all" && !e.months.includes(month as Month)) continue;
      if (category !== "all" && e.category !== category) continue;
      if (ageGroup !== "all" && !getAgeBuckets(e.ages).includes(ageGroup as AgeBucket)) continue;
      if (q && !`${e.name} ${e.location} ${e.note ?? ""}`.toLowerCase().includes(q)) continue;

      const segments = e.dates.split(";").map((s) => s.trim()).filter(Boolean);

      // ── Date-status check ──────────────────────────────────────────
      const { isFullyPast, hasCurrentMonthDate, nextUpcomingDate } =
        getEventDateStatus(segments, e.sessions, today);

      // Omit events entirely in the past that have no dates in the current month
      if (isFullyPast && !hasCurrentMonthDate) continue;

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

        result.push({
          event: e,
          dateStr: seg,
          dateObj: parseFirstDate(seg),
          isEventFullyPast: isFullyPast,
          hasCurrentMonthDate,
          nextUpcomingSessionDate: nextUpcomingDate,
        } as EventRow);
      }
    }

    // Apply sort
    result.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime()); // base: date-asc
    if (sortBy === "date-desc") result.reverse();
    else if (sortBy === "alpha") result.sort((a, b) => a.event.name.localeCompare(b.event.name));
    else if (sortBy === "free-first") result.sort((a, b) => Number(b.event.isFree) - Number(a.event.isFree));

    return result;
  }, [search, month, category, ageGroup, freeOnly, sortBy, today]);

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
    setSortBy("date-asc");
  };

  const isFiltered = !!(search || month !== "all" || category !== "all" || ageGroup !== "all" || freeOnly || sortBy !== "date-asc");

  return (
		<div className="max-w-[1600px] mx-auto">
			{/* Page Intro */}
			<div className="page-intro">
				<h2>Monmouth County Park System — Spring 2026</h2>
				<p>
					Programs, events &amp; demonstrations from March through
					June 2026. <br />
					For questions:{" "}
					<a
						href="https://www.MonmouthCountyParks.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[var(--ff-green)] underline">
						MonmouthCountyParks.com
					</a>{" "}
					or call 732-842-4000 ext. 1.
				</p>
			</div>

			{/* ── Three-column layout ── */}
			<div className="flex gap-5 items-start">
				{/* Left sidebar — hidden on mobile, sticky on md+ */}
				<aside className="hidden md:flex flex-col gap-0 w-64 shrink-0 sticky top-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
					<div className="gym-card p-4">
						<FilterSidebar
							search={search}
							setSearch={setSearch}
							month={month}
							setMonth={setMonth}
							category={category}
							setCategory={setCategory}
							ageGroup={ageGroup}
							setAgeGroup={setAgeGroup}
							freeOnly={freeOnly}
							setFreeOnly={setFreeOnly}
							sortBy={sortBy}
							setSortBy={setSortBy}
							isFiltered={isFiltered}
							clearFilters={clearFilters}
						/>
					</div>
				</aside>

				{/* Center — main content */}
				<div className="flex-1 min-w-0">
					{/* Mobile filter button */}
					<button
						onClick={() => setDrawerOpen(true)}
						className="md:hidden flex items-center gap-2 mb-4 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-[var(--ff-gray)] hover:border-[var(--ff-green)] hover:text-[var(--ff-green)] transition-colors">
						<SlidersHorizontal className="h-4 w-4" />
						Filters &amp; Sort
						{isFiltered && (
							<span className="ml-1 bg-[var(--ff-green)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
								ON
							</span>
						)}
					</button>

					<EventsTable
						rows={rows}
						expandedKeys={expandedKeys}
						toggleRow={toggleRow}
						isFiltered={isFiltered}
						clearFilters={clearFilters}
						uniqueEventCount={uniqueEventCount}
						todayStr={todayStr}
					/>
				</div>

				{/* Right panel — placeholder, hidden below lg */}
				<aside className="hidden lg:block w-56 shrink-0">
					<SavedPanel />
				</aside>
			</div>

			{/* Mobile filter drawer */}
			<MobileFilterDrawer
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				search={search}
				setSearch={setSearch}
				month={month}
				setMonth={setMonth}
				category={category}
				setCategory={setCategory}
				ageGroup={ageGroup}
				setAgeGroup={setAgeGroup}
				freeOnly={freeOnly}
				setFreeOnly={setFreeOnly}
				sortBy={sortBy}
				setSortBy={setSortBy}
				isFiltered={isFiltered}
				clearFilters={clearFilters}
			/>
		</div>
  );
}
