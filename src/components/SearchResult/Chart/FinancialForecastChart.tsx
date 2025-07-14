"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

type ForecastData = {
  labels: string[];
  pastPrices?: number[];
  forecast?: {
    high?: number[] | string[];
    average?: number[] | string[];
    low?: number[] | string[];
  };
};

interface FinancialForecastChartProps {
  targetChartData: ForecastData;
  targetsData?: {
    high?: number | string;
    average?: number | string;
    low?: number | string;
  };
  targetData?: {
    high?: number | string;
    average?: number | string;
    low?: number | string;
    currentPrice?: number | string;
    upside?: number | string;
  };
}

export default function FinancialForecastChart({
  targetChartData,
  targetsData,
  targetData,
}: FinancialForecastChartProps) {
  function transformToChartData(data: ForecastData) {
    if (!data || !data.labels) return [];

    const labels = data.labels;
    const pastPrices = data.pastPrices || [];
    const forecast = data.forecast || {};

    const chartData = [];

    const forecastStartIndex = pastPrices.length;

    // Step 1: Add past price data
    for (let i = 0; i < pastPrices.length; i++) {
      chartData.push({
        month: labels[i],
        price: pastPrices[i],
      });
    }

    // Step 2: Add transition month (same as last known price but with forecast info)
    if (
      forecast.high &&
      forecast.high.length > 0 &&
      forecast.average &&
      forecast.average.length > 0 &&
      forecast.low &&
      forecast.low.length > 0 &&
      labels[forecastStartIndex]
    ) {
      chartData.push({
        month: labels[forecastStartIndex],
        forecast: true,
        price: pastPrices[pastPrices.length - 1],
        high: parseFloat(forecast.high[0].toString()),
        average: parseFloat(forecast.average[0].toString()),
        low: parseFloat(forecast.low[0].toString()),
      });
    }

    // Step 3: Add remaining forecast months
    for (let i = 1; i < (forecast.high?.length ?? 0); i++) {
      chartData.push({
        month: labels[forecastStartIndex + i],
        forecast: true,
        high: parseFloat(forecast.high![i].toString()),
        average: parseFloat(forecast.average![i].toString()),
        low: parseFloat(forecast.low![i].toString()),
      });
    }

    return chartData;
  }

  const chartData = transformToChartData(targetChartData);

  return (
    <Card className="w-full">
      <CardHeader className="pb-0 px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col">
            <div>
              <span className="text-4xl font-bold text-green-500">
                {targetData?.currentPrice}
              </span>
              <span className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                (${targetData?.upside})
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-24 pt-3 pb-2 text-sm text-gray-500 font-medium">
          <div>Past 12 Months</div>
          <div>12 Month Forecast</div>
        </div>
      </CardHeader>
      <CardContent className="pr-0">
        <div className="flex w-full">
          {/* Chart container - takes 100% width */}
          <div className="h-[200px] flex-1">
            <ChartContainer
              config={{
                price: {
                  label: "Price",
                  color: "hsl(var(--chart-1))",
                },
                high: {
                  label: "High",
                  color: "hsl(142, 76%, 36%)",
                },
                average: {
                  label: "Average",
                  color: "hsl(0, 0%, 60%)",
                },
                low: {
                  label: "Low",
                  color: "hsl(0, 76%, 50%)",
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer>
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value} // Just show the raw "Jul", "Aug", etc.
                    tick={{ fontSize: 12 }}
                    interval={0} // ✅ This forces showing all labels
                  />
                  <YAxis
                    domain={[0, 550]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent formatter={(value) => `$${value}`} />
                    }
                  />

                  {/* Historical price line */}
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#0666a7"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "white" }}
                    activeDot={{ r: 5 }}
                    connectNulls={true}
                  />

                  {/* Forecast lines */}
                  <Line
                    type="monotone"
                    dataKey="high"
                    stroke="var(--color-high)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    connectNulls={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="var(--color-average)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    connectNulls={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="low"
                    stroke="var(--color-low)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    connectNulls={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Price target cards - positioned as a separate column */}
          <div className="flex flex-col justify-between gap-4 py-6 px-4">
            <div className="text-right">
              <div className="text-gray-500 text-xs">High</div>
              <div className="font-semibold text-green-500 text-[10px]">
                {targetsData?.high}
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-[10px]">Average</div>
              <div className="font-semibold text-[10px]">
                {targetsData?.average}
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-xs">Low</div>
              <div className="font-semibold text-red-500 text-[10px]">
                {targetsData?.low}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 px-6">
          <div className="text-center flex items-center gap-2">
            <div className="font-medium">Highest Price Target:</div>
            <div className="font-semibold text-green-500">
              {targetsData?.high}
            </div>
          </div>
          <div className="text-center flex items-center gap-2">
            <div className="font-medium">Average Price Target:</div>
            <div className="font-semibold text-gray-500">
              {targetsData?.average}
            </div>
          </div>
          <div className="text-center flex items-center gap-2">
            <div className="font-medium">Lowest Price Target:</div>
            <div className="font-semibold text-red-500">{targetsData?.low}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
