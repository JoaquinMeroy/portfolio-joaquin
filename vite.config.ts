import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { getContributions } from './server/github.ts';

// Dev-only mirror of the serverless function so `npm run dev` works with the same code path.
const githubApi = (token?: string): Plugin => ({
  name: 'github-api',
  configureServer(server) {
    server.middlewares.use('/api/github-contributions', async (req, res) => {
      const user = new URL(req.url ?? '', 'http://x').searchParams.get('user') ?? '';
      const { status, body } = await getContributions(user, token);
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
    });
  },
});

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), githubApi(loadEnv(mode, process.cwd(), '').GITHUB_TOKEN)],
}));
