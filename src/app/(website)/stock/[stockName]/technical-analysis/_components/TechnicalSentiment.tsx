"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import GaugeChart with no SSR to avoid hydration issues
const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

// Mock data for different time periods
const timePeriodsData = {
  "1 Minute": { bearish: 10, neutral: 6, bullish: 8, percent: 0.7 },
  "5 Minutes": { bearish: 11, neutral: 5, bullish: 7, percent: 0.6 },
  "15 Minutes": { bearish: 12, neutral: 4, bullish: 6, percent: 0.5 },
  "30 Minutes": { bearish: 12, neutral: 5, bullish: 5, percent: 0.4 },
  "1 Hour": { bearish: 13, neutral: 4, bullish: 5, percent: 0.3 },
  "5 Hours": { bearish: 13, neutral: 4, bullish: 5, percent: 0.4 },
  "1 Day": { bearish: 13, neutral: 4, bullish: 5, percent: 0.6 },
  "1 Week": { bearish: 9, neutral: 7, bullish: 8, percent: 0.7 },
  "1 Month": { bearish: 7, neutral: 8, bullish: 9, percent: 0.8 },
};

export default function TechnicalSentiment() {
  const [activePeriod, setActivePeriod] = useState("1 Day");
  const currentData =
    timePeriodsData[activePeriod as keyof typeof timePeriodsData];

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold p-4 pb-2">Technical Sentiment</h1>

      {/* Time Period Filters */}
      <div className="flex border-b overflow-x-auto">
        {Object.keys(timePeriodsData).map((period) => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            className={cn(
              "px-4 py-3 text-sm font-medium relative",
              activePeriod === period
                ? "text-green-600"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {period}
            {activePeriod === period && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Consensus Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <ConsensusCard title="Overall Consensus" data={currentData} />
        <ConsensusCard
          title="Technical Analysis Consensus"
          data={currentData}
        />
        <ConsensusCard title="Moving Average Consensus" data={currentData} />
      </div>

      {/* CTA */}
      <div className="bg-green-50 p-4 mx-4 rounded-lg mb-4">
        <a
          href="#"
          className="text-green-600 font-medium flex items-center hover:underline"
        >
          Try our new Technical Analysis Screener{" "}
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      {/* Technical Indicators */}
      <div className="border-t p-4 space-y-3">
        <div className="flex items-start">
          <span className="mr-2">•</span>
          <p>
            Apple&apos;s (AAPL) Moving Averages Convergence Divergence (MACD)
            indicator is -6.76, suggesting Apple is a{" "}
            <span className="text-blue-500 font-medium">Buy</span>.
          </p>
        </div>
        <div className="flex items-start">
          <span className="mr-2">•</span>
          <p>
            Apple&apos;s (AAPL) 20-Day exponential moving average is 224.83,
            while Apple&apos;s (AAPL) share price is $218.27, making it a{" "}
            <span className="text-red-500 font-medium">Sell</span>.
          </p>
        </div>
        <div className="flex items-start">
          <span className="mr-2">•</span>
          <p>
            Apple&apos;s (AAPL) 50-Day exponential moving average is 231.22,
            while Apple&apos;s (AAPL) share price is $218.27, making it a{" "}
            <span className="text-red-500 font-medium">Sell</span>.
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <a href="#" className="text-blue-500 hover:underline">
            Advanced Chart ›
          </a>
        </div>
      </div>
    </div>
  );
}

function ConsensusCard({
  title,
  data,
}: {
  title: string;
  data: { bearish: number; neutral: number; bullish: number; percent: number };
}) {
  return (
    <div className="flex flex-col">
      <h3 className="font-medium mb-4">{title}</h3>
      <div className="relative mb-8">
        <div className="gauge-chart-container">
          <GaugeChart
            id={`gauge-chart-${title.replace(/\s+/g, "-").toLowerCase()}`}
            nrOfLevels={4}
            arcPadding={0.1}
            cornerRadius={3}
            percent={data.percent}
            colors={["#22c55e", "#30a5a3", "#60a5eb", "#3b82f6"]}
            arcWidth={0.3}
            needleColor="#000000"
            needleBaseColor="#000000"
            hideText={true}
          />
        </div>
        <div className="absolute bottom-0 left-0 text-base text-green-600 font-medium">
          Strong Sell
        </div>
        <div className="absolute bottom-0 right-0 text-base text-blue-600 font-medium">
          Strong Buy
        </div>
      </div>
      <div className="flex justify-between text-sm text-center mt-4">
        <div>
          <div className="text-green-600 font-medium">{data.bearish}</div>
          <div className="text-gray-600">Bearish</div>
        </div>
        <div>
          <div className="text-gray-600 font-medium">{data.neutral}</div>
          <div className="text-gray-600">Neutral</div>
        </div>
        <div>
          <div className="text-blue-600 font-medium">{data.bullish}</div>
          <div className="text-gray-600">Bullish</div>
        </div>
      </div>
    </div>
  );
}
