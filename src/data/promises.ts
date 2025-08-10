export type PromiseStatus = 'achieved' | 'in-progress' | 'not-started' | 'broken';

export interface CandidatePromise {
  promise: string;
  status: PromiseStatus;
}

export interface PromiseCompare {
  id: string;
  topic: string;
  orban: CandidatePromise;
  magyar: CandidatePromise;
  lastUpdated: string;
}

export const promises: PromiseCompare[] = [
  {
    id: 'p-1',
    topic: 'Teachers salaries',
    orban: { promise: 'Increase compensation and retention', status: 'in-progress' },
    magyar: { promise: 'Immediate pay rise and career path reform', status: 'not-started' },
    lastUpdated: '2025-03-15'
  },
  {
    id: 'p-2',
    topic: 'Healthcare wait times',
    orban: { promise: 'Reduce elective surgery wait lists', status: 'in-progress' },
    magyar: { promise: 'Streamline referrals and add capacity', status: 'not-started' },
    lastUpdated: '2025-02-20'
  },
  {
    id: 'p-3',
    topic: 'Anti-corruption measures',
    orban: { promise: 'Strengthen oversight bodies', status: 'not-started' },
    magyar: { promise: 'Independent anti-corruption agency', status: 'in-progress' },
    lastUpdated: '2025-03-28'
  },
  {
    id: 'p-4',
    topic: 'SME taxation',
    orban: { promise: 'Simplify and reduce admin load', status: 'achieved' },
    magyar: { promise: 'Targeted tax relief for startups', status: 'not-started' },
    lastUpdated: '2024-12-10'
  },
  {
    id: 'p-5',
    topic: 'Green energy',
    orban: { promise: 'Expand solar capacity and grid', status: 'in-progress' },
    magyar: { promise: 'Accelerate permits for wind', status: 'in-progress' },
    lastUpdated: '2025-01-30'
  },
  {
    id: 'p-6',
    topic: 'Broadband coverage',
    orban: { promise: 'Nationwide gigabit readiness', status: 'in-progress' },
    magyar: { promise: 'Fair pricing and rural access fund', status: 'not-started' },
    lastUpdated: '2025-02-05'
  },
  {
    id: 'p-7',
    topic: 'Public transport',
    orban: { promise: 'Upgrade regional rail', status: 'in-progress' },
    magyar: { promise: 'Unified ticketing and frequency boost', status: 'not-started' },
    lastUpdated: '2025-03-12'
  },
  {
    id: 'p-8',
    topic: 'Rule of law',
    orban: { promise: 'Legal updates for EU alignment', status: 'not-started' },
    magyar: { promise: 'Transparency and open data expansion', status: 'in-progress' },
    lastUpdated: '2025-04-01'
  }
];
