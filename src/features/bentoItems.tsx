import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import type { MagicBentoItem } from "../components/bento/MagicBento";
import {
  ContributionCalendar,
  ContributionGrid,
} from "../components/github/ContributionCalendar";
import type { Detail } from "../components/DetailDialog";
import type { GhState } from "../hooks/useGithubContributions";
import { FaceModel } from "../components/FaceModel";
import { ProjectCarousel } from "../components/ProjectCarousel";
import type { Project } from "../types";
import { ContributionStats } from "../components/github/ContributionStats";
import {
  portfolio as p,
  skills,
  projects,
  experience,
  education,
} from "../config/portfolio";
import LogoLoop, { type LogoItem } from "../components/bento/LogoLoop";
import { iconFor } from "../config/techIcons";

const chip = "rounded-md bg-navy-800 px-2 py-1 text-xs text-muted";
const initials = p.name.startsWith("[")
  ? "YN"
  : p.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

const Chips = ({ items, max }: { items: string[]; max?: number }) => {
  const shown = max ? items.slice(0, max) : items;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((s) => (
        <span key={s} className={chip}>
          {s}
        </span>
      ))}
      {max && items.length > max && (
        <span className={chip}>+{items.length - max} more</span>
      )}
    </div>
  );
};
const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-accent underline-offset-4 hover:underline"
  >
    {children}
    <ExternalLink size={14} aria-hidden />
  </a>
);
const Face = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex h-full flex-col justify-between gap-3 p-5 text-left">
    <p className="text-sm text-muted">{label}</p>
    {children}
  </div>
);
const Group = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mb-5 last:mb-0">
    <h3 className="mb-2 text-sm text-muted">{title}</h3>
    {children}
  </section>
);

const toLogo = (name: string): LogoItem => {
  const Icon = iconFor(name);
  return {
    title: name,
    ariaLabel: name,
    node: Icon ? <Icon /> : <span className="text-sm text-muted">{name}</span>,
  };
};

const skillLogos = skills.flatMap((g) => g.items).map(toLogo);

