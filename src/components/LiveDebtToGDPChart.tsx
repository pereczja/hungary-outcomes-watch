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

const LiveDebtToGDPChart = () => {
  const [rows, setRows] = useState<SeriesPoint[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/gov_10dd_edpt1?format=JSON&sinceTimePeriod=2010&untilTimePeriod=2024&geo=HU&geo=PL&geo=SK&geo=RO&unit=PC_GDP&sector=S13&na_item=GD'
        );
        const data = await response.json();

        // Handle the complex JSON-stat format from Eurostat
        const values = data.value;
        const dimensions = data.dimension;
        
        // Get dimension indices
        const geoIndex = dimensions.geo.category.index;
        const timeIndex = dimensions.time.category.index;
        const naItemIndex = dimensions.na_item?.category?.index;

        // Calculate strides for multi-dimensional data
        const sizes = data.size;
        const geoSize = sizes[dimensions.id.indexOf('geo')];
        const timeSize = sizes[dimensions.id.indexOf('time')];
        const naSize = naItemIndex ? sizes[dimensions.id.indexOf('na_item')] : 1;

        const processedRows: SeriesPoint[] = [];
        
        // Create map to store data by year
        const yearMap = new Map<number, SeriesPoint>();

        // Iterate through all data points
        Object.keys(values).forEach(index => {
          const value = values[index];
          if (value === null || value === undefined) return;

          const idx = parseInt(index);
          
          // Calculate coordinates in multi-dimensional array
          const timeIdx = idx % timeSize;
          const geoIdx = Math.floor(idx / timeSize) % geoSize;
          
          // Get actual values
          const year = parseInt(Object.keys(timeIndex)[timeIdx]);
          const geoCode = Object.keys(geoIndex)[geoIdx];
          
          if (year < 2010 || year > 2024) return;
          
          const countryName = geoCode === 'HU' ? 'Hungary' :
                             geoCode === 'PL' ? 'Poland' :
                             geoCode === 'SK' ? 'Slovakia' :
                             geoCode === 'RO' ? 'Romania' : null;
          
          if (!countryName) return;
          
          // Get or create year entry
          let yearData = yearMap.get(year);
          if (!yearData) {
            yearData = { year };
            yearMap.set(year, yearData);
          }
          
          // Set country value
          (yearData as any)[countryName] = parseFloat(value);
        });

        // Convert map to sorted array
        const sortedData = Array.from(yearMap.values()).sort((a, b) => a.year - b.year);
        setRows(sortedData);
        
      } catch (err) {
        console.error('Error fetching debt data:', err);
        setError('Failed to load government debt data');
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
          <CardTitle>General government debt (% of GDP)</CardTitle>
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
        <CardTitle>General government debt (% of GDP)</CardTitle>
        <CardDescription>
          Source: Eurostat (gov_10dd_edpt1) • % of GDP
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
              <YAxis domain={[0, 100]} />
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

export default LiveDebtToGDPChart;