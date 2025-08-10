export type OutcomeStatus = 'achieved' | 'in-progress' | 'stalled' | 'not-achieved';

export interface Outcome {
  id: string;
  title: string;
  category: string;
  status: OutcomeStatus;
  metric?: string;
  lastUpdated: string;
}

export const outcomes: Outcome[] = [
  {
    id: 'o-1',
    title: 'Motorway network expansion',
    category: 'Infrastructure',
    status: 'achieved',
    metric: 'New km added across regions',
    lastUpdated: '2024-06-10'
  },
  {
    id: 'o-2',
    title: 'Digital infrastructure coverage (FTTH/5G)',
    category: 'Digital',
    status: 'in-progress',
    metric: 'Household coverage %',
    lastUpdated: '2025-02-15'
  },
  {
    id: 'o-3',
    title: 'Teachers compensation reform',
    category: 'Education',
    status: 'in-progress',
    metric: 'Avg. wage index vs. EU',
    lastUpdated: '2025-03-22'
  },
  {
    id: 'o-4',
    title: 'Hospital modernization program',
    category: 'Healthcare',
    status: 'stalled',
    metric: 'Capex execution %',
    lastUpdated: '2024-12-08'
  },
  {
    id: 'o-5',
    title: 'SME tax simplification',
    category: 'Economy',
    status: 'achieved',
    metric: 'Administrative hours saved',
    lastUpdated: '2023-11-02'
  },
  {
    id: 'o-6',
    title: 'Family policy expansion',
    category: 'Society',
    status: 'achieved',
    metric: 'Beneficiaries reached',
    lastUpdated: '2024-09-01'
  },
  {
    id: 'o-7',
    title: 'University governance reforms',
    category: 'Education',
    status: 'stalled',
    metric: 'EU program eligibility',
    lastUpdated: '2024-05-30'
  },
  {
    id: 'o-8',
    title: 'Green energy capacity build-out',
    category: 'Energy',
    status: 'in-progress',
    metric: 'MW added (solar/wind)',
    lastUpdated: '2025-01-12'
  },
  {
    id: 'o-9',
    title: 'EU funds absorption',
    category: 'Governance',
    status: 'in-progress',
    metric: 'Disbursement %',
    lastUpdated: '2025-03-05'
  },
  {
    id: 'o-10',
    title: 'Anti-corruption framework updates',
    category: 'Governance',
    status: 'not-achieved',
    metric: 'Indicators alignment',
    lastUpdated: '2024-06-22'
  },
  {
    id: 'o-11',
    title: 'Regional rail modernization',
    category: 'Infrastructure',
    status: 'in-progress',
    metric: 'Lines upgraded',
    lastUpdated: '2025-02-01'
  },
  {
    id: 'o-12',
    title: 'R&D intensity increase',
    category: 'Innovation',
    status: 'not-achieved',
    metric: 'R&D % of GDP',
    lastUpdated: '2023-10-15'
  }
];
