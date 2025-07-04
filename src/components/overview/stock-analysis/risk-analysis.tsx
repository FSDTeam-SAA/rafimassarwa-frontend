import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define types for our risk data
type RiskCategory = {
    name: string
    value: number
    sectorAverage: number
    description?: string
}

type RiskItem = {
    id: number
    description: string
    period: string
    isNew?: boolean
}

export default function RiskAnalysis() {
    // Company name - could be dynamic
    const companyName = "TechNova"

    // Risk summary data
    const riskSummary = {
        totalRisks: 28,
        highestRiskCategory: "Legal & Regulatory",
    }

    // Sector average value (same for all categories for simplicity)
    const sectorAverage = 50

    // Risk categories data
    const riskCategories: RiskCategory[] = [
        {
            name: "Finance & Corporate",
            value: 30, // Below average
            sectorAverage: sectorAverage,
            description: "Financial and accounting risks. Risks related to the execution of corporate activity and strategy",
        },
        {
            name: "Tech & Innovation",
            value: 35, // Below average
            sectorAverage: sectorAverage,
            description: "Risks related to technological changes, innovation capabilities, and R&D effectiveness",
        },
        {
            name: "Legal & Regulatory",
            value: 65, // Above average
            sectorAverage: sectorAverage,
            description: "Compliance risks, legal proceedings, regulatory changes, and intellectual property risks",
        },
        {
            name: "Production",
            value: 75, // Above average
            sectorAverage: sectorAverage,
            description: "Supply chain risks, manufacturing issues, and production capacity constraints",
        },
        {
            name: "Ability to Sell",
            value: 70, // Above average
            sectorAverage: sectorAverage,
            description: "Market competition, product demand, and distribution channel risks",
        },
        {
            name: "Macro & Political",
            value: 80, // Above average
            sectorAverage: sectorAverage,
            description: "Economic conditions, geopolitical events, and trade policy impacts",
        },
    ]

    // Latest risks data
    const latestRisks: RiskItem[] = [
        {
            id: 1,
            description: "The Company's retail stores are subject to numerous risks and uncertainties.",
            period: "Q3, 2023",
            isNew: true,
        },
        {
            id: 2,
            description:
                "Expectations relating to environmental, social and governance considerations expose the Company to potential liabilities, increased costs, reputational harm, and other adverse effects on the Company's business.",
            period: "Q3, 2022",
            isNew: true,
        },
        {
            id: 3,
            description:
                "The Company faces significant competition in its markets, which may negatively affect its business.",
            period: "Q2, 2022",
            isNew: false,
        },
    ]

    // Filter only new risks for the badge count
    const newRisks = latestRisks.filter((risk) => risk.isNew)

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-6">{companyName} Risk Analysis</h1>

            <Card className="mb-8">
                <CardContent className="pt-6">
                    <p className="text-lg mb-6">
                        {companyName} disclosed <span className="font-bold">{riskSummary.totalRisks}</span> risk factors in its most
                        recent earnings report. {companyName} reported the most risks in the{" "}
                        <span className="font-bold">&quot;{riskSummary.highestRiskCategory}&quot;</span> category.
                    </p>

                    {/* Risk Chart */}
                    <div className="relative mt-12 mb-16">
                        {/* Chart Container with fixed height */}
                        <div className="h-64 relative">
                            {/* Sector Average Line - positioned in the middle */}
                            <div className="absolute w-full border-t border-dashed border-gray-400 z-10" style={{ top: "50%" }}>
                                <span className="absolute -left-20 -translate-y-1/2 text-sm text-gray-500">Sector Avg.</span>
                            </div>

                            {/* Risk Bars */}
                            <div className="flex justify-between items-center h-full gap-2">
                                {riskCategories.map((category, index) => {
                                    const isAboveAverage = category.value > category.sectorAverage
                                    const barHeight = Math.abs(category.value - category.sectorAverage)
                                    const barColor = isAboveAverage ? "bg-red-500" : "bg-green-500"

                                    return (
                                        <div key={index} className="flex flex-col items-center flex-1 h-full relative">
                                            <div className="w-full h-full bg-gray-200"></div>
                                            <div
                                                className={`absolute w-4/5 ${barColor}`}
                                                style={{
                                                    height: `${barHeight}%`,
                                                    top: isAboveAverage ? "50%" : `calc(50% - ${barHeight}%)`,
                                                }}
                                            ></div>
                                            <span className="absolute bottom-0 text-xs mt-2 text-center px-1 transform translate-y-full pt-2">
                                                {category.name}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Selected Category Description */}
                    <div className="border-t pt-4">
                        <h3 className="font-medium text-lg mb-2">{riskCategories[0].name}</h3>
                        <p className="text-gray-700">{riskCategories[0].description}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Latest Risks Added</CardTitle>
                        {newRisks.length > 0 && <Badge variant="destructive">{newRisks.length} New Risks</Badge>}
                    </div>
                </CardHeader>
                <CardContent>
                    <ol className="space-y-6 list-decimal list-inside">
                        {latestRisks.map((risk) => (
                            <li key={risk.id} className="pb-6 border-b last:border-0">
                                <div className="inline">{risk.description}</div>
                                <div className="text-sm text-gray-500 mt-1">{risk.period}</div>
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Card>
        </div>
    )
}
