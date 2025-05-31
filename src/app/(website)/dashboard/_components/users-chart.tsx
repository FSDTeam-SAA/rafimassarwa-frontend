"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const usersData = [
  { month: "Jan", paid: 400, free: 420 },
  { month: "Feb", paid: 380, free: 400 },
  { month: "Mar", paid: 500, free: 450 },
  { month: "Apr", paid: 580, free: 400 },
  { month: "May", paid: 600, free: 350 },
  { month: "Jun", paid: 680, free: 280 },
  { month: "Jul", paid: 700, free: 300 },
  { month: "Aug", paid: 650, free: 320 },
  { month: "Sep", paid: 600, free: 350 },
  { month: "Oct", paid: 680, free: 400 },
  { month: "Nov", paid: 500, free: 380 },
  { month: "Dec", paid: 550, free: 420 },
]

export function UsersChart() {
  return (
    <ChartContainer
      config={{
        paid: {
          label: "Paid",
          color: "hsl(142, 76%, 36%)",
        },
        free: {
          label: "Free",
          color: "hsl(186, 83%, 61%)",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={usersData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
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
            content={<ChartTooltipContent className="bg-black text-white p-2 rounded-md shadow-lg" indicator="dot" />}
            cursor={false}
          />
          <Legend align="right" verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: 10 }} />
          <Bar dataKey="paid" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="free" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
