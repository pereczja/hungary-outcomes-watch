import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartTooltip } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface SeriesPoint { year: number; Hungary?: number; Poland?: number; Slovakia?: number; Romania?: number }

const LiveDebtToGDPChart = () => {
  const [rows, setRows] = useState<SeriesPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/gov_10dd_edpt1?format=JSON&sinceTimePeriod=2010&untilTimePeriod=2024&geo=HU&geo=PL&geo=SK&geo=RO&unit=PC_GDP&sector=S13&na_item=GD'
        );
        if (!res.ok) throw new Error(`Eurostat request failed: ${res.status}`);
        const json = await res.json(); // JSON-stat 2.0 style

        const ids: string[] = json.id; // e.g. ["freq","unit","sector","na_item","geo","time"]
        const sizes: number[] = json.size;
        const dim = json.dimension;
        const values = json.value as Record<string, number | null>;
        if (!ids || !sizes || !dim || !values) throw new Error('Unexpected Eurostat format');

        // Build code-by-position lookup for each dimension
        const codeByPos: Record<string, string[]> = {};
        ids.forEach((d) => {
          const cat = dim[d]?.category?.index ?? {};
          const arr: string[] = [];
          Object.entries(cat).forEach(([code, pos]) => {
            arr[Number(pos)] = code as string;
          });
          codeByPos[d] = arr;
        });

        // Compute strides to decode linear index into coordinates
        const n = ids.length;
        const stride: number[] = new Array(n).fill(1);
        for (let i = n - 2; i >= 0; i--) stride[i] = stride[i + 1] * sizes[i + 1];

        const idxTime = ids.indexOf('time');
        const idxGeo = ids.indexOf('geo');
        const idxUnit = ids.indexOf('unit');
        const idxSector = ids.indexOf('sector');
        const idxNa = ids.indexOf('na_item');

        const mapCountry: Record<string, keyof SeriesPoint> = {
          HU: 'Hungary', PL: 'Poland', SK: 'Slovakia', RO: 'Romania',
        };

        const yearMap = new Map<number, SeriesPoint>();

        for (const [kStr, vRaw] of Object.entries(values)) {
          if (vRaw == null) continue;
          const k = Number(kStr);

          // Decode coordinates
          const coord: number[] = new Array(n);
          let rem = k;
          for (let i = 0; i < n; i++) {
            coord[i] = Math.floor(rem / stride[i]) % sizes[i];
            rem = rem % stride[i];
          }

          const year = Number(codeByPos['time']?.[coord[idxTime]]);
          const geo = codeByPos['geo']?.[coord[idxGeo]];
          const unit = idxUnit >= 0 ? codeByPos['unit']?.[coord[idxUnit]] : undefined;
          const sector = idxSector >= 0 ? codeByPos['sector']?.[coord[idxSector]] : undefined;
          const naItem = idxNa >= 0 ? codeByPos['na_item']?.[coord[idxNa]] : undefined;

          // Filter to desired slices (should already be filtered by query params)
          if (unit && unit !== 'PC_GDP') continue;
          if (sector && sector !== 'S13') continue;
          if (naItem && naItem !== 'GD') continue; // Gross debt

          if (!year || year < 2010 || year > 2024) continue;
          const key = geo ? mapCountry[geo] : undefined;
          if (!key) continue;

          const row = yearMap.get(year) ?? { year };
          (row as any)[key] = Number(vRaw);
          yearMap.set(year, row);
        }

        const list = Array.from(yearMap.values()).sort((a, b) => a.year - b.year);
        setRows(list);
      } catch (e: any) {
        console.error('Debt chart error:', e);
        setError(e?.message || 'Failed to load Eurostat data');
      }
    };

    fetchData();
  }, []);

  const config = useMemo(() => ({
    Hungary: { label: 'Hungary', color: 'hsl(var(--chart-1))' },
    Poland: { label: 'Poland', color: 'hsl(var(--chart-2))' },
    Slovakia: { label: 'Slovakia', color: 'hsl(var(--chart-3))' },
    Romania: { label: 'Romania', color: 'hsl(var(--chart-4))' },
  }), []);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>General government debt (% of GDP)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General government debt (% of GDP)</CardTitle>
        <CardDescription>Source: Eurostat (gov_10dd_edpt1) • % of GDP</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={rows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" type="number" scale="linear" domain={[2010, 2024]} tickMargin={8} />
              <YAxis domain={[0, 'auto']} tickMargin={8} />
              <ChartTooltip />
              <ChartLegend />
              <Line type="monotone" dataKey="Hungary" stroke={config.Hungary.color} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Poland" stroke={config.Poland.color} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Slovakia" stroke={config.Slovakia.color} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Romania" stroke={config.Romania.color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LiveDebtToGDPChart;
