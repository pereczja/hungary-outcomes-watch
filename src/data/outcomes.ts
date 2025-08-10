export type OutcomeStatus = 'achieved' | 'in-progress' | 'stalled' | 'not-achieved';

export interface Evidence {
  label: string;
  url: string;
  source?: string;
  verifiedAt: string; // ISO date string
}

export interface Outcome {
  id: string;
  title: string;
  category: string;
  status: OutcomeStatus;
  metric?: string;
  lastUpdated: string;
  evidence?: Evidence[];
}

export const outcomes: Outcome[] = [
  {
    id: 'o-1',
    title: 'Motorway network expansion',
    category: 'Infrastructure',
    status: 'achieved',
    metric: 'New km added across regions',
    lastUpdated: '2024-06-10',
    evidence: [
      {
        label: 'MKIF upgrade progress',
        url: 'https://www.globalhighways.com/news/m7-expansion-schedule-hungary',
        source: 'GlobalHighways (MKIF)',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'Highways in Hungary',
        url: 'https://en.wikipedia.org/wiki/Highways_in_Hungary',
        source: 'Wikipedia (overview)',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-2',
    title: 'Digital infrastructure coverage (FTTH/5G)',
    category: 'Digital',
    status: 'in-progress',
    metric: 'Household coverage %',
    lastUpdated: '2025-02-15',
    evidence: [
      {
        label: 'EC Digital Decade HU 2024',
        url: 'https://digital-strategy.ec.europa.eu/en/factpages/hungary-2024-digital-decade-country-report',
        source: 'European Commission',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'Broadband Coverage 2023',
        url: 'https://digital-strategy.ec.europa.eu/en/library/digital-decade-2024-broadband-coverage-europe-2023',
        source: 'EC Study',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-3',
    title: 'Teachers compensation reform',
    category: 'Education',
    status: 'in-progress',
    metric: 'Avg. wage index vs. EU',
    lastUpdated: '2025-03-22',
    evidence: [
      {
        label: 'Eurydice: 21.2% raise in 2025',
        url: 'https://eurydice.eacea.ec.europa.eu/national-education-systems/hungary/national-reforms-school-education',
        source: 'EU Eurydice',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'About Hungary salary briefs',
        url: 'https://abouthungary.hu/tags/teachers-salaries',
        source: 'Gov comms portal',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-4',
    title: 'Hospital modernization program',
    category: 'Healthcare',
    status: 'stalled',
    metric: 'Capex execution %',
    lastUpdated: '2024-12-08',
    evidence: [
      {
        label: 'Healthy Budapest Programme equip.',
        url: 'https://dailynewshungary.com/government-to-invest-in-new-equipment-for-budapest-pest-county-hospitals/',
        source: 'DailyNewsHungary',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'WHO governance reforms',
        url: 'https://www.who.int/about/accountability/results/who-results-report-2020-mtr/country-story/2023/improving-patient-experience-and-efficiency-in-the-hungarian-health-system-through-scaling-up-bundle-payments-and-strengthening-clinical-governance',
        source: 'WHO',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-5',
    title: 'SME tax simplification',
    category: 'Economy',
    status: 'achieved',
    metric: 'Administrative hours saved',
    lastUpdated: '2023-11-02',
    evidence: [
      {
        label: 'OECD presumptive regimes',
        url: 'https://www.oecd.org/en/publications/the-design-of-presumptive-tax-regimes-in-selected-countries_58b6103c-en.html',
        source: 'OECD',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-6',
    title: 'Family policy expansion',
    category: 'Society',
    status: 'achieved',
    metric: 'Beneficiaries reached',
    lastUpdated: '2024-09-01',
    evidence: [
      {
        label: 'PwC family tax allowances 2024',
        url: 'https://taxsummaries.pwc.com/hungary/individual/deductions',
        source: 'PwC Tax Summaries',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'OECD Tax & Benefit (2024)',
        url: 'https://www.oecd.org/content/dam/oecd/en/topics/policy-sub-issues/incomes-support-redistribution-and-work-incentives/TaxBEN-Hungary-latest.pdf',
        source: 'OECD',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-7',
    title: 'University governance reforms',
    category: 'Education',
    status: 'stalled',
    metric: 'EU program eligibility',
    lastUpdated: '2024-05-30',
    evidence: [
      {
        label: 'Euractiv: law amendments',
        url: 'https://www.euractiv.com/section/economy-jobs/news/hungarian-government-amends-law-to-reach-agreement-with-the-european-commission-on-erasmus-ban/',
        source: 'Euractiv',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'Science|Business coverage',
        url: 'https://sciencebusiness.net/news/research-and-innovation-gap/unresolved-eu-funding-row-continues-frustrate-hungarian-science',
        source: 'Science|Business',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-8',
    title: 'Green energy capacity build-out',
    category: 'Energy',
    status: 'in-progress',
    metric: 'MW added (solar/wind)',
    lastUpdated: '2025-01-12',
    evidence: [
      {
        label: 'HU solar >7.5 GW (2024)',
        url: 'https://ceenergynews.com/renewables/unstoppable-boom-hungarian-solar-capacity/',
        source: 'CE Energy News',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'EU solar growth 2024–25',
        url: 'https://ember-energy.org/latest-insights/european-electricity-review-2025/solars-meteoric-growth-continues/',
        source: 'Ember',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-9',
    title: 'EU funds absorption',
    category: 'Governance',
    status: 'in-progress',
    metric: 'Disbursement %',
    lastUpdated: '2025-03-05',
    evidence: [
      {
        label: 'Cohesion allocations/freeze',
        url: 'https://www.euractiv.com/section/economy-jobs/news/tight-deadline-for-hungary-to-unlock-billions-in-eu-support/',
        source: 'Euractiv',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'Cohesion Open Data',
        url: 'https://cohesiondata.ec.europa.eu/countries/HU/21-27#financing',
        source: 'EC CohesionData',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-10',
    title: 'Anti-corruption framework updates',
    category: 'Governance',
    status: 'not-achieved',
    metric: 'Indicators alignment',
    lastUpdated: '2024-06-22',
    evidence: [
      {
        label: 'EC Rule of Law 2024 HU',
        url: 'https://commission.europa.eu/document/download/e90ed74c-7ae1-4bfb-8b6e-829008bd2cc6_en?filename=40_1_58071_coun_chap_hungary_en.pdf',
        source: 'European Commission',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'GRECO eval/compliance',
        url: 'https://coe.int/en/web/greco/-/hungary-publication-of-5th-round-evaluation-report-and-4th-interim-compliance-report-of-4th-round',
        source: 'Council of Europe',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-11',
    title: 'Regional rail modernization',
    category: 'Infrastructure',
    status: 'in-progress',
    metric: 'Lines upgraded',
    lastUpdated: '2025-02-01',
    evidence: [
      {
        label: 'Budapest–Belgrade project',
        url: 'https://www.railway-technology.com/projects/belgrade-budapest-railway-project-europe/',
        source: 'Railway Technology',
        verifiedAt: '2025-08-10'
      },
      {
        label: '2024 milestone',
        url: 'https://newseu.cgtn.com/news/2024-05-09/Budapest-Belgrade-railway-back-on-track-and-ahead-of-schedule-1trlJhPfmr6/p.html',
        source: 'CGTN Europe',
        verifiedAt: '2025-08-10'
      }
    ]
  },
  {
    id: 'o-12',
    title: 'R&D intensity increase',
    category: 'Innovation',
    status: 'not-achieved',
    metric: 'R&D % of GDP',
    lastUpdated: '2023-10-15',
    evidence: [
      {
        label: 'Eurostat R&D expenditure',
        url: 'https://ec.europa.eu/eurostat/statistics-explained/index.php?title=R%26D_expenditure',
        source: 'Eurostat',
        verifiedAt: '2025-08-10'
      },
      {
        label: 'EC 2024 Country Report',
        url: 'https://economy-finance.ec.europa.eu/document/download/8f27dc34-96c1-48b4-a2bb-222c0b68b5b5_en?filename=SWD_2024_617_1_EN_Hungary.pdf',
        source: 'European Commission',
        verifiedAt: '2025-08-10'
      }
    ]
  }
];
