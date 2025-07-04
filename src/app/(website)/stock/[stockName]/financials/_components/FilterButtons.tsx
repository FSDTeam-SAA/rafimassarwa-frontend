"use client"

import { Button } from "@/components/ui/button"

interface FilterButtonsProps {
  activeFilter: "annual" | "ttm" | "quarterly"
  setFilter: (filter: "annual" | "ttm" | "quarterly") => void
}

export default function FilterButtons({ activeFilter, setFilter }: FilterButtonsProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        className={`rounded-full px-4 ${
          activeFilter === "annual"
            ? "bg-green-500 text-white hover:bg-green-600 hover:text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={() => setFilter("annual")}
      >
        Annual
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`rounded-full px-4 ${
          activeFilter === "ttm"
            ? "bg-green-500 text-white hover:bg-green-600 hover:text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={() => setFilter("ttm")}
      >
        TTM
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`rounded-full px-4 ${
          activeFilter === "quarterly"
            ? "bg-green-500 text-white hover:bg-green-600 hover:text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={() => setFilter("quarterly")}
      >
        Quarterly
      </Button>
    </div>
  )
}
