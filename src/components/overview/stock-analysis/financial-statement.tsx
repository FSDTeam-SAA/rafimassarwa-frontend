import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FinancialTable from "./financial-table"

// Define types for our financial data

type FinancialSection = {
    title: string
    score?: number
    paragraphs: string[]
}

type FinancialOverview = {
    companyName: string
    summary: string[]
    sections: FinancialSection[]
}

export default function FinancialStatementOverview() {
    // Financial data object with all the information
    const financialData: FinancialOverview = {
        companyName: "Apple Inc.",
        summary: [
            "Apple Inc.'s financial statements show strong profitability with a Gross Profit Margin of 46.5% and a Net Profit Margin of 24.3%.",
            "The company has a low Debt-to-Equity Ratio of 0.03 and a strong Free Cash Flow of $101.2 billion, indicating excellent financial health despite moderate revenue growth.",
        ],
        sections: [
            {
                title: "Income Statement",
                score: 85,
                paragraphs: [
                    "TechNova demonstrates strong profitability with a consistent Gross Profit Margin of around 46.5% in TTM, showcasing operational efficiency.",
                    "The Net Profit Margin stands at 24.3% for TTM, highlighting effective cost management. Revenue growth has been modest, with a TTM increase over the previous annual period.",
                    "EBIT and EBITDA margins remain robust, indicating healthy operating earnings before interest and taxes.",
                ]
            },
            {
                title: "Balance Sheet",
                score: 78,
                paragraphs: [
                    "TechNova's balance sheet is solid with a low Debt-to-Equity Ratio of 0.03 in TTM, indicating conservative leverage.",
                    "The Return on Equity is strong at 144.0%, reflecting efficient equity utilization. The Equity Ratio is 19.4%, suggesting a moderate reliance on equity financing.",
                    "However, fluctuating equity levels could pose potential risks.",
                ]
            },
            {
                title: "Cash Flow",
                score: 80,
                paragraphs: [
                    "TechNova shows a healthy cash flow situation with a strong Free Cash Flow of $101.2 billion in TTM.",
                    "The Operating Cash Flow to Net Income Ratio is 1.13, indicating efficient cash conversion.",
                    "Despite a decrease in Free Cash Flow compared to the previous period, the company maintains solid cash generation capabilities.",
                ]
            },
        ],
    }

    return (
        <div className="container mx-auto mt-20">
            <h1 className="text-3xl font-bold mb-6 md:text-4xl">{financialData.companyName} Financial Statement Overview</h1>

            <div className="shadow-[0px_0px_10px_1px_#0000001A]">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-xl md:text-2xl">Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm md:text-base space-y-4">
                        {financialData.summary.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </CardContent>
                </Card>

                {financialData.sections.map((section: FinancialSection, index: number) => (
                    <Card key={index} className="mb-6">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-xl md:text-2xl">
                                {section.title} {section.score && <span className="ml-2">{section.score}</span>}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm md:text-base">
                            <div className="space-y-4 mb-6">
                                {section.paragraphs.map((paragraph, pIndex) => (
                                    <p key={pIndex}>{paragraph}</p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                
                <FinancialTable />
            </div>


        </div>
    )
}
