import type { ContributionData } from "../../types";
import { computeStats } from "../../utils/contributionStats";

const Tile = ({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) => (
  <div className="rounded-xl bg-navy-800 p-4">
    <p className="font-display text-2xl text-ink">{value}</p>
    <p className="mt-1 text-sm text-muted">{label}</p>
    {note && <p className="text-xs text-muted opacity-70">{note}</p>}
  </div>
);

export function ContributionStats({ data }: { data: ContributionData }) {
  if (data.total === 0)
    return (
      <p className="text-muted">No public contributions in the last year.</p>
    );
  const s = computeStats(data);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <Tile value={String(s.activeDays)} label="Active days" />
      <Tile value={`${s.longest} d`} label="Longest streak" />
      <Tile value={`${s.current} d`} label="Current streak" />
      {s.best && (
        <Tile
          value={String(s.best.count)}
          label="Best day"
          note={s.best.date}
        />
      )}
      {s.busiest && (
        <Tile
          value={String(s.busiest.count)}
          label="Busiest month"
          note={s.busiest.month}
        />
      )}
      <Tile value={String(s.perWeek)} label="Average per week" />
    </div>
  );
}
