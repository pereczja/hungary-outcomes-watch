import { useQuery } from "@tanstack/react-query";
import {
  fetchGDPPerCapita,
  fetchGovernmentDebt,
  fetchLifeExpectancy,
  fetchGDPTimeSeries,
  fetchDebtTimeSeries,
  fetchLifeExpectancyTimeSeries,
  getLatestValue,
  calculateChange,
  formatV4Comparison,
  getCountryTimeSeries,
} from "@/services/eurostat";

export interface MetricResult {
  value: string;
  context: string;
  change: string;
  direction: "up" | "down" | "stable";
  year: string;
  isLoading: boolean;
  error: boolean;
  timeSeries: { year: number; value: number }[];
}

/**
 * Hook for GDP per capita data
 */
export function useGDPPerCapita(): MetricResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["eurostat", "gdp", "timeseries"],
    queryFn: fetchGDPTimeSeries,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  if (isLoading || !data || data.length === 0) {
    return {
      value: "...",
      context: "Betoltes...",
      change: "",
      direction: "stable",
      year: "2023",
      isLoading: true,
      error: isError,
      timeSeries: [],
    };
  }

  const huValue = getLatestValue(data, "HU");
  const change = calculateChange(data, "HU", 2010, 2023);
  const latestYear = Math.max(...data.filter(d => d.country === "HU").map(d => d.year));
  const context = formatV4Comparison(data, latestYear, "");
  const timeSeries = getCountryTimeSeries(data, "HU");

  return {
    value: huValue ? `${Math.round(huValue).toLocaleString("hu-HU")} €` : "N/A",
    context: context || "V4 osszehasonlitas",
    change: change ? `+${Math.round(change.percentage)}% 2010 ota` : "",
    direction: change && change.absolute > 0 ? "up" : change && change.absolute < 0 ? "down" : "stable",
    year: latestYear.toString(),
    isLoading: false,
    error: isError,
    timeSeries,
  };
}

/**
 * Hook for Government Debt data
 */
export function useGovernmentDebt(): MetricResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["eurostat", "debt", "timeseries"],
    queryFn: fetchDebtTimeSeries,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading || !data || data.length === 0) {
    return {
      value: "...",
      context: "Betoltes...",
      change: "",
      direction: "stable",
      year: "2023",
      isLoading: true,
      error: isError,
      timeSeries: [],
    };
  }

  const huValue = getLatestValue(data, "HU");
  const change = calculateChange(data, "HU", 2010, 2023);
  const latestYear = Math.max(...data.filter(d => d.country === "HU").map(d => d.year));
  const context = formatV4Comparison(data, latestYear, "%");
  const timeSeries = getCountryTimeSeries(data, "HU");

  return {
    value: huValue ? `${huValue.toFixed(1)}%` : "N/A",
    context: context || "V4 osszehasonlitas",
    change: change ? `${change.absolute > 0 ? "+" : ""}${change.absolute.toFixed(1)}pp 2010 ota` : "",
    direction: change && change.absolute > 0 ? "up" : change && change.absolute < 0 ? "down" : "stable",
    year: latestYear.toString(),
    isLoading: false,
    error: isError,
    timeSeries,
  };
}

/**
 * Hook for Life Expectancy data
 */
export function useLifeExpectancy(): MetricResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["eurostat", "life", "timeseries"],
    queryFn: fetchLifeExpectancyTimeSeries,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading || !data || data.length === 0) {
    return {
      value: "...",
      context: "Betoltes...",
      change: "",
      direction: "stable",
      year: "2022",
      isLoading: true,
      error: isError,
      timeSeries: [],
    };
  }

  const huValue = getLatestValue(data, "HU");
  const change = calculateChange(data, "HU", 2010, 2022);
  const latestYear = Math.max(...data.filter(d => d.country === "HU").map(d => d.year));
  const context = formatV4Comparison(data, latestYear, " ev");
  const timeSeries = getCountryTimeSeries(data, "HU");

  return {
    value: huValue ? `${huValue.toFixed(1)} ev` : "N/A",
    context: context || "V4 osszehasonlitas",
    change: change ? `${change.absolute > 0 ? "+" : ""}${change.absolute.toFixed(1)} ev 2010 ota` : "",
    direction: change && change.absolute > 0 ? "up" : change && change.absolute < 0 ? "down" : "stable",
    year: latestYear.toString(),
    isLoading: false,
    error: isError,
    timeSeries,
  };
}