const projectDetail = (pr: Project): Detail => ({
  title: pr.name,
  subtitle: "Project",
  body: (
    <>
      <div className="mb-5 grid h-48 place-items-center overflow-hidden rounded-xl bg-navy-800 text-sm text-muted">
        {pr.image.startsWith("[") ? (
          pr.image
        ) : (
          <img src={pr.image} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <p className="mb-5">{pr.description}</p>
      <Group title="Technologies">
        <Chips items={pr.tech} />
      </Group>
      <div className="flex gap-5">
        {pr.githubUrl && <Ext href={pr.githubUrl}>Source code</Ext>}
        {pr.liveUrl && <Ext href={pr.liveUrl}>Live demo</Ext>}
      </div>
    </>
  ),
});

export function buildItems(
  gh: GhState,
  open: (d: Detail) => void,
  openProject: (d: Detail) => void,
): MagicBentoItem[] {
  const go = (d: Detail) => () => open(d);

  const total = gh.status === "ready" ? gh.data.total.toLocaleString() : "—";
  const notReady =
    gh.status === "loading" ? (
      <div
        className="h-28 animate-pulse rounded-lg bg-navy-800"
        role="status"
        aria-label="Loading contributions"
      />
    ) : (
      <p role="alert" className="text-muted">
        {gh.status === "error" ? gh.message : ""}
      </p>
    );
  const ghDetail: Detail = {
    title: "GitHub",
    subtitle: p.github.username,
    wide: true,
    body:
      gh.status === "ready" ? (
        <>
          <ContributionCalendar data={gh.data} />
          <h3 className="mb-3 mt-8 text-sm text-muted">Stats</h3>
          <ContributionStats data={gh.data} />
        </>
      ) : (
        notReady
      ),
  };
  return [
    {
      id: "hero",
      colSpan: 2,
      rowSpan: 2,
      content: (
        <div className="flex h-full flex-col justify-between p-6 text-left md:p-8">
          <p className="text-muted">{p.title}</p>
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
              {p.name}
            </h1>
            <p className="mt-4 max-w-md text-muted">{p.intro}</p>
          </div>
        </div>
      ),
    },

    {
      id: "photo",
      rowSpan: 2,
      onClick: go({
        title: "3D me",
        subtitle: "Drag to rotate, scroll to zoom",
        wide: true,
        body: <FaceModel url={p.faceModel} />,
      }),
      content: (
        <div className="relative h-full w-full">
          {p.profileImage.startsWith("[") ? (
            <div
              className="grid h-full place-items-center font-display text-6xl text-muted"
              aria-label="Profile image placeholder"
            >
              {initials}
            </div>
          ) : (
            <img
              src={p.profileImage}
              alt={p.name}
              className="h-full w-full object-cover"
            />
          )}
          <span className="absolute bottom-3 left-3 rounded-md bg-navy-950/80 px-2 py-1 text-xs text-ink">
            View in 3D
          </span>
        </div>
      ),
    },

    {
      id: "about",
      rowSpan: 2,
      onClick: go({
        title: "About",
        subtitle: `${p.about.position} · ${p.about.years}`,
        body: (
          <>
            <Group title="Background">
              <p>{p.about.background}</p>
            </Group>
            <Group title="Philosophy">
              <p>{p.about.philosophy}</p>
            </Group>
            <Group title="Experience">
              <div className="grid gap-6">
                {experience.map((e) => (
                  <div key={e.company + e.period}>
                    <p className="text-ink">
                      {e.position}{" "}
                      <span className="text-muted">· {e.company}</span>
                    </p>
                    <p className="text-sm text-muted">{e.period}</p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm">
                      {e.responsibilities.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                    <div className="mt-3">
                      <Chips items={e.tech} />
                    </div>
                  </div>
                ))}
              </div>
            </Group>
            <Group title="Education">
              {education.map((ed) => (
                <div key={ed.school}>
                  <p className="text-ink">{ed.degree}</p>
                  <p className="text-sm text-muted">{ed.school}</p>
                  <p className="text-sm text-muted">{ed.period}</p>
                </div>
              ))}
            </Group>
          </>
        ),
      }),
      content: (
        <Face label="About">
          <p className="line-clamp-6 text-sm">{p.about.background}</p>
          <p className="text-sm text-muted">{p.about.years}</p>
        </Face>
      ),
    },

    {
      id: "skills",
      colSpan: 4,
      onClick: go({
        title: "Skills",
        body: (
          <>
            {skills.map((g) => (
              <Group key={g.label} title={g.label}>
                <Chips items={g.items} />
              </Group>
            ))}
          </>
        ),
      }),
      content: (
        <Face label="Skills">
          <div className="min-w-0 overflow-hidden [contain:inline-size]">
            <LogoLoop
              logos={skillLogos}
              width="100%"
              logoHeight={30}
              gap={44}
              speed={50}
              labels="hover"
              intro={false}
              draggable={false}
              fadeOut={false}
              ariaLabel="Technologies I use"
            />
          </div>
        </Face>
      ),
    },

    ...(projects.length === 0
      ? []
      : [
          {
            id: "projects",
            colSpan: 1,
            onClick: go({
              title: "Projects",
              subtitle: `${projects.length} in total. Click one for details.`,
              wide: true,
              body: (
                <ProjectCarousel
                  projects={projects}
                  onSelect={(pr) => openProject(projectDetail(pr))}
                />
              ),
            }),
            content: (
              <Face label="Projects">
                <div>
                  <h2 className="font-display text-xl">Selected work</h2>
                  <p className="mt-1 text-sm text-muted">
                    A collection of things I've built and shipped.
                  </p>
                </div>
                <p className="text-sm text-ink">
                  Explore {projects.length} project
                  {projects.length === 1 ? "" : "s"} →
                </p>
              </Face>
            ),
          } satisfies MagicBentoItem,
        ]),

    {
      id: "github",
      colSpan: 3,
      onClick: go(ghDetail),
      content: (
        <div className="flex h-full items-stretch gap-6 px-4 py-3 text-left">
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm text-muted">GitHub</p>
              {gh.status === "ready" && (
                <p className="text-sm text-muted lg:hidden">
                  <span className="font-display text-lg text-ink">{total}</span>{" "}
                  contributions in the last year
                </p>
              )}
            </div>
            {gh.status === "ready" ? (
              <div className="flex">
                <ContributionGrid data={gh.data} cell="size-[12px]" />
              </div>
            ) : (
              <p className="text-sm text-muted">
                {gh.status === "loading" ? "Loading activity…" : gh.message}
              </p>
            )}
          </div>
          {gh.status === "ready" && (
            <div className="hidden shrink-0 flex-col justify-center border-l border-navy-700 pl-8 pr-4 lg:flex">
              <p className="font-display text-5xl leading-none text-ink">
                {total}
              </p>
              <p className="mt-2 text-sm text-muted">
                contributions
                <br />
                in the last year
              </p>
            </div>
          )}
        </div>
      ),
    },

    {
      id: "contact",
      colSpan: 4,
      onClick: go({
        title: "Contact",
        subtitle: p.location,
        body: (
          <ul className="grid gap-3">
            <li>
              <Ext href={`mailto:${p.email}`}>{p.email}</Ext>
            </li>
            <li>
              <Ext href={p.linkedin}>LinkedIn</Ext>
            </li>
            <li>
              <Ext href={p.github.url}>GitHub</Ext>
            </li>
            <li>
              <Ext href={p.resume}>Resume</Ext>
            </li>
          </ul>
        ),
      }),
      content: (
        <Face label="Contact">
          <h2 className="font-display text-xl">Get in touch</h2>
          <p className="text-sm text-muted">
            {p.email} · {p.location}
          </p>
        </Face>
      ),
    },
  ];
}
