interface MetricsGridProps {
    data: {
        marketCap?: string
        beta?: number
        employees?: number
        dividendYield?: string
        revenueGrowth?: string
        sector?: string
        averageVolume?: string
        epsGrowth?: string
        sectorStrength?: number
        priceToEarnings?: number
        country?: string
        industry?: string
    }
}

export default function MetricsGrid({ data }: MetricsGridProps) {
    // Make sure data exists and has properties
    const isDataLoaded = data && Object.keys(data).length > 0

    const metrics = [
        { label: "Market Cap", value: data.marketCap || "-" },
        { label: "Beta (1Y)", value: data.beta?.toString() || "-" },
        { label: "Employees", value: data.employees?.toLocaleString() || "-" },
        { label: "Dividend Yield", value: data.dividendYield || "-" },
        { label: "Revenue Growth", value: data.revenueGrowth || "-" },
        { label: "Sector", value: data.sector || "-" },
        { label: "Average Volume (3M)", value: data.averageVolume || "-" },
        { label: "EPS Growth", value: data.epsGrowth || "-" },
        { label: "Sector Strength", value: data.sectorStrength?.toString() || "-" },
        { label: "Price to Earnings (P/E)", value: data.priceToEarnings?.toString() || "-" },
        { label: "Country", value: data.country || "-" },
        { label: "Industry", value: data.industry || "-" },
    ]

    if (!isDataLoaded) {
        return <div className="py-4 text-center">Loading metrics...</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className={`py-4 ${index !== metrics.length - 1 && index !== metrics.length - 2 && index !== metrics.length - 3 ? "border-b" : ""}`}
                >
                    <div className="flex justify-between">
                        <span className="text-gray-600">{metric.label}</span>
                        <span className="font-medium">{metric.value}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
