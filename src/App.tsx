import { useMemo, useState } from "react";
import MagicBento from "./components/bento/MagicBento";
import { DetailDialog, type Detail } from "./components/DetailDialog";
import { useGithubContributions } from "./hooks/useGithubContributions";
import { buildItems } from "./features/bentoItems";
import { portfolio as p } from "./config/portfolio";
import TargetCursor from "./components/bento/TargetCursor";

export default function App() {
  const gh = useGithubContributions(p.github.username);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [project, setProject] = useState<Detail | null>(null);
  const items = useMemo(() => buildItems(gh, setDetail, setProject), [gh]);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <MagicBento
        items={items}
        columns={4}
        rowHeight={190}
        gap={14}
        radius={16}
        glowColor="79,140,255"
        enableStars={false}
        enableTilt={false}
        enableMagnetism={false}
        intro={false}
      />
      {!detail && !project && (
        <TargetCursor
          targetSelector="[data-clickable]"
          cursorColor="#4f8cff"
          blendMode="normal"
        />
      )}
      <DetailDialog detail={detail} onClose={() => setDetail(null)} />
      <DetailDialog detail={project} onClose={() => setProject(null)} />
    </main>
  );
}
