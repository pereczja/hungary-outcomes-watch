export type CountryKey = 'Hungary' | 'Poland' | 'Slovakia' | 'Romania';

export interface SeriesPoint {
  year: number;
  Hungary: number;
  Poland: number;
  Slovakia: number;
  Romania: number;
}

export interface Metric {
  id: string;
  title: string;
  unit: string;
  note?: string;
  source: { label: string; url: string };
  data: SeriesPoint[];
}

// NOTE: Values below are demo placeholders for layout and comparison only.
// Replace with official Eurostat/OECD time series for production use.

export const gdpPerCapitaEUR: Metric = {
  id: 'gdp_pc_eur',
  title: 'GDP per capita (EUR, nominal)',
  unit: 'EUR per person',
  note: 'Illustrative demo values. Prefer Eurostat nama_10_gdp dataset: GDP per capita in current prices, EUR.',
  source: {
    label: 'Eurostat – GDP per capita (nama_10_gdp)',
    url: 'https://ec.europa.eu/eurostat'
  },
  data: [
    { year: 2019, Hungary: 15300, Poland: 13300, Slovakia: 17000, Romania: 12000 },
    { year: 2020, Hungary: 15100, Poland: 13500, Slovakia: 16500, Romania: 11900 },
    { year: 2021, Hungary: 16800, Poland: 15000, Slovakia: 18200, Romania: 13500 },
    { year: 2022, Hungary: 17500, Poland: 16000, Slovakia: 19000, Romania: 14500 },
    { year: 2023, Hungary: 18000, Poland: 17000, Slovakia: 20000, Romania: 15500 },
    { year: 2024, Hungary: 18500, Poland: 17800, Slovakia: 20500, Romania: 16200 }
  ]
};

export const employmentRate2064: Metric = {
  id: 'emp_2064',
  title: 'Employment rate (age 20–64)',
  unit: '% of population',
  note: 'Illustrative demo values. Use Eurostat lfsi_emp_a.',
  source: { label: 'Eurostat – Employment rate (lfsi_emp_a)', url: 'https://ec.europa.eu/eurostat' },
  data: [
    { year: 2019, Hungary: 74, Poland: 73, Slovakia: 72, Romania: 71 },
    { year: 2020, Hungary: 73, Poland: 72, Slovakia: 70, Romania: 70 },
    { year: 2021, Hungary: 75, Poland: 74, Slovakia: 71, Romania: 71 },
    { year: 2022, Hungary: 76, Poland: 75, Slovakia: 73, Romania: 72 },
    { year: 2023, Hungary: 76, Poland: 76, Slovakia: 74, Romania: 72 },
    { year: 2024, Hungary: 77, Poland: 77, Slovakia: 75, Romania: 73 }
  ]
};

export const cpiInflation: Metric = {
  id: 'cpi_infl',
  title: 'CPI inflation (annual average)',
  unit: '%',
  note: 'Illustrative demo values. Use Eurostat prc_hicp_aind.',
  source: { label: 'Eurostat – HICP (prc_hicp_aind)', url: 'https://ec.europa.eu/eurostat' },
  data: [
    { year: 2019, Hungary: 3.4, Poland: 2.3, Slovakia: 2.8, Romania: 3.9 },
    { year: 2020, Hungary: 3.4, Poland: 3.4, Slovakia: 2.0, Romania: 2.6 },
    { year: 2021, Hungary: 5.1, Poland: 5.2, Slovakia: 3.2, Romania: 5.1 },
    { year: 2022, Hungary: 14.5, Poland: 14.2, Slovakia: 12.1, Romania: 13.8 },
    { year: 2023, Hungary: 17.0, Poland: 11.9, Slovakia: 10.5, Romania: 10.4 },
    { year: 2024, Hungary: 6.0, Poland: 4.5, Slovakia: 5.5, Romania: 7.0 }
  ]
};

export const rndIntensity: Metric = {
  id: 'rd_gdp',
  title: 'R&D expenditure (% of GDP)',
  unit: '% of GDP',
  note: 'Illustrative demo values. Use Eurostat rd_e_gerdtot.',
  source: { label: 'Eurostat – GERD (% GDP) (rd_e_gerdtot)', url: 'https://ec.europa.eu/eurostat' },
  data: [
    { year: 2019, Hungary: 1.5, Poland: 1.3, Slovakia: 0.9, Romania: 0.5 },
    { year: 2020, Hungary: 1.6, Poland: 1.4, Slovakia: 0.9, Romania: 0.5 },
    { year: 2021, Hungary: 1.6, Poland: 1.5, Slovakia: 1.0, Romania: 0.5 },
    { year: 2022, Hungary: 1.4, Poland: 1.4, Slovakia: 0.9, Romania: 0.5 },
    { year: 2023, Hungary: 1.3, Poland: 1.5, Slovakia: 1.0, Romania: 0.6 },
    { year: 2024, Hungary: 1.4, Poland: 1.6, Slovakia: 1.1, Romania: 0.7 }
  ]
};

export const exportsShareGDP: Metric = {
  id: 'exports_gdp',
  title: 'Exports of goods & services (% of GDP)',
  unit: '% of GDP',
  note: 'Illustrative demo values. Use World Bank NE.EXP.GNFS.ZS or Eurostat bop_c6_gdp.',
  source: { label: 'World Bank – Exports (% of GDP)', url: 'https://data.worldbank.org/indicator/NE.EXP.GNFS.ZS' },
  data: [
    { year: 2019, Hungary: 84, Poland: 55, Slovakia: 96, Romania: 45 },
    { year: 2020, Hungary: 82, Poland: 54, Slovakia: 94, Romania: 44 },
    { year: 2021, Hungary: 87, Poland: 56, Slovakia: 98, Romania: 47 },
    { year: 2022, Hungary: 89, Poland: 60, Slovakia: 100, Romania: 49 },
    { year: 2023, Hungary: 88, Poland: 59, Slovakia: 98, Romania: 48 },
    { year: 2024, Hungary: 90, Poland: 60, Slovakia: 100, Romania: 50 }
  ]
};

export const TOP5_METRICS: Metric[] = [
  gdpPerCapitaEUR,
  employmentRate2064,
  cpiInflation,
  rndIntensity,
  exportsShareGDP
];
