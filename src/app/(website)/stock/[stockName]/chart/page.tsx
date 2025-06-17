"use client"

import RecentNews from '@/components/overview/news'
import StockPremiumBanner from '@/components/Portfolio/chart/chart-bottom'
import StockChart from '@/components/Portfolio/chart/stock-chart'
import StockHeader from '@/components/Portfolio/chart/stock-header'
import StockList from '@/components/Portfolio/chart/stock-list'
import React, { useState } from 'react'

export default function Page() {

    const [selectedStock, setSelectedStock] = useState<string | undefined>(undefined) // Initialize as undefined
    const [timeframe, setTimeframe] = useState("1Y") // Changed default from 1M to 1Y
    const [comparisonStocks, setComparisonStocks] = useState<string[]>([])

    // Function to handle adding/removing comparison stocks
    const toggleComparisonStock = (symbol: string) => {
        if (symbol === selectedStock) return // Can't compare with itself

        setComparisonStocks((prev) => {
            // If already in comparison, remove it
            if (prev.includes(symbol)) {
                return prev.filter((s) => s !== symbol)
            }
            // Otherwise add it (limit to 3 comparison stocks)
            else if (prev.length < 3) {
                return [...prev, symbol]
            }
            return prev
        })
    }

    // Function to clear all comparison stocks
    const clearComparisons = () => {
        setComparisonStocks([])
    }


    const handleInitialStockSelection = (symbol: string) => {
        if (!selectedStock) { // Only set if not already set (e.g., on first load)
            setSelectedStock(symbol)
        }
    }

    return (
        <main className="flex min-h-screen flex-col lg:p-4 md:p-6 lg:w-[80vw] w-[98vw]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-1">
                <div className="col-span-5">
                    <StockHeader
                        selectedStock={selectedStock}
                        onStockChange={setSelectedStock}
                        timeframe={timeframe}
                        onTimeframeChange={setTimeframe}
                        comparisonStocks={comparisonStocks}
                        onToggleComparison={toggleComparisonStock}
                        onClearComparisons={clearComparisons}
                    />
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
                        <div className="lg:col-span-3">
                            {selectedStock && (
                                <StockChart selectedStock={selectedStock} timeframe={timeframe} comparisonStocks={comparisonStocks} />
                            )}
                        </div>
                        <div className="lg:col-span-1">
                            <StockList
                                selectedStock={selectedStock}
                                onSelectStock={setSelectedStock}
                                onInitialStockLoaded={handleInitialStockSelection} // Pass the new callback
                            />
                        </div>
                    </div>
                    <div className="mt-20">
                        <StockPremiumBanner />
                    </div>
                </div>
                <div className="col-span-2">
                    <RecentNews />
                </div>
            </div>
        </main>
    )
}
