import { cn } from "@/lib/utils";
import { useGDPPerCapita, useGovernmentDebt, useLifeExpectancy } from "@/hooks/useEurostatData";
import { Sparkline } from "./Sparkline";

interface MetricData {
  id: string;
  label: string;
  value: string;
  context: string;
  direction: "up" | "down" | "stable";
  change: string;
  source: string;
  sourceUrl?: string;
  year: string;
  isIndex?: boolean;
  isLoading?: boolean;
  timeSeries?: { year: number; value: number }[];
}

// Static metrics that don't have Eurostat APIs
const staticMetrics: MetricData[] = [
  {
    id: "wage",
    label: "Realber novekedes",
    value: "+70%",
    context: "2014-2024 | V4: PL +51%, CZ +45%, SK +32%",
    direction: "up",
    change: "Legmagasabb a V4-ben",
    source: "KSH / IZA",
    sourceUrl: "https://www.ksh.hu/stadat_files/mun/hu/mun0114.html",
    year: "2024",
  },
  {
    id: "cpi",
    label: "Korrupcios index (CPI)",
    value: "41/100",
    context: "V4: PL 54 | CZ 57 | SK 54 | Dania: 90",
    direction: "down",
    change: "-14 pont 2012 ota",
    source: "Transparency International",
    sourceUrl: "https://www.transparency.org/cpi2024",
    year: "2024",
    isIndex: true,
  },
  {
    id: "eu-funds",
    label: "EU forrasok befagyasztva",
    value: "19 Mrd EUR",
    context: "Ebbol 1 Mrd vegleg elveszett",
    direction: "down",
    change: "2022 ota",
    source: "European Commission",
    sourceUrl: "https://ec.europa.eu/info/strategy/recovery-plan-europe_en",
    year: "2025 jan",
  },
];

const DirectionIndicator = ({
  direction,
  isIndex,
  isLoading,
}: {
  direction: MetricData["direction"];
  isIndex?: boolean;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <span className="text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide bg-secondary text-muted-foreground">
        ...
      </span>
    );
  }

  const arrow = direction === "up" ? "↑" : direction === "down" ? "↓" : "→";
  const label = direction === "up" ? "Nott" : direction === "down" ? "Csokkent" : "Stabil";

  let colorClass = "bg-secondary text-muted-foreground";
  if (isIndex) {
    colorClass =
      direction === "down" ? "bg-destructive/15 text-destructive" : "bg-secondary text-muted-foreground";
  }

  return (
    <span
      className={cn(
        "text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1",
        colorClass
      )}
    >
      <span className="font-mono">{arrow}</span>
      {label}
    </span>
  );
};

const MetricCard = ({ metric }: { metric: MetricData }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-muted-foreground/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{metric.label}</span>
        <DirectionIndicator direction={metric.direction} isIndex={metric.isIndex} isLoading={metric.isLoading} />
      </div>
      <div className="flex items-end justify-between gap-4 mb-2">
        <div
          className={cn(
            "font-mono text-3xl font-medium text-foreground",
            metric.isLoading && "animate-pulse text-muted-foreground"
          )}
        >
          {metric.value}
        </div>
        {metric.timeSeries && metric.timeSeries.length > 0 && (
          <div className="w-24 h-10 flex-shrink-0">
            <Sparkline data={metric.timeSeries} />
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-2">{metric.context}</p>
      <p className="text-xs text-primary mb-4">{metric.change}</p>
      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          {metric.sourceUrl ? (
            <a
              href={metric.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="font-mono">→</span>
              {metric.source}
            </a>
          ) : (
            <span className="text-xs text-muted-foreground">{metric.source}</span>
          )}
          <span className="text-xs text-muted-foreground font-mono">{metric.year}</span>
        </div>
      </div>
    </div>
  );
};

export const MetricsGrid = () => {
  // Live data from Eurostat
  const gdp = useGDPPerCapita();
  const debt = useGovernmentDebt();
  const life = useLifeExpectancy();

  // Combine live and static metrics
  const metrics: MetricData[] = [
    {
      id: "gdp",
      label: "GDP/fo (EUR)",
      value: gdp.value,
      context: gdp.context,
      direction: gdp.direction,
      change: gdp.change,
      source: "Eurostat nama_10_pc",
      sourceUrl: "https://ec.europa.eu/eurostat/databrowser/view/nama_10_pc/default/table",
      year: gdp.year,
      isLoading: gdp.isLoading,
      timeSeries: gdp.timeSeries,
    },
    staticMetrics[0], // Real wage
    {
      id: "debt",
      label: "Allamadossag / GDP",
      value: debt.value,
      context: debt.context,
      direction: debt.direction,
      change: debt.change,
      source: "Eurostat gov_10dd_edpt1",
      sourceUrl: "https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table",
      year: debt.year,
      isLoading: debt.isLoading,
      timeSeries: debt.timeSeries,
    },
    staticMetrics[1], // CPI
    {
      id: "life",
      label: "Varhato elettartam",
      value: life.value,
      context: life.context,
      direction: life.direction,
      change: life.change,
      source: "Eurostat demo_mlexpec",
      sourceUrl: "https://ec.europa.eu/eurostat/databrowser/view/demo_mlexpec/default/table",
      year: life.year,
      isLoading: life.isLoading,
      timeSeries: life.timeSeries,
    },
    staticMetrics[2], // EU funds
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};
