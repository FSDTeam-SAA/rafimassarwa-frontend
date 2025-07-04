"use client"

import * as React from "react"
import { PieChart, Pie, Cell, Label } from "recharts"
import { cn } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define proper types for our data items
type GeoItem = {
    region: string
    percentage: number
    color: string
    category?: string
}

type ProductItem = {
    category: string
    percentage: number
    color: string
    region?: string
}

// Data for Geography
const geographyData: GeoItem[] = [
    { region: "Americas", percentage: 42.72, color: "#FF5733" },
    { region: "Europe", percentage: 25.91, color: "#4CAF50" },
    { region: "Greater China", percentage: 17.12, color: "#2196F3" },
    { region: "Rest of Asia Pacific", percentage: 7.84, color: "#FFC107" },
    { region: "Japan", percentage: 6.41, color: "#0D3459" },
]

// Data for Products and services (example data)
const productsData: ProductItem[] = [
    { category: "iPhone", percentage: 52.14, color: "#FF5733" },
    { category: "Services", percentage: 21.65, color: "#4CAF50" },
    { category: "Mac", percentage: 10.38, color: "#2196F3" },
    { category: "iPad", percentage: 8.74, color: "#FFC107" },
    { category: "Wearables & Home", percentage: 7.09, color: "#0D3459" },
]

type TabType = "geography" | "products"

export default function AssetChartOverview() {
    const [activeTab, setActiveTab] = React.useState<TabType>("geography")
    const [isMounted, setIsMounted] = React.useState(false)

    // Handle client-side only rendering
    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    // Get the appropriate data based on active tab
    const getChartData = () => {
        if (activeTab === "geography") {
            return geographyData
        } else {
            return productsData
        }
    }

    const data = getChartData()

    // Get the first item's percentage for center display (matches the image)
    const centerPercentage = data && data.length > 0 ? data[0].percentage : 0

    return (
        <Card className="w-full max-w-md mx-auto overflow-hidden shadow-md">
            <div className="p-4 pb-0">
                <h2 className="text-2xl font-bold mb-2">AAPL Stock Chart & Stats</h2>
            </div>

            <div className="relative">
                <div
                    className="absolute top-0 left-0 h-1.5 bg-green-500"
                    style={{
                        width: "50%",
                        transform: activeTab === "geography" ? "translateX(0)" : "translateX(100%)",
                        transition: "transform 0.3s ease",
                    }}
                ></div>

                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent">
                        <TabsTrigger
                            value="geography"
                            className={cn(
                                "py-4 px-2 text-base font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            Geography
                        </TabsTrigger>
                        <TabsTrigger
                            value="products"
                            className={cn(
                                "py-4 px-2 text-base font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            Products and services
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <CardContent className="p-6">
                <div className="flex flex-col items-center">
                    {/* Chart - Only render on client side */}
                    <div className="w-full mb-6 flex justify-center">
                        <div className="mx-auto aspect-square max-h-[250px] w-full flex items-center justify-center">
                            {isMounted ? (
                                <PieChart width={250} height={250}>
                                    <Pie
                                        data={data}
                                        dataKey="percentage"
                                        nameKey={activeTab === "geography" ? "region" : "category"}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={0}
                                        strokeWidth={0}
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                        <Label
                                            value={`${centerPercentage.toFixed(2)}%`}
                                            position="center"
                                            style={{ fill: "#000", fontSize: "1.25rem", fontWeight: 500 }}
                                        />
                                    </Pie>
                                </PieChart>
                            ) : (
                                <div className="w-[250px] h-[250px] flex items-center justify-center">
                                    <p>Loading chart...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="w-full">
                        <ul className="space-y-2">
                            {data.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-black font-medium">
                                        {item.percentage.toFixed(2)}% {activeTab === "geography" ? item.region : item.category}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
