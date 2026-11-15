// Vercel-style serverless entry. Set GITHUB_TOKEN (read:user) in the host's env settings.
import { getContributions } from '../server/github.ts';
export default async function handler(req: { query: { user?: string } }, res: { status: (n: number) => { json: (b: unknown) => void }; setHeader: (k: string, v: string) => void }) {
  const { status, body } = await getContributions(String(req.query.user ?? ''), process.env.GITHUB_TOKEN);
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(status).json(body);
}
