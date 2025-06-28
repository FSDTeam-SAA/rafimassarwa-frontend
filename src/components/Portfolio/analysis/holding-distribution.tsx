"use client"

import * as React from "react"
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartTooltip } from "@/components/ui/chart"
import { useSession } from "next-auth/react"
import { usePortfolio } from "../portfolioContext"
import { useMutation } from "@tanstack/react-query"

// Define types for our data
type HoldingItem = {
    name: string
    ticker?: string
    percentage: number
    color: string
    count: number
}

// Sample data for different views
const sectorData: HoldingItem[] = [{ name: "Technology", percentage: 100, color: "#2695FF", count: 1 }]

const marketCapData: HoldingItem[] = [{ name: "Large Cap", percentage: 100, color: "#2695FF", count: 1 }]

const dividendData: HoldingItem[] = [{ name: "Dividend Paying", percentage: 100, color: "#2695FF", count: 1 }]

const betaData: HoldingItem[] = [{ name: "High Beta", percentage: 100, color: "#2695FF", count: 1 }]

const peRatioData: HoldingItem[] = [{ name: "Growth", percentage: 100, color: "#2695FF", count: 1 }]

// Stock holdings data
type StockHolding = {
    id: number
    name: string
    ticker: string
    percentage: number
    sector: string
}

const stockHoldings: StockHolding[] = [
    {
        id: 1,
        name: "Apple",
        ticker: "AAPL",
        percentage: 100,
        sector: "Technology",
    },
]

type TabType = "sector" | "marketCap" | "dividend" | "beta" | "peRatio"

export function HoldingsDistribution() {
    const [activeTab, setActiveTab] = React.useState<TabType>("sector")

    const { data: session } = useSession()
    const { selectedPortfolioId } = usePortfolio()

    const { mutate: getAssetAllocation, data: assetAllocation } = useMutation({
        mutationFn: async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/portfolio/allocation?portfolioId=${selectedPortfolioId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session?.user?.accessToken}`,
                    },
                }
            )
            return response.json()
        },
    })


    // Get the appropriate data based on active tab
    const getChartConfig = () => {
        switch (activeTab) {
            case "sector":
                return {
                    data: sectorData,
                    label: `${stockHoldings.length}\nHoldings`,
                    title: "Major Holdings: Technology",
                }
            case "marketCap":
                return {
                    data: marketCapData,
                    label: `${stockHoldings.length}\nHoldings`,
                    title: "Major Holdings: Large Cap",
                }
            case "dividend":
                return {
                    data: dividendData,
                    label: `${stockHoldings.length}\nHoldings`,
                    title: "Major Holdings: Dividend Paying",
                }
            case "beta":
                return {
                    data: betaData,
                    label: `${stockHoldings.length}\nHoldings`,
                    title: "Major Holdings: High Beta",
                }
            case "peRatio":
                return {
                    data: peRatioData,
                    label: `${stockHoldings.length}\nHoldings`,
                    title: "Major Holdings: Growth",
                }
            default:
                return {
                    data: sectorData,
                    label: `${stockHoldings.length}\nHoldings`,
                    title: "Major Holdings: Technology",
                }
        }
    }

    const { data, title } = getChartConfig()

    // Filter stocks based on active tab
    const getFilteredStocks = () => {
        // In a real app, you would filter based on the active tab
        // For this example, we'll just return all stocks
        return stockHoldings
    }

    const filteredStocks = getFilteredStocks()

    return (
        <Card className="w-full overflow-hidden shadow-[0px_0px_10px_1px_#0000001A]">
            <div className="relative hidden md:block">
                <div
                    className="absolute top-0 left-12 h-2 bg-green-500 lg:w-36 w-24"
                    style={{
                        transform:
                            activeTab === "sector"
                                ? "translateX(0)"
                                : activeTab === "marketCap"
                                    ? "translateX(140%)"
                                    : activeTab === "dividend"
                                        ? "translateX(270%)"
                                        : activeTab === "beta"
                                            ? "translateX(410%)"
                                            : "translateX(540%)",
                        transition: "transform 0.3s ease",
                    }}
                ></div>
            </div>
            <div className="px-4 py-2">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="w-full">
                    <TabsList className="grid grid-cols-3 md:grid-cols-5 h-auto rounded-none bg-transparent">
                        <TabsTrigger
                            value="sector"
                            className={cn(
                                "py-2 px-1 text-xs font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            By Sector
                        </TabsTrigger>
                        <TabsTrigger
                            value="marketCap"
                            className={cn(
                                "py-2 px-1 text-xs font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            By Market Cap
                        </TabsTrigger>
                        <TabsTrigger
                            value="dividend"
                            className={cn(
                                "py-2 px-1 text-xs font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            By Dividend
                        </TabsTrigger>
                        <TabsTrigger
                            value="beta"
                            className={cn(
                                "py-2 px-1 text-xs font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            By Beta
                        </TabsTrigger>
                        <TabsTrigger
                            value="peRatio"
                            className={cn(
                                "py-2 px-1 text-xs font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            By P/E Ratio
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                    {/* Chart and Legend */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="percentage"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        stroke="#fff"
                                        strokeWidth={2}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip
                                        /* eslint-disable @typescript-eslint/no-explicit-any */
                                        formatter={(value: any) => [`${value}%`, "Percentage"]}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload
                                                return (
                                                    <div className="bg-white p-2 border rounded shadow-sm">
                                                        <p className="font-medium">{data.name}</p>
                                                        <p>{`${data.percentage}% (${data.count})`}</p>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Legend */}
                        <div className="mt-4">
                            <ul className="space-y-2">
                                {data.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-4 h-4 flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-black text-sm">
                                            {item.percentage}% {item.name} ({item.count})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Holdings Table */}
                    <div className="w-full md:w-1/2">
                        <h3 className="font-semibold mb-3">{title}</h3>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 font-medium text-sm">Name</th>
                                    <th className="text-left py-2 font-medium text-sm">% of Portfolio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStocks.map((stock) => (
                                    <tr key={stock.id} className="border-b">
                                        <td className="py-2 text-sm">
                                            {stock.id}. {stock.name} (
                                            <Link href={`#${stock.ticker}`} className="text-blue-500 hover:underline">
                                                {stock.ticker}
                                            </Link>
                                            )
                                        </td>
                                        <td className="py-2 text-sm">% of Portfolio</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
