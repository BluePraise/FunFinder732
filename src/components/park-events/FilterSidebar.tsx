import type { Month, AgeBucket, Category, SortBy } from "./types";
import { MONTHS, CATEGORIES, AGE_BUCKETS, SORT_OPTIONS } from "./constants";

export interface FilterSidebarProps {
  search: string;
  setSearch: (v: string) => void;
  month: Month | "all";
  setMonth: (v: Month | "all") => void;
  category: Category | "all";
  setCategory: (v: Category | "all") => void;
  ageGroup: AgeBucket | "all";
  setAgeGroup: (v: AgeBucket | "all") => void;
  freeOnly: boolean;
  setFreeOnly: (v: boolean) => void;
  sortBy: SortBy;
  setSortBy: (v: SortBy) => void;
  isFiltered: boolean;
  clearFilters: () => void;
}

export default function FilterSidebar({
  search, setSearch,
  month, setMonth,
  category, setCategory,
  ageGroup, setAgeGroup,
  freeOnly, setFreeOnly,
  sortBy, setSortBy,
  isFiltered, clearFilters,
}: FilterSidebarProps) {
  const pillBase =
    "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer";
  const pillActive =
    "bg-[var(--ff-green)] text-white border-[var(--ff-green)]";
  const pillInactive =
    "bg-white text-[var(--ff-gray)] border-gray-300 hover:border-[var(--ff-green)] hover:text-[var(--ff-green)]";

  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-[var(--ff-gray)] uppercase tracking-wide mb-1.5">
          Search
        </label>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus-within:ring-2 focus-within:ring-[var(--ff-green)] focus-within:border-transparent">
          <span className="text-base">🔍</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Events, locations…"
            className="flex-1 text-sm bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-xs font-semibold text-[var(--ff-gray)] uppercase tracking-wide mb-1.5">
          Sort
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SORT_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSortBy(value)}
              className={`${pillBase} ${sortBy === value ? pillActive : pillInactive}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Month */}
      <div>
        <label className="block text-xs font-semibold text-[var(--ff-gray)] uppercase tracking-wide mb-1.5">
          Month
        </label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value as Month | "all")}
          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)]"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold text-[var(--ff-gray)] uppercase tracking-wide mb-1.5">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(({ label, value, icon }) => (
            <button
              key={value}
              onClick={() => setCategory(value as Category | "all")}
              className={`${pillBase} ${category === value ? pillActive : pillInactive}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <div>
        <label className="block text-xs font-semibold text-[var(--ff-gray)] uppercase tracking-wide mb-1.5">
          Age group
        </label>
        <div className="flex flex-wrap gap-1.5">
          {AGE_BUCKETS.map(({ label, value, icon }) => (
            <button
              key={value}
              onClick={() => setAgeGroup(value as AgeBucket | "all")}
              className={`${pillBase} ${ageGroup === value ? pillActive : pillInactive}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Free toggle */}
      <div>
        <button
          onClick={() => setFreeOnly(!freeOnly)}
          className={`${pillBase} ${freeOnly ? pillActive : pillInactive}`}
        >
          ✅ Free events only
        </button>
      </div>

      {/* Clear */}
      {isFiltered && (
        <button
          onClick={clearFilters}
          className="text-xs text-[var(--ff-gray)] hover:text-[var(--ff-green)] underline text-left"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
