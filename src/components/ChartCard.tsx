import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import type { Metric } from '@/data/competitiveness';

interface ChartCardProps {
  metric: Metric;
}

export const ChartCard = ({ metric }: ChartCardProps) => {
  const config = {
    Hungary: { label: 'Hungary', color: 'hsl(var(--primary))' },
    Poland: { label: 'Poland', color: 'hsl(210 90% 45%)' },
    Slovakia: { label: 'Slovakia', color: 'hsl(45 90% 45%)' },
    Romania: { label: 'Romania', color: 'hsl(0 80% 55%)' },
  } as const;

  return (
    <Card className="bg-gradient-surface">
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">{metric.title}</h3>
            <p className="text-xs text-muted-foreground">Unit: {metric.unit}{metric.note ? ` · ${metric.note}` : ''}</p>
          </div>
          <a href={metric.source.url} target="_blank" rel="noopener noreferrer" className="story-link text-xs">
            Source: {metric.source.label}
          </a>
        </div>
        <ChartContainer config={config} className="h-[260px] w-full">
          <LineChart data={metric.data} margin={{ left: 12, right: 12, top: 6, bottom: 6 }}>
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

export default ChartCard;
