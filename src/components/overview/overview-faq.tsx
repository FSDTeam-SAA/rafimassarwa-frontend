"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data
const faqData = [
    {
        question: "What was Apple's price range in the past 12 months?",
        answer:
            "Over the past 12 months, Apple's stock price has ranged from approximately $155.38 to $220.43, representing a fluctuation of about 41.9% from its lowest to highest point.",
    },
    {
        question: "What is Apple's market cap?",
        answer:
            "Apple's current market capitalization is approximately $3.2 trillion, making it one of the most valuable publicly traded companies in the world alongside Microsoft and Nvidia.",
    },
    {
        question: "When is Apple's upcoming earnings report date?",
        answer:
            "Apple is expected to release its next quarterly earnings report on July 25, 2025. The company typically holds its earnings call at 2:00 PM Pacific Time (5:00 PM Eastern Time).",
    },
    {
        question: "How were Apple's earnings last quarter?",
        answer:
            "In its last quarterly report, Apple reported revenue of $94.8 billion and earnings per share (EPS) of $1.52, exceeding analyst expectations by 3.4%. iPhone sales contributed $51.3 billion, while services revenue reached a record $22.3 billion.",
    },
    {
        question: "Is Apple overvalued?",
        answer:
            "Opinions on Apple's valuation vary among analysts. The company currently trades at a P/E ratio of approximately 32x, which is higher than its historical average of 25x. Some analysts believe its services growth and ecosystem justify the premium, while others suggest it may be slightly overvalued at current levels.",
    },
    {
        question: "Does Apple pay dividends?",
        answer:
            "Yes, Apple pays a quarterly dividend. The current dividend yield is approximately 0.5%. Apple has consistently increased its dividend annually since reintroducing it in 2012, and has also conducted significant share buybacks as part of its capital return program.",
    },
    {
        question: "What is Apple's EPS estimate?",
        answer:
            "Analysts' consensus EPS estimate for Apple's current fiscal year is $6.58, representing a projected growth of 7.2% year-over-year. For the next fiscal year, analysts estimate an EPS of $7.12, suggesting continued growth.",
    },
    {
        question: "How many shares outstanding does Apple have?",
        answer:
            "Apple has approximately 15.4 billion shares outstanding. This number has been decreasing over time due to Apple's aggressive share repurchase program, which has bought back over $550 billion worth of shares since the program began.",
    },
    {
        question: "What happened to Apple's price movement after its last earnings report?",
        answer:
            "Following its last earnings report, Apple's stock price initially rose by 5.3% in after-hours trading due to better-than-expected results and an additional $90 billion share repurchase authorization. The stock continued to gain momentum in the following days, rising approximately 8.7% in the week after the announcement.",
    },
    {
        question: "Which hedge fund is a major shareholder of Apple?",
        answer:
            "Warren Buffett's Berkshire Hathaway is one of the largest institutional shareholders of Apple, holding approximately 5.8% of outstanding shares. Other major hedge fund holders include Vanguard Group, BlackRock, and State Street Corporation.",
    },
]

export default function OverviewFAQ() {
    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-6">AAPL FAQ</h1>
            <div className="bg-white rounded-lg border border-gray-100 shadow-[0px_0px_8px_0px_#00000029] ">
                <Accordion type="single" collapsible className="w-full">
                    {faqData.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-0">
                            <AccordionTrigger className="py-4 px-6 text-left font-medium hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4 pt-0 text-gray-600">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
