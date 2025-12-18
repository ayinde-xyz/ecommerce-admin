"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

interface OverviewProps {
  data: {
    name: string;
    total: number;
  }[];
}

const chartConfig = {
  total: {
    label: "total",
    // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
    // OR a theme object with 'light' and 'dark' keys
    theme: {
      light: "#000000",
      dark: "#888888",
    },
  },
} satisfies ChartConfig;

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value) => `$${value}`}
        />
        {/* <Legend /> */}
        <ChartTooltip
          content={
            <ChartTooltipContent
              active={false}
              payload={[]}
              coordinate={undefined}
              accessibilityLayer={false}
              activeIndex={undefined}
            />
          }
        />
        <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};
