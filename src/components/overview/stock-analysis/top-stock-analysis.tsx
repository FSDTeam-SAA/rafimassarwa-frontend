"use client"

import { Apple } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TbArrowsDown, TbArrowsUp } from "react-icons/tb";

// This would be replaced with actual API data
const stockData = {
    company: {
        name: "Apple",
        ticker: "NASDAQ:AAPL",
        logo: <Apple className="h-6 w-6 text-gray-700" />,
    },
    score: 74,
    rating: "Outperform",
    summary:
        "Apple's stock is supported by strong financial performance and a positive earnings call, reflecting robust profitability and growth in key areas. However, the high P/E ratio suggests the stock is priced at a premium, and technical indicators point to potential short-term weakness. Challenges in China and a decrease in wearables revenue are areas to monitor, but overall, Apple's financial stability and strategic growth initiatives bolster its stock performance.",
    positiveFactors: [
        {
            title: "AI Monetization",
            description:
                "Apple is positioned to benefit from AI monetization without having to invest their free cash flow into GPUs, with monetization occurring on multiple fronts over time.",
        },
        {
            title: "Emerging Markets",
            description:
                "Picking up share in emerging markets, especially India, has been an upside driver in recent quarters.",
        },
        {
            title: "Product Innovation",
            description:
                "Apple announced several new Mac and iPad products, including the MacBook Air with M4 processors, which should support AAPL's revenue growth outlook.",
        },
    ],
    negativeFactors: [
        {
            title: "China Tariffs",
            description:
                "Incremental cost headwinds from China tariffs are expected, as broad tariff exemptions have not been granted.",
        },
        {
            title: "iPhone Shipments",
            description:
                "Reducing iPhone shipments to 230M and 243M in CY25 and CY26, respectively, implies a flatter replacement cycle.",
        },
        {
            title: "Product Delays",
            description:
                "The delayed rollout of a more advanced Siri means Apple will have fewer features to accelerate iPhone upgrade rates.",
        },
    ],
}

export default function StockAnalysisTopCard() {
    return (
        <div className="w-full">
            <Card className="w-full !border-gray-200">
                <CardContent className="p-0">
                    {/* Header Section */}
                    <div className="border border-gray-200 p-4 flex flex-col justify-center items-center gap-4">
                        <div className="flex items-center gap-3">
                            {stockData.company.logo}
                            <span className="text-lg font-medium">
                                {stockData.company.name}({stockData.company.ticker})
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-medium text-[#2695FF]">{stockData.score}</span>
                            <span className="px-3 py-1 rounded-full border border-[#2695FF] text-[#2695FF] text-sm">
                                {stockData.rating}
                            </span>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="p-4 border-x border-gray-200">
                        <p className="text-gray-700 text-sm leading-relaxed">{stockData.summary}</p>
                    </div>

                    {/* Factors Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 border">
                        {/* Positive Factors */}
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <TbArrowsUp className="h-5 w-5 text-[#2695FF]" />
                                <h3 className="text-[#2695FF] text-sm font-semibold">Positive Factors</h3>
                            </div>
                            <div className="space-y-4">
                                {stockData.positiveFactors.map((factor, index) => (
                                    <div key={index} className="space-y-1">
                                        <h4 className="text-[#2695FF] font-medium">{factor.title}</h4>
                                        <p className="text-sm text-gray-700">{factor.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Negative Factors */}
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <TbArrowsDown className="h-5 w-5 text-orange-500" />
                                <h3 className="text-orange-500 font-medium">Negative Factors</h3>
                            </div>
                            <div className="space-y-4">
                                {stockData.negativeFactors.map((factor, index) => (
                                    <div key={index} className="space-y-1">
                                        <h4 className="text-orange-500 font-medium">{factor.title}</h4>
                                        <p className="text-sm text-gray-700">{factor.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
