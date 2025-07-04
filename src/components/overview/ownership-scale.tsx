"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

// This would come from your API or data source
const dummyData = {
    score: 4,
    maxScore: 10,
}

// Map scores to labels
const getScoreLabel = (score: number): string => {
    if (score <= 3) return "Bearish"
    if (score <= 5) return "Neutral"
    if (score <= 7) return "Bullish"
    return "Very Bullish"
}

// Colors for the scale segments
const scaleColors = [
    "bg-[#b0a48a]", // 1 - brownish
    "bg-[#f0d878]", // 2 - yellow
    "bg-[#f8ecc0]", // 3 - cream
    "bg-[#78c0f0]", // 4 - blue
    "bg-[#c0e0f8]", // 5 - light blue
    "bg-[#60a8e0]", // 6 - blue
    "bg-[#607890]", // 7 - gray/blue
    "bg-[#f8d0d0]", // 8 - pink
    "bg-[#f89078]", // 9 - coral
    "bg-[#a08070]", // 10 - brown
]

export default function ScoreVisualization() {
    // In a real app, you'd fetch this data or pass it as props
    const [data, setData] = useState(dummyData)

    console.log(setData);
    // Calculate the position percentage for the arrow
    const arrowPosition = ((data.score - 0.5) / data.maxScore) * 100

    // Get the appropriate label based on the score
    const scoreLabel = getScoreLabel(data.score)

    return (
        <Card className="w-full mx-auto shadow-md">
            <CardContent className="pt-4 px-0 pb-0">
                <div className="flex items-start gap-4 px-4">
                    {/* Score octagon indicator */}
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 flex items-center justify-center text-blue-700 font-bold text-xl border-2 border-blue-700 rounded-lg relative">
                            {/* Create octagon shape with pseudo-elements */}
                            <div
                                className="absolute inset-0 border-2 border-blue-700 rounded-lg"
                                style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}
                            ></div>
                            <span className="relative z-10">{data.score}</span>
                        </div>
                    </div>

                    {/* Score visualization */}
                    <div className="flex-grow space-y-2">
                        {/* Score label */}
                        <div className="text-center text-blue-600 font-medium mb-4">{scoreLabel}</div>

                        {/* Score indicator and scale */}
                        <div className="relative">
                            {/* Scale with numbers */}
                            <div className="flex justify-between mb-1 text-gray-500">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className="text-sm w-6 text-center">
                                        {i + 1}
                                    </div>
                                ))}
                            </div>

                            {/* Scale */}
                            <div className="flex h-6 rounded-sm overflow-hidden">
                                {/* Generate 10 segments with different colors */}
                                {scaleColors.map((color, i) => (
                                    <div key={i} className={cn("flex-1 h-full", color)} />
                                ))}
                            </div>

                            {/* Arrow indicator - positioned below the scale but pointing up */}
                            <div
                                className="absolute bottom-0 z-10 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-black"
                                style={{ left: `${arrowPosition}%`, transform: "translateX(-50%) translateY(100%)" }}
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center w-full mt-6 text-[#2695FF] py-2 bg-[#B0B0B0] rounded-b-md border-t">
                    <Link href={""}>Show more</Link>
                </div>
            </CardContent>
        </Card>
    )
}
