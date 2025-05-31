import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  percentageChange: number
  changeValue: string
}

export function MetricCard({ title, value, percentageChange, changeValue }: MetricCardProps) {
  return (
    <Card className="border border-gray-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center mt-1 text-sm">
          <span className="flex items-center text-green-500 mr-1">
            <ArrowUpIcon className="h-3 w-3 mr-1" />
            {percentageChange}%
          </span>
          <span className="text-gray-500">{changeValue}</span>
        </div>
      </CardContent>
    </Card>
  )
}
