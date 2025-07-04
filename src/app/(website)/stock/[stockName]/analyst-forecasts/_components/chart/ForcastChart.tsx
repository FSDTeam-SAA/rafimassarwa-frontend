"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const ForcastChart = () => {
  // Combined data for visualization
  const chartData = [
    { month: "Jan 2024", price: 119 },
    { month: "Feb 2024", price: 122 },
    { month: "Mar 2024", price: 120 },
    { month: "Apr 2024", price: 123 },
    { month: "May 2024", price: 125 },
    { month: "Jun 2024", price: 227 },
    { month: "Jul 2024", price: 235 },
    { month: "Aug 2024", price: 335 },
    { month: "Sep 2024", price: 343 },
    { month: "Oct 2024", price: 435 },
    { month: "Nov 2024", price: 443 },
    { month: "Dec 2024", price: 351 },
    // Forecast data starts here - this is the transition point
    {
      month: "Dec 2024",
      forecast: true,
      price: 351,
      high: 351,
      average: 351,
      low: 351,
    },
    { month: "Jan 2025", forecast: true, high: 365, average: 355, low: 345 },
    { month: "Feb 2025", forecast: true, high: 380, average: 360, low: 330 },
    { month: "Mar 2025", forecast: true, high: 395, average: 365, low: 315 },
    { month: "Apr 2025", forecast: true, high: 410, average: 370, low: 300 },
    { month: "May 2025", forecast: true, high: 425, average: 375, low: 285 },
    { month: "Jun 2025", forecast: true, high: 440, average: 380, low: 270 },
    { month: "Jul 2025", forecast: true, high: 455, average: 385, low: 255 },
    { month: "Aug 2025", forecast: true, high: 470, average: 390, low: 240 },
    { month: "Sep 2025", forecast: true, high: 485, average: 395, low: 225 },
    { month: "Oct 2025", forecast: true, high: 500, average: 400, low: 210 },
    { month: "Nov 2025", forecast: true, high: 515, average: 405, low: 195 },
    { month: "Dec 2025", forecast: true, high: 525, average: 410, low: 188 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Chart container - takes 100% width */}
        <div className="h-[200px] flex-1 lg:col-span-4">
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
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleString("default", { month: "short" });
                  }}
                  tick={{ fontSize: 12 }}
                  interval={2}
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

        <div className="lg:col-span-2">
          <h1 className="font-medium mb-1">AAPL Earnings Forecast</h1>
          <p>
            Next quarter’s earnings estimate for AAPL is $1.61 with a range of
            $1.50 to $1.67. The previous quarter’s EPS was $2.40. AAPL beat its
            EPS estimate 100.00% of the time in the past 12 months, while its
            overall industry beat the EPS estimate 47.83% of the time in the
            same period. In the last calendar year AAPL has Outperformed its
            overall industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForcastChart;
