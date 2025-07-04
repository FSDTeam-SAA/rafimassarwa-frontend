"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import {
    LineChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
} from "recharts"
import { cn } from "@/lib/utils"

// Define types for financial data
type QuarterData = {
    quarter: string
}

type IncomeStatementData = QuarterData & {
    revenue: number
    earnings: number
    profitMargin: number
}

type BalanceSheetData = QuarterData & {
    assets: number
    liabilities: number
    debtToAssets: number
}

type CashFlowData = QuarterData & {
    operating: number
    investing: number
    financing: number
}

// Dummy data for Income Statement
const incomeStatementData: IncomeStatementData[] = [
    { quarter: "Q1'19", revenue: 84, earnings: 20, profitMargin: 24 },
    { quarter: "Q2'19", revenue: 58, earnings: 12, profitMargin: 20 },
    { quarter: "Q3'19", revenue: 62, earnings: 10, profitMargin: 18 },
    { quarter: "Q4'19", revenue: 60, earnings: 12, profitMargin: 18 },
    { quarter: "Q1'20", revenue: 110, earnings: 28, profitMargin: 25 },
    { quarter: "Q2'20", revenue: 85, earnings: 22, profitMargin: 26 },
    { quarter: "Q3'20", revenue: 80, earnings: 20, profitMargin: 25 },
    { quarter: "Q4'20", revenue: 80, earnings: 20, profitMargin: 25 },
    { quarter: "Q1'21", revenue: 120, earnings: 32, profitMargin: 27 },
    { quarter: "Q2'21", revenue: 95, earnings: 25, profitMargin: 26 },
    { quarter: "Q3'21", revenue: 110, earnings: 28, profitMargin: 24 },
    { quarter: "Q4'21", revenue: 80, earnings: 20, profitMargin: 23 },
    { quarter: "Q1'22", revenue: 90, earnings: 22, profitMargin: 24 },
    { quarter: "Q2'22", revenue: 120, earnings: 30, profitMargin: 25 },
    { quarter: "Q3'22", revenue: 90, earnings: 22, profitMargin: 24 },
    { quarter: "Q4'22", revenue: 80, earnings: 20, profitMargin: 25 },
    { quarter: "Q1'23", revenue: 85, earnings: 22, profitMargin: 26 },
    { quarter: "Q2'23", revenue: 118, earnings: 30, profitMargin: 28 },
    { quarter: "Q3'23", revenue: 90, earnings: 22, profitMargin: 25 },
    { quarter: "Q4'23", revenue: 85, earnings: 20, profitMargin: 24 },
    { quarter: "Q1'24", revenue: 90, earnings: 22, profitMargin: 25 },
    { quarter: "Q2'24", revenue: 125, earnings: 32, profitMargin: 28 },
    { quarter: "Q3'24", revenue: 45, earnings: 8, profitMargin: 15 },
    { quarter: "Q4'24", revenue: 90, earnings: 22, profitMargin: 25 },
    { quarter: "Q1'25", revenue: 125, earnings: 35, profitMargin: 28 },
    { quarter: "Q2'25", revenue: 90, earnings: 22, profitMargin: 25 },
]

