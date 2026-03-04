import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import EVENTS_RAW from "../data/events.json";
// ─── Age bucket helper ────────────────────────────────────────────────────────
function getAgeBuckets(ages) {
    const s = ages.toLowerCase();
    const ALL = ["babies", "toddlers", "preschool", "elementary", "teens", "adults"];
    if (s.includes("all ages"))
        return ALL;
    const buckets = new Set();
    // Explicit adult-only strings
    if (/^adults?$/.test(s.trim()) || /^teens and adults$/.test(s.trim())) {
        if (/teens/.test(s))
            buckets.add("teens");
        buckets.add("adults");
        return [...buckets];
    }
    // Grades K-8 → preschool-ready + elementary
    if (/^grades k/.test(s)) {
        buckets.add("preschool");
        buckets.add("elementary");
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
    if (s.includes("under 18"))
        hi = Math.min(hi, 17);
    // Open-ended "X+" — extend hi unless capped above
    if (/\d+\+/.test(s) && !s.includes("under 18"))
        hi = 100;
    // Babies     0–2
    if (lo <= 2)
        buckets.add("babies");
    // Toddlers   2–3
    if (lo <= 3 && hi >= 2)
        buckets.add("toddlers");
    // Preschool  3–5
    if (lo <= 5 && hi >= 3)
        buckets.add("preschool");
    // Elementary 6–12
    if (lo <= 12 && hi >= 6)
        buckets.add("elementary");
    // Teens      13–17
    if (lo <= 17 && hi >= 13)
        buckets.add("teens");
    // Adults — only genuine adult events, not supervision notes
    if (hi >= 18 && !s.includes("with adult") && !/adult$/.test(s.trim()))
        buckets.add("adults");
    return buckets.size ? [...buckets] : ALL;
}
// ─── Data ─────────────────────────────────────────────────────────────────────
const EVENTS = EVENTS_RAW;
// ─── Constants ────────────────────────────────────────────────────────────────
const MONTHS = [
    { label: "All months", value: "all" },
    { label: "March", value: "Mar" },
    { label: "April", value: "Apr" },
    { label: "May", value: "May" },
    { label: "June", value: "Jun" },
    { label: "Ongoing", value: "Ongoing" },
];
const CATEGORIES = [
    { label: "All", value: "all", icon: "🌎" },
    { label: "Nature", value: "Nature", icon: "🌿" },
    { label: "Arts & Crafts", value: "Arts & Crafts", icon: "🎨" },
    { label: "History & Tours", value: "History & Tours", icon: "🏚️" },
    { label: "Adventure & Fitness", value: "Adventure & Fitness", icon: "🧗" },
    { label: "Family Programs", value: "Family Programs", icon: "👨‍👩‍👧" },
    { label: "Festivals & Culture", value: "Festivals & Culture", icon: "🎭" },
];
const AGE_BUCKETS = [
    { label: "All ages", value: "all", icon: "👤" },
    { label: "Babies (0–2)", value: "babies", icon: "👶" },
    { label: "Toddlers", value: "toddlers", icon: "🐣" },
    { label: "Preschool", value: "preschool", icon: "🎒" },
    { label: "Elementary", value: "elementary", icon: "🧒" },
    { label: "Teens", value: "teens", icon: "🧑" },
    { label: "Adults", value: "adults", icon: "🧑‍🦱" },
];
const CAT_COLORS = {
    "Nature": "bg-[var(--ff-green-pale)] text-[var(--ff-green)]",
    "Arts & Crafts": "bg-purple-50 text-purple-700",
    "History & Tours": "bg-amber-50 text-amber-700",
    "Adventure & Fitness": "bg-blue-50 text-blue-700",
    "Family Programs": "bg-pink-50 text-pink-700",
    "Festivals & Culture": "bg-orange-50 text-orange-700",
};
// ─── Component ────────────────────────────────────────────────────────────────
export default function ParkEvents() {
    const [search, setSearch] = useState("");
    const [month, setMonth] = useState("all");
    const [category, setCategory] = useState("all");
    const [ageGroup, setAgeGroup] = useState("all");
    const [freeOnly, setFreeOnly] = useState(false);
    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return EVENTS.filter((e) => {
            if (freeOnly && !e.isFree)
                return false;
            if (month !== "all" && !e.months.includes(month))
                return false;
            if (category !== "all" && e.category !== category)
                return false;
            if (ageGroup !== "all" && !getAgeBuckets(e.ages).includes(ageGroup))
                return false;
            if (q && !`${e.name} ${e.location} ${e.note ?? ""}`.toLowerCase().includes(q))
                return false;
            return true;
        });
    }, [search, month, category, ageGroup, freeOnly]);
    const clearFilters = () => {
        setSearch("");
        setMonth("all");
        setCategory("all");
        setAgeGroup("all");
        setFreeOnly(false);
    };
    const isFiltered = search || month !== "all" || category !== "all" || ageGroup !== "all" || freeOnly;
    return (_jsxs("div", { className: "max-w-[1000px] mx-auto", children: [_jsxs("div", { className: "page-intro", children: [_jsx("h2", { children: "Monmouth County Park System \u2014 Spring 2026" }), _jsxs("p", { children: ["Programs, events & demonstrations from March through June 2026. Registration opens ", _jsx("strong", { children: "Wednesday, February 11, 2026 at 8:00 AM" }), " at", " ", _jsx("a", { href: "https://www.MonmouthCountyParks.com", target: "_blank", rel: "noopener noreferrer", className: "text-[var(--ff-green)] underline", children: "MonmouthCountyParks.com" }), " ", "or call 732-842-4000 ext. 1."] })] }), _jsxs("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5 flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-lg", children: "\uD83D\uDD0D" }), _jsx("input", { type: "search", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search events, locations, activities\u2026", className: "flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent" }), isFiltered && (_jsx("button", { onClick: clearFilters, className: "text-xs text-[var(--ff-gray)] hover:text-[var(--ff-green)] underline whitespace-nowrap", children: "Clear all" }))] }), _jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [_jsx("select", { value: month, onChange: (e) => setMonth(e.target.value), className: "border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)]", children: MONTHS.map((m) => (_jsx("option", { value: m.value, children: m.label }, m.value))) }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: CATEGORIES.map(({ label, value, icon }) => (_jsxs("button", { onClick: () => setCategory(value), className: `flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all
                  ${category === value
                                        ? "bg-[var(--ff-green)] text-white border-[var(--ff-green)]"
                                        : "bg-white text-[var(--ff-gray)] border-gray-300 hover:border-[var(--ff-green)] hover:text-[var(--ff-green)]"}`, children: [icon, " ", label] }, value))) })] }), _jsxs("div", { className: "flex flex-wrap gap-1.5 items-center", children: [AGE_BUCKETS.map(({ label, value, icon }) => (_jsxs("button", { onClick: () => setAgeGroup(value), className: `flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all
                ${ageGroup === value
                                    ? "bg-[var(--ff-green)] text-white border-[var(--ff-green)]"
                                    : "bg-white text-[var(--ff-gray)] border-gray-300 hover:border-[var(--ff-green)] hover:text-[var(--ff-green)]"}`, children: [icon, " ", label] }, value))), _jsx("button", { onClick: () => setFreeOnly(!freeOnly), className: `flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ml-auto
              ${freeOnly
                                    ? "bg-[var(--ff-green)] text-white border-[var(--ff-green)]"
                                    : "bg-white text-[var(--ff-gray)] border-gray-300 hover:border-[var(--ff-green)] hover:text-[var(--ff-green)]"}`, children: "\u2705 Free only" })] })] }), _jsxs("p", { className: "text-sm text-[var(--ff-gray)] mb-3", children: [filtered.length, " event", filtered.length !== 1 ? "s" : "", isFiltered ? " match your filters" : " total"] }), filtered.length === 0 ? (_jsxs("div", { className: "gym-card p-10 text-center text-[var(--ff-gray)]", children: ["No events match your filters. ", _jsx("button", { onClick: clearFilters, className: "underline text-[var(--ff-green)]", children: "Clear filters" })] })) : (_jsx("div", { className: "overflow-x-auto rounded-xl border border-gray-200 shadow-sm", children: _jsxs("table", { className: "w-full text-sm border-collapse bg-white", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-[var(--ff-green)] text-white text-left", children: [_jsx("th", { className: "px-4 py-3 font-semibold", children: "Event" }), _jsx("th", { className: "px-4 py-3 font-semibold hidden sm:table-cell", children: "Location" }), _jsx("th", { className: "px-4 py-3 font-semibold", children: "Date(s)" }), _jsx("th", { className: "px-4 py-3 font-semibold", children: "Price" }), _jsx("th", { className: "px-4 py-3 font-semibold hidden md:table-cell", children: "Ages" })] }) }), _jsx("tbody", { children: filtered.map((event, i) => (_jsxs("tr", { className: `border-t border-gray-100 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-[var(--ff-green-pale)] transition-colors`, children: [_jsxs("td", { className: "px-4 py-3 min-w-[180px]", children: [_jsx("div", { className: "font-semibold text-[var(--ff-green)] leading-snug", children: event.name }), event.note && (_jsx("div", { className: "text-xs text-[var(--ff-gray)] mt-0.5 leading-snug", children: event.note })), _jsx("span", { className: `inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[event.category]}`, children: event.category })] }), _jsx("td", { className: "px-4 py-3 text-[var(--ff-gray)] hidden sm:table-cell min-w-[160px] leading-snug", children: event.location }), _jsx("td", { className: "px-4 py-3 whitespace-pre-line text-[var(--ff-gray)] min-w-[140px] leading-snug", children: event.dates }), _jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: event.isFree ? (_jsx("span", { className: "font-semibold text-[var(--ff-green)]", children: "Free" })) : (_jsx("span", { className: "text-[var(--ff-gray)]", children: event.price })) }), _jsx("td", { className: "px-4 py-3 text-[var(--ff-gray)] hidden md:table-cell whitespace-nowrap", children: event.ages })] }, i))) })] }) })), _jsx("p", { className: "data-note mt-5", children: "Source: Spring 2026 Parks & Programs Guide (co.monmouth.nj.us). Registration opens Feb 11 at 8 AM. For June & summer programs check the Summer 2026 guide. Always verify dates before visiting." })] }));
}
