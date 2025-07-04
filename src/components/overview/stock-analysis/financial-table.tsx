import { cn } from "@/lib/utils"

// Define types for our financial data
type FinancialPeriod = "TTM" | "Sep 2024" | "Sep 2023" | "Sep 2022" | "Sep 2021" | "Sep 2020"

type FinancialMetric = {
    name: string
    values: Record<FinancialPeriod, string>
}

type FinancialSection = {
    title: string
    metrics: FinancialMetric[]
}

export default function FinancialTable() {
    // Array of periods to display in the table
    const periods: FinancialPeriod[] = ["TTM", "Sep 2024", "Sep 2023", "Sep 2022", "Sep 2021", "Sep 2020"]

    // Financial data organized by sections
    const financialData: FinancialSection[] = [
        {
            title: "Income Statement",
            metrics: [
                {
                    name: "Total Revenue",
                    values: {
                        TTM: "395.76B",
                        "Sep 2024": "391.04B",
                        "Sep 2023": "383.29B",
                        "Sep 2022": "394.33B",
                        "Sep 2021": "365.82B",
                        "Sep 2020": "274.51B",
                    },
                },
                {
                    name: "Gross Profit",
                    values: {
                        TTM: "184.10B",
                        "Sep 2024": "180.68B",
                        "Sep 2023": "169.15B",
                        "Sep 2022": "170.78B",
                        "Sep 2021": "152.84B",
                        "Sep 2020": "104.96B",
                    },
                },
                {
                    name: "EBIT",
                    values: {
                        TTM: "125.67B",
                        "Sep 2024": "123.22B",
                        "Sep 2023": "114.30B",
                        "Sep 2022": "119.44B",
                        "Sep 2021": "108.95B",
                        "Sep 2020": "66.29B",
                    },
                },
                {
                    name: "EBITDA",
                    values: {
                        TTM: "137.35B",
                        "Sep 2024": "134.66B",
                        "Sep 2023": "125.82B",
                        "Sep 2022": "130.54B",
                        "Sep 2021": "120.23B",
                        "Sep 2020": "77.34B",
                    },
                },
                {
                    name: "Net Income Common Stockholders",
                    values: {
                        TTM: "96.15B",
                        "Sep 2024": "93.74B",
                        "Sep 2023": "97.00B",
                        "Sep 2022": "99.80B",
                        "Sep 2021": "94.68B",
                        "Sep 2020": "57.41B",
                    },
                },
            ],
        },
        {
            title: "Balance Sheet",
            metrics: [
                {
                    name: "Cash, Cash Equivalents and Short-Term Investments",
                    values: {
                        TTM: "67.15B",
                        "Sep 2024": "65.17B",
                        "Sep 2023": "61.55B",
                        "Sep 2022": "48.30B",
                        "Sep 2021": "62.64B",
                        "Sep 2020": "90.94B",
                    },
                },
                {
                    name: "Total Assets",
                    values: {
                        TTM: "337.41B",
                        "Sep 2024": "364.98B",
                        "Sep 2023": "352.58B",
                        "Sep 2022": "352.75B",
                        "Sep 2021": "351.00B",
                        "Sep 2020": "323.89B",
                    },
                },
                {
                    name: "Total Debt",
                    values: {
                        TTM: "104.59B",
                        "Sep 2024": "106.63B",
                        "Sep 2023": "111.09B",
                        "Sep 2022": "132.48B",
                        "Sep 2021": "136.52B",
                        "Sep 2020": "122.28B",
                    },
                },
                {
                    name: "Net Debt",
                    values: {
                        TTM: "71.89B",
                        "Sep 2024": "76.69B",
                        "Sep 2023": "81.12B",
                        "Sep 2022": "108.83B",
                        "Sep 2021": "101.58B",
                        "Sep 2020": "84.26B",
                    },
                },
                {
                    name: "Total Liabilities",
                    values: {
                        TTM: "263.22B",
                        "Sep 2024": "308.03B",
                        "Sep 2023": "290.44B",
                        "Sep 2022": "302.08B",
                        "Sep 2021": "287.91B",
                        "Sep 2020": "258.55B",
                    },
                },
                {
                    name: "Stockholders Equity",
                    values: {
                        TTM: "74.19B",
                        "Sep 2024": "56.95B",
                        "Sep 2023": "62.15B",
                        "Sep 2022": "50.67B",
                        "Sep 2021": "63.09B",
                        "Sep 2020": "65.34B",
                    },
                },
            ],
        },
        {
            title: "Cash Flow",
            metrics: [
                {
                    name: "Free Cash Flow",
                    values: {
                        TTM: "98.30B",
                        "Sep 2024": "108.81B",
                        "Sep 2023": "99.58B",
                        "Sep 2022": "111.44B",
                        "Sep 2021": "92.95B",
                        "Sep 2020": "73.36B",
                    },
                },
                {
                    name: "Operating Cash Flow",
                    values: {
                        TTM: "108.29B",
                        "Sep 2024": "118.25B",
                        "Sep 2023": "110.54B",
                        "Sep 2022": "122.15B",
                        "Sep 2021": "104.04B",
                        "Sep 2020": "80.67B",
                    },
                },
                {
                    name: "Investing Cash Flow",
                    values: {
                        TTM: "10.80B",
                        "Sep 2024": "2.94B",
                        "Sep 2023": "3.71B",
                        "Sep 2022": "-22.35B",
                        "Sep 2021": "-14.54B",
                        "Sep 2020": "-4.29B",
                    },
                },
                {
                    name: "Financing Cash Flow",
                    values: {
                        TTM: "-130.77B",
                        "Sep 2024": "-121.98B",
                        "Sep 2023": "-108.49B",
                        "Sep 2022": "-110.75B",
                        "Sep 2021": "-93.35B",
                        "Sep 2020": "-86.82B",
                    },
                },
            ],
        },
    ]

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">Financial Data</h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="text-left p-3 border-b font-medium">Breakdown</th>
                            {periods.map((period) => (
                                <th key={period} className="text-right p-3 border-b font-medium">
                                    {period}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {financialData.map((section, sectionIndex) => (
                            <>
                                <tr key={`section-${sectionIndex}`} className="bg-gray-100">
                                    <td colSpan={periods.length + 1} className="p-3 font-semibold">
                                        {section.title}
                                    </td>
                                </tr>
                                {section.metrics.map((metric, metricIndex) => (
                                    <tr
                                        key={`metric-${sectionIndex}-${metricIndex}`}
                                        className={cn("hover:bg-gray-50", metricIndex === section.metrics.length - 1 && "border-b")}
                                    >
                                        <td className="p-3">{metric.name}</td>
                                        {periods.map((period) => (
                                            <td key={`${metric.name}-${period}`} className="text-right p-3">
                                                {metric.values[period]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
