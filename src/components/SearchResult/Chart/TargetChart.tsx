"use client";
import { Label, Pie, PieChart } from "recharts";
import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import FinancialForecastChart from "./FinancialForecastChart";
import useAxios from "@/hooks/useAxios";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const TargetChart = () => {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  const axiosInstance = useAxios();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data: targetData = {} } = useQuery({
    queryKey: ["target-chart-data"],
    queryFn: async () => {
      const res = await axiosInstance(
        `/stocks/stock/target-price?symbol=${query}`
      );
      return res.data;
    },
  });

  console.log(targetData)

  const targetChartData = targetData?.chart;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      <div className="border-2 border-[#a8a8a87a] lg:col-span-4 rounded-lg">
        <FinancialForecastChart targetChartData={targetChartData}/>
      </div>

      <div className="border-2 border-[#a8a8a87a] lg:col-span-2 rounded-lg flex flex-col justify-center">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Sell</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 h-4 w-4"></div>
              <h1 className="text-green-500">10 Buy</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-gray-500 h-4 w-4"></div>
              <h1 className="text-gray-500">12 Hold</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-red-500 h-4 w-4"></div>
              <h1 className="text-red-500">6 Sell</h1>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TargetChart;
