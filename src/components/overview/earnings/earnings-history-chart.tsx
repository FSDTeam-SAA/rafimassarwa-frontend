"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// EPS data
const epsData = {
    quarters: ["Q4 2023", "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025"],
    estimated_eps: [1.35, 1.18, 1.42, 2.05, 1.5, 1.3, 1.55],
    reported_eps: [1.45, 1.15, 1.38, 2.15, 1.48, 1.33, 1.78],
}

// Revenue data (in billions)
const revenueData = {
    quarters: ["Q4 2023", "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025"],
    estimated_revenue: [89.5, 117.2, 90.8, 81.7, 93.2, 121.5, 94.8],
    reported_revenue: [90.1, 119.6, 90.3, 82.1, 94.0, 123.9, 135.8],
}

// Format EPS data for the chart
const epsChartData = epsData.quarters.map((quarter, index) => ({
    quarter,
    estimated: epsData.estimated_eps[index],
    reported: epsData.reported_eps[index],
}))

// Format Revenue data for the chart
const revenueChartData = revenueData.quarters.map((quarter, index) => ({
    quarter,
    estimated: revenueData.estimated_revenue[index],
    reported: revenueData.reported_revenue[index],
}))

export default function EarningsHistoryChart() {
    const [activeTab, setActiveTab] = useState("earnings")
    const [showEstimatedEps, setShowEstimatedEps] = useState(true)
    const [showReportedEps, setShowReportedEps] = useState(true)
    const [showEstimatedRevenue, setShowEstimatedRevenue] = useState(true)
    const [showReportedRevenue, setShowReportedRevenue] = useState(true)

    // Find the maximum value for EPS chart
    const maxEpsValue = Math.max(
        ...epsData.estimated_eps,
        ...(epsData.reported_eps.filter((val) => val !== null) as number[]),
    )
    const epsYAxisMax = Math.ceil(maxEpsValue) + 1

    // Find the maximum value for Revenue chart
    const maxRevenueValue = Math.max(
        ...revenueData.estimated_revenue,
        ...(revenueData.reported_revenue.filter((val) => val !== null) as number[]),
    )
    const revenueYAxisMax = Math.ceil(maxRevenueValue / 10) * 10 + 20

    return (
        <div className="w-full bg-white rounded-lg">
            <h1 className="text-xl font-bold mb-4">Apple (AAPL) Earnings, Revenues Date & History</h1>
            <div className="shadow-[0px_0px_10px_1px_#0000001A]">
                <div className="p-4 pb-0">
                    <Tabs defaultValue="earnings" onValueChange={setActiveTab}>
                        <TabsList className="border-b w-full justify-start rounded-none h-auto p-0 mb-4 bg-transparent">
                            <TabsTrigger
                                value="earnings"
                                className={`rounded-none px-6 py-2 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:shadow-none font-semibold ${activeTab === "earnings" ? "text-black" : "text-gray-500"}`}
                            >
                                Earnings
                            </TabsTrigger>
                            <TabsTrigger
                                value="revenues"
                                className={`rounded-none px-6 py-2 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:shadow-none font-semibold ${activeTab === "revenues" ? "text-black" : "text-gray-500"}`}
                            >
                                Revenues
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="earnings" className="mt-0">
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={epsChartData} margin={{ top: 20, right: 5, left: 2, bottom: 20 }} barGap={0}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="quarter" axisLine={{ stroke: "#333", strokeWidth: 1 }} tickLine={false} />
                                        <YAxis
                                            domain={[0, epsYAxisMax]}
                                            tickFormatter={(value) => `$${value.toFixed(2)}`}
                                            axisLine={{ stroke: "#333", strokeWidth: 1 }}
                                            tickLine={false}
                                        />
                                        <Tooltip
                                            formatter={(value) => [`$${Number(value).toFixed(2)}`, ""]}
                                            cursor={{ fill: "transparent" }}
                                        />
                                        {showEstimatedEps && (
                                            <Bar dataKey="estimated" name="Estimated EPS" fill="rgba(34, 197, 94, 0.2)" radius={[2, 2, 0, 0]} />
                                        )}
                                        {showReportedEps && (
                                            <Bar dataKey="reported" name="Reported EPS" fill="rgb(34, 197, 94)" radius={[2, 2, 0, 0]} />
                                        )}
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="flex items-center justify-start gap-6 mt-1">
                                    <button
                                        onClick={() => setShowEstimatedEps(!showEstimatedEps)}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <div
                                            className={`w-4 h-4 bg-[rgba(34,197,94,0.2)] ${showEstimatedEps ? "opacity-100" : "opacity-40"}`}
                                        ></div>
                                        <span className={showEstimatedEps ? "opacity-100" : "opacity-70 line-through"}>Estimated EPS</span>
                                    </button>
                                    <button
                                        onClick={() => setShowReportedEps(!showReportedEps)}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <div
                                            className={`w-4 h-4 bg-[rgb(34,197,94)] ${showReportedEps ? "opacity-100" : "opacity-40"}`}
                                        ></div>
                                        <span className={showReportedEps ? "opacity-100" : "line-through opacity-70"}>Reported EPS</span>
                                    </button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="revenues" className="mt-0">
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={revenueChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barGap={0}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="quarter" axisLine={{ stroke: "#333", strokeWidth: 1 }} tickLine={false} />
                                        <YAxis
                                            domain={[0, revenueYAxisMax]}
                                            tickFormatter={(value) => `$${value}B`}
                                            axisLine={{ stroke: "#333", strokeWidth: 1 }}
                                            tickLine={false}
                                        />
                                        <Tooltip
                                            formatter={(value) => [`$${Number(value).toFixed(1)}B`, ""]}
                                            cursor={{ fill: "transparent" }}
                                        />
                                        {showEstimatedRevenue && (
                                            <Bar
                                                dataKey="estimated"
                                                name="Estimated Revenue"
                                                fill="rgba(34, 197, 94, 0.2)"
                                                radius={[2, 2, 0, 0]}
                                            />
                                        )}
                                        {showReportedRevenue && (
                                            <Bar dataKey="reported" name="Reported Revenue" fill="rgb(34, 197, 94)" radius={[2, 2, 0, 0]} />
                                        )}
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="flex items-center justify-start gap-6 mt-4">
                                    <button
                                        onClick={() => setShowEstimatedRevenue(!showEstimatedRevenue)}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <div
                                            className={`w-4 h-4 bg-[rgba(34,197,94,0.2)] ${showEstimatedRevenue ? "opacity-100" : "opacity-40"}`}
                                        ></div>
                                        <span className={showEstimatedRevenue ? "opacity-100" : "opacity-70 line-through"}>Estimated Revenue</span>
                                    </button>
                                    <button
                                        onClick={() => setShowReportedRevenue(!showReportedRevenue)}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <div
                                            className={`w-4 h-4 bg-[rgb(34,197,94)] ${showReportedRevenue ? "opacity-100" : "opacity-40"}`}
                                        ></div>
                                        <span className={showReportedRevenue ? "opacity-100" : "opacity-70 line-through"}>Reported Revenue</span>
                                    </button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="bg-gray-100 p-4 text-gray-600 text-sm mt-12">
                    <p>The upcoming earnings date is based on a company&apos;s previous reporting.</p>
                </div>
            </div>
        </div>
    )
}
