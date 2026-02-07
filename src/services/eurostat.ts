/**
 * Eurostat API Service
 *
 * Fetches data from Eurostat's JSON-stat API
 * Documentation: https://wikis.ec.europa.eu/display/EUROSTATHELP/API+Statistics
 */

const EUROSTAT_BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data";

// V4 countries + EU average for comparison
const V4_COUNTRIES = ["HU", "PL", "CZ", "SK"];
const BENCHMARK_COUNTRIES = [...V4_COUNTRIES, "EU27_2020"];

interface EurostatResponse {
  value: Record<string, number>;
  dimension: {
    geo: { category: { index: Record<string, number>; label: Record<string, string> } };
    time: { category: { index: Record<string, number> } };
  };
  size: number[];
  id: string[];
}

interface DataPoint {
  country: string;
  countryLabel: string;
  year: number;
  value: number;
}

/**
 * Parse Eurostat JSON-stat response into usable data points
 */
function parseEurostatResponse(data: EurostatResponse): DataPoint[] {
  const results: DataPoint[] = [];
  const geoIndex = data.dimension.geo.category.index;
  const geoLabels = data.dimension.geo.category.label;
  const timeIndex = data.dimension.time.category.index;

  const geos = Object.keys(geoIndex);
  const times = Object.keys(timeIndex);
  const timeCount = times.length;

  for (const geo of geos) {
    for (const time of times) {
      const geoIdx = geoIndex[geo];
      const timeIdx = timeIndex[time];
      // Position in flat value array: geoIdx * timeCount + timeIdx
      const valueIdx = geoIdx * timeCount + timeIdx;
      const value = data.value[valueIdx.toString()];

      if (value !== undefined) {
        results.push({
          country: geo,
          countryLabel: geoLabels[geo] || geo,
          year: parseInt(time),
          value: value,
        });
      }
    }
  }

  return results;
}

/**
 * Fetch GDP per capita (EUR)
 * Dataset: nama_10_pc
 */
export async function fetchGDPPerCapita(years: number[] = [2010, 2024]): Promise<DataPoint[]> {
  const timeParams = years.map(y => `time=${y}`).join("&");
  const geoParams = BENCHMARK_COUNTRIES.map(g => `geo=${g}`).join("&");

  const url = `${EUROSTAT_BASE}/nama_10_pc?${geoParams}&unit=CP_EUR_HAB&na_item=B1GQ&${timeParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Eurostat API error: ${response.status}`);
    const data: EurostatResponse = await response.json();
    return parseEurostatResponse(data);
  } catch (error) {
    console.error("Failed to fetch GDP data:", error);
    return [];
  }
}

/**
 * Fetch GDP per capita time series (2010-2023)
 */
export async function fetchGDPTimeSeries(): Promise<DataPoint[]> {
  const years = Array.from({ length: 14 }, (_, i) => 2010 + i);
  return fetchGDPPerCapita(years);
}

/**
 * Fetch Government Debt as % of GDP
 * Dataset: gov_10dd_edpt1
 */
export async function fetchGovernmentDebt(years: number[] = [2010, 2023]): Promise<DataPoint[]> {
  const timeParams = years.map(y => `time=${y}`).join("&");
  const geoParams = BENCHMARK_COUNTRIES.map(g => `geo=${g}`).join("&");

  const url = `${EUROSTAT_BASE}/gov_10dd_edpt1?${geoParams}&unit=PC_GDP&sector=S13&na_item=GD&${timeParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Eurostat API error: ${response.status}`);
    const data: EurostatResponse = await response.json();
    return parseEurostatResponse(data);
  } catch (error) {
    console.error("Failed to fetch debt data:", error);
    return [];
  }
}

/**
 * Fetch Government Debt time series (2010-2023)
 */
export async function fetchDebtTimeSeries(): Promise<DataPoint[]> {
  const years = Array.from({ length: 14 }, (_, i) => 2010 + i);
  return fetchGovernmentDebt(years);
}

/**
 * Fetch Life Expectancy at birth
 * Dataset: demo_mlexpec
 */
export async function fetchLifeExpectancy(years: number[] = [2010, 2022]): Promise<DataPoint[]> {
  const timeParams = years.map(y => `time=${y}`).join("&");
  const geoParams = BENCHMARK_COUNTRIES.map(g => `geo=${g}`).join("&");

  // age=Y_LT1 = at birth, sex=T = total
  const url = `${EUROSTAT_BASE}/demo_mlexpec?${geoParams}&age=Y_LT1&sex=T&${timeParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Eurostat API error: ${response.status}`);
    const data: EurostatResponse = await response.json();
    return parseEurostatResponse(data);
  } catch (error) {
    console.error("Failed to fetch life expectancy data:", error);
    return [];
  }
}

/**
 * Fetch Life Expectancy time series (2010-2022)
 */
export async function fetchLifeExpectancyTimeSeries(): Promise<DataPoint[]> {
  const years = Array.from({ length: 13 }, (_, i) => 2010 + i);
  return fetchLifeExpectancy(years);
}

/**
 * Get time series for a specific country
 */
export function getCountryTimeSeries(data: DataPoint[], country: string): { year: number; value: number }[] {
  return data
    .filter(d => d.country === country)
    .map(d => ({ year: d.year, value: d.value }))
    .sort((a, b) => a.year - b.year);
}

/**
 * Helper to get latest value for a country
 */
export function getLatestValue(data: DataPoint[], country: string): number | null {
  const countryData = data.filter(d => d.country === country);
  if (countryData.length === 0) return null;
  const sorted = countryData.sort((a, b) => b.year - a.year);
  return sorted[0].value;
}

/**
 * Helper to calculate change between two years
 */
export function calculateChange(data: DataPoint[], country: string, fromYear: number, toYear: number): {
  absolute: number;
  percentage: number;
} | null {
  const fromData = data.find(d => d.country === country && d.year === fromYear);
  const toData = data.find(d => d.country === country && d.year === toYear);

  if (!fromData || !toData) return null;

  return {
    absolute: toData.value - fromData.value,
    percentage: ((toData.value - fromData.value) / fromData.value) * 100,
  };
}

/**
 * Format V4 comparison string
 */
export function formatV4Comparison(data: DataPoint[], year: number, unit: string = ""): string {
  const v4Data = data
    .filter(d => V4_COUNTRIES.includes(d.country) && d.year === year && d.country !== "HU")
    .map(d => `${d.country}: ${Math.round(d.value)}${unit}`)
    .join(" | ");

  const euData = data.find(d => d.country === "EU27_2020" && d.year === year);
  const euStr = euData ? `EU: ${Math.round(euData.value)}${unit}` : "";

  return [euStr, v4Data].filter(Boolean).join(" | ");
}
