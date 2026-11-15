import { useEffect, useRef } from "react";
import type { ContributionData, Level } from "../../types";

const SHADE: Record<Level, string> = {
  NONE: "bg-navy-800",
  FIRST_QUARTILE: "bg-[#1d3f7a]",
  SECOND_QUARTILE: "bg-[#2c62b8]",
  THIRD_QUARTILE: "bg-[#4f8cff]",
  FOURTH_QUARTILE: "bg-[#9cc0ff]",
};
const ago = (iso: string) => {
  const d = Math.max(
    0,
    Math.round((Date.now() - new Date(iso).getTime()) / 864e5),
  );
  return d === 0 ? "today" : `${d}d ago`;
};

/** The cells only. Scrolls sideways inside itself on small screens and starts at the latest week. */
export function ContributionGrid({
  data,
  cell = "size-[11px]",
}: {
  data: ContributionData;
  cell?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [data]);
  return (
    <div
      ref={ref}
      className="min-w-0 flex-1 overflow-x-auto pb-1"
      role="img"
      aria-label={`${data.total} contributions in the last year`}
    >
      <div className="flex w-max gap-[3px]">
        {data.weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-[3px]">
            {week.map((d) => (
              <div
                key={d.date}
                title={`${d.count} on ${d.date}`}
                className={`${cell} rounded-[2px] ${SHADE[d.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentActivity({
  items,
  className = "",
}: {
  items: ContributionData["recent"];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className={`grid gap-1 text-xs text-muted ${className}`}>
      {items.map((r, i) => (
        <li key={i} className="truncate">
          <span className="text-ink">{r.type}</span> in {r.repo}{" "}
          <span className="opacity-70">({ago(r.at)})</span>
        </li>
      ))}
    </ul>
  );
}

/** Full version used in the dialog. */
export function ContributionCalendar({ data }: { data: ContributionData }) {
  if (data.total === 0)
    return (
      <p className="text-muted">No public contributions in the last year.</p>
    );
  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        <span className="text-2xl font-semibold text-ink">
          {data.total.toLocaleString()}
        </span>{" "}
        contributions in the last year
      </p>
      <ContributionGrid data={data} />
      {/* <RecentActivity items={data.recent} className="mt-5 text-sm" /> */}
    </div>
  );
}
