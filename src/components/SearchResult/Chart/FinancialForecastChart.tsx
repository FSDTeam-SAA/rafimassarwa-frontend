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
    const chartData = [];

    const forecastStartIndex = pastPrices.length;
    const forecastMonths = labels.slice(forecastStartIndex);

    const high = targetsData?.high
      ? parseFloat(targetsData.high.toString())
      : null;
    const average = targetsData?.average
      ? parseFloat(targetsData.average.toString())
      : null;
    const low = targetsData?.low
      ? parseFloat(targetsData.low.toString())
      : null;

    // 1. Past data
    for (let i = 0; i < pastPrices.length; i++) {
      chartData.push({
        month: labels[i],
        price: pastPrices[i],
      });
    }

    // 2. Starting forecast point (same month as last price)
    if (forecastMonths.length > 0) {
      chartData.push({
        month: forecastMonths[0],
        price: pastPrices[pastPrices.length - 1],
        high,
        average,
        low,
      });
    }

    // 3. Extend forecast lines forward using same values
    for (let i = 1; i < forecastMonths.length; i++) {
      chartData.push({
        month: forecastMonths[i],
        high,
        average,
        low,
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
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            {/* Chart container - takes 100% width */}
            <div className="h-[200px] lg:w-[70%]">
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
                        <ChartTooltipContent
                          formatter={(value) => `$${value}`}
                        />
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
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="lg:w-[30%]">
              <svg
                width="230"
                height="168"
                viewBox="0 0 230 168"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 82.6953L435.922 190"
                  stroke="#FF5733"
                  stroke-width="2"
                  stroke-dasharray="6 2"
                />
                <path
                  d="M1 82.6953L435.922 83"
                  stroke="#828080"
                  stroke-width="2"
                  stroke-dasharray="6 2"
                />
                <path
                  d="M1 82.6953L435.922 -17"
                  stroke="#28A745"
                  stroke-width="2"
                  stroke-dasharray="6 2"
                />
              </svg>
            </div>
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
