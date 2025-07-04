"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

export default function StockBuybacksChart() {
  // Dummy data matching the Figma design
  const data = [
    { quarter: "Mar 22", value: 23.74 },
    { quarter: "Jun 22", value: 21.7 },
    { quarter: "Sep 22", value: 25.28 },
    { quarter: "Dec 22", value: 19.0 },
    { quarter: "Mar 23", value: 19.03 },
    { quarter: "Jun 23", value: 18.08 },
    { quarter: "Sep 23", value: 20.8 },
    { quarter: "Dec 23", value: 21.64 },
    { quarter: "Mar 24", value: 23.5 },
    { quarter: "Jun 24", value: 26.03 },
  ]

  // Chart configuration for shadcn/ui chart
  const chartConfig = {
    value: {
      label: "Buyback Value",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <div className="w-full rounded-lg border bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-black">Stock Buybacks (Quarterly) Chart</h2>
      <ChartContainer config={chartConfig} className="min-h-[300px]">
        <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }} barSize={40}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: "#000", fontSize: 12 }} dy={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#000", fontSize: 12 }}
            tickFormatter={(value) => `${value}B`}
            domain={[0, 40]}
            ticks={[0, 10, 20, 30, 40]}
            dx={-10}
          />
          <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="value"
              position="top"
              formatter={(value: number) => `${value.toFixed(2)}B`}
              style={{ fill: "#000", fontSize: 12, fontWeight: 500 }}
              dy={-10}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
