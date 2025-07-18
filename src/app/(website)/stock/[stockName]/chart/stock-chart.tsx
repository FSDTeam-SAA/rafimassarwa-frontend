"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as echarts from "echarts"
import { Card } from "@/components/ui/card"
import { Loader2, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface StockChartProps {
    selectedStock: string
    timeframe: string
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

type ChartType =
    | "line"
    | "area"
    | "candlestick"
    | "bar"
    | "colored-bar"
    | "vertex-line"
    | "step"
    | "baseline"
    | "hollow-candle"
    | "volume-candle"
    | "colored-hlc-bar"
    | "scatterplot"
    | "histogram"
    | "heikin-ashi"
    | "kagi"
    | "line-break"
    | "renko"
    | "range-bars"
    | "point-figure"

const basicChartTypes = [
    { value: "area", label: "Area", icon: "📊" },
    { value: "line", label: "Line", icon: "📈" },
    { value: "candlestick", label: "Candle", icon: "🕯️" },
    { value: "bar", label: "Bar", icon: "📊" },
    { value: "colored-bar", label: "Colored Bar", icon: "🎨" },
    { value: "vertex-line", label: "Vertex Line", icon: "⚡" },
    { value: "step", label: "Step", icon: "📶" },
    { value: "baseline", label: "Baseline", icon: "📉" },
    { value: "hollow-candle", label: "Hollow Candle", icon: "🕳️" },
    { value: "volume-candle", label: "Volume Candle", icon: "📊" },
    { value: "colored-hlc-bar", label: "Colored HLC Bar", icon: "🌈" },
    { value: "scatterplot", label: "Scatterplot", icon: "⚪" },
    { value: "histogram", label: "Histogram", icon: "📊" },
]

const aggregatedChartTypes = [
    { value: "heikin-ashi", label: "Heikin Ashi", icon: "🎌" },
    { value: "kagi", label: "Kagi", icon: "📐" },
    { value: "line-break", label: "Line Break", icon: "📏" },
    { value: "renko", label: "Renko", icon: "🧱" },
    { value: "range-bars", label: "Range Bars", icon: "📏" },
    { value: "point-figure", label: "Point & Figure", icon: "⭕" },
]

export default function EnhancedStockChart({ selectedStock, timeframe }: StockChartProps) {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartInstanceRef = useRef<echarts.ECharts | null>(null)
    const [chartData, setChartData] = useState<{
        priceData: [number, number][]
        ohlcData: [number, number, number, number, number][]
        volumeData: [number, number][]
        hlcData: [number, number, number, number][]
    } | null>(null)
    const [loading, setLoading] = useState(false)
    const [chartType, setChartType] = useState<ChartType>("area")

    // Primary green colors for the main stock chart
    const primaryGreen = "#1EAD00"
    const primaryGreenWithOpacity = "rgba(30, 173, 0, 0.38)"

    // Convert timeframe to API parameters
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

    // Transform API data to ECharts format
    const transformApiData = useCallback((apiData: ApiResponse) => {
        const priceData: [number, number][] = []
        const ohlcData: [number, number, number, number, number][] = []
        const volumeData: [number, number][] = []
        const hlcData: [number, number, number, number][] = []

        for (let i = 0; i < apiData.t.length; i++) {
            const timestamp = apiData.t[i] * 1000
            const open = apiData.o[i]
            const high = apiData.h[i]
            const low = apiData.l[i]
            const close = apiData.c[i]
            const volume = apiData.v[i]

            priceData.push([timestamp, close])
            ohlcData.push([timestamp, open, close, low, high])
            hlcData.push([timestamp, high, low, close])
            volumeData.push([timestamp, volume])
        }

        return { priceData, ohlcData, volumeData, hlcData }
    }, [])

    // Calculate Heikin Ashi values
    const calculateHeikinAshi = useCallback((ohlcData: [number, number, number, number, number][]) => {
        const haData: [number, number, number, number, number][] = []

        for (let i = 0; i < ohlcData.length; i++) {
            const [timestamp, open, close, low, high] = ohlcData[i]
            let haOpen

            if (i === 0) {
                haOpen = (open + close) / 2
            } else {
                haOpen = (haData[i - 1][1] + haData[i - 1][2]) / 2
            }

            const haClose = (open + high + low + close) / 4
            const haHigh = Math.max(high, haOpen, haClose)
            const haLow = Math.min(low, haOpen, haClose)

            haData.push([timestamp, haOpen, haClose, haLow, haHigh])
        }

        return haData
    }, [])

    // Calculate Renko bricks
    const calculateRenko = useCallback((priceData: [number, number][], brickSize = 1) => {
        const renkoData: [number, number, number, number, number][] = []
        let currentPrice = priceData[0][1]

        for (let i = 1; i < priceData.length; i++) {
            const [timestamp, price] = priceData[i]
            const priceDiff = price - currentPrice

            if (Math.abs(priceDiff) >= brickSize) {
                const bricks = Math.floor(Math.abs(priceDiff) / brickSize)
                for (let j = 0; j < bricks; j++) {
                    const brickStart = currentPrice + j * brickSize * Math.sign(priceDiff)
                    const brickEnd = brickStart + brickSize * Math.sign(priceDiff)
                    renkoData.push([
                        timestamp,
                        brickStart,
                        brickEnd,
                        Math.min(brickStart, brickEnd),
                        Math.max(brickStart, brickEnd),
                    ])
                }
                currentPrice = currentPrice + bricks * brickSize * Math.sign(priceDiff)
            }
        }

        return renkoData
    }, [])

    // Fetch data from API
    const fetchStockData = useCallback(
        async (symbol: string, timeframe: string): Promise<ApiResponse | null> => {
            try {
                const { from, to, resolution } = getTimeframeParams(timeframe)
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/portfolio/chart?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`

                const response = await fetch(apiUrl)
                const contentType = response.headers.get("content-type")

                if (!contentType || !contentType.includes("application/json")) {
                    console.warn(`API returned non-JSON response for ${symbol}.`)
                    return null
                }

                if (!response.ok) {
                    console.warn(`API request failed with status ${response.status} for ${symbol}.`)
                    return null
                }

                const data: ApiResponse = await response.json()

                if (data.s !== "ok") {
                    console.warn(`API returned error status: ${data.s} for ${symbol}.`)
                    return null
                }

                return data
            } catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error)
                return null
            }
        },
        [getTimeframeParams],
    )

    // Load data when selectedStock or timeframe changes
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const data = await fetchStockData(selectedStock, timeframe)
            if (data) {
                setChartData(transformApiData(data))
            } else {
                setChartData(null)
            }
            setLoading(false)
        }

        loadData()
    }, [selectedStock, timeframe, fetchStockData, transformApiData])

    // Initialize ECharts instance
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

    // Update ECharts options
    useEffect(() => {
        if (!chartInstanceRef.current || loading) return

        if (!chartData) {
            chartInstanceRef.current.setOption(
                {
                    title: {
                        text: "Data not available",
                        left: "center",
                        top: "center",
                        textStyle: {
                            color: "#999",
                            fontSize: 20,
                        },
                    },
                    xAxis: { show: false },
                    yAxis: { show: false },
                    grid: { show: false },
                    series: [],
                },
                true,
            )
            return
        }

        const { priceData, ohlcData, volumeData, hlcData } = chartData
        const series = []

        // Create main series based on chart type
        const baseSeriesConfig = {
            name: selectedStock,
            smooth: !["step", "bar", "histogram"].includes(chartType),
            symbol: "none",
            sampling: "average",
            itemStyle: {
                color: primaryGreen,
            },
            data: priceData,
        }

        switch (chartType) {
            case "area":
                series.push({
                    ...baseSeriesConfig,
                    type: "line",
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: primaryGreenWithOpacity },
                            { offset: 0.9893, color: "#FFFFFF" },
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
                    data: ohlcData,
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

            case "colored-bar":
                series.push({
                    ...baseSeriesConfig,
                    type: "bar",
                    symbol: undefined,
                    smooth: false,
                    itemStyle: {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        color: (params: any) => {
                            const index = params.dataIndex
                            if (index > 0 && priceData[index] && priceData[index - 1]) {
                                return priceData[index][1] >= priceData[index - 1][1] ? primaryGreen : "#f43f5e"
                            }
                            return primaryGreen
                        },
                    },
                })
                break

            case "vertex-line":
                series.push({
                    ...baseSeriesConfig,
                    type: "line",
                    symbol: "circle",
                    symbolSize: 4,
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
                            { offset: 0, color: primaryGreenWithOpacity },
                            { offset: 1, color: "rgba(30, 173, 0, 0.1)" },
                        ]),
                        origin: "start",
                    },
                })
                break

            case "hollow-candle":
                series.push({
                    name: selectedStock,
                    type: "candlestick",
                    data: ohlcData,
                    itemStyle: {
                        color: "transparent",
                        color0: "transparent",
                        borderColor: primaryGreen,
                        borderColor0: "#f43f5e",
                        borderWidth: 2,
                    },
                })
                break

            case "volume-candle":
                series.push({
                    name: selectedStock,
                    type: "candlestick",
                    data: ohlcData,
                    itemStyle: {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        color: (params: any) => {
                            const volume = volumeData[params.dataIndex]?.[1] || 0
                            const maxVolume = Math.max(...volumeData.map((v: [number, number]) => v[1]))
                            const opacity = Math.max(0.3, volume / maxVolume)
                            return `rgba(30, 173, 0, ${opacity})`
                        },
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        color0: (params: any) => {
                            const volume = volumeData[params.dataIndex]?.[1] || 0
                            const maxVolume = Math.max(...volumeData.map((v: [number, number]) => v[1]))
                            const opacity = Math.max(0.3, volume / maxVolume)
                            return `rgba(244, 63, 94, ${opacity})`
                        },
                        borderColor: primaryGreen,
                        borderColor0: "#f43f5e",
                    },
                })
                break

            case "colored-hlc-bar":
                series.push({
                    name: selectedStock,
                    type: "custom",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    renderItem: (params: any, api: any) => {
                        const [timestamp, high, low, close] = hlcData[params.dataIndex]
                        const point = api.coord([timestamp, close])
                        const highPoint = api.coord([timestamp, high])
                        const lowPoint = api.coord([timestamp, low])

                        const color =
                            params.dataIndex > 0 && hlcData[params.dataIndex - 1]
                                ? close >= hlcData[params.dataIndex - 1][2]
                                    ? primaryGreen
                                    : "#f43f5e"
                                : primaryGreen

                        return {
                            type: "group",
                            children: [
                                {
                                    type: "line",
                                    shape: {
                                        x1: point[0],
                                        y1: highPoint[1],
                                        x2: point[0],
                                        y2: lowPoint[1],
                                    },
                                    style: { stroke: color, lineWidth: 1 },
                                },
                                {
                                    type: "line",
                                    shape: {
                                        x1: point[0] - 3,
                                        y1: point[1],
                                        x2: point[0] + 3,
                                        y2: point[1],
                                    },
                                    style: { stroke: color, lineWidth: 2 },
                                },
                            ],
                        }
                    },
                    data: hlcData,
                })
                break

            case "scatterplot":
                series.push({
                    ...baseSeriesConfig,
                    type: "scatter",
                    symbol: "circle",
                    symbolSize: 6,
                })
                break

            case "histogram":
                series.push({
                    ...baseSeriesConfig,
                    type: "bar",
                    symbol: undefined,
                    smooth: false,
                    barWidth: "80%",
                })
                break

            case "heikin-ashi":
                const haData = calculateHeikinAshi(ohlcData)
                series.push({
                    name: selectedStock,
                    type: "candlestick",
                    data: haData,
                    itemStyle: {
                        color: primaryGreen,
                        color0: "#f43f5e",
                        borderColor: primaryGreen,
                        borderColor0: "#f43f5e",
                    },
                })
                break

            case "kagi":
                // Simplified Kagi implementation
                series.push({
                    ...baseSeriesConfig,
                    type: "line",
                    step: "middle",
                    smooth: false,
                    lineStyle: {
                        width: 3,
                    },
                })
                break

            case "line-break":
                // Simplified Line Break implementation
                series.push({
                    ...baseSeriesConfig,
                    type: "line",
                    smooth: false,
                    lineStyle: {
                        type: "dashed",
                        width: 2,
                    },
                })
                break

            case "renko":
                const renkoData = calculateRenko(priceData, 2)
                series.push({
                    name: selectedStock,
                    type: "candlestick",
                    data: renkoData,
                    itemStyle: {
                        color: primaryGreen,
                        color0: "#f43f5e",
                        borderColor: primaryGreen,
                        borderColor0: "#f43f5e",
                    },
                })
                break

            case "range-bars":
                // Simplified Range Bars implementation
                series.push({
                    name: selectedStock,
                    type: "candlestick",
                    data: ohlcData,
                    itemStyle: {
                        color: primaryGreen,
                        color0: "#f43f5e",
                        borderColor: primaryGreen,
                        borderColor0: "#f43f5e",
                        borderWidth: 3,
                    },
                })
                break

            case "point-figure":
                // Simplified Point & Figure implementation
                series.push({
                    ...baseSeriesConfig,
                    type: "scatter",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    symbol: (value: any, params: any) => {
                        const index = params.dataIndex
                        if (index > 0 && priceData[index] && priceData[index - 1]) {
                            return priceData[index][1] >= priceData[index - 1][1] ? "circle" : "rect"
                        }
                        return "circle"
                    },
                    symbolSize: 8,
                })
                break
        }

        // Add volume series to the chart (except for volume-candle type)
        if (!["volume-candle"].includes(chartType)) {
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
        }

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
                    const priceParam = params.find((param: any) => param.seriesName === selectedStock)
                    if (priceParam) {
                        tooltipText += `<div style="display: flex; align-items: center;">
              <span style="display: inline-block; width: 10px; height: 10px; background: ${priceParam.color}; margin-right: 5px;"></span>
              <span>${selectedStock}: $${priceParam.value[1].toFixed(2)}</span>
            </div>`
                    }

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
                top: "8%",
                left: "center",
                text: `${selectedStock} Stock Price`,
                textStyle: {
                    fontSize: 16,
                    fontWeight: "bold",
                },
            },
            toolbox: {
                top: "4%",
                right: "5%",
                feature: {
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: 0,
                        },
                        {
                            type: "slider",
                            xAxisIndex: 0,
                        },
                    ],
                    restore: {},
                    saveAsImage: {},
                },
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
                        formatter: (value: number) => `$${value.toFixed(0)}`,
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
                    start: 30,
                    end: 100,
                    xAxisIndex: [0],
                    zoomLock: false,
                },
                {
                    type: "slider",
                    start: 30,
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
        loading,
        primaryGreen,
        primaryGreenWithOpacity,
        chartType,
        calculateHeikinAshi,
        calculateRenko,
    ])

    const selectedChartType = [...basicChartTypes, ...aggregatedChartTypes].find((option) => option.value === chartType)

    return (
        <Card className="relative overflow-hidden">
            {/* Chart Type Dropdown */}
            <div className="absolute -top-0 left-12 z-20">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                            <span className="mr-2">{selectedChartType?.icon}</span>
                            {selectedChartType?.label}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Chart Types</DropdownMenuLabel>
                        {basicChartTypes.map((option) => (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => setChartType(option.value as ChartType)}
                                className={chartType === option.value ? "bg-accent" : ""}
                            >
                                <span className="mr-2">{option.icon}</span>
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Aggregated Types</DropdownMenuLabel>
                        {aggregatedChartTypes.map((option) => (
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

            {!loading && !chartData && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <div className="text-sm text-muted-foreground text-center">
                        <p>
                            Data not available for <strong>{selectedStock}</strong>.
                        </p>
                        <p>Please try again later or check the stock symbol.</p>
                    </div>
                </div>
            )}

            <div ref={chartRef} className="h-[600px] w-full" />
        </Card>
    )
}
