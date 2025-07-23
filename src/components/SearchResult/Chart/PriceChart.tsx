"use client";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { useSearchParams } from "next/navigation";
// import { YAxis } from "@/components/ui/media-chart/media-chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PriceChart = () => {
  const [isActive, setIsActive] = useState("Day");

  const axiosInstance = useAxios();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data: priceData } = useQuery({
    queryKey: ["price-chart-data"],
    queryFn: async () => {
      const res = await axiosInstance(
        `/stocks/stocks-overview?symbol=${query}`
      );
      return res.data?.data;
    },
  });

  interface ChartDataItem {
    time: number;
    close: number;
    volume: number;
  }

  const getFilteredChartData = (chartData: ChartDataItem[], period: string) => {
    if (!chartData || chartData.length === 0) return [];

    const now = Date.now();
    let startTime = 0;

    switch (period) {
      case "Day":
        startTime = now - 24 * 60 * 60 * 1000; // 1 day
        break;
      case "Week":
        startTime = now - 7 * 24 * 60 * 60 * 1000; // 1 week
        break;
      case "Month":
        startTime = now - 30 * 24 * 60 * 60 * 1000; // 1 month
        break;
      case "Year":
        startTime = now - 365 * 24 * 60 * 60 * 1000; // 1 year
        break;
      case "5 Year":
        startTime = now - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years
        break;
      case "Max":
        startTime = 0; // Show all data
        break;
      default:
        startTime = now - 24 * 60 * 60 * 1000; // Default to 1 day
    }

    return chartData
      .filter((item) => item.time >= startTime && !isNaN(item.close))
      .map((item) => ({
        time: new Date(item.time).toLocaleDateString(),
        price: parseFloat(item.close.toFixed(2)), // Ensure price is a number, fallback 0 if invalid
        volume: item.volume,
      }));
  };

  return (
    <div>
      <div className="flex space-x-2 sm:text-[32px] text-xl">
        <span className="font-bold">
          {priceData?.priceInfo?.currentPrice.toFixed(2)}
        </span>
        {typeof priceData?.priceInfo?.change === "number" &&
          priceData.priceInfo.change !== 0 && (
            <span
              className={`font-semibold ${
                priceData.priceInfo.change > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {priceData.priceInfo.change > 0 ? "+" : ""}
              {priceData.priceInfo.change.toFixed(2)} (
              {priceData.priceInfo.percentChange?.toFixed(2)}%)
            </span>
          )}
      </div>

      <div className=" mt-4 overflow-x-auto">
        <div className="flex gap-2 w-max min-w-full px-2">
          <button
            className={`rounded-full px-5 w-[120px] border border-green-500 py-2 text-green-500 font-semibold ${
              isActive === "Day" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setIsActive("Day")}
          >
            Day
          </button>

          <button
            className={`rounded-full px-5 w-[120px] border border-green-500 py-2 text-green-500 font-semibold ${
              isActive === "Week" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setIsActive("Week")}
          >
            Week
          </button>

          <button
            className={`rounded-full px-5 w-[120px] border border-green-500 py-2 text-green-500 font-semibold ${
              isActive === "Month" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setIsActive("Month")}
          >
            Month
          </button>

          <button
            className={`rounded-full px-5 w-[120px] border border-green-500 py-2 text-green-500 font-semibold ${
              isActive === "Year" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setIsActive("Year")}
          >
            Year
          </button>

          <button
            className={`rounded-full px-5 w-[120px] border border-green-500 py-2 text-green-500 font-semibold ${
              isActive === "5 Year" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setIsActive("5 Year")}
          >
            5 Year
          </button>

          <button
            className={`rounded-full px-5 w-[120px] border border-green-500 py-2 text-green-500 font-semibold ${
              isActive === "Max" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setIsActive("Max")}
          >
            Max
          </button>
        </div>
      </div>

      <div className="mt-5">
        <Card>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-[400px]">
              <AreaChart
                accessibilityLayer
                data={getFilteredChartData(priceData?.chart || [], isActive)}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    switch (isActive) {
                      case "Day":
                        return date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      case "Week":
                        return date.toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                      case "Month":
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      case "Year":
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                        });
                      case "5 Year":
                      case "Max":
                        return date.toLocaleDateString("en-US", {
                          year: "numeric",
                        });
                      default:
                        return date.toLocaleDateString();
                    }
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  width={60}
                  domain={([dataMin, dataMax]: [number, number]) => {
                    if (isNaN(dataMin) || isNaN(dataMax)) return [0, 1];
                    const buffer = (dataMax - dataMin) * 0.1 || 1;
                    return [
                      Math.floor(dataMin - buffer),
                      Math.ceil(dataMax + buffer),
                    ];
                  }}
                  tickFormatter={(value) => {
                    if (value >= 1_000_000_000)
                      return (value / 1_000_000_000).toFixed(1) + "B";
                    if (value >= 1_000_000)
                      return (value / 1_000_000).toFixed(1) + "M";
                    if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
                    return value.toFixed(2);
                  }}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                  dataKey="price"
                  type="linear"
                  fill="green"
                  fillOpacity={0.3}
                  stroke="#139430"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PriceChart;
