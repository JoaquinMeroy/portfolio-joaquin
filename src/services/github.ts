import type { ContributionData } from "../types";

export const isPlaceholder = (v: string) => v.startsWith("[");

export async function fetchContributions(
  username: string,
  signal?: AbortSignal,
): Promise<ContributionData> {
  const res = await fetch(
    `/api/github-contributions?user=${encodeURIComponent(username)}`,
    { signal },
  );
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error ?? `Request failed (${res.status})`);
  if (typeof body.total !== "number" || !Array.isArray(body.weeks)) {
    throw new Error(
      "The GitHub API route did not return contribution data. Check that it is deployed and GITHUB_TOKEN is set.",
    );
  }
  return body as ContributionData;
}
