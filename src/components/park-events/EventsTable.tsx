import React, { useMemo } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import type { EventRow } from "./types";
import { CAT_COLORS } from "./constants";
import { parseEventDate, isDatePast } from "./dateUtils";
import { compareAsc } from "date-fns";

interface EventsTableProps {
  rows: EventRow[];
  expandedKeys: Set<string>;
  toggleRow: (key: string) => void;
  isFiltered: boolean;
  clearFilters: () => void;
  uniqueEventCount: number;
  todayStr: string;
}

export default function EventsTable({
  rows,
  expandedKeys,
  toggleRow,
  isFiltered,
  clearFilters,
  uniqueEventCount,
  todayStr,
}: EventsTableProps) {
  const today = useMemo(() => new Date(), []);

  return (
    <>
      {/* Result count */}
      <p className="text-sm text-[var(--ff-gray)] mb-3 flex flex-wrap items-center gap-3">
        <span className="font-medium text-[var(--ff-green)]">Today: {todayStr}</span>
        <span className="text-gray-300">|</span>
        <span>
          {uniqueEventCount} event{uniqueEventCount !== 1 ? "s" : ""}
          {isFiltered ? " match your filters" : " total"} · {rows.length}{" "}
          occurrence{rows.length !== 1 ? "s" : ""}
        </span>
      </p>

      {rows.length === 0 ? (
        <div className="gym-card p-10 text-center text-[var(--ff-gray)]">
          No events match your filters.{" "}
          <button onClick={clearFilters} className="underline text-[var(--ff-green)]">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <Table className="w-full text-sm border-collapse bg-white">
            <Thead>
              <Tr className="bg-[var(--ff-green)] text-white text-left">
                <Th className="px-4 py-3 font-semibold w-[200px]">Date</Th>
                <Th className="px-4 py-3 font-semibold">Event</Th>
                <Th className="px-4 py-3 font-semibold">Location</Th>
                <Th className="px-4 py-3 font-semibold w-[100px]">Price</Th>
                <Th className="px-4 py-3 font-semibold">Ages</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map(({ event, dateStr, isEventFullyPast, nextUpcomingSessionDate }, i) => {
                const rowKey = `${event.name}-${dateStr}`;
                const hasSessions = !!event.sessions?.length;
                const isExpanded = expandedKeys.has(rowKey);
                const rowBg = i % 2 === 0 ? "bg-white" : "bg-gray-50/60";
                const pastRowClass = isEventFullyPast ? "opacity-50 grayscale" : "";

                return (
					<React.Fragment key={rowKey}>
						<Tr
							onClick={
								hasSessions
									? () => toggleRow(rowKey)
									: undefined
							}
							className={`border-t border-gray-100 align-top ${rowBg} ${pastRowClass} ${!isEventFullyPast ? "hover:bg-[var(--ff-green-pale)]" : ""} transition-colors ${hasSessions ? "cursor-pointer select-none" : ""}`}>
							{/* Date */}
							<Td className="px-4 py-3 text-[var(--ff-gray)] font-medium">
								{hasSessions ? (
									<span className="flex flex-col items-start gap-1 h-full">
										<div className="block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
											Multiple sessions
										</div>
										<div className="multiple-date flex items-center">
											<span
												className={`text-[var(--ff-green)] transition-transform duration-200 inline-block ${isExpanded ? "rotate-90" : ""}`}
												aria-hidden>
												▶
											</span>
											<span className="ml-2">
												{!isEventFullyPast &&
												nextUpcomingSessionDate
													? nextUpcomingSessionDate
													: dateStr}
											</span>
										</div>
									</span>
								) : (
									dateStr
								)}
							</Td>

							{/* Event */}
							<Td className="px-4 py-3">
								<div className="font-semibold text-[var(--ff-green)] leading-snug">
									{event.name}
								</div>
								{event.note && (
									<div className="text-sm text-[var(--ff-gray)] mt-0.5 leading-snug">
										{event.note}
									</div>
								)}
								<span
									className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[event.category]}`}>
									{event.category}
								</span>
							</Td>

							{/* Location */}
							<Td className="px-4 py-3 text-[var(--ff-gray)] leading-snug">
								{event.location}
							</Td>

							{/* Price */}
							<Td className="px-3 py-3">
								{event.isFree ? (
									<span className="font-semibold text-[var(--ff-green)]">
										Free
									</span>
								) : (
									<span className="text-[var(--ff-gray)]">
										{event.price}
									</span>
								)}
							</Td>

							{/* Ages */}
							<Td className="px-4 py-3 text-[var(--ff-gray)]">
								{event.ages}
							</Td>
						</Tr>

						{/* Expanded sessions sub-row */}
						{hasSessions && isExpanded && (
							<Tr
								key={`${rowKey}-sessions`}
								className={`${rowBg} border-t-0 ${pastRowClass}`}>
								<Td />
								<Td colSpan={4} className="px-5 pb-4 pt-2">
									<div className="flex flex-col gap-3">
										{event.sessions!.map((s) => (
											<div
												key={s.code}
												className="flex flex-col gap-1">
												<div className="flex items-center gap-2">
													<span className="font-mono text-xs font-bold bg-[var(--ff-green-pale)] text-[var(--ff-green)] px-2 py-0.5 rounded">
														{s.code}
													</span>
													<span className="text-sm font-medium text-[var(--ff-gray)]">
														{s.time}
													</span>
												</div>
												<div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-1">
													{[...s.dates]
														.sort((a, b) => {
															const da =
																parseEventDate(
																	a,
																);
															const db =
																parseEventDate(
																	b,
																);
															if (!da || !db)
																return 0;
															return compareAsc(
																da,
																db,
															);
														})
														.map((d, i, sorted) => {
															const parsed =
																parseEventDate(
																	d,
																);
															const isPast =
																parsed
																	? isDatePast(
																			parsed,
																			today,
																		)
																	: false;
															return (
																<span
																	key={d}
																	className={`text-xs ${isPast ? "line-through text-gray-400" : "text-[var(--ff-gray)]"}`}>
																	{d}
																	{i <
																		sorted.length -
																			1 && (
																		<span className="text-xs text-gray-300 display-inline-block ml-1">
																			-
																		</span>
																	)}
																</span>
															);
														})}
												</div>
											</div>
										))}
									</div>
								</Td>
							</Tr>
						)}
					</React.Fragment>
				);
              })}
            </Tbody>
          </Table>
        </div>
      )}

      <p className="data-note mt-5">
        Source: Spring 2026 Parks &amp; Programs Guide (co.monmouth.nj.us). Registration opens Feb
        11 at 8 AM. For June &amp; summer programs check the Summer 2026 guide. Always verify dates
        before visiting.
      </p>
    </>
  );
}