// Dummy data for Balance Sheet
const balanceSheetData: BalanceSheetData[] = [
    { quarter: "Q1'19", assets: 320, liabilities: 240, debtToAssets: 74 },
    { quarter: "Q2'19", assets: 310, liabilities: 240, debtToAssets: 76 },
    { quarter: "Q3'19", assets: 300, liabilities: 240, debtToAssets: 78 },
    { quarter: "Q4'19", assets: 310, liabilities: 250, debtToAssets: 80 },
    { quarter: "Q1'20", assets: 320, liabilities: 260, debtToAssets: 80 },
    { quarter: "Q2'20", assets: 330, liabilities: 260, debtToAssets: 79 },
    { quarter: "Q3'20", assets: 340, liabilities: 270, debtToAssets: 80 },
    { quarter: "Q4'20", assets: 350, liabilities: 280, debtToAssets: 80 },
    { quarter: "Q1'21", assets: 340, liabilities: 270, debtToAssets: 81 },
    { quarter: "Q2'21", assets: 330, liabilities: 260, debtToAssets: 83 },
    { quarter: "Q3'21", assets: 340, liabilities: 270, debtToAssets: 85 },
    { quarter: "Q4'21", assets: 350, liabilities: 280, debtToAssets: 82 },
    { quarter: "Q1'22", assets: 340, liabilities: 270, debtToAssets: 81 },
    { quarter: "Q2'22", assets: 330, liabilities: 260, debtToAssets: 82 },
    { quarter: "Q3'22", assets: 340, liabilities: 270, debtToAssets: 83 },
    { quarter: "Q4'22", assets: 350, liabilities: 280, debtToAssets: 82 },
    { quarter: "Q1'23", assets: 340, liabilities: 270, debtToAssets: 80 },
    { quarter: "Q2'23", assets: 330, liabilities: 260, debtToAssets: 79 },
    { quarter: "Q3'23", assets: 340, liabilities: 270, debtToAssets: 78 },
    { quarter: "Q4'23", assets: 350, liabilities: 280, debtToAssets: 84 },
    { quarter: "Q1'24", assets: 340, liabilities: 270, debtToAssets: 82 },
    { quarter: "Q2'24", assets: 330, liabilities: 260, debtToAssets: 80 },
    { quarter: "Q3'24", assets: 340, liabilities: 270, debtToAssets: 81 },
    { quarter: "Q4'24", assets: 350, liabilities: 280, debtToAssets: 80 },
    { quarter: "Q1'25", assets: 340, liabilities: 270, debtToAssets: 81 },
    { quarter: "Q2'25", assets: 330, liabilities: 260, debtToAssets: 80 },
]

// Dummy data for Cash Flow
const cashFlowData: CashFlowData[] = [
    { quarter: "Q1'19", operating: 30, investing: -12, financing: -25 },
    { quarter: "Q2'19", operating: 15, investing: 10, financing: -18 },
    { quarter: "Q3'19", operating: 18, investing: -5, financing: -15 },
    { quarter: "Q4'19", operating: 20, investing: 8, financing: -20 },
    { quarter: "Q1'20", operating: 25, investing: -8, financing: -18 },
    { quarter: "Q2'20", operating: 18, investing: 5, financing: -15 },
    { quarter: "Q3'20", operating: 40, investing: -10, financing: -30 },
    { quarter: "Q4'20", operating: 22, investing: 5, financing: -20 },
    { quarter: "Q1'21", operating: 20, investing: -8, financing: -18 },
    { quarter: "Q2'21", operating: 48, investing: 5, financing: -25 },
    { quarter: "Q3'21", operating: 28, investing: -12, financing: -30 },
    { quarter: "Q4'21", operating: 25, investing: 5, financing: -25 },
    { quarter: "Q1'22", operating: 35, investing: -12, financing: -28 },
    { quarter: "Q2'22", operating: 25, investing: 0, financing: -25 },
    { quarter: "Q3'22", operating: 22, investing: 0, financing: -20 },
    { quarter: "Q4'22", operating: 32, investing: 3, financing: -28 },
    { quarter: "Q1'23", operating: 28, investing: 2, financing: -25 },
    { quarter: "Q2'23", operating: 25, investing: 3, financing: -22 },
    { quarter: "Q3'23", operating: 20, investing: 3, financing: -30 },
    { quarter: "Q4'23", operating: 40, investing: 2, financing: -25 },
    { quarter: "Q1'24", operating: 22, investing: 1, financing: -35 },
    { quarter: "Q2'24", operating: 40, investing: 2, financing: -25 },
    { quarter: "Q3'24", operating: 28, investing: 10, financing: -28 },
    { quarter: "Q4'24", operating: 25, investing: 3, financing: -30 },
    { quarter: "Q1'25", operating: 30, investing: 5, financing: -25 },
    { quarter: "Q2'25", operating: 25, investing: 3, financing: -28 },
]

