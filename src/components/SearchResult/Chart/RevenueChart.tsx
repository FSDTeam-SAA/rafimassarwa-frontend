"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

const chartConfig = {
  desktop: {
    label: "Estimate",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Actual",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const MAX_POINTS = 30;

const RevenueChart = () => {
  const axiosInstance = useAxios();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { dictionary, selectedLangCode } = useLanguage();

  const { data: revenueData, isLoading } = useQuery({
    queryKey: ["revenue-data", query],
    queryFn: async () => {
      if (!query) return [];
      const res = await axiosInstance(
        `/stocks/stock/earnings-surprise?symbol=${query}`
      );
      return res.data;
    },
    enabled: !!query,
  });

  interface RevenueDataItem {
    period: string;
    estimate: number;
    actual: number;
    quarter: number;
    year: number;
  }

  // Filter and slice last MAX_POINTS
  const filteredData: RevenueDataItem[] =
    revenueData
      ?.filter(
        (item: RevenueDataItem) =>
          item.period && item.estimate != null && item.actual != null
      )
      ?.slice(0, MAX_POINTS)
      ?.reverse() || [];

  // Quarter labels
  const quarterLabels = filteredData.map((item) => `Q${item.quarter}`);

  // Year labels (only show when year changes)
  const yearLabels = filteredData.map((item, index, arr) => {
    const current = item.year;
    const prev = arr[index - 1]?.year;
    return prev !== current ? `${current}` : "";
  });

  // Chart data with quarter/year keys
  const chartData = filteredData.map((item, i) => ({
    quarter: quarterLabels[i],
    year: yearLabels[i],
    desktop: item.estimate,
    mobile: item.actual,
  }));

  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle>{dictionary.earningsHistory}</CardTitle>
          <CardDescription>
            {isLoading
              ? "Loading..."
              : selectedLangCode === "ar"
              ? `عرض ${chartData.length} فترات`
              : `Showing ${chartData.length} periods`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="w-full h-[400px]" config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />

              {/* Quarter labels (top) */}
              <XAxis
                xAxisId="0"
                dataKey="quarter"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                height={30}
              />

              {/* Year labels (bottom) */}
              <XAxis
                xAxisId="1"
                dataKey="year"
                tickLine={false}
                axisLine={false}
                height={20}
                tick={{ fontSize: 12, fill: "#666" }}
                orientation="bottom"
              />

              <ChartTooltip
                cursor={false}
                content={({ payload }) => {
                  if (!payload || !payload.length) return null;
                  return (
                    <ChartTooltipContent
                      indicator="dashed"
                      title={`${payload[0].payload.quarter} ${payload[0].payload.year}`}
                      payload={payload}
                    />
                  );
                }}
              />

              <Bar xAxisId="0" dataKey="desktop" fill="#bce4c5" radius={4} />
              <Bar xAxisId="0" dataKey="mobile" fill="#28a745" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueChart;
