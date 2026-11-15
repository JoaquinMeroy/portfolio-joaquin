import CircularCarousel, {
  type CircularCarouselItem,
} from "./bento/CircularCarousel";
import type { Project } from "../types";

const esc = (s: string) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!,
  );

// Shown until you set a real screenshot path in config.
const placeholder = (name: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640"><rect width="100%" height="100%" fill="#172a4d"/><text x="50%" y="50%" fill="#8ea0bf" font-family="sans-serif" font-size="30" text-anchor="middle">${esc(name)}</text></svg>`,
  )}`;

export function ProjectCarousel({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  const items: CircularCarouselItem[] = projects.map((pr) => ({
    src: pr.image.startsWith("[") ? placeholder(pr.name) : pr.image,
    alt: pr.name,
    title: pr.name,
    subtitle: pr.tech.slice(0, 3).join(" · "),
  }));
  return (
    <div className="h-[min(60vh,440px)]">
      <CircularCarousel
        items={items}
        preset="orbit"
        intro="rise"
        cardWidth={260}
        aspectRatio={1.3}
        fadeColor="#0f1e3a"
        captions
        onItemClick={(_, i) => onSelect(projects[i])}
      />
    </div>
  );
}