export default function FinancialDashboard() {
    const [activeTab, setActiveTab] = useState("income")
    const [isMounted, setIsMounted] = useState(false)

    // Visibility state for each data series
    const [incomeVisibility, setIncomeVisibility] = useState({
        revenue: true,
        earnings: true,
        profitMargin: true,
    })

    const [balanceVisibility, setBalanceVisibility] = useState({
        assets: true,
        liabilities: true,
        debtToAssets: true,
    })

    const [cashFlowVisibility, setCashFlowVisibility] = useState({
        operating: true,
        investing: true,
        financing: true,
    })

    // Handle client-side only rendering for recharts
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Format large numbers with B for billions
    const formatYAxis = (value: number) => {
        return `${value}B`
    }

    // Format percentage for ratios
    const formatPercentage = (value: number) => {
        return `${value} %`
    }

    // Toggle visibility for Income Statement data series
    const toggleIncomeVisibility = (key: keyof typeof incomeVisibility) => {
        setIncomeVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }

    // Toggle visibility for Balance Sheet data series
    const toggleBalanceVisibility = (key: keyof typeof balanceVisibility) => {
        setBalanceVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }

    // Toggle visibility for Cash Flow data series
    const toggleCashFlowVisibility = (key: keyof typeof cashFlowVisibility) => {
        setCashFlowVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
        }))
    }


    // Custom tooltip for Income Statement
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const IncomeTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">{label}</p>
                    {/* eslint-disable @typescript-eslint/no-explicit-any */}
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {entry.name === "Profit Margin" ? `${entry.value}%` : `$${entry.value}B`}
                        </p>
                    ))}
                </div>
            )
        }
        return null
    }

    // Custom tooltip for Balance Sheet
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const BalanceTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            // const date = new Date()
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">Mar 31, 2022</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}:{" "}
                            {entry.name === "Debt to Assets" ? `${entry.value.toFixed(2)}%` : `$${entry.value.toFixed(2)}B`}
                        </p>
                    ))}
                </div>
            )
        }
        return null
    }

    // Custom tooltip for Cash Flow
    const CashFlowTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                    <p className="font-medium">Sep 30, 2022</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: ${entry.value.toFixed(2)}B
                        </p>
                    ))}
                </div>
            )
        }
        return null
    }

    // Custom legend for Income Statement
    const IncomeLegend = () => {
        return (
            <div className="flex justify-center mt-4 space-x-6">
                <button
                    className={`flex items-center ${!incomeVisibility.revenue ? "opacity-50" : ""}`}
                    onClick={() => toggleIncomeVisibility("revenue")}
                >
                    <div className="w-4 h-4 bg-[#2196F3] mr-2"></div>
                    <span>Revenue</span>
                </button>
                <button
                    className={`flex items-center ${!incomeVisibility.earnings ? "opacity-50" : ""}`}
                    onClick={() => toggleIncomeVisibility("earnings")}
                >
                    <div className="w-4 h-4 bg-[#90CAF9] mr-2"></div>
                    <span>Earnings</span>
                </button>
                <button
                    className={`flex items-center ${!incomeVisibility.profitMargin ? "opacity-50" : ""}`}
                    onClick={() => toggleIncomeVisibility("profitMargin")}
                >
                    <div className="w-4 h-4 bg-[#FF9800] mr-2"></div>
                    <span>Profit Margin</span>
                </button>
            </div>
        )
    }

    // Custom legend for Balance Sheet
    const BalanceLegend = () => {
        return (
            <div className="flex justify-center mt-4 space-x-6">
                <button
                    className={`flex items-center ${!balanceVisibility.assets ? "opacity-50" : ""}`}
                    onClick={() => toggleBalanceVisibility("assets")}
                >
                    <div className="w-4 h-4 bg-[#2196F3] mr-2"></div>
                    <span>Assets</span>
                </button>
                <button
                    className={`flex items-center ${!balanceVisibility.liabilities ? "opacity-50" : ""}`}
                    onClick={() => toggleBalanceVisibility("liabilities")}
                >
                    <div className="w-4 h-4 bg-[#E91E63] mr-2"></div>
                    <span>Liabilities</span>
                </button>
                <button
                    className={`flex items-center ${!balanceVisibility.debtToAssets ? "opacity-50" : ""}`}
                    onClick={() => toggleBalanceVisibility("debtToAssets")}
                >
                    <div className="w-4 h-4 bg-[#FF9800] mr-2"></div>
                    <span>Debt to Assets</span>
                </button>
            </div>
        )
    }

    // Custom legend for Cash Flow
    const CashFlowLegend = () => {
        return (
            <div className="flex justify-center mt-4 space-x-6">
                <button
                    className={`flex items-center ${!cashFlowVisibility.operating ? "opacity-50" : ""}`}
                    onClick={() => toggleCashFlowVisibility("operating")}
                >
                    <div className="w-4 h-4 bg-[#9E9E9E] mr-2"></div>
                    <span>Operating</span>
                </button>
                <button
                    className={`flex items-center ${!cashFlowVisibility.investing ? "opacity-50" : ""}`}
                    onClick={() => toggleCashFlowVisibility("investing")}
                >
                    <div className="w-4 h-4 bg-[#9C27B0] mr-2"></div>
                    <span>Investing</span>
                </button>
                <button
                    className={`flex items-center ${!cashFlowVisibility.financing ? "opacity-50" : ""}`}
                    onClick={() => toggleCashFlowVisibility("financing")}
                >
                    <div className="w-4 h-4 bg-[#03A9F4] mr-2"></div>
                    <span>Financing</span>
                </button>
            </div>
        )
    }

    return (
        <Card className="w-full shadow-sm">
            <Tabs defaultValue="income" onValueChange={setActiveTab}>
                <div className="relative">
                    <div
                        className="absolute top-0 left-0 h-1.5 bg-orange-500"
                        style={{
                            width: "33.33%",
                            transform:
                                activeTab === "income"
                                    ? "translateX(0)"
                                    : activeTab === "balance"
                                        ? "translateX(100%)"
                                        : "translateX(200%)",
                            transition: "transform 0.3s ease",
                        }}
                    ></div>

                    <TabsList className="grid w-full grid-cols-3 h-auto rounded-none bg-transparent">
                        <TabsTrigger
                            value="income"
                            className={cn(
                                "py-3 sm:py-4 px-2 text-sm sm:text-base font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            Income Statement
                        </TabsTrigger>
                        <TabsTrigger
                            value="balance"
                            className={cn(
                                "py-3 sm:py-4 px-2 text-sm sm:text-base font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            Balance Sheet
                        </TabsTrigger>
                        <TabsTrigger
                            value="cashflow"
                            className={cn(
                                "py-3 sm:py-4 px-2 text-sm sm:text-base font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            Cash Flow
                        </TabsTrigger>
                    </TabsList>
                </div>

                <CardContent className="p-4">
                    <TabsContent value="income" className="mt-0">
                        <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Earnings</div>
                            <div className="text-sm font-medium">Profit Margin</div>
                        </div>

                        <div className="w-[100vw] md:w-full h-[300px]">
                            {isMounted ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={incomeStatementData} margin={{ top: 5, right: 30, left: 20, bottom: 70 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis
                                            dataKey="quarter"
                                            tick={{ fontSize: 10 }}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                            height={70}
                                        />
                                        <YAxis yAxisId="left" tickFormatter={formatYAxis} domain={[0, 160]} />
                                        <YAxis yAxisId="right" orientation="right" tickFormatter={formatPercentage} domain={[10, 30]} />
                                        <Tooltip content={<IncomeTooltip />} />
                                        {incomeVisibility.revenue && (
                                            <Bar
                                                yAxisId="left"
                                                dataKey="revenue"
                                                name="Revenue"
                                                fill="#2196F3"
                                                radius={[2, 2, 0, 0]}
                                                barSize={12}
                                            />
                                        )}
                                        {incomeVisibility.earnings && (
                                            <Bar
                                                yAxisId="left"
                                                dataKey="earnings"
                                                name="Earnings"
                                                fill="#90CAF9"
                                                radius={[2, 2, 0, 0]}
                                                barSize={12}
                                            />
                                        )}
                                        {incomeVisibility.profitMargin && (
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="profitMargin"
                                                name="Profit Margin"
                                                stroke="#FF9800"
                                                strokeWidth={2}
                                                dot={{ r: 3 }}
                                                activeDot={{ r: 5 }}
                                            />
                                        )}
                                    </ComposedChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p>Loading chart...</p>
                                </div>
                            )}
                        </div>
                        <IncomeLegend />
                    </TabsContent>

                    <TabsContent value="balance" className="mt-0">
                        <div className="flex justify-between mb-2">
                            <div className="text-sm font-medium">Liabilities</div>
                            <div className="text-sm font-medium">Debt to Assets</div>
                        </div>

                        <div className="w-full h-[300px]">
                            {isMounted ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={balanceSheetData} margin={{ top: 5, right: 30, left: 20, bottom: 70 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis
                                            dataKey="quarter"
                                            tick={{ fontSize: 10 }}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                            height={70}
                                        />
                                        <YAxis yAxisId="left" tickFormatter={formatYAxis} domain={[0, 480]} />
                                        <YAxis yAxisId="right" orientation="right" tickFormatter={formatPercentage} domain={[72, 88]} />
                                        <Tooltip content={<BalanceTooltip />} />
                                        {balanceVisibility.assets && (
                                            <Bar
                                                yAxisId="left"
                                                dataKey="assets"
                                                name="Assets"
                                                fill="#2196F3"
                                                radius={[2, 2, 0, 0]}
                                                barSize={12}
                                            />
                                        )}
                                        {balanceVisibility.liabilities && (
                                            <Bar
                                                yAxisId="left"
                                                dataKey="liabilities"
                                                name="Liabilities"
                                                fill="#E91E63"
                                                radius={[2, 2, 0, 0]}
                                                barSize={12}
                                            />
                                        )}
                                        {balanceVisibility.debtToAssets && (
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="debtToAssets"
                                                name="Debt to Assets"
                                                stroke="#FF9800"
                                                strokeWidth={2}
                                                dot={{ r: 3 }}
                                                activeDot={{ r: 5 }}
                                            />
                                        )}
                                    </ComposedChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p>Loading chart...</p>
                                </div>
                            )}
                        </div>
                        <BalanceLegend />
                    </TabsContent>

                    <TabsContent value="cashflow" className="mt-0">
                        <div className="w-full h-[300px]">
                            {isMounted ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={cashFlowData} margin={{ top: 5, right: 30, left: 20, bottom: 70 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis
                                            dataKey="quarter"
                                            tick={{ fontSize: 10 }}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                            height={70}
                                        />
                                        <YAxis tickFormatter={formatYAxis} domain={[-50, 75]} />
                                        <Tooltip content={<CashFlowTooltip />} />
                                        {cashFlowVisibility.operating && (
                                            <Line
                                                type="monotone"
                                                dataKey="operating"
                                                name="Operating"
                                                stroke="#9E9E9E"
                                                strokeWidth={2}
                                                dot={{ r: 3 }}
                                                activeDot={{ r: 5 }}
                                            />
                                        )}
                                        {cashFlowVisibility.investing && (
                                            <Line
                                                type="monotone"
                                                dataKey="investing"
                                                name="Investing"
                                                stroke="#9C27B0"
                                                strokeWidth={2}
                                                dot={{ r: 3 }}
                                                activeDot={{ r: 5 }}
                                            />
                                        )}
                                        {cashFlowVisibility.financing && (
                                            <Line
                                                type="monotone"
                                                dataKey="financing"
                                                name="Financing"
                                                stroke="#03A9F4"
                                                strokeWidth={2}
                                                dot={{ r: 3 }}
                                                activeDot={{ r: 5 }}
                                            />
                                        )}
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p>Loading chart...</p>
                                </div>
                            )}
                        </div>
                        <CashFlowLegend />
                    </TabsContent>
                </CardContent>

                <CardFooter className="flex justify-end py-2">
                    {activeTab === "income" && (
                        <a href="#" className="text-blue-500 text-sm flex items-center">
                            Income Statement
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                    )}
                    {activeTab === "balance" && (
                        <a href="#" className="text-blue-500 text-sm flex items-center">
                            Balance Sheet
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                    )}
                    {activeTab === "cashflow" && (
                        <a href="#" className="text-blue-500 text-sm flex items-center">
                            Cash Flow
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                    )}
                </CardFooter>
            </Tabs>
        </Card>
    )
}
