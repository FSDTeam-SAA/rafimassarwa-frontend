"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const earningsData = [
  { month: "Jan", earnings: 400 },
  { month: "Feb", earnings: 300 },
  { month: "Mar", earnings: 500 },
  { month: "Apr", earnings: 400 },
  { month: "May", earnings: 600 },
  { month: "Jun", earnings: 800 },
  { month: "Jul", earnings: 1200 },
  { month: "Aug", earnings: 900 },
  { month: "Sep", earnings: 600 },
  { month: "Oct", earnings: 400 },
  { month: "Nov", earnings: 500 },
  { month: "Dec", earnings: 700 },
]

export function EarningsChart() {
  return (
    <ChartContainer
      config={{
        earnings: {
          label: "Earnings",
          color: "hsl(142, 76%, 36%)",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={earningsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) => `$${value}`}
            domain={[0, "dataMax + 200"]}
            ticks={[0, 200, 400, 600, 800, 1000, 1200]}
          />
          <ChartTooltip
            content={<ChartTooltipContent className="bg-black text-white p-2 rounded-md shadow-lg" indicator={undefined} />}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 4, fill: "#22c55e", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#22c55e", stroke: "white", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
