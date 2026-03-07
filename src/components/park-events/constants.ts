import type { Month, AgeBucket, Category } from "./types";

export const MONTHS: { label: string; value: Month | "all" }[] = [
  { label: "All months", value: "all" },
  { label: "March",      value: "Mar" },
  { label: "April",      value: "Apr" },
  { label: "May",        value: "May" },
  { label: "June",       value: "Jun" },
  { label: "Ongoing",    value: "Ongoing" },
];

export const CATEGORIES: { label: string; value: Category | "all"; icon: string }[] = [
  { label: "All",                 value: "all",                 icon: "🌎" },
  { label: "Nature",              value: "Nature",              icon: "🌿" },
  { label: "Arts & Crafts",       value: "Arts & Crafts",       icon: "🎨" },
  { label: "History & Tours",     value: "History & Tours",     icon: "🏚️" },
  { label: "Adventure & Fitness", value: "Adventure & Fitness", icon: "🧗" },
  { label: "Family Programs",     value: "Family Programs",     icon: "👨‍👩‍👧" },
  { label: "Festivals & Culture", value: "Festivals & Culture", icon: "🎭" },
];

export const AGE_BUCKETS: { label: string; value: AgeBucket | "all"; icon: string }[] = [
  { label: "All ages",     value: "all",        icon: "👤" },
  { label: "Babies (0–2)", value: "babies",     icon: "👶" },
  { label: "Toddlers",     value: "toddlers",   icon: "🐣" },
  { label: "Preschool",    value: "preschool",  icon: "🎒" },
  { label: "Elementary",   value: "elementary", icon: "🧒" },
  { label: "Teens",        value: "teens",      icon: "🧑" },
  { label: "Adults",       value: "adults",     icon: "🧑‍🦱" },
];

export const CAT_COLORS: Record<Category, string> = {
  "Nature":              "bg-[var(--ff-green-pale)] text-[var(--ff-green)]",
  "Arts & Crafts":       "bg-purple-50 text-purple-700",
  "History & Tours":     "bg-amber-50 text-amber-700",
  "Adventure & Fitness": "bg-blue-50 text-blue-700",
  "Family Programs":     "bg-pink-50 text-pink-700",
  "Festivals & Culture": "bg-orange-50 text-orange-700",
};

export const SORT_OPTIONS: { label: string; value: import("./types").SortBy }[] = [
  { label: "Date ↑",     value: "date-asc" },
  { label: "Date ↓",     value: "date-desc" },
  { label: "A → Z",      value: "alpha" },
  { label: "Free first", value: "free-first" },
];
