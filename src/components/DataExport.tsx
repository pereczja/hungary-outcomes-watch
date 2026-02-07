import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGDPTimeSeries,
  fetchDebtTimeSeries,
  fetchLifeExpectancyTimeSeries,
} from "@/services/eurostat";

interface ExportData {
  metadata: {
    exportedAt: string;
    source: string;
    description: string;
  };
  gdpPerCapita: { country: string; year: number; value: number }[];
  governmentDebt: { country: string; year: number; value: number }[];
  lifeExpectancy: { country: string; year: number; value: number }[];
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function convertToCSV(data: ExportData): string {
  const lines: string[] = [];

  // Header
  lines.push("# BuildHungary Data Export");
  lines.push(`# Exported: ${data.metadata.exportedAt}`);
  lines.push(`# Source: ${data.metadata.source}`);
  lines.push("");

  // GDP per capita
  lines.push("## GDP per Capita (EUR)");
  lines.push("country,year,value");
  data.gdpPerCapita.forEach(row => {
    lines.push(`${row.country},${row.year},${row.value}`);
  });
  lines.push("");

  // Government Debt
  lines.push("## Government Debt (% of GDP)");
  lines.push("country,year,value");
  data.governmentDebt.forEach(row => {
    lines.push(`${row.country},${row.year},${row.value}`);
  });
  lines.push("");

  // Life Expectancy
  lines.push("## Life Expectancy (years)");
  lines.push("country,year,value");
  data.lifeExpectancy.forEach(row => {
    lines.push(`${row.country},${row.year},${row.value}`);
  });

  return lines.join("\n");
}

export const DataExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const { data: gdpData } = useQuery({
    queryKey: ["eurostat", "gdp", "timeseries"],
    queryFn: fetchGDPTimeSeries,
    staleTime: 1000 * 60 * 60,
  });

  const { data: debtData } = useQuery({
    queryKey: ["eurostat", "debt", "timeseries"],
    queryFn: fetchDebtTimeSeries,
    staleTime: 1000 * 60 * 60,
  });

  const { data: lifeData } = useQuery({
    queryKey: ["eurostat", "life", "timeseries"],
    queryFn: fetchLifeExpectancyTimeSeries,
    staleTime: 1000 * 60 * 60,
  });

  const prepareExportData = (): ExportData => {
    return {
      metadata: {
        exportedAt: new Date().toISOString(),
        source: "BuildHungary / Eurostat",
        description: "V4 country comparison data (HU, PL, CZ, SK, EU27)",
      },
      gdpPerCapita: gdpData?.map(d => ({
        country: d.country,
        year: d.year,
        value: d.value,
      })) || [],
      governmentDebt: debtData?.map(d => ({
        country: d.country,
        year: d.year,
        value: d.value,
      })) || [],
      lifeExpectancy: lifeData?.map(d => ({
        country: d.country,
        year: d.year,
        value: d.value,
      })) || [],
    };
  };

  const handleExportJSON = () => {
    setIsExporting(true);
    try {
      const data = prepareExportData();
      const json = JSON.stringify(data, null, 2);
      downloadFile(json, "buildhungary-data.json", "application/json");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      const data = prepareExportData();
      const csv = convertToCSV(data);
      downloadFile(csv, "buildhungary-data.csv", "text/csv");
    } finally {
      setIsExporting(false);
    }
  };

  const hasData = gdpData && debtData && lifeData;

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleExportJSON}
        disabled={!hasData || isExporting}
        className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="font-mono text-sm">↓</span>
        <span className="text-sm">JSON</span>
      </button>
      <button
        onClick={handleExportCSV}
        disabled={!hasData || isExporting}
        className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="font-mono text-sm">↓</span>
        <span className="text-sm">CSV</span>
      </button>
      {!hasData && (
        <span className="text-xs text-muted-foreground self-center">
          Adatok betoltese...
        </span>
      )}
    </div>
  );
};
