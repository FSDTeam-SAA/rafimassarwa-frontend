"use client";

import { useState, useMemo } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";

// Sample data structure
type DataItem = {
  date: string;
  bullishArticles?: number;
  neutralArticles?: number;
  bearishArticles?: number;
  price?: number;
};

const originalData: DataItem[] = [
  {
    date: "6 Jan",
    bullishArticles: 0,
    neutralArticles: 110,
    bearishArticles: 0,
    price: 240,
  },
  {
    date: "13 Jan",
    bullishArticles: 0,
    neutralArticles: 130,
    bearishArticles: 0,
    price: 235,
  },
  {
    date: "20 Jan",
    bullishArticles: 20,
    neutralArticles: 180,
    bearishArticles: 0,
    price: 225,
  },
  {
    date: "27 Jan",
    bullishArticles: 0,
    neutralArticles: 300,
    bearishArticles: 0,
    price: 215,
  },
  {
    date: "3 Feb",
    bullishArticles: 0,
    neutralArticles: 190,
    bearishArticles: 0,
    price: 230,
  },
  {
    date: "10 Feb",
    bullishArticles: 0,
    neutralArticles: 200,
    bearishArticles: 10,
    price: 228,
  },
  {
    date: "17 Feb",
    bullishArticles: 0,
    neutralArticles: 180,
    bearishArticles: 0,
    price: 238,
  },
  {
    date: "24 Feb",
    bullishArticles: 0,
    neutralArticles: 180,
    bearishArticles: 0,
    price: 245,
  },
  {
    date: "3 Mar",
    bullishArticles: 0,
    neutralArticles: 170,
    bearishArticles: 0,
    price: 240,
  },
  {
    date: "10 Mar",
    bullishArticles: 0,
    neutralArticles: 190,
    bearishArticles: 0,
    price: 235,
  },
  {
    date: "17 Mar",
    bullishArticles: 0,
    neutralArticles: 140,
    bearishArticles: 0,
    price: 220,
  },
  {
    date: "24 Mar",
    bullishArticles: 0,
    neutralArticles: 50,
    bearishArticles: 0,
    price: 225,
  },
];

// Define the series colors for consistency
const seriesColors = {
  price: "#f97316",
  bullishArticles: "#14b8a6",
  neutralArticles: "#22c55e",
  bearishArticles: "#3b82f6",
};

export default function MediaCoverageChart() {
  // State to track which data series are visible
  const [visibleSeries, setVisibleSeries] = useState({
    price: true,
    bullishArticles: true,
    neutralArticles: true,
    bearishArticles: true,
  });

  // Create a custom legend component
  const CustomLegend = () => {
    return (
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => toggleSeries("price")}
        >
          <div
            className="w-4 h-4"
            style={{ backgroundColor: seriesColors.price }}
          />
          <span className="text-sm">Price</span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => toggleSeries("bullishArticles")}
        >
          <div
            className="w-4 h-4"
            style={{ backgroundColor: seriesColors.bullishArticles }}
          />
          <span className="text-sm">Bullish Articles</span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => toggleSeries("neutralArticles")}
        >
          <div
            className="w-4 h-4"
            style={{ backgroundColor: seriesColors.neutralArticles }}
          />
          <span className="text-sm">Neutral Articles</span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => toggleSeries("bearishArticles")}
        >
          <div
            className="w-4 h-4"
            style={{ backgroundColor: seriesColors.bearishArticles }}
          />
          <span className="text-sm">Bearish Articles</span>
        </div>
      </div>
    );
  };

  // Toggle visibility of a data series
  const toggleSeries = (series: keyof typeof visibleSeries) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [series]: !prev[series],
    }));
  };

  // Create a filtered version of the data based on visible series
  const chartData = useMemo(() => {
    return originalData.map((item) => {
      const newItem = { ...item };

      // For each series, set to undefined if not visible
      // This effectively removes it from the chart while keeping the structure
      if (!visibleSeries.price) {
        newItem.price = undefined;
      }
      if (!visibleSeries.bullishArticles) {
        newItem.bullishArticles = undefined;
      }
      if (!visibleSeries.neutralArticles) {
        newItem.neutralArticles = undefined;
      }
      if (!visibleSeries.bearishArticles) {
        newItem.bearishArticles = undefined;
      }

      return newItem;
    });
  }, [visibleSeries]);

  return (
    <div>
      <h1 className="font-medium mb-2 text-xl">Media Coverage Analysis</h1>
      <div className="space-y-2 shadow-[0px_0px_8px_0px_#00000029] py-4">
        <div className="flex justify-between px-6">
          <div className="text-sm font-medium">Articles</div>
          <div className="text-sm font-medium">Price</div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tickLine={false} />
              <YAxis
                yAxisId="left"
                orientation="left"
                domain={[0, 400]}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[209.5, 247.5]}
                tickFormatter={(value) => `$${value}`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "price") return [`$${value}`, "Price"];
                  if (name === "bullishArticles")
                    return [value, "Bullish Articles"];
                  if (name === "neutralArticles")
                    return [value, "Neutral Articles"];
                  if (name === "bearishArticles")
                    return [value, "Bearish Articles"];
                  return [value, name];
                }}
              />

              {/* Always render the Bar components, but they'll only show data if it's defined */}
              <Bar
                yAxisId="left"
                dataKey="bullishArticles"
                name="Bullish Articles"
                stackId="a"
                fill={seriesColors.bullishArticles}
              />
              <Bar
                yAxisId="left"
                dataKey="neutralArticles"
                name="Neutral Articles"
                stackId="a"
                fill={seriesColors.neutralArticles}
              />
              <Bar
                yAxisId="left"
                dataKey="bearishArticles"
                name="Bearish Articles"
                stackId="a"
                fill={seriesColors.bearishArticles}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="price"
                name="Price"
                stroke={seriesColors.price}
                dot={{ r: 4, fill: seriesColors.price }}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Custom legend outside of the chart */}
        <CustomLegend />
      </div>
    </div>
  );
}
