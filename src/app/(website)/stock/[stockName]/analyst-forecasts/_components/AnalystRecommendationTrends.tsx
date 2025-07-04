"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

// Data for the chart and table - exactly matching the provided images
const monthlyData = [
  { month: "Apr '24", strongBuy: 0, buy: 65, hold: 25, sell: 10, strongSell: 0, total: 100 },
  { month: "May '24", strongBuy: 0, buy: 75, hold: 30, sell: 10, strongSell: 0, total: 115 },
  { month: "Jun '24", strongBuy: 0, buy: 95, hold: 30, sell: 10, strongSell: 0, total: 135 },
  { month: "Jul '24", strongBuy: 0, buy: 100, hold: 30, sell: 10, strongSell: 0, total: 140 },
  { month: "Aug '24", strongBuy: 0, buy: 90, hold: 25, sell: 10, strongSell: 0, total: 125 },
  { month: "Sep '24", strongBuy: 0, buy: 95, hold: 25, sell: 10, strongSell: 0, total: 130 },
  { month: "Oct '24", strongBuy: 0, buy: 100, hold: 30, sell: 10, strongSell: 0, total: 140 },
  { month: "Nov '24", strongBuy: 0, buy: 88, hold: 36, sell: 10, strongSell: 0, total: 134 },
  { month: "Dec '24", strongBuy: 0, buy: 63, hold: 28, sell: 7, strongSell: 0, total: 98 },
  { month: "Jan '25", strongBuy: 0, buy: 72, hold: 27, sell: 13, strongSell: 0, total: 112 },
  { month: "Feb '25", strongBuy: 0, buy: 60, hold: 19, sell: 14, strongSell: 0, total: 93 },
  { month: "Mar '25", strongBuy: 1, buy: 54, hold: 18, sell: 15, strongSell: 0, total: 88 },
]

// Table data (last 5 months) - exactly matching the provided table image
const tableColumns = ["Nov 24", "Dec 24", "Jan 25", "Feb 25", "Mar 25"]

export default function AnalystRecommendationTrends() {
  const [chartData, setChartData] = useState(monthlyData)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth)

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update chart data based on screen size
  useEffect(() => {
    if (windowWidth < 768) {
      setChartData(monthlyData.slice(-6))
    } else {
      setChartData(monthlyData)
    }
  }, [windowWidth])

  return (
    <div className="w-full border border-gray-300 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 md:pt-6 pb-0">
        <h1 className="text-xl md:text-2xl font-bold mb-6">AAPL Analyst Recommendation Trends</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Section */}
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tickMargin={10}
                />
                <YAxis domain={[0, 200]} />
                <Tooltip />
                {/* Blue at bottom, then gray, then green at top */}
                <Bar dataKey="sell" stackId="stack" fill="#3498db" name="Sell" />
                <Bar dataKey="strongSell" stackId="stack" fill="#1a5276" name="Strong Sell" />
                <Bar dataKey="hold" stackId="stack" fill="#555555" name="Hold" />
                <Bar dataKey="buy" stackId="stack" fill="#2ecc71" name="Buy" />
                <Bar dataKey="strongBuy" stackId="stack" fill="#1e7c3a" name="Strong Buy" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table
                  className="min-w-full divide-y divide-gray-200"
                  style={{ borderCollapse: "separate", borderSpacing: 0 }}
                >
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-r border-gray-200 rounded-tl-lg">
                        Rating
                      </th>
                      {tableColumns.map((column, index) => (
                        <th
                          key={column}
                          className={`px-4 py-2 text-center text-sm font-medium text-gray-700 border-b border-r border-gray-200 ${
                            index === tableColumns.length - 1 ? "rounded-tr-lg border-r-0" : ""
                          }`}
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#1e7c3a] mr-2"></div>
                          <span>Strong Buy</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">0</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">0</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">0</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">0</td>
                      <td className="px-4 py-2 text-center">1</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#2ecc71] mr-2"></div>
                          <span>Buy</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">88</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">63</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">72</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">60</td>
                      <td className="px-4 py-2 text-center">54</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#555555] mr-2"></div>
                          <span>Hold</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">36</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">28</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">27</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">19</td>
                      <td className="px-4 py-2 text-center">18</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#3498db] mr-2"></div>
                          <span>Sell</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">10</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">7</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">13</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">14</td>
                      <td className="px-4 py-2 text-center">15</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-[#1a5276] mr-2"></div>
                          <span>Strong Sell</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">0</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">0</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">0</td>
                      <td className="px-4 py-2 text-center border-r border-gray-200">0</td>
                      <td className="px-4 py-2 text-center">0</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 font-medium border-r border-gray-200 rounded-bl-lg">Total</td>
                      <td className="px-4 py-2 text-center font-medium border-r border-gray-200">134</td>
                      <td className="px-4 py-2 text-center font-medium border-r border-gray-200">98</td>
                      <td className="px-4 py-2 text-center font-medium border-r border-gray-200">112</td>
                      <td className="px-4 py-2 text-center font-medium border-r border-gray-200">93</td>
                      <td className="px-4 py-2 text-center font-medium rounded-br-lg">88</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-6 p-4 bg-[#f5f5f5] rounded-md text-sm md:text-base">
          <p>
            In the current month, AAPL has received <strong>55 Buy</strong> Ratings, <strong>18 Hold</strong> Ratings,
            and <strong>15 Sell</strong> Ratings. AAPL average Analyst price target in the past 3 months is{" "}
            <strong>$249.88</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
