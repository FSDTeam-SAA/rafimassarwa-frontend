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
import { useLanguage } from "@/providers/LanguageProvider";

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
  const { selectedLangCode } = useLanguage();
  const isRTL = selectedLangCode === "ar";

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

  // Translation dictionary
  const translations = {
    past12Months: isRTL ? "آخر 12 شهرًا" : "Past 12 Months",
    forecast12Months: isRTL ? "التنبؤ لـ 12 شهرًا" : "12 Month Forecast",
    high: isRTL ? "عالٍ" : "High",
    average: isRTL ? "متوسط" : "Average",
    low: isRTL ? "منخفض" : "Low",
    highestPriceTarget: isRTL ? "أعلى سعر مستهدف:" : "Highest Price Target:",
    averagePriceTarget: isRTL ? "متوسط السعر المستهدف:" : "Average Price Target:",
    lowestPriceTarget: isRTL ? "أقل سعر مستهدف:" : "Lowest Price Target:",
    price: isRTL ? "السعر" : "Price",
  };

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
                {!isRTL && <ArrowUpRight className="h-4 w-4 mr-1" />}
                (${targetData?.upside})
                {isRTL && <ArrowUpRight className="h-4 w-4 mr-1" />}
              </span>
            </div>
          </div>
        </div>
        <div className={`flex justify-between lg:px-24 pt-3 pb-2 text-sm text-gray-500 font-medium ${isRTL ? "flex-row-reverse" : ""}`}>
          <div>{translations.past12Months}</div>
          <div>{translations.forecast12Months}</div>
        </div>
      </CardHeader>
      <CardContent className="pr-0 pl-0 lg:pl-4 overflow-auto lg:overflow-hidden">
        <div className={`flex justify-between w-full h-[200px] lg:h-auto p-0 `}>
          <div className="flex items-center">
            {/* Chart container - takes 100% width */}
            <div className="h-[200px] lg:w-[70%]">
              <ChartContainer
                config={{
                  price: {
                    label: translations.price,
                    color: "hsl(var(--chart-1))",
                  },
                  high: {
                    label: translations.high,
                    color: "hsl(142, 76%, 36%)",
                  },
                  average: {
                    label: translations.average,
                    color: "hsl(0, 0%, 60%)",
                  },
                  low: {
                    label: translations.low,
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
                      tickFormatter={(value) => value}
                      tick={{ fontSize: 12 }}
                      interval={0}
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
                  strokeWidth="2"
                  strokeDasharray="6 2"
                />
                <path
                  d="M1 82.6953L435.922 83"
                  stroke="#828080"
                  strokeWidth="2"
                  strokeDasharray="6 2"
                />
                <path
                  d="M1 82.6953L435.922 -17"
                  stroke="#28A745"
                  strokeWidth="2"
                  strokeDasharray="6 2"
                />
              </svg>
            </div>
          </div>

          {/* Price target cards - positioned as a separate column */}
          <div className={`flex flex-col justify-between gap-4 lg:py-6 lg:px-4 ${isRTL ? "text-left" : "text-right"}`}>
            <div className="w-[50px] lg:w-auto">
              <div className="text-gray-500 text-xs">{translations.high}</div>
              <div className="font-semibold text-green-500 text-[10px]">
                {targetsData?.high}
              </div>
            </div>
            <div className="w-[50px] lg:w-auto">
              <div className="text-gray-500 text-[10px]">{translations.average}</div>
              <div className="font-semibold text-[10px]">
                {targetsData?.average}
              </div>
            </div>
            <div className="w-[50px] lg:w-auto">
              <div className="text-gray-500 text-xs">{translations.low}</div>
              <div className="font-semibold text-red-500 text-[10px]">
                {targetsData?.low}
              </div>
            </div>
          </div>
        </div>

        <div className={`flex flex-col lg:flex-row items-center justify-between mt-6 px-6 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className="text-center flex items-center gap-2">
            <div className="font-medium">{translations.highestPriceTarget}</div>
            <div className="font-semibold text-green-500">
              {targetsData?.high}
            </div>
          </div>
          <div className="text-center flex items-center gap-2">
            <div className="font-medium">{translations.averagePriceTarget}</div>
            <div className="font-semibold text-gray-500">
              {targetsData?.average}
            </div>
          </div>
          <div className="text-center flex items-center gap-2">
            <div className="font-medium">{translations.lowestPriceTarget}</div>
            <div className="font-semibold text-red-500">{targetsData?.low}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}