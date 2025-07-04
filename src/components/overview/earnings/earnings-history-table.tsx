"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Play, Plus } from "lucide-react"

// Define the type for earnings data
type EarningsRecord = {
    reportDate: string
    fiscalQuarter: string
    forecastEps: number
    actualEps: number | null
    lastYearEps: number
    epsYoyChange: string
    epsYoyChangeValue: number
    pressReleaseUrl: string | null
    slidesUrl: string | null
    transcriptUrl: string | null
}

// Use fixed data instead of random generation to avoid hydration errors
const DUMMY_DATA: EarningsRecord[] = [
    {
        reportDate: "Apr 24, 2025",
        fiscalQuarter: "2025 (Q2)",
        forecastEps: 1.61,
        actualEps: null,
        lastYearEps: 1.53,
        epsYoyChange: "10.09% (+0.22)",
        epsYoyChangeValue: 0.22,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: null,
    },
    {
        reportDate: "Jan 22, 2025",
        fiscalQuarter: "2025 (Q1)",
        forecastEps: 1.61,
        actualEps: 2.4,
        lastYearEps: 1.53,
        epsYoyChange: "10.09% (+0.22)",
        epsYoyChangeValue: 0.22,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Oct 28, 2024",
        fiscalQuarter: "2024 (Q4)",
        forecastEps: 1.61,
        actualEps: 2.4,
        lastYearEps: 1.53,
        epsYoyChange: "10.09% (+0.22)",
        epsYoyChangeValue: 0.22,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Jul 25, 2024",
        fiscalQuarter: "2024 (Q3)",
        forecastEps: 1.61,
        actualEps: 2.4,
        lastYearEps: 1.53,
        epsYoyChange: "10.09% (+0.22)",
        epsYoyChangeValue: 0.22,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Apr 26, 2024",
        fiscalQuarter: "2024 (Q2)",
        forecastEps: 1.61,
        actualEps: 2.4,
        lastYearEps: 1.53,
        epsYoyChange: "10.09% (+0.22)",
        epsYoyChangeValue: 0.22,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Jan 23, 2024",
        fiscalQuarter: "2024 (Q1)",
        forecastEps: 1.61,
        actualEps: 1.88,
        lastYearEps: 1.53,
        epsYoyChange: "10.09% (+0.22)",
        epsYoyChangeValue: 0.22,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Oct 27, 2023",
        fiscalQuarter: "2023 (Q4)",
        forecastEps: 1.61,
        actualEps: 1.88,
        lastYearEps: 1.53,
        epsYoyChange: "10.09% (+0.22)",
        epsYoyChangeValue: 0.22,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Jul 28, 2023",
        fiscalQuarter: "2023 (Q3)",
        forecastEps: 1.61,
        actualEps: 1.88,
        lastYearEps: 1.53,
        epsYoyChange: "10.09% (+0.22)",
        epsYoyChangeValue: 0.22,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: null,
    },
    {
        reportDate: "Apr 27, 2023",
        fiscalQuarter: "2023 (Q2)",
        forecastEps: 1.52,
        actualEps: 1.76,
        lastYearEps: 1.43,
        epsYoyChange: "9.79% (+0.33)",
        epsYoyChangeValue: 0.33,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Jan 24, 2023",
        fiscalQuarter: "2023 (Q1)",
        forecastEps: 1.58,
        actualEps: 1.92,
        lastYearEps: 1.49,
        epsYoyChange: "8.72% (+0.43)",
        epsYoyChangeValue: 0.43,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Oct 25, 2022",
        fiscalQuarter: "2022 (Q4)",
        forecastEps: 1.55,
        actualEps: 1.79,
        lastYearEps: 1.45,
        epsYoyChange: "7.59% (+0.34)",
        epsYoyChangeValue: 0.34,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Jul 26, 2022",
        fiscalQuarter: "2022 (Q3)",
        forecastEps: 1.49,
        actualEps: 1.63,
        lastYearEps: 1.4,
        epsYoyChange: "6.43% (+0.23)",
        epsYoyChangeValue: 0.23,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Apr 28, 2022",
        fiscalQuarter: "2022 (Q2)",
        forecastEps: 1.43,
        actualEps: 1.52,
        lastYearEps: 1.33,
        epsYoyChange: "5.26% (+0.19)",
        epsYoyChangeValue: 0.19,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Jan 25, 2022",
        fiscalQuarter: "2022 (Q1)",
        forecastEps: 1.47,
        actualEps: 1.68,
        lastYearEps: 1.36,
        epsYoyChange: "8.82% (+0.32)",
        epsYoyChangeValue: 0.32,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
    {
        reportDate: "Oct 26, 2021",
        fiscalQuarter: "2021 (Q4)",
        forecastEps: 1.41,
        actualEps: 1.24,
        lastYearEps: 1.3,
        epsYoyChange: "-4.62% (-0.06)",
        epsYoyChangeValue: -0.06,
        pressReleaseUrl: "#",
        slidesUrl: null,
        transcriptUrl: "#",
    },
]

export default function EarningsHistoryTable() {
    const [showAll, setShowAll] = useState(false)
    const [displayData, setDisplayData] = useState<EarningsRecord[]>([])

    // Use useEffect to set the data only on the client side
    useEffect(() => {
        setDisplayData(showAll ? DUMMY_DATA : DUMMY_DATA.slice(0, 8))
    }, [showAll])

    return (
        <div className="w-full bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-4">AAPL Earnings History</h2>
            <div className="rounded-lg shadow-[0px_0px_10px_1px_#0000001A] border-2">

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="whitespace-nowrap">Report Date</TableHead>
                                <TableHead className="whitespace-nowrap">Fiscal Quarter</TableHead>
                                <TableHead className="whitespace-nowrap">Forecast/EPS</TableHead>
                                <TableHead className="whitespace-nowrap">Last Year&apos;s EPS</TableHead>
                                <TableHead className="whitespace-nowrap">EPS YoY Change</TableHead>
                                <TableHead className="whitespace-nowrap">Press Release</TableHead>
                                <TableHead className="whitespace-nowrap">Slides</TableHead>
                                <TableHead className="whitespace-nowrap">Play Transcript</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayData.map((record, index) => (
                                <TableRow key={index} className="border-t border-gray-200">
                                    <TableCell className="font-medium">{record.reportDate}</TableCell>
                                    <TableCell>{record.fiscalQuarter}</TableCell>
                                    <TableCell>
                                        {record.forecastEps.toFixed(2)}
                                        {record.actualEps !== null && (
                                            <span className={record.actualEps >= record.forecastEps ? "text-green-500" : "text-red-500"}>
                                                /{record.actualEps.toFixed(2)}
                                            </span>
                                        )}
                                        {record.actualEps === null && "/–"}
                                    </TableCell>
                                    <TableCell>{record.lastYearEps.toFixed(2)}</TableCell>
                                    <TableCell>{record.actualEps !== null ? record.epsYoyChange : "–"}</TableCell>
                                    <TableCell>
                                        {record.pressReleaseUrl ? (
                                            <a href={record.pressReleaseUrl} className="text-green-500 hover:text-green-600">
                                                <FileText className="h-5 w-5" />
                                            </a>
                                        ) : (
                                            "–"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {record.slidesUrl ? (
                                            <a href={record.slidesUrl} className="text-green-500 hover:text-green-600">
                                                <FileText className="h-5 w-5" />
                                            </a>
                                        ) : (
                                            "–"
                                        )}
                                    </TableCell>
                                    <TableCell className="flex justify-center">
                                        {record.transcriptUrl ? (
                                            <a href={record.transcriptUrl} className="text-green-500 hover:text-green-600">
                                                <Play className="h-5 w-5" />
                                            </a>
                                        ) : (
                                            "–"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="bg-gray-100 p-4 text-gray-600 text-sm mt-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <p>The upcoming earnings date is based on a company&apos;s previous reporting.</p>
                        <div className="flex items-center gap-4 mt-2 md:mt-0">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-500"></div>
                                <span>Beat</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-red-500"></div>
                                <span>Missed</span>
                            </div>
                        </div>
                    </div>
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
