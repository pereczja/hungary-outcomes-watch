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
    { year: 2010, Hungary: 10500, Poland: 9500, Slovakia: 12500, Romania: 6200 },
    { year: 2011, Hungary: 11000, Poland: 10000, Slovakia: 13000, Romania: 6700 },
    { year: 2012, Hungary: 11200, Poland: 10400, Slovakia: 13200, Romania: 7100 },
    { year: 2013, Hungary: 11500, Poland: 10800, Slovakia: 13500, Romania: 7600 },
    { year: 2014, Hungary: 12000, Poland: 11200, Slovakia: 14000, Romania: 8200 },
    { year: 2015, Hungary: 12300, Poland: 11600, Slovakia: 14500, Romania: 8700 },
    { year: 2016, Hungary: 12800, Poland: 12000, Slovakia: 15000, Romania: 9200 },
    { year: 2017, Hungary: 13500, Poland: 12400, Slovakia: 15600, Romania: 10000 },
    { year: 2018, Hungary: 14500, Poland: 12800, Slovakia: 16400, Romania: 11000 },
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
    { year: 2010, Hungary: 62, Poland: 64, Slovakia: 65, Romania: 63 },
    { year: 2011, Hungary: 63, Poland: 64, Slovakia: 65, Romania: 62 },
    { year: 2012, Hungary: 64, Poland: 65, Slovakia: 66, Romania: 63 },
    { year: 2013, Hungary: 66, Poland: 66, Slovakia: 66, Romania: 64 },
    { year: 2014, Hungary: 68, Poland: 67, Slovakia: 67, Romania: 65 },
    { year: 2015, Hungary: 70, Poland: 68, Slovakia: 68, Romania: 66 },
    { year: 2016, Hungary: 72, Poland: 69, Slovakia: 69, Romania: 67 },
    { year: 2017, Hungary: 73, Poland: 71, Slovakia: 70, Romania: 68 },
    { year: 2018, Hungary: 74, Poland: 72, Slovakia: 71, Romania: 70 },
    { year: 2019, Hungary: 74, Poland: 73, Slovakia: 72, Romania: 71 },
    { year: 2020, Hungary: 73, Poland: 72, Slovakia: 70, Romania: 70 },
    { year: 2021, Hungary: 75, Poland: 74, Slovakia: 71, Romania: 71 },
    { year: 2022, Hungary: 76, Poland: 75, Slovakia: 73, Romania: 72 },
    { year: 2023, Hungary: 76, Poland: 76, Slovakia: 74, Romania: 72 },
    { year: 2024, Hungary: 77, Poland: 77, Slovakia: 75, Romania: 73 }
  ]
};

export const birthRate: Metric = {
  id: 'birth_rate',
  title: 'Crude birth rate',
  unit: 'per 1000 population',
  note: 'Illustrative demo values. Use Eurostat demo_gind.',
  source: { label: 'Eurostat – Crude birth rate (demo_gind)', url: 'https://ec.europa.eu/eurostat' },
  data: [
    { year: 2010, Hungary: 9.0, Poland: 10.8, Slovakia: 11.2, Romania: 10.5 },
    { year: 2011, Hungary: 8.8, Poland: 10.0, Slovakia: 11.1, Romania: 9.8 },
    { year: 2012, Hungary: 9.1, Poland: 10.0, Slovakia: 10.3, Romania: 9.8 },
    { year: 2013, Hungary: 8.9, Poland: 9.7, Slovakia: 9.6, Romania: 9.4 },
    { year: 2014, Hungary: 9.5, Poland: 9.9, Slovakia: 10.3, Romania: 9.8 },
    { year: 2015, Hungary: 9.4, Poland: 9.7, Slovakia: 10.3, Romania: 9.2 },
    { year: 2016, Hungary: 9.7, Poland: 9.6, Slovakia: 10.9, Romania: 9.0 },
    { year: 2017, Hungary: 9.6, Poland: 10.9, Slovakia: 10.7, Romania: 9.2 },
    { year: 2018, Hungary: 9.9, Poland: 10.9, Slovakia: 10.7, Romania: 8.9 },
    { year: 2019, Hungary: 9.6, Poland: 9.9, Slovakia: 10.5, Romania: 9.3 },
    { year: 2020, Hungary: 9.5, Poland: 9.8, Slovakia: 10.7, Romania: 9.2 },
    { year: 2021, Hungary: 9.5, Poland: 9.4, Slovakia: 10.8, Romania: 8.6 },
    { year: 2022, Hungary: 8.9, Poland: 8.9, Slovakia: 9.8, Romania: 8.1 },
    { year: 2023, Hungary: 8.9, Poland: 8.2, Slovakia: 9.0, Romania: 7.6 },
    { year: 2024, Hungary: 9.1, Poland: 8.0, Slovakia: 8.8, Romania: 7.8 }
  ]
};

export const rndIntensity: Metric = {
  id: 'rd_gdp',
  title: 'R&D expenditure (% of GDP)',
  unit: '% of GDP',
  note: 'Illustrative demo values. Use Eurostat rd_e_gerdtot.',
  source: { label: 'Eurostat – GERD (% GDP) (rd_e_gerdtot)', url: 'https://ec.europa.eu/eurostat' },
  data: [
    { year: 2010, Hungary: 1.2, Poland: 0.7, Slovakia: 0.6, Romania: 0.4 },
    { year: 2011, Hungary: 1.2, Poland: 0.8, Slovakia: 0.7, Romania: 0.4 },
    { year: 2012, Hungary: 1.3, Poland: 0.9, Slovakia: 0.8, Romania: 0.4 },
    { year: 2013, Hungary: 1.4, Poland: 0.9, Slovakia: 0.8, Romania: 0.4 },
    { year: 2014, Hungary: 1.4, Poland: 0.9, Slovakia: 0.9, Romania: 0.4 },
    { year: 2015, Hungary: 1.4, Poland: 1.0, Slovakia: 0.9, Romania: 0.5 },
    { year: 2016, Hungary: 1.2, Poland: 1.0, Slovakia: 0.8, Romania: 0.5 },
    { year: 2017, Hungary: 1.3, Poland: 1.0, Slovakia: 0.8, Romania: 0.5 },
    { year: 2018, Hungary: 1.5, Poland: 1.2, Slovakia: 0.9, Romania: 0.5 },
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
    { year: 2010, Hungary: 86, Poland: 41, Slovakia: 88, Romania: 31 },
    { year: 2011, Hungary: 87, Poland: 43, Slovakia: 92, Romania: 33 },
    { year: 2012, Hungary: 88, Poland: 45, Slovakia: 92, Romania: 34 },
    { year: 2013, Hungary: 88, Poland: 47, Slovakia: 93, Romania: 35 },
    { year: 2014, Hungary: 89, Poland: 48, Slovakia: 93, Romania: 36 },
    { year: 2015, Hungary: 88, Poland: 49, Slovakia: 94, Romania: 37 },
    { year: 2016, Hungary: 89, Poland: 52, Slovakia: 95, Romania: 38 },
    { year: 2017, Hungary: 90, Poland: 54, Slovakia: 97, Romania: 41 },
    { year: 2018, Hungary: 90, Poland: 55, Slovakia: 98, Romania: 43 },
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
  birthRate,
  rndIntensity,
  exportsShareGDP
];
