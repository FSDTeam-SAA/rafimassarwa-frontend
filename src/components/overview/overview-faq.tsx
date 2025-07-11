"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data
const faqData = [
    {
        question: "What is the stock market?",
        answer:
            "The stock market is a marketplace where investors can buy and sell shares of publicly traded companies. It helps companies raise capital and provides investors the opportunity to own a piece of a company and benefit from its growth.",
    },
    {
        question: "What is the difference between stocks and ETFs?",
        answer:
            "Stocks represent ownership in a single company, while ETFs (Exchange-Traded Funds) are investment funds that hold a collection of assets like stocks, bonds, or commodities. ETFs allow investors to diversify easily by investing in multiple companies at once.",
    },
    {
        question: "What does market capitalization mean?",
        answer:
            "Market capitalization (market cap) is the total value of a company's outstanding shares of stock. It’s calculated by multiplying the current share price by the total number of shares. Companies are often categorized as small-cap, mid-cap, or large-cap based on this value.",
    },
    {
        question: "How can I start investing in stocks?",
        answer:
            "To start investing, you’ll need to open a brokerage account, deposit funds, and research companies or funds you’re interested in. Many investors start by buying shares of well-known companies or broad market ETFs to diversify their portfolio.",
    },
    {
        question: "What are dividends?",
        answer:
            "Dividends are payments made by some companies to their shareholders, usually from profits. They are often paid quarterly and can provide investors with a steady income stream in addition to any potential stock price growth.",
    },
    {
        question: "What does P/E ratio mean?",
        answer:
            "The price-to-earnings (P/E) ratio measures a company's current share price relative to its per-share earnings. It’s commonly used by investors to evaluate whether a stock may be overvalued or undervalued compared to its earnings.",
    },
    {
        question: "What is a stock split?",
        answer:
            "A stock split occurs when a company increases the number of its outstanding shares by issuing more shares to current shareholders. For example, in a 2-for-1 split, each shareholder gets an extra share for every share they own, and the share price is halved.",
    },
    {
        question: "How do I know if a stock is risky?",
        answer:
            "All stocks carry some level of risk. Factors to consider include the company's financial health, industry trends, past stock price volatility, and market conditions. Diversification and long-term investing can help manage risk.",
    },
    {
        question: "What is a bull market and a bear market?",
        answer:
            "A bull market refers to a period when stock prices are rising or expected to rise, usually by 20% or more from recent lows. A bear market is when prices fall by 20% or more from recent highs, often during economic downturns or negative investor sentiment.",
    },
    {
        question: "How often should I check my investments?",
        answer:
            "It depends on your strategy, but long-term investors typically review their portfolio a few times a year to rebalance or adjust based on goals. Constantly watching daily price changes can lead to emotional decisions that may harm long-term returns.",
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
