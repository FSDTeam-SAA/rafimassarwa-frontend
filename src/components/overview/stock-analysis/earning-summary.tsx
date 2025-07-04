import { CheckCircle2 } from "lucide-react"
import { MdSubdirectoryArrowRight } from "react-icons/md"
import { RxCross2 } from "react-icons/rx";


// Define types for our earnings data
type EarningsData = {
    companyName: string
    callDate: string
    percentChange: number
    nextCallDate: string
    sentiment: "Positive" | "Neutral" | "Negative"
    summary: string
    highlights: Highlight[]
    lowlights: Lowlight[]
}

type Highlight = {
    title: string
    description: string
}

type Lowlight = {
    title: string
    description: string
}

export default function EarningsCallSummary() {
    // Earnings call data
    const earningsData: EarningsData = {
        companyName: "AAPL",
        callDate: "Jan 30, 2025",
        percentChange: -8.03,
        nextCallDate: "Apr 24, 2025",
        sentiment: "Positive",
        summary:
            "The earnings call reflected a strong overall performance with record-breaking revenue and growth in services and emerging markets. However, challenges in China and a decline in wearables revenue presented some areas of concern.",
        highlights: [
            {
                title: "Record-Breaking Revenue and Growth",
                description:
                    "TechNova reported revenue of $124.3 billion for the December quarter, up 4% from a year ago, marking an all-time record. EPS also set an all-time record of $2.40, 10% higher year-over-year.",
            },
            {
                title: "Strong Performance in Emerging Markets",
                description:
                    "TechNova achieved all-time revenue records in emerging markets such as Latin America, the Middle East, and South Asia. India set a December quarter record with the NexPhone as the top-selling model.",
            },
            {
                title: "Services Revenue Surge",
                description:
                    "Services revenue reached an all-time record of $26.3 billion, up 14% year-over-year, with growth in every geographic segment and increased customer engagement.",
            },
            {
                title: "Mac and iPad Growth",
                description:
                    "Mac revenue was $9 billion, up 16% year-over-year, while iPad revenue was $8.1 billion, up 15% year-over-year, driven by new product launches and strong customer interest.",
            },
        ],
        lowlights: [
            {
                title: "Challenges in China",
                description: "Greater China revenue decreased by 11% year-over-year, with over half of the decline driven by changes in channel inventory and competitive pressures."

            },
            {
                title: "Wearables Revenue Decline",
                description: "Wearables, home, and accessories revenue was $11.7 billion, down 2% year-over-year, partly due to difficult comparisons with the prior year's launch of the Apple Watch Ultra 2."
            }
        ]
    }

    // Function to determine text color based on percentage
    const getPercentageColor = (percentage: number) => {
        return percentage >= 0 ? "text-green-600" : "text-red-600"
    }

    // Function to format percentage with + or - sign
    const formatPercentage = (percentage: number) => {
        return percentage >= 0 ? `+${percentage.toFixed(2)}%` : `${percentage.toFixed(2)}%`
    }

    // Function to determine sentiment color
    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case "Positive":
                return "text-green-600"
            case "Negative":
                return "text-red-600"
            default:
                return "text-yellow-600"
        }
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">{earningsData.companyName} Earnings Call Summary</h1>

            <div className="px-4 py-4 shadow-[0px_0px_10px_1px_#0000001A]">
                <div className="py-6 mb-6">
                    <div className="text-base md:text-lg mb-4">
                        <span className="font-semibold">Earnings Call Date:</span> {earningsData.callDate} |{" "}
                        <span className="font-semibold">% Change Since:</span>{" "}
                        <span className={getPercentageColor(earningsData.percentChange)}>
                            {formatPercentage(earningsData.percentChange)}
                        </span>{" "}
                        | <span className="font-semibold">Next Earnings Date:</span> {earningsData.nextCallDate}
                    </div>

                    <div className="text-lg md:text-xl font-semibold mb-4">
                        Earnings Call Sentiment |{" "}
                        <span className={getSentimentColor(earningsData.sentiment)}>{earningsData.sentiment}</span>
                    </div>

                    <p className="text-gray-700">{earningsData.summary}</p>
                </div>


                {/* Highlights Part */}
                <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Highlights</h2>

                    <div className="space-y-6">
                        {earningsData.highlights.map((highlight, index) => (
                            <div key={index} className="flex gap-3">
                                <div className="flex-shrink-0 text-green-600 mt-1">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                                    <p className="text-gray-700 flex justify-start">
                                        <MdSubdirectoryArrowRight className="h-10 w-10" />
                                        {highlight.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lowlights Part */}
                <div className="space-y-6 mt-10 pb-10 border-b border-dashed">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Lowlights</h2>

                    {earningsData.lowlights.map((lowlight, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <div className="flex-shrink-0 ">
                                <RxCross2 className="h-7 w-7 p-1 text-white bg-red-500 mt-1 rounded-full" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{lowlight.title}</h3>
                                <p className="text-gray-700 flex justify-start">
                                    <MdSubdirectoryArrowRight className="h-10 w-10" />
                                    {lowlight.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Company Guidance Part */}
                <div className="my-10">
                    <h2 className="text-xl md:text-2xl font-bold mb-6">Company Guidance</h2>

                    <p className="text-sm text-[#4B4B4B] leading-[150%]">During the Apple Q1 Fiscal Year 2025 Earnings Conference Call, Apple reported a record revenue of $124.3 billion, a 4% increase from the previous year, with EPS reaching an all-time high of $2.40, up 10% year-over-year. The company set all-time revenue records in several regions, including the Americas, Europe, Japan, and the rest of Asia Pacific, and observed strong momentum in emerging markets such as Latin America and South Asia. Services revenue achieved an all-time high of $26.3 billion, growing 14% year-over- year. Apple also highlighted its installed base reaching over 2.35 billion active devices. Product-wise, iPhone revenue was $69.1 billion, Mac revenue rose by 16% to $9 billion, and iPad revenue increased by 15% to $8.1 billion. Despite a 2% year-over-year decline, wearables, home, and accessories revenue stood at $11.7 billion. The company maintained a robust gross margin of 46.9% and reported operating expenses of $15.4 billion. Looking ahead, Apple anticipates low to mid-single-digit revenue growth in the March quarter, with services revenue expected to grow in low-double digits, despite facing foreign exchange headwinds.</p>

                </div>
            </div>
        </div>
    )
}
