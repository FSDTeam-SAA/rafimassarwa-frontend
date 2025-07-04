"use client"

import { useRef, useEffect } from "react"
import * as echarts from "echarts"
import { useTheme } from "next-themes"

interface StockChartProps {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    data: any[]
}

export default function BusinessChart({ data }: StockChartProps) {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartInstance = useRef<echarts.ECharts | null>(null)
    const { theme } = useTheme()

    useEffect(() => {
        // Initialize chart
        if (chartRef.current) {
            if (!chartInstance.current) {
                chartInstance.current = echarts.init(chartRef.current)
            }

            const option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    formatter: (params: any) => {
                        const date = params[0].axisValue
                        let html = `<div style="margin-bottom: 5px;">${date}</div>`

                        /* eslint-disable @typescript-eslint/no-explicit-any */
                        params.forEach((param: any) => {
                            const color = param.seriesName === "AAPL" ? "#1e88e5" : "#ff9800"
                            const value = param.value.toFixed(2)
                            const change = param.seriesName === "AAPL" ? "+29.22%" : "+9.89%"

                            html += `<div style="display: flex; justify-content: space-between; align-items: center; margin: 3px 0;">
                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; margin-right: 5px;"></span>
                <span style="margin-right: 15px;">${param.seriesName}</span>
                <span>${value}</span>
                <span style="color: green; margin-left: 10px;">${change}</span>
              </div>`
                        })

                        return html
                    },
                },
                legend: {
                    data: ["AAPL", "SPY"],
                    right: 10,
                    top: 0,
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    top: "40px",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: data.map((item) => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#ddd",
                        },
                    },
                    axisLabel: {
                        color: "#666",
                    },
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: "#666",
                        formatter: "{value}%",
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#eee",
                        },
                    },
                },
                series: [
                    {
                        name: "AAPL",
                        type: "line",
                        data: data.map((item) => item.aapl),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 2,
                            color: "#1e88e5",
                        },
                        itemStyle: {
                            color: "#1e88e5",
                        },
                    },
                    {
                        name: "SPY",
                        type: "line",
                        data: data.map((item) => item.spy),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 2,
                            color: "#ff9800",
                        },
                        itemStyle: {
                            color: "#ff9800",
                        },
                    },
                ],
            }

            chartInstance.current.setOption(option)
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose()
                chartInstance.current = null
            }
        }
    }, [data, theme])

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (chartInstance.current) {
                chartInstance.current.resize()
            }
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return <div ref={chartRef} className="w-full h-full" />
}
