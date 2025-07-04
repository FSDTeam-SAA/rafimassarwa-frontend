"use client"

import { useEffect, useRef, useState } from "react"

// This interface defines the data structure for the chart
export interface DividendYieldData {
  year: string
  upper: number
  lower: number
}

// Sample data - this would be replaced with API data
const sampleData: DividendYieldData[] = [
  { year: "2018", upper: 1.9, lower: 1.2 },
  { year: "2019", upper: 2.0, lower: 1.0 },
  { year: "2020", upper: 1.35, lower: 0.65 },
  { year: "2021", upper: 0.8, lower: 0.6 },
  { year: "2022", upper: 0.75, lower: 0.6 },
  { year: "2023", upper: 0.8, lower: 0.6 },
  { year: "2024", upper: 0.7, lower: 0.5 },
  { year: "2025", upper: 0.6, lower: 0.5 },
]

interface TooltipData {
  visible: boolean
  x: number
  y: number
  year: string
  upper: number
  lower: number
}

interface DividendYieldChartProps {
  data?: DividendYieldData[]
  loading?: boolean
}

export default function DividendYieldChart({ data = sampleData, loading = false }: DividendYieldChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    year: "",
    upper: 0,
    lower: 0,
  })

  // Function to draw the chart
  const drawChart = (ctx: CanvasRenderingContext2D, width: number, height: number, dpr: number) => {
    // Chart dimensions
    const padding = { top: 40, right: 60, bottom: 40, left: 40 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Y-axis range - ensure we start from 0
    // const yMin = 0
    const yMax = 2.5

    // Clear canvas
    ctx.clearRect(0, 0, width * dpr, height * dpr)

    // Draw grid lines
    ctx.strokeStyle = "#e5e5e5"
    ctx.lineWidth = 1

    // Horizontal grid lines - ensure we include 0%
    const yTicks = [0, 0.5, 1.0, 1.5, 2.0, 2.5]
    yTicks.forEach((tick) => {
      // Calculate y position - ensure we map from 0 to yMax
      const y = padding.top + chartHeight - (tick / yMax) * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + chartWidth, y)
      ctx.stroke()

      // Y-axis labels
      ctx.fillStyle = "#888"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"
      ctx.fillText(`${tick.toFixed(2)}%`, padding.left + chartWidth + 25, y + 4)
    })

    // X-axis labels
    ctx.fillStyle = "#888"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    const xStep = chartWidth / (data.length - 1)
    data.forEach((item, i) => {
      const x = padding.left + i * xStep
      ctx.fillText(item.year, x, padding.top + chartHeight + 20)
    })

    // Draw area between upper and lower bounds
    ctx.beginPath()

    // Start with the first upper point
    const firstUpperY = padding.top + chartHeight - (data[0].upper / yMax) * chartHeight
    ctx.moveTo(padding.left, firstUpperY)

    // Draw upper line
    data.forEach((item, i) => {
      const x = padding.left + i * xStep
      const y = padding.top + chartHeight - (item.upper / yMax) * chartHeight
      ctx.lineTo(x, y)
    })

    // Continue with the lower line in reverse
    for (let i = data.length - 1; i >= 0; i--) {
      const x = padding.left + i * xStep
      const y = padding.top + chartHeight - (data[i].lower / yMax) * chartHeight
      ctx.lineTo(x, y)
    }

    // Close the path
    ctx.closePath()

    // Fill the area
    ctx.fillStyle = "#b5e2b5"
    ctx.fill()

    // Draw upper line
    ctx.beginPath()
    ctx.moveTo(padding.left, firstUpperY)
    data.forEach((item, i) => {
      const x = padding.left + i * xStep
      const y = padding.top + chartHeight - (item.upper / yMax) * chartHeight
      ctx.lineTo(x, y)
    })
    ctx.strokeStyle = "#2e7d32"
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Draw lower line
    ctx.beginPath()
    const firstLowerY = padding.top + chartHeight - (data[0].lower / yMax) * chartHeight
    ctx.moveTo(padding.left, firstLowerY)
    data.forEach((item, i) => {
      const x = padding.left + i * xStep
      const y = padding.top + chartHeight - (data[i].lower / yMax) * chartHeight
      ctx.lineTo(x, y)
    })
    ctx.strokeStyle = "#2e7d32"
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Draw data points
    data.forEach((item, i) => {
      const x = padding.left + i * xStep

      // Upper point
      const yUpper = padding.top + chartHeight - (item.upper / yMax) * chartHeight
      ctx.beginPath()
      ctx.arc(x, yUpper, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#2e7d32"
      ctx.fill()

      // Lower point
      const yLower = padding.top + chartHeight - (item.lower / yMax) * chartHeight
      ctx.beginPath()
      ctx.arc(x, yLower, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#2e7d32"
      ctx.fill()
    })

    return { padding, chartWidth, chartHeight, xStep, yMax }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || loading || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Set canvas size in CSS
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    drawChart(ctx, rect.width, rect.height, dpr)

    // Handle window resize
    const handleResize = () => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      drawChart(ctx, rect.width, rect.height, dpr)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading])

  // Handle mouse movement for tooltips
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || loading || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Redraw chart
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.scale(dpr, dpr)
      const { padding, chartHeight, xStep, yMax } = drawChart(ctx, rect.width, rect.height, dpr)

      // Check if mouse is near any data point
      let found = false
      data.forEach((item, i) => {
        const x = padding.left + i * xStep
        const yUpper = padding.top + chartHeight - (item.upper / yMax) * chartHeight
        const yLower = padding.top + chartHeight - (item.lower / yMax) * chartHeight

        // Check distance to upper point
        const distUpper = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - yUpper, 2))
        const distLower = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - yLower, 2))

        if (distUpper < 20 || distLower < 20) {
          found = true
          setTooltip({
            visible: true,
            x: x,
            y: Math.min(yUpper, yLower) - 10, // Position above the highest point
            year: item.year,
            upper: item.upper,
            lower: item.lower,
          })
        }
      })

      if (!found) {
        setTooltip((prev) => ({ ...prev, visible: false }))
      }
    }

    const handleMouseLeave = () => {
      setTooltip((prev) => ({ ...prev, visible: false }))
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading])

  return (
    <div ref={containerRef} className="relative w-full h-[500px]">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
          {tooltip.visible && (
            <div
              className="absolute bg-white p-2 rounded shadow-md text-sm z-10 pointer-events-none"
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="font-bold">{tooltip.year}</div>
              <div>Upper: {tooltip.upper.toFixed(2)}%</div>
              <div>Lower: {tooltip.lower.toFixed(2)}%</div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
