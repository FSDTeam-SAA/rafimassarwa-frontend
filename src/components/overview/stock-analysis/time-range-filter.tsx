"use client"


import { cn } from "@/lib/utils"


export type TimeRange = "1d" | "5d" | "1m" | "3m" | "6m" | "ytd" | "1y" | "3y"

interface TimeRangeFilterProps {
    selectedRange: TimeRange
    onRangeChange: (range: TimeRange) => void
}

const timeRanges: { value: TimeRange; label: string }[] = [
    { value: "1d", label: "1d" },
    { value: "5d", label: "5d" },
    { value: "1m", label: "1m" },
    { value: "3m", label: "3m" },
    { value: "6m", label: "6m" },
    { value: "ytd", label: "YTD" },
    { value: "1y", label: "1y" },
    { value: "3y", label: "3y" },
]

export default function TimeRangeFilter({ selectedRange, onRangeChange }: TimeRangeFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
                <button
                    key={range.value}
                    onClick={() => onRangeChange(range.value)}
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded transition-colors",
                        selectedRange === range.value ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300",
                    )}
                >
                    {range.label}
                </button>
            ))}
        </div>
    )
}
