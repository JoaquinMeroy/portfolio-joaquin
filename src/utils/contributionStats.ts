import type { ContributionData } from "../types";

const fmt = (iso: string, o: Intl.DateTimeFormatOptions) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    ...o,
  });

/** Everything here is derived from the real calendar returned by GitHub. */
export function computeStats(data: ContributionData) {
  const days = data.weeks.flat();
  let longest = 0,
    run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--; // today may simply not have commits yet
  let current = 0;
  for (; i >= 0 && days[i].count > 0; i--) current++;
  const best = days.reduce((m, d) => (d.count > m.count ? d : m), days[0]);
  const months = new Map<string, number>();
  for (const d of days)
    months.set(
      d.date.slice(0, 7),
      (months.get(d.date.slice(0, 7)) ?? 0) + d.count,
    );
  const [mk, mv] = [...months.entries()].reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ["", 0] as [string, number],
  );
  return {
    activeDays: days.filter((d) => d.count > 0).length,
    longest,
    current,
    best: best
      ? {
          count: best.count,
          date: fmt(best.date, { month: "short", day: "numeric" }),
        }
      : null,
    busiest: mk
      ? {
          month: fmt(`${mk}-01`, { month: "long", year: "numeric" }),
          count: mv,
        }
      : null,
    perWeek:
      Math.round((data.total / Math.max(1, data.weeks.length)) * 10) / 10,
  };
}
