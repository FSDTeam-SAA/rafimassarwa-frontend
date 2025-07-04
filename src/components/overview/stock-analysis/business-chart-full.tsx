"use client"

import { useState, useEffect, useCallback } from "react"
import { addDays, subDays, subMonths, subYears, format } from "date-fns"
import BusinessChart from "./businnes-chart"
import TimeRangeFilter from "./time-range-filter"
import MetricsGrid from "./metrics-grid"
import { TimeRange } from "./time-range-filter"


export default function BusinessOverview() {
    const [timeRange, setTimeRange] = useState<TimeRange>("1y")
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const [stockData, setStockData] = useState<any[]>([])
    const [metricsData, setMetricsData] = useState<any>({
        marketCap: "-",
        beta: null,
        employees: null,
        dividendYield: "-",
        revenueGrowth: "-",
        sector: "-",
        averageVolume: "-",
        epsGrowth: "-",
        sectorStrength: null,
        priceToEarnings: null,
        country: "-",
        industry: "-",
    })



    // Generate dates array based on time range
    function generateDates(timeRange: TimeRange): Date[] {
        const today = new Date()
        const dates: Date[] = []

        let startDate: Date
        let interval = 1 // days

        switch (timeRange) {
            case "1d":
                startDate = new Date(today)
                startDate.setHours(9, 30, 0, 0)
                interval = 1 / 24 // hourly
                for (let i = 0; i <= 6.5; i += 0.5) {
                    dates.push(addDays(startDate, i * interval))
                }
                break
            case "5d":
                startDate = subDays(today, 5)
                for (let i = 0; i <= 5; i++) {
                    dates.push(addDays(startDate, i))
                }
                break
            case "1m":
                startDate = subMonths(today, 1)
                for (let i = 0; i <= 30; i += 2) {
                    dates.push(addDays(startDate, i))
                }
                break
            case "3m":
                startDate = subMonths(today, 3)
                for (let i = 0; i <= 90; i += 3) {
                    dates.push(addDays(startDate, i))
                }
                break
            case "6m":
                startDate = subMonths(today, 6)
                for (let i = 0; i <= 180; i += 6) {
                    dates.push(addDays(startDate, i))
                }
                break
            case "ytd":
                startDate = new Date(today.getFullYear(), 0, 1)
                const daysIntoYear = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                for (let i = 0; i <= daysIntoYear; i += Math.max(1, Math.floor(daysIntoYear / 30))) {
                    dates.push(addDays(startDate, i))
                }
                break
            case "1y":
                startDate = subYears(today, 1)
                for (let i = 0; i <= 365; i += 12) {
                    dates.push(addDays(startDate, i))
                }
                break
            case "3y":
                startDate = subYears(today, 3)
                for (let i = 0; i <= 1095; i += 36) {
                    dates.push(addDays(startDate, i))
                }
                break
            default:
                startDate = subYears(today, 1)
                for (let i = 0; i <= 365; i += 12) {
                    dates.push(addDays(startDate, i))
                }
        }

        return dates
    }

    // Generate stock data based on time range
    const generateStockData = useCallback((timeRange: TimeRange) => {
        const dates = generateDates(timeRange)
        let aaplValue = 0
        let spyValue = 0

        switch (timeRange) {
            case '1d':
            case '5d':
                aaplValue = 25
                spyValue = 8
                break
            case '1m':
                aaplValue = 20
                spyValue = 5
                break
            case '3m':
            case '6m':
                aaplValue = 15
                spyValue = 0
                break
            case 'ytd':
            case '1y':
            case '3y':
            default:
                aaplValue = -2
                spyValue = -5
                break
        }

        const data = dates.map((date, index) => {
            if (index > 0) {
                aaplValue += (Math.random() - 0.45) * 2
                spyValue += (Math.random() - 0.48) * 1.2
            }

            if (index % 5 === 0 && aaplValue < spyValue + 10) {
                aaplValue += Math.random() * 3
            }

            if (index % 15 === 0 && Math.random() > 0.7) {
                aaplValue -= Math.random() * 5
                spyValue -= Math.random() * 3
            }

            if (index % 12 === 0 && Math.random() > 0.6) {
                aaplValue += Math.random() * 4
                spyValue += Math.random() * 2
            }

            return {
                date: format(date, 'MMM dd'),
                fullDate: format(date, 'MMM dd, yyyy'),
                aapl: Number.parseFloat(aaplValue.toFixed(2)),
                spy: Number.parseFloat(spyValue.toFixed(2)),
            }
        })

        return data
    }, [])  // Empty dependency array ensures it only gets created once

    useEffect(() => {
        // Generate dummy data based on selected time range
        const data = generateStockData(timeRange)
        setStockData(data)

        // Get metrics data
        const metrics = getMetricsData()
        setMetricsData(metrics)
    }, [timeRange, generateStockData])
    // Get metrics data
    function getMetricsData() {
        return {
            marketCap: "$3.28T",
            beta: 0.97,
            employees: 164000,
            dividendYield: "0.46%",
            revenueGrowth: "2.61%",
            sector: "Technology",
            averageVolume: "51.13M",
            epsGrowth: "-2.14%",
            sectorStrength: 49,
            priceToEarnings: 34.7,
            country: "US",
            industry: "Hardware & Equipment",
        }
    }

    return (
        <main className="container">
            <h1 className="text-3xl font-bold mb-6">Apple Business Overview & Revenue Model</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <TimeRangeFilter selectedRange={timeRange} onRangeChange={setTimeRange} />

                <div className="h-[400px] mt-4">
                    <BusinessChart data={stockData} />
                </div>

                <div className="mt-6">
                    <MetricsGrid data={metricsData} />
                </div>
            </div>
        </main>
    )
}
