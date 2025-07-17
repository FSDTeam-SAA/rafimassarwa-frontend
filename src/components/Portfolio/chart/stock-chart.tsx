"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as echarts from "echarts"
import { Card } from "@/components/ui/card"
import { Loader2, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface StockChartProps {
    selectedStock: string
    timeframe: string
    comparisonStocks?: string[]
}

interface ApiResponse {
    o: number[] // open
    h: number[] // high
    l: number[] // low
    c: number[] // close
    v: number[] // volume
    t: number[] // timestamp
    s: string // status
}

type ChartType = "line" | "area" | "candlestick" | "bar" | "step" | "baseline"

const chartTypeOptions = [
    { value: "area", label: "Area", icon: "📈" },
    { value: "line", label: "Line", icon: "📊" },
    { value: "candlestick", label: "Candle", icon: "🕯️" },
    { value: "bar", label: "Bar", icon: "📊" },
    { value: "step", label: "Step", icon: "📶" },
    { value: "baseline", label: "Baseline", icon: "📉" },
]

export default function StockChart({ selectedStock, timeframe, comparisonStocks = [] }: StockChartProps) {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartInstanceRef = useRef<echarts.ECharts | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chartData, setChartData] = useState<{ [key: string]: any }>({})
    const [loading, setLoading] = useState(false)
    const [chartType, setChartType] = useState<ChartType>("area")

    // Primary green colors for the main stock chart
    const primaryGreen = "#1EAD00"
    const primaryGreenWithOpacity = "rgba(30, 173, 0, 0.38)"

    // Convert timeframe to API parameters, memoized for stability
    const getTimeframeParams = useCallback((timeframe: string) => {
        const now = Math.floor(Date.now() / 1000)
        let from: number
        let resolution: string

        switch (timeframe) {
            case "1D":
                from = now - 24 * 60 * 60
                resolution = "5"
                break
            case "5D":
                from = now - 5 * 24 * 60 * 60
                resolution = "15"
                break
            case "1M":
                from = now - 30 * 24 * 60 * 60
                resolution = "60"
                break
            case "3M":
                from = now - 90 * 24 * 60 * 60
                resolution = "D"
                break
            case "6M":
                from = now - 180 * 24 * 60 * 60
                resolution = "D"
                break
            case "YTD":
                const ytdStart = new Date()
                ytdStart.setMonth(0, 1)
                ytdStart.setHours(0, 0, 0, 0)
                from = Math.floor(ytdStart.getTime() / 1000)
                resolution = "D"
                break
            case "1Y":
                from = now - 365 * 24 * 60 * 60
                resolution = "D"
                break
            case "5Y":
                from = now - 5 * 365 * 24 * 60 * 60
                resolution = "W"
                break
            default:
                from = now - 365 * 24 * 60 * 60
                resolution = "D"
        }

        return { from, to: now, resolution }
    }, [])

    // Transform API data to ECharts format, memoized for stability
    const transformApiData = useCallback(
        (
            apiData: ApiResponse,
        ): {
            priceData: [number, number][]
            ohlcData: [number, number, number, number, number][]
            volumeData: [number, number][]
        } => {
            const priceData: [number, number][] = []
            const ohlcData: [number, number, number, number, number][] = []
            const volumeData: [number, number][] = []

            for (let i = 0; i < apiData.t.length; i++) {
                const timestamp = apiData.t[i] * 1000 // Convert to milliseconds
                const open = apiData.o[i]
                const high = apiData.h[i]
                const low = apiData.l[i]
                const close = apiData.c[i]
                const volume = apiData.v[i]

                priceData.push([timestamp, close])
                ohlcData.push([timestamp, open, close, low, high])
                volumeData.push([timestamp, volume])
            }

            return { priceData, ohlcData, volumeData }
        },
        [],
    )

    // Function to normalize data for comparison, memoized for stability
    const normalizeData = useCallback((data: [number, number][]): [number, number][] => {
        if (data.length === 0) return []
        const firstValue = data[0][1]
        return data.map((item) => [item[0], (item[1] / firstValue) * 100])
    }, [])

    // Get color for a comparison stock, with comparisonColors defined inside for stability
    const getComparisonColor = useCallback((symbol: string): string => {
        const comparisonColors = {
            AAPL: "#f43f5e", // Red
            NVDA: "#10b981", // Green
            MSFT: "#3b82f6", // Blue
            GOOGL: "#f97316", // Orange
            AMZN: "#8b5cf6", // Purple
            TSLA: "#ec4899", // Pink
            META: "#facc15", // Yellow
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (comparisonColors as any)[symbol] || "#f43f5e"
    }, []) // No dependencies needed as comparisonColors is internal to this callback

    // Fetch data from API without fallback to dummy data, memoized for stability
    const fetchStockData = useCallback(
        async (symbol: string, timeframe: string): Promise<ApiResponse | null> => {
            try {
                const { from, to, resolution } = getTimeframeParams(timeframe)
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/portfolio/chart?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`
                const response = await fetch(apiUrl)
                const contentType = response.headers.get("content-type")

                if (!contentType || !contentType.includes("application/json")) {
                    console.warn(`API returned non-JSON response for ${symbol}.`)
                    return null // Indicate failure
                }

                if (!response.ok) {
                    console.warn(`API request failed with status ${response.status} for ${symbol}.`)
                    return null // Indicate failure
                }

                const data: ApiResponse = await response.json()

                if (data.s !== "ok") {
                    console.warn(`API returned error status: ${data.s} for ${symbol}.`)
                    return null // Indicate failure
                }

                return data
            } catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error)
                return null
            }
        },
        [getTimeframeParams],
    )

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newChartData: { [key: string]: any } = {}

            const mainData = await fetchStockData(selectedStock, timeframe)
            if (mainData) {
                newChartData[selectedStock] = transformApiData(mainData)
            } else {
                newChartData[selectedStock] = undefined
            }

            for (const stock of comparisonStocks) {
                const compData = await fetchStockData(stock, timeframe)
                if (compData) {
                    newChartData[stock] = transformApiData(compData)
                }
            }

            setChartData(newChartData)
            setLoading(false)
        }

        loadData()
    }, [selectedStock, timeframe, comparisonStocks, fetchStockData, transformApiData])

    useEffect(() => {
        if (chartRef.current && !chartInstanceRef.current) {
            chartInstanceRef.current = echarts.init(chartRef.current)

            const handleResize = () => {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.resize()
                }
            }

            window.addEventListener("resize", handleResize)

            return () => {
                window.removeEventListener("resize", handleResize)
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.dispose()
                    chartInstanceRef.current = null
                }
            }
        }
    }, [])

    useEffect(() => {
        if (!chartInstanceRef.current || loading) return

        const mainStockData = chartData[selectedStock]
        if (!mainStockData) {
            chartInstanceRef.current.setOption(
                {
                    xAxis: { show: false },
                    yAxis: { show: false },
                    grid: { show: false },
                    series: [],
                },
                true,
            )
            return
        }

        const { priceData, ohlcData, volumeData } = mainStockData
        const series = []

        // Create main series based on chart type
        const baseSeriesConfig = {
            name: selectedStock,
            smooth: chartType !== "step" && chartType !== "bar",
            symbol: "none",
            sampling: "average",
            itemStyle: {
                color: primaryGreen,
            },
            data: comparisonStocks.length > 0 ? normalizeData(priceData) : priceData,
        }

        switch (chartType) {
            case "area":
                series.push({
                    ...baseSeriesConfig,
                    type: "line",
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: primaryGreenWithOpacity,
                            },
                            {
                                offset: 0.9893,
                                color: "#FFFFFF",
                            },
                        ]),
                    },
                })
                break
            case "line":
                series.push({
                    ...baseSeriesConfig,
                    type: "line",
                })
                break
            case "candlestick":
                series.push({
                    name: selectedStock,
                    type: "candlestick",
                    data: comparisonStocks.length > 0 ? normalizeData(priceData) : ohlcData,
                    itemStyle: {
                        color: primaryGreen,
                        color0: "#f43f5e",
                        borderColor: primaryGreen,
                        borderColor0: "#f43f5e",
                    },
                })
                break
            case "bar":
                series.push({
                    ...baseSeriesConfig,
                    type: "bar",
                    symbol: undefined,
                    smooth: false,
                })
                break
            case "step":
                series.push({
                    ...baseSeriesConfig,
                    type: "line",
                    step: "end",
                    smooth: false,
                })
                break
            case "baseline":
                series.push({
                    ...baseSeriesConfig,
                    type: "line",
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: primaryGreenWithOpacity,
                            },
                            {
                                offset: 1,
                                color: "rgba(30, 173, 0, 0.1)",
                            },
                        ]),
                        origin: "start",
                    },
                })
                break
        }

        // Add comparison stocks if any are present and have data
        if (comparisonStocks.length > 0) {
            comparisonStocks.forEach((stockSymbol) => {
                if (chartData[stockSymbol]) {
                    const comparisonData = chartData[stockSymbol].priceData
                    const normalizedData = normalizeData(comparisonData)
                    const stockColor = getComparisonColor(stockSymbol)

                    series.push({
                        name: stockSymbol,
                        type: "line",
                        smooth: true,
                        symbol: "none",
                        sampling: "average",
                        itemStyle: {
                            color: stockColor,
                        },
                        data: normalizedData,
                    })
                }
            })
        }

        // Add volume series to the chart
        series.push({
            name: "Volume",
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 1,
            z: -1,
            itemStyle: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                color: (params: any) => {
                    const priceIndex = params.dataIndex
                    if (priceIndex > 0 && priceData[priceIndex] && priceData[priceIndex - 1]) {
                        return priceData[priceIndex][1] >= priceData[priceIndex - 1][1] ? "#10b981" : "#f43f5e"
                    }
                    return "#10b981"
                },
                opacity: 0.3,
            },
            data: volumeData,
        })

        // Configure ECharts options
        const option = {
            animation: true,
            tooltip: {
                trigger: "axis",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                position: (pt: any) => [pt[0], "10%"],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter: (params: any) => {
                    const date = new Date(params[0].value[0])
                    let tooltipText = `<div style="font-weight: bold">${date.toLocaleDateString()}</div>`

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const priceParams = params.filter((param: any) => param.seriesName !== "Volume")

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    priceParams.forEach((param: any) => {
                        const color = param.color
                        const seriesName = param.seriesName
                        const value = param.value[1]

                        if (comparisonStocks.length > 0) {
                            tooltipText += `<div style="display: flex; align-items: center;">
                                <span style="display: inline-block; width: 10px; height: 10px; background: ${color}; margin-right: 5px;"></span>
                                <span>${seriesName}: ${value.toFixed(2)}%</span>
                            </div>`
                        } else {
                            tooltipText += `<div style="display: flex; align-items: center;">
                                <span style="display: inline-block; width: 10px; height: 10px; background: ${color}; margin-right: 5px;"></span>
                                <span>${seriesName}: $${value.toFixed(2)}</span>
                            </div>`
                        }
                    })

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const volumeParam = params.find((param: any) => param.seriesName === "Volume")
                    if (volumeParam) {
                        tooltipText += `<div style="display: flex; align-items: center; margin-top: 5px;">
                              <span>Volume: ${volumeParam.value[1].toLocaleString()}</span>
                          </div>`
                    }

                    return tooltipText
                },
            },
            title: {
                left: "center",
                text: comparisonStocks.length > 0 ? `${selectedStock} Comparison` : `${selectedStock} Stock Price`,
                textStyle: {
                    fontSize: 16,
                    fontWeight: "normal",
                },
            },
            legend: {
                data: [selectedStock, ...comparisonStocks],
                bottom: 10,
                textStyle: {
                    color: "#666",
                },
                itemStyle: {
                    opacity: 1,
                },
                inactiveColor: "#ccc",
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: "none",
                    },
                    restore: {},
                    saveAsImage: {},
                },
            },
            axisPointer: {
                link: { xAxisIndex: "all" },
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "60px",
                top: "15%",
                containLabel: true,
            },
            xAxis: {
                type: "time",
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: true },
            },
            yAxis: [
                {
                    type: "value",
                    position: "right",
                    boundaryGap: [0, "100%"],
                    axisLabel: {
                        formatter: (value: number) => {
                            if (comparisonStocks.length > 0) {
                                return `${value.toFixed(0)}%`
                            }
                            return `$${value.toFixed(0)}`
                        },
                    },
                    splitLine: { show: true },
                },
                {
                    type: "value",
                    position: "right",
                    scale: true,
                    name: "Volume",
                    nameLocation: "end",
                    nameGap: 15,
                    nameTextStyle: {
                        color: "#999",
                        fontSize: 10,
                    },
                    boundaryGap: [0, "100%"],
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                },
            ],
            dataZoom: [
                {
                    type: "inside",
                    start: 0,
                    end: 100,
                    xAxisIndex: [0],
                    zoomLock: false,
                },
                {
                    type: "slider",
                    start: 0,
                    end: 100,
                    height: 20,
                    bottom: 30,
                    borderColor: "transparent",
                    backgroundColor: "#f5f5f5",
                    fillerColor: "rgba(200, 200, 200, 0.3)",
                    handleStyle: {
                        color: "#ddd",
                        borderColor: "#ccc",
                    },
                    moveHandleStyle: {
                        color: "#aaa",
                    },
                    emphasis: {
                        handleStyle: {
                            color: "#999",
                        },
                    },
                },
            ],
            series: series,
        }

        chartInstanceRef.current.setOption(option, true)
    }, [
        chartData,
        selectedStock,
        timeframe,
        comparisonStocks,
        loading,
        getComparisonColor,
        normalizeData,
        primaryGreen,
        primaryGreenWithOpacity,
        chartType,
    ])

    const selectedChartType = chartTypeOptions.find((option) => option.value === chartType)

    return (
        <Card className="relative w-full">
            {/* Chart Type Dropdown */}
            <div className="absolute md:-top-[105px] lg:-top-[104px] -top-[176px] left-36 z-20">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                            <span className="mr-2">{selectedChartType?.icon}</span>
                            {selectedChartType?.label}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        {chartTypeOptions.map((option) => (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => setChartType(option.value as ChartType)}
                                className={chartType === option.value ? "bg-accent" : ""}
                            >
                                <span className="mr-2">{option.icon}</span>
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {loading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <Loader2 className="h-12 w-12 animate-spin text-green-500" />
                </div>
            )}

            {/* Display "Data not available" if not loading and main stock data is missing */}
            {!loading && !chartData[selectedStock] && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <div className="text-sm text-muted-foreground text-center">
                        <p>Data not available for **{selectedStock}**.</p>
                        <p>Please try again later or select a different stock.</p>
                    </div>
                </div>
            )}

            <div ref={chartRef} className="h-[500px] w-full" />
        </Card>
    )
}
