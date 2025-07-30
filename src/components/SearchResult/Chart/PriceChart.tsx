"use client";
import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
import { useLanguage } from "@/providers/LanguageProvider";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartDataItem {
  time: number;
  close: number;
  volume: number;
}

const PriceChart = () => {
  const [isActive, setIsActive] = useState("Day");
  const { dictionary } = useLanguage();
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth <= 640;

  const axiosInstance = useAxios();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data: priceData, isLoading } = useQuery({
    queryKey: ["price-chart-data", query, isActive],
    queryFn: async () => {
      const res = await axiosInstance(
        `/stocks/stocks-overview?symbol=${query}&range=${isActive}`
      );
      return res.data?.data;
    },
    enabled: !!query,
  });

  const getFilteredChartData = (chartData: ChartDataItem[] = [], period: string) => {
    if (!chartData || chartData.length === 0) return [];

    const now = Date.now();
    let startTime = 0;

    switch (period) {
      case "Day":
        startTime = now - 24 * 60 * 60 * 1000;
        break;
      case "Week":
        startTime = now - 7 * 24 * 60 * 60 * 1000;
        break;
      case "Month":
        startTime = now - 30 * 24 * 60 * 60 * 1000;
        break;
      case "Year":
        startTime = now - 365 * 24 * 60 * 60 * 1000;
        break;
      case "5Year":
        startTime = now - 5 * 365 * 24 * 60 * 60 * 1000;
        break;
      default:
        startTime = now - 24 * 60 * 60 * 1000;
    }

    return chartData
      .filter((item) => item.time >= startTime && !isNaN(item.close))
      .map((item) => ({
        time: item.time,
        price: parseFloat(item.close.toFixed(2)),
        volume: item.volume,
      }));
  };

  const getXAxisTicks = (data: { time: number; price: number; volume: number }[] = []) => {
    if (!data.length) return [];

    const sampleCount = isActive === "Week" ? 5 : isActive === "5Year" ? 6 : null;
    if (!sampleCount) return undefined;

    const interval = Math.floor(data.length / sampleCount);
    return data
      .filter((_, index) => index % interval === 0)
      .map((item) => item.time);
  };

  const formatTimeTick = (timestamp: number) => {
    const date = new Date(timestamp);

    switch (isActive) {
      case "Day":
        return date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

      case "Week":
      case "Month":
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

      case "Year":
        return date.toLocaleDateString("en-US", {
          month: "short",
        });

      case "5Year":
        return date.toLocaleDateString("en-US", {
          year: "numeric",
        });

      default:
        return date.toLocaleDateString();
    }
  };

  return (
    <div className="px-2 sm:px-4">
      {/* Price Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex items-baseline gap-2 text-xl sm:text-2xl">
          <span className="font-bold">
            {priceData?.priceInfo?.currentPrice?.toFixed(2) || "0.00"}
          </span>
          {typeof priceData?.priceInfo?.change === "number" &&
            priceData.priceInfo.change !== 0 && (
              <span
                className={`text-sm sm:text-base font-semibold ${
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
      </div>

      {/* Time Period Buttons */}
      <div className="mt-4 overflow-x-auto">
        <div className="flex gap-2 w-max min-w-full pb-2">
          {["Day", "Week", "Month", "Year", "5Year"].map((period) => {
            const periodKeyMap: Record<string, keyof typeof dictionary> = {
              Day: "day",
              Week: "week",
              Month: "month",
              Year: "year",
              "5Year": "fiveYear",
            };
            const dictKey = periodKeyMap[period] ?? period.toLowerCase();
            return (
              <button
                key={period}
                className={`rounded-full px-3 sm:px-4 w-[70px] sm:w-[90px] border border-green-500 py-1 text-green-500 font-semibold text-xs sm:text-sm ${
                  isActive === period ? "bg-green-500 text-white" : ""
                }`}
                onClick={() => setIsActive(period)}
              >
                {period === "5Year"
                  ? "5Y"
                  : dictionary[dictKey] ?? period}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Area */}
      <div className="mt-5">
        {isLoading ? (
          <div className="h-[250px] sm:h-[350px] w-full flex flex-col justify-center items-center text-xl">
            Loading...
          </div>
        ) : (
          <Card className="w-full">
            <CardContent className="p-2 sm:p-4">
              <ChartContainer
                config={chartConfig}
                className="w-full h-[250px] sm:h-[350px] md:h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={getFilteredChartData(priceData?.chart, isActive)}
                    margin={{
                      top: 10,
                      right: 10,
                      left: isMobile ? 0 : 10,
                      bottom: isMobile ? 0 : 10,
                    }}
                  >
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={formatTimeTick}
                      ticks={getXAxisTicks(getFilteredChartData(priceData?.chart, isActive))}
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      width={isMobile ? 40 : 50}
                      domain={["auto", "auto"]}
                      tickFormatter={(value) => value.toFixed(2)}
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                    />

                    <ChartTooltip
                      cursor={{ stroke: "#ddd", strokeWidth: 1 }}
                      content={<ChartTooltipContent indicator="dot" hideLabel />}
                      wrapperStyle={{ fontSize: isMobile ? "12px" : "14px" }}
                      labelFormatter={(value) =>
                        new Date(value).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      }
                    />
                    <Area
                      dataKey="price"
                      type="linear"
                      fill="url(#colorPrice)"
                      fillOpacity={0.2}
                      stroke="#139430"
                      strokeWidth={isMobile ? 1.5 : 2}
                      activeDot={{ r: isMobile ? 4 : 6 }}
                    />
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#139430" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#139430" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PriceChart;
