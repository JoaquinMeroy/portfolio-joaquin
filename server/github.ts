// Server-side only: the token never reaches the browser bundle.
const QUERY = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
const LOGIN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const gh = (token?: string): Record<string, string> => ({
  'User-Agent': 'portfolio', ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export async function getContributions(login: string, token?: string) {
  if (!LOGIN.test(login)) return { status: 400, body: { error: 'Invalid GitHub username.' } };
  if (!token) return { status: 503, body: { error: 'GITHUB_TOKEN is not set on the server.' } };
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST', headers: { ...gh(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });
  const json = (await res.json()) as { data?: { user?: { contributionsCollection?: { contributionCalendar?: { totalContributions: number; weeks: Array<{ contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }> } } } }; errors?: Array<{ message: string }> };
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!res.ok || !cal) return { status: res.ok ? 404 : res.status, body: { error: json?.errors?.[0]?.message ?? 'Could not load contributions.' } };
  const ev = await fetch(`https://api.github.com/users/${login}/events/public?per_page=30`, { headers: gh(token) });
  const events: Array<{ type: string; repo: { name: string }; created_at: string }> = ev.ok ? ((await ev.json()) as typeof events) : [];
  return {
    status: 200,
    body: {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: d.contributionLevel }))),
      recent: events.slice(0, 5).map((e) => ({ type: e.type.replace('Event', ''), repo: e.repo.name, at: e.created_at })),
    },
  };
}
