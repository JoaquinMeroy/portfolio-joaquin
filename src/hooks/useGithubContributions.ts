import { useEffect, useState } from 'react';
import { fetchContributions, isPlaceholder } from '../services/github';
import type { ContributionData } from '../types';

export type GhState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; data: ContributionData };

export function useGithubContributions(username: string): GhState {
  const [state, setState] = useState<GhState>({ status: 'loading' });
  useEffect(() => {
    if (isPlaceholder(username)) { setState({ status: 'error', message: 'Set github.username in src/config/portfolio.ts to load your activity.' }); return; }
    const ctrl = new AbortController();
    setState({ status: 'loading' });
    fetchContributions(username, ctrl.signal)
      .then((data) => setState({ status: 'ready', data }))
      .catch((e: Error) => { if (e.name !== 'AbortError') setState({ status: 'error', message: e.message }); });
    return () => ctrl.abort();
  }, [username]);
  return state;
}
