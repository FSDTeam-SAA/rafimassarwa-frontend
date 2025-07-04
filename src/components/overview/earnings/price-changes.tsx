"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"

// Define the type for price change data
type PriceChangeRecord = {
    reportDate: string
    priceBefore: number
    priceAfter: number
    percentageChange: number
}

// Use fixed data to avoid hydration errors
const DUMMY_DATA: PriceChangeRecord[] = [
    {
        reportDate: "Apr 24, 2025",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: -0.67,
    },
    {
        reportDate: "Jan 22, 2025",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: 0.67,
    },
    {
        reportDate: "Oct 28, 2024",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: -0.67,
    },
    {
        reportDate: "Jul 25, 2024",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: -0.67,
    },
    {
        reportDate: "Apr 26, 2024",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: 0.67,
    },
    {
        reportDate: "Jan 23, 2024",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: 0.67,
    },
    {
        reportDate: "Oct 27, 2023",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: -0.67,
    },
    {
        reportDate: "Jul 28, 2023",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: 0.67,
    },
    {
        reportDate: "Apr 27, 2023",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: -0.67,
    },
    {
        reportDate: "Jan 24, 2023",
        priceBefore: 237.33,
        priceAfter: 235.88,
        percentageChange: 0.67,
    },
    {
        reportDate: "Oct 25, 2022",
        priceBefore: 225.15,
        priceAfter: 228.52,
        percentageChange: 1.5,
    },
    {
        reportDate: "Jul 26, 2022",
        priceBefore: 215.33,
        priceAfter: 210.88,
        percentageChange: -2.07,
    },
    {
        reportDate: "Apr 28, 2022",
        priceBefore: 220.45,
        priceAfter: 225.64,
        percentageChange: 2.35,
    },
    {
        reportDate: "Jan 25, 2022",
        priceBefore: 230.12,
        priceAfter: 226.75,
        percentageChange: -1.46,
    },
    {
        reportDate: "Oct 26, 2021",
        priceBefore: 218.65,
        priceAfter: 223.45,
        percentageChange: 2.19,
    },
]

export default function PriceChangesTable() {
    const [showAll, setShowAll] = useState(false)
    const [displayData, setDisplayData] = useState<PriceChangeRecord[]>([])

    // Use useEffect to set the data only on the client side
    useEffect(() => {
        setDisplayData(showAll ? DUMMY_DATA : DUMMY_DATA.slice(0, 8))
    }, [showAll])

    return (
        <div className="w-full bg-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">AAPL Earnings-Related Price Changes</h2>

            <div className="rounded-lg shadow-[0px_0px_10px_1px_#0000001A] border-2">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="whitespace-nowrap text-center">Report Date</TableHead>
                                <TableHead className="whitespace-nowrap text-center">Price 1 Day Before</TableHead>
                                <TableHead className="whitespace-nowrap text-center">Price 1 Day After</TableHead>
                                <TableHead className="whitespace-nowrap text-center">Percentage Change</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayData.map((record, index) => (
                                <TableRow key={index} className="border-t border-gray-200">
                                    <TableCell className="font-medium">{record.reportDate}</TableCell>
                                    <TableCell>${record.priceBefore.toFixed(2)}</TableCell>
                                    <TableCell>${record.priceAfter.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span
                                            className={
                                                record.percentageChange > 0
                                                    ? "text-green-500"
                                                    : record.percentageChange < 0
                                                        ? "text-red-500"
                                                        : ""
                                            }
                                        >
                                            {record.percentageChange > 0 ? "+" : ""}
                                            {record.percentageChange.toFixed(2)}%
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="bg-gray-100 p-4 text-gray-600 text-sm mt-4">
                    <p>The upcoming earnings date is based on a company&apos;s previous reporting.</p>
                </div>

                {!showAll && displayData.length > 0 && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-green-500 hover:text-green-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Show More
                    </button>
                )}
            </div>
        </div>
    )
}
