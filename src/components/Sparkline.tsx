import { Line, LineChart, ResponsiveContainer } from "recharts";

interface SparklineProps {
  data: { year: number; value: number }[];
  color?: string;
  height?: number;
}

export const Sparkline = ({ data, color = "hsl(var(--primary))", height = 40 }: SparklineProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-10 w-full bg-secondary/50 rounded animate-pulse" />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
