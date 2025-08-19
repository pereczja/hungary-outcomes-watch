
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';

interface SeriesPoint {
  year: number;
  Hungary?: number;
  Poland?: number;
  Slovakia?: number;
  Romania?: number;
}

const LiveBirthRateChart = () => {
  const [rows, setRows] = useState<SeriesPoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await fetch(
          'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/demo_gind?format=JSON&sinceTimePeriod=2010&untilTimePeriod=2024&geo=HU&geo=PL&geo=SK&geo=RO&indic_de=BIRTH'
        );
        if (!response.ok) throw new Error(`Eurostat request failed: ${response.status}`);
        const data = await response.json();

        const geoIndex = data.dimension.geo.category.index;
        const timeIndex = data.dimension.time.category.index;
        const values = data.value;

        const processedRows: SeriesPoint[] = [];

        Object.keys(timeIndex).forEach(year => {
          const yearNum = parseInt(year);
          const timeIdx = timeIndex[year];
          
          const row: SeriesPoint = { year: yearNum };
          
          Object.keys(geoIndex).forEach(geo => {
            const geoIdx = geoIndex[geo];
            const valueIndex = timeIdx * Object.keys(geoIndex).length + geoIdx;
            
            const countryName = geo === 'HU' ? 'Hungary' :
                             geo === 'PL' ? 'Poland' :
                             geo === 'SK' ? 'Slovakia' :
                             geo === 'RO' ? 'Romania' : geo;
            
            if (values[valueIndex] !== null && values[valueIndex] !== undefined) {
              (row as any)[countryName] = values[valueIndex];
            }
          });
          
          processedRows.push(row);
        });

        processedRows.sort((a, b) => a.year - b.year);
        if (mounted) setRows(processedRows);
      } catch (err) {
        console.error('Error fetching birth rate data:', err);
        if (mounted) setError('Failed to load birth rate data');
      }
    })();
    return () => { mounted = false };
  }, []);

  const config = useMemo(() => ({
    Hungary: { label: 'Hungary', color: 'hsl(var(--primary))' },
    Poland: { label: 'Poland', color: 'hsl(210 90% 45%)' },
    Slovakia: { label: 'Slovakia', color: 'hsl(45 90% 45%)' },
    Romania: { label: 'Romania', color: 'hsl(0 80% 55%)' },
  } as const), []);

  return (
    <Card className="bg-gradient-surface">
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">Crude birth rate</h3>
            <p className="text-xs text-muted-foreground">Eurostat demo_gind · per 1000 population · indic_de: BIRTH · 2010–2024</p>
          </div>
          <a className="story-link text-xs" target="_blank" rel="noreferrer" href="https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/demo_gind?sinceTimePeriod=2010&untilTimePeriod=2024&geo=HU&geo=PL&geo=SK&geo=RO&indic_de=BIRTH&format=JSON">Live source</a>
        </div>
        {error && (
          <div className="text-sm text-destructive">{error}</div>
        )}
        <ChartContainer config={config} className="h-[260px] w-full">
          <LineChart data={rows ?? []} margin={{ left: 12, right: 12, top: 6, bottom: 6 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tickMargin={8} />
            <YAxis tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="Hungary" stroke="var(--color-Hungary)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Poland" stroke="var(--color-Poland)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Slovakia" stroke="var(--color-Slovakia)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Romania" stroke="var(--color-Romania)" strokeWidth={2} dot={false} />
            <ChartLegend verticalAlign="bottom" content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LiveBirthRateChart;
