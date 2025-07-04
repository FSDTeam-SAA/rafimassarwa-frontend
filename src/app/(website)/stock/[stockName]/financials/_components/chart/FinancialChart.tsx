"use client"

import { Bar, CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis, ComposedChart, Tooltip } from "recharts"

interface DataPoint {
  year: string
  [key: string]: string | number
}

interface LegendItem {
  key: string
  label: string
  color: string
}

interface FinancialChartProps {
  data: DataPoint[]
  barKey1: string
  barKey2: string
  lineKey: string
  barColor1: string
  barColor2: string
  lineColor: string
  yAxisLabel?: string
  percentageAxis?: boolean
  legend: LegendItem[]
}

export default function FinancialChart({
  data,
  barKey1,
  barKey2,
  lineKey,
  barColor1,
  barColor2,
  lineColor,
  yAxisLabel = "",
  percentageAxis = false,
  legend,
}: FinancialChartProps) {
  // Find the maximum value for the y-axis
  const maxBarValue = Math.max(...data.map((item) => Math.max(Number(item[barKey1]), Number(item[barKey2]))))

  // Round up to the nearest 120B for the y-axis
  const yAxisMax = Math.ceil(maxBarValue / 120) * 120

  // Create ticks for the y-axis (0, 120B, 240B, 360B, 480B)
  const yAxisTicks = Array.from({ length: 5 }, (_, i) => i * 120)

  // Create percentage ticks for the right y-axis (20%, 22%, 24%, 26%, 28%)
  const percentageTicks = [20, 22, 24, 26, 28]

  // Format the tooltip value based on the key
  const formatTooltipValue = (value: number, key: string) => {
    if (key === lineKey) {
      return `${value.toFixed(1)}%`
    }
    return `${value}${yAxisLabel}`
  }

  // Custom tooltip formatter
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean
    payload?: { color: string; name: string; value: number; dataKey: string }[]
    label?: string
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: { color: string; name: string; value: number; dataKey: string }, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>
                {entry.name}: {formatTooltipValue(entry.value, entry.dataKey)}
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  // Custom legend
  const CustomLegend = () => (
    <div className="flex flex-wrap  gap-4 mt-4 text-sm">
      {legend.map((item, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            ticks={yAxisTicks}
            domain={[0, yAxisMax]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => (value === 0 ? `${value}` : `${value}${yAxisLabel}`)}
          />
          {percentageAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              ticks={percentageTicks}
              domain={[20, 28]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value} %`}
            />
          )}
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={barKey1}
            yAxisId="left"
            fill={barColor1}
            radius={[4, 4, 0, 0]}
            barSize={30}
            name={legend.find((item) => item.key === barKey1)?.label}
          />
          <Bar
            dataKey={barKey2}
            yAxisId="left"
            fill={barColor2}
            radius={[4, 4, 0, 0]}
            barSize={30}
            name={legend.find((item) => item.key === barKey2)?.label}
          />
          <Line
            type="monotone"
            dataKey={lineKey}
            yAxisId="right"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ fill: lineColor, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            name={legend.find((item) => item.key === lineKey)?.label}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  )
}
