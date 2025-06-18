"use client";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import GaugeChart from "react-gauge-chart";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 205 },
  { month: "March", visitors: -207 },
  { month: "April", visitors: 173 },
  { month: "May", visitors: -209 },
  { month: "June", visitors: 214 },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

const CashFlowChart = () => {
  const axiosInstance = useAxios();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const {data : cashFlowData = []} = useQuery({
    queryKey : ["cashFlow-chart"],
    queryFn : async () => {
      const res = await axiosInstance(`/stocks/stock/cash-flow?symbol=${query}`)
      return res.data.cashFlow.report.cf;
    }
  })

  console.log(cashFlowData)
  
  return (
    <div className="flex flex-col lg:flex-row gap-4 ">
      <div className="lg:h-[400px] lg:w-1/2">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="visitors">
              {chartData.map((item) => (
                <Cell
                  key={item.month}
                  fill={item.visitors > 0 ? "#28a745" : "#28a745"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      <div className="lg:h-[400px] lg:w-1/2 flex items-center justify-center">
        <GaugeChart
          nrOfLevels={4}
          arcPadding={0.1}
          cornerRadius={3}
          percent={0.6}
          textColor="#28a745"
        />
      </div>
    </div>
  );
};

export default CashFlowChart;
