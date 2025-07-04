"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Financial data structure
type FinancialData = {
    label: string
    value: string | number
    category: "share" | "financial" | "forecast"
}

// Sample financial data
const financialData: FinancialData[] = [
    // Share Statistics
    { label: "Day's Range", value: "$197.54 - $200.54", category: "share" },
    { label: "52-Week Range", value: "$169.21 - $260.10", category: "share" },
    { label: "Previous Close", value: "$197.49", category: "share" },
    { label: "Volume", value: "36.45M", category: "share" },
    { label: "Average Volume (3M)", value: "69.66M", category: "share" },
    { label: "EPS (TTM)", value: "1.65", category: "share" },
    { label: "Shares Outstanding", value: "14,935,826,000", category: "share" },
    { label: "10 Day Avg. Volume", value: "54,669,066", category: "share" },
    { label: "30 Day Avg. Volume", value: "69,661,137", category: "share" },

    // Financial Highlights & Ratios
    { label: "Market Cap", value: "$2.93T", category: "financial" },
    { label: "Enterprise Value", value: "$3.33T", category: "financial" },
    { label: "Total Cash (Recent Filing)", value: "$20.54B", category: "financial" },
    { label: "Total Debt (Recent Filing)", value: "$111.11B", category: "financial" },
    { label: "Price to Earnings (P/E)", value: "31.0", category: "financial" },
    { label: "PEG Ratio", value: "N/A", category: "financial" },
    { label: "Price to Book (P/B)", value: "N/A", category: "financial" },
    { label: "Price to Sales (P/S)", value: "0.00", category: "financial" },
    { label: "Price to Cash Flow (P/CF)", value: "0.00", category: "financial" },
    { label: "P/FCF Ratio", value: "0.00", category: "financial" },
    { label: "Enterprise Value/Market Cap", value: "1.14", category: "financial" },
    { label: "Enterprise Value/Revenue", value: "N/A", category: "financial" },
    { label: "Enterprise Value/Gross Profit", value: "N/A", category: "financial" },
    { label: "Enterprise Value/Ebitda", value: "23.98", category: "financial" },

    // Forecast
    { label: "Beta", value: "1.04", category: "forecast" },
    { label: "Next Earnings", value: "Jul 23, 2025", category: "forecast" },
    { label: "EPS Estimate", value: "1.42", category: "forecast" },
    { label: "Next Dividend Ex-Date", value: "May 12, 2025", category: "forecast" },
    { label: "Dividend Yield", value: "0.51%", category: "forecast" },
    { label: "1Y Price Target", value: "$228.65", category: "forecast" },
    { label: "Price Target Upside", value: "15.17% Upside", category: "forecast" },
    { label: "Rating Consensus", value: "Moderate Buy", category: "forecast" },
    { label: "Number of Analyst Covering", value: "29", category: "forecast" },
]

export default function FinancialDataTable() {
    const [expanded, setExpanded] = useState(false)

    // Group data by category
    const shareData = financialData.filter((item) => item.category === "share")
    const financialHighlights = financialData.filter((item) => item.category === "financial")
    const forecastData = financialData.filter((item) => item.category === "forecast")

    // Determine how many rows to show
    const initialRowCount = 5
    const shareDataToShow = expanded ? shareData : shareData.slice(0, initialRowCount)
    const financialHighlightsToShow = expanded ? financialHighlights : financialHighlights.slice(0, initialRowCount)
    const forecastDataToShow = expanded ? forecastData : forecastData.slice(0, initialRowCount)

    // Calculate max rows for responsive design
    const maxRows = Math.max(shareData.length, financialHighlights.length, forecastData.length)

    return (
        <div className="w-full space-y-4 mt-5">
            <div className="rounded-md">
                <Table>
                    {/* <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Share Statistics</TableHead>
                            <TableHead className="w-1/3">Financial Highlights & Ratios</TableHead>
                            <TableHead className="w-1/3">Forecast</TableHead>
                        </TableRow>
                    </TableHeader> */}
                    <TableBody>
                        {Array.from({ length: expanded ? maxRows : initialRowCount }).map((_, index) => (
                            <TableRow key={index} className="border-none">
                                <TableCell className={`${cn(index >= shareDataToShow.length && "hidden md:table-cell")} border-l-0 pr-5 border-r border-b`}>
                                    {shareDataToShow[index] && (
                                        <div className="flex justify-between">
                                            <span>{shareDataToShow[index].label}</span>
                                            <span className="font-medium">{shareDataToShow[index].value}</span>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className={`${cn(index >= shareDataToShow.length && "hidden md:table-cell")} border-l-0 pr-5 border-r border-b`}>
                                    {financialHighlightsToShow[index] && (
                                        <div className="flex justify-between ">
                                            <span>{financialHighlightsToShow[index].label}</span>
                                            <span className="font-medium">{financialHighlightsToShow[index].value}</span>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className={`${cn(index >= shareDataToShow.length && "hidden md:table-cell")} border-l-0 pr-5 border-r border-b`}>
                                    {forecastDataToShow[index] && (
                                        <div className="flex justify-between">
                                            <span>{forecastDataToShow[index].label}</span>
                                            <span className="font-medium">{forecastDataToShow[index].value}</span>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center">
                <Button variant="outline" onClick={() => setExpanded(!expanded)} className="flex items-center gap-2">
                    {expanded ? (
                        <>
                            Show Less <ChevronUp className="h-4 w-4" />
                        </>
                    ) : (
                        <>
                            Show More <ChevronDown className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
