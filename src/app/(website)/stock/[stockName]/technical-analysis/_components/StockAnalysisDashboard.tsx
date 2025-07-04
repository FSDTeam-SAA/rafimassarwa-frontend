"use client";

import { useState, useEffect } from "react";

// Types for our data
interface MovingAverage {
  period: string;
  simple: string;
  simpleSignal: "Buy" | "Sell" | "Neutral";
  exponential: string;
  exponentialSignal: "Buy" | "Sell" | "Neutral";
}

interface TechnicalIndicator {
  name: string;
  value: string;
  impliedAction: "Buy" | "Sell" | "Neutral";
}

interface MovingAverageDetail {
  type: string;
  days: string;
  value: string;
  stockPrice: string;
  signal: "Buy" | "Sell" | "Neutral";
}

interface TechnicalIndicatorDetail {
  name: string;
  abbreviation: string;
  value: string;
  signal: "Buy" | "Sell" | "Neutral";
}

export default function StockAnalysisDashboard() {
  // This would come from your API
  const [data] = useState({
    stockSymbol: "AAPL",
    stockName: "Apple",
    currentDate: "Mar 22, 2025, 01:50 AM",
    stockPrice: "218.27",
    movingAverages: [
      {
        period: "MA5",
        simple: "213.88",
        simpleSignal: "Buy",
        exponential: "247.90",
        exponentialSignal: "Sell",
      },
      {
        period: "MA5",
        simple: "213.88",
        simpleSignal: "Buy",
        exponential: "247.90",
        exponentialSignal: "Sell",
      },
      {
        period: "MA5",
        simple: "213.88",
        simpleSignal: "Buy",
        exponential: "247.90",
        exponentialSignal: "Sell",
      },
      {
        period: "MA5",
        simple: "213.88",
        simpleSignal: "Buy",
        exponential: "247.90",
        exponentialSignal: "Sell",
      },
      {
        period: "MA5",
        simple: "213.88",
        simpleSignal: "Buy",
        exponential: "247.90",
        exponentialSignal: "Sell",
      },
    ] as MovingAverage[],
    technicalIndicators: [
      { name: "RSI(14)", value: "213.88", impliedAction: "Neutral" },
      { name: "STOCH(9,6)", value: "213.88", impliedAction: "Buy" },
      { name: "ROC", value: "-11.47", impliedAction: "Sell" },
      { name: "RSI(14)", value: "213.88", impliedAction: "Neutral" },
      { name: "STOCH(9,6)", value: "213.88", impliedAction: "Buy" },
      { name: "ROC", value: "-11.47", impliedAction: "Sell" },
    ] as TechnicalIndicator[],
    movingAverageDetails: [
      {
        type: "exponential",
        days: "10-Day",
        value: "218.72",
        stockPrice: "218.27",
        signal: "Sell",
      },
      {
        type: "exponential",
        days: "100-Day",
        value: "231.24",
        stockPrice: "218.27",
        signal: "Sell",
      },
      {
        type: "simple",
        days: "50-day",
        value: "232.29",
        stockPrice: "218.27",
        signal: "Sell",
      },
      {
        type: "simple",
        days: "100-day",
        value: "235.08",
        stockPrice: "218.27",
        signal: "Sell",
      },
      {
        type: "simple",
        days: "200-day",
        value: "227.82",
        stockPrice: "218.27",
        signal: "Sell",
      },
    ] as MovingAverageDetail[],
    technicalIndicatorDetails: [
      {
        name: "Relative Strength Index",
        abbreviation: "RSI",
        value: "33.92",
        signal: "Neutral",
      },
      {
        name: "Price Rate of Change",
        abbreviation: "ROC",
        value: "-11.47",
        signal: "Sell",
      },
      {
        name: "Relative Strength Index",
        abbreviation: "RSI",
        value: "33.92",
        signal: "Neutral",
      },
      {
        name: "Price Rate of Change",
        abbreviation: "ROC",
        value: "-11.47",
        signal: "Sell",
      },
    ] as TechnicalIndicatorDetail[],
  });

  // This would be your API fetch function
  useEffect(() => {
    // Example of how you would fetch data from your API
    const fetchData = async () => {
      try {
        // const response = await fetch('your-api-endpoint');
        // const apiData = await response.json();
        // setData(apiData);
        // For now, we're using the dummy data initialized above
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Helper function to render signal text with appropriate color
  const renderSignal = (signal: "Buy" | "Sell" | "Neutral") => {
    if (signal === "Buy") return <span className="text-blue-500">Buy</span>;
    if (signal === "Sell") return <span className="text-green-500">Sell</span>;
    return <span>Neutral</span>;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Moving Averages Section */}
      <div className="flex-1">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            {data.stockName} ({data.stockSymbol}) Moving Averages
          </h2>
          <p className="text-sm text-gray-500">{data.currentDate}</p>
        </div>

        <div className="p-4 shadow-[0px_0px_8px_0px_#00000029] ">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left font-medium">Period</th>
                <th className="py-2 text-left font-medium">Simple</th>
                <th className="py-2 text-left font-medium">Exponential</th>
              </tr>
            </thead>
            <tbody>
              {data.movingAverages.map((ma, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{ma.period}</td>
                  <td className="py-2">
                    {ma.simple} {renderSignal(ma.simpleSignal)}
                  </td>
                  <td className="py-2">
                    {ma.exponential} {renderSignal(ma.exponentialSignal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-sm space-y-2">
            {data.movingAverageDetails.map((detail, index) => (
              <p key={index}>
                • {data.stockName} s ({data.stockSymbol}) {detail.days}{" "}
                {detail.type} moving average is {detail.value},
                {detail.type === "exponential"
                  ? ` while ${data.stockName}'s (${data.stockSymbol}) share price is ${detail.stockPrice}, making it a `
                  : ` and ${data.stockName}'s (${data.stockSymbol}) stock price is ${detail.stockPrice}, creating a `}
                {renderSignal(detail.signal)}{" "}
                {detail.type === "simple" ? "signal" : ""}.
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Indicators Section */}
      <div className="flex-1">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            {data.stockName} ({data.stockSymbol}) Technical Indicators
          </h2>
          <p className="text-sm text-gray-500">{data.currentDate}</p>
        </div>

        <div className="p-4 shadow-[0px_0px_8px_0px_#00000029] ">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left font-medium">Name</th>
                <th className="py-2 text-left font-medium">Value</th>
                <th className="py-2 text-left font-medium">Implied Action</th>
              </tr>
            </thead>
            <tbody>
              {data.technicalIndicators.map((indicator, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{indicator.name}</td>
                  <td className="py-2">{indicator.value}</td>
                  <td className="py-2">
                    {renderSignal(indicator.impliedAction)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-sm space-y-2">
            {data.technicalIndicatorDetails.map((detail, index) => (
              <p key={index}>
                • {data.stockName} s ({data.stockSymbol}) {detail.name} (
                {detail.abbreviation}) is {detail.value}, creating a{" "}
                {renderSignal(detail.signal)} signal.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
