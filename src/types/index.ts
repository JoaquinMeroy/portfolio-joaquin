export interface Project { name: string; description: string; tech: string[]; image: string; githubUrl: string; liveUrl: string }
export interface Experience { company: string; position: string; period: string; responsibilities: string[]; tech: string[] }
export interface SkillGroup { label: string; items: string[] }
export type Level = 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
export interface ContributionDay { date: string; count: number; level: Level }
export interface ContributionData { total: number; weeks: ContributionDay[][]; recent: { type: string; repo: string; at: string }[] }
