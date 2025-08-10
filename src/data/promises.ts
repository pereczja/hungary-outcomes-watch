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
    topic: 'Personal Income Tax (PIT)',
    orban: { promise: 'Maintain flat PIT rate', status: 'achieved' },
    magyar: { promise: 'Lower PIT to 9% (from current level)', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-2',
    topic: 'EU funds – unlock & compliance',
    orban: { promise: 'Unlock cohesion/RRF funds via reforms', status: 'in-progress' },
    magyar: { promise: 'Zero tolerance on corruption, bring back EU funds', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-3',
    topic: 'Join European Public Prosecutor’s Office (EPPO)',
    orban: { promise: 'Consider EU cooperation mechanisms', status: 'not-started' },
    magyar: { promise: 'Join EPPO to strengthen oversight', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-4',
    topic: 'Anti-corruption & wealth audits',
    orban: { promise: 'Enhance oversight bodies', status: 'not-started' },
    magyar: { promise: 'Wealth audits for top officials; anti-corruption drive', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-5',
    topic: 'KATA – simplified tax',
    orban: { promise: 'Maintain current KATA reforms', status: 'achieved' },
    magyar: { promise: 'Restore previous KATA for former sectors', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-6',
    topic: 'SMEs & startups',
    orban: { promise: 'Ongoing SME support programs', status: 'in-progress' },
    magyar: { promise: 'Tax holidays + bureaucracy cut for new/returning firms', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-7',
    topic: 'State rental housing',
    orban: { promise: 'Targeted housing measures', status: 'not-started' },
    magyar: { promise: 'Launch state rental housing construction program', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-8',
    topic: 'Family support',
    orban: { promise: 'Maintain family policy toolkit', status: 'in-progress' },
    magyar: { promise: 'Double family allowance immediately', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-9',
    topic: 'Healthcare funding & waitlists',
    orban: { promise: 'Reduce waitlists, modernize hospitals', status: 'in-progress' },
    magyar: { promise: '+500bn HUF/year to public health; cut waitlists', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-10',
    topic: 'Education autonomy & Erasmus',
    orban: { promise: 'Maintain current governance; seek solutions with EU', status: 'in-progress' },
    magyar: { promise: 'Restore autonomy; re-enable Erasmus access', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-11',
    topic: 'Education governance reform',
    orban: { promise: 'Optimize central management', status: 'in-progress' },
    magyar: { promise: 'Abolish Klebelsberg Center; create Education Ministry', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-12',
    topic: 'Food VAT cuts',
    orban: { promise: 'Targeted VAT policies', status: 'not-started' },
    magyar: { promise: 'Cut fruit/veg VAT to 5%, then healthy foods, firewood', status: 'not-started' },
    lastUpdated: '2025-08-10'
  },
  {
    id: 'p-13',
    topic: 'Wealth growth tax > HUF 10bn',
    orban: { promise: 'No new wealth tax', status: 'achieved' },
    magyar: { promise: 'Introduce wealth growth tax above HUF 10bn', status: 'not-started' },
    lastUpdated: '2025-08-10'
  }
];
