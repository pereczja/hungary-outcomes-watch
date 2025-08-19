
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';

interface SeriesPoint { year: number; Hungary?: number; Poland?: number; Slovakia?: number; Romania?: number }

const LiveDebtToGDPChart = () => {
  const [rows, setRows] = useState<SeriesPoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(
          'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/gov_10dd_edpt1?format=JSON&sinceTimePeriod=2010&untilTimePeriod=2024&geo=HU&geo=PL&geo=SK&geo=RO&unit=PC_GDP&sector=S13&na_item=GD'
        );
        if (!res.ok) throw new Error(`Eurostat request failed: ${res.status}`);
        const json = await res.json();

        const dim = json?.dimension ?? json?.dataset?.dimension;
        const ids: string[] = (json?.id ?? json?.dataset?.id ?? dim?.id) as string[];
        const sizes: number[] = (json?.size ?? json?.dataset?.size ?? dim?.size) as number[];
        const valueRaw: any = json?.value ?? json?.dataset?.value;

        if (!valueRaw || !ids || !Array.isArray(ids) || !sizes || !Array.isArray(sizes) || !dim) {
          throw new Error('Unexpected Eurostat format');
        }

        const n = ids.length;
        const byPos: Record<string, string[]> = {};
        ids.forEach((d) => {
          const cat = (dim as any)[d]?.category?.index ?? {};
          const arr: string[] = [];
          Object.entries(cat).forEach(([code, pos]: any) => {
            arr[Number(pos)] = code as string;
          });
          byPos[d] = arr;
        });

        const strides: number[] = new Array(n).fill(1);
        for (let i = n - 2; i >= 0; i--) {
          strides[i] = strides[i + 1] * sizes[i + 1];
        }

        const idxTime = ids.indexOf('time');
        const idxGeo = ids.indexOf('geo');
        const idxUnit = ids.indexOf('unit');
        const idxSector = ids.indexOf('sector');
        const idxItem = ids.indexOf('na_item');

        const dataMap = new Map<number, SeriesPoint>();

        const processObs = (v: number | null, k: number) => {
          if (v == null) return;
          const coords: number[] = new Array(n);
          let rem = k;
          for (let i = 0; i < n; i++) {
            const stride = strides[i] ?? 1;
            coords[i] = Math.floor(rem / stride) % sizes[i];
            rem = rem % stride;
          }
          const timeCode = byPos[ids[idxTime]]?.[coords[idxTime]];
          const geoCode = byPos[ids[idxGeo]]?.[coords[idxGeo]];
          const unitCode = byPos[ids[idxUnit]]?.[coords[idxUnit]];
          const sectorCode = byPos[ids[idxSector]]?.[coords[idxSector]];
          const itemCode = byPos[ids[idxItem]]?.[coords[idxItem]];

          if (unitCode !== 'PC_GDP' || sectorCode !== 'S13' || itemCode !== 'GD') return;
          const year = Number(timeCode);
          if (Number.isNaN(year) || year < 2010 || year > 2024) return;
          let row = dataMap.get(year) ?? { year };
          const mapCountry: Record<string, keyof SeriesPoint> = {
            HU: 'Hungary', PL: 'Poland', SK: 'Slovakia', RO: 'Romania',
          };
          const key = mapCountry[geoCode as keyof typeof mapCountry];
          if (key) (row as any)[key] = Number(v);
          dataMap.set(year, row);
        };

        if (Array.isArray(valueRaw)) {
          (valueRaw as (number | null)[]).forEach((v, k) => processObs(v, k));
        } else if (typeof valueRaw === 'object') {
          Object.entries(valueRaw as Record<string, number | null>).forEach(([kStr, v]) => {
            const k = Number(kStr);
            if (!Number.isNaN(k)) processObs(v as number | null, k);
          });
        } else {
          throw new Error('Unexpected Eurostat format');
        }

        const list = Array.from(dataMap.values()).sort((a, b) => a.year - b.year);
        if (mounted) setRows(list);

      } catch (e: any) {
        console.error(e);
        if (mounted) setError(e?.message || 'Failed to load Eurostat data');
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
            <h3 className="text-base font-semibold">General government debt (% of GDP)</h3>
            <p className="text-xs text-muted-foreground">Eurostat gov_10dd_edpt1 · unit: PC_GDP · sector: S13 · na_item: GD · 2010–2024</p>
          </div>
          <a className="story-link text-xs" target="_blank" rel="noreferrer" href="https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/gov_10dd_edpt1?sinceTimePeriod=2010&untilTimePeriod=2024&geo=HU&geo=PL&geo=SK&geo=RO&unit=PC_GDP&sector=S13&na_item=GD&format=JSON">Live source</a>
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

export default LiveDebtToGDPChart;
