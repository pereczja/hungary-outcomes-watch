import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartLegend } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface SeriesPoint {
  year: number;
  Hungary?: number;
  Poland?: number;
  Slovakia?: number;
  Romania?: number;
}

const LiveBirthRateChart = () => {
  const [rows, setRows] = useState<SeriesPoint[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/demo_gind?format=JSON&sinceTimePeriod=2010&untilTimePeriod=2024&geo=HU&geo=PL&geo=SK&geo=RO&indic_de=BIRTH'
        );
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
        setRows(processedRows);
      } catch (err) {
        console.error('Error fetching birth rate data:', err);
        setError('Failed to load birth rate data');
      }
    };

    fetchData();
  }, []);

  const config = useMemo(() => ({
    Hungary: {
      label: "Hungary",
      color: "hsl(var(--chart-1))",
    },
    Poland: {
      label: "Poland", 
      color: "hsl(var(--chart-2))",
    },
    Slovakia: {
      label: "Slovakia",
      color: "hsl(var(--chart-3))",
    },
    Romania: {
      label: "Romania",
      color: "hsl(var(--chart-4))",
    },
  }), []);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Crude birth rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crude birth rate</CardTitle>
        <CardDescription>
          Source: Eurostat (demo_gind) • per 1000 population
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={rows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                type="number"
                scale="linear"
                domain={['dataMin', 'dataMax']}
              />
              <YAxis />
              <ChartTooltip />
              <ChartLegend />
              <Line 
                type="monotone" 
                dataKey="Hungary" 
                stroke={config.Hungary.color}
                strokeWidth={2}
                dot={{ fill: config.Hungary.color }}
              />
              <Line 
                type="monotone" 
                dataKey="Poland" 
                stroke={config.Poland.color}
                strokeWidth={2}
                dot={{ fill: config.Poland.color }}
              />
              <Line 
                type="monotone" 
                dataKey="Slovakia" 
                stroke={config.Slovakia.color}
                strokeWidth={2}
                dot={{ fill: config.Slovakia.color }}
              />
              <Line 
                type="monotone" 
                dataKey="Romania" 
                stroke={config.Romania.color}
                strokeWidth={2}
                dot={{ fill: config.Romania.color }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LiveBirthRateChart;