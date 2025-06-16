"use client";

import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Edit2, Plus } from "lucide-react";
import { useEffect } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";


export default function Home() {

  const { mutate: getOverview, data: overviewData } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/overview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          holdings: [
            {
              symbol: "AAPL",
              shares: 2,
            },
            {
              symbol: "MSFT",
              shares: 2,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch portfolio overview");
      }

      return res.json();
    },
  });


  const { mutate: getGainLose, data: gainLoseData } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/topmovers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbols: [
            "AAPL",
            "MSFT"
          ]
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch portfolio overview");
      }

      return res.json();
    },
  });

  // Trigger on mount (page reload)
  useEffect(() => {
    getOverview();
    getGainLose();
  }, [getOverview]);


  const dailyReturn = overviewData?.dailyReturn ?? 0;
  const dailyReturnPercent = overviewData?.dailyReturnPercent ?? 0;
  const isReturnPositive = dailyReturn >= 0;
  const isReturnPercentPositive = dailyReturnPercent >= 0;



  return (
    <div className="flex flex-col ">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 p-3 mt-8 mb-6">
        <button className="border rounded-md px-4 py-2 text-green-500 hover:bg-green-50 transition">
          Add Portfolio
        </button>
        <button className="bg-green-500 rounded-md px-4 py-2 text-white flex items-center gap-1 hover:bg-green-600 transition">
          <Plus className="h-4 w-4" />
          Add Holdings
        </button>
      </div>

      {/* Portfolio Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3">
        {/* Left Section */}
        <div className="border rounded-xl overflow-hidden h-[400px] bg-white shadow-[0px_0px_8px_0px_#00000029] max-w-[100vw]">
          <div className="p-4">
            <h2 className="font-semibold text-lg text-gray-800">
              Portfolio Overview
            </h2>
            <div className="flex mt-2 shadow-[0px_0px_10px_1px_#0000001A]">
              <div className="px-4 py-2 font-medium relative after:absolute after:top-0 after:left-0 after:content-[''] after:h-[5px] after:w-full after:bg-[#28A745]">
                Overview
              </div>
              <div className="px-4 py-2 text-gray-500">Smart Score</div>
            </div>

            <div className="py-6 text-center">
              <h1 className="text-[40px] text-[#595959] font-bold">${overviewData?.totalHoldings}</h1>
            </div>

            <div className="text-sm text-gray-600 mt-4 text-center">
              Total Holdings
            </div>

            <div className="flex text-center items-center justify-center mt-2 py-2">
              <div>Portfolio Cash : </div>
              <div className="flex items-center gap-2">
                <span>&nbsp;${overviewData?.totalHoldings}</span>
                <Edit2 className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex divide-x divide-gray-200">
                {/* Total Return */}
                <div className="flex-1 px-4">
                  <div className={`flex items-center ${isReturnPositive ? "text-green-500" : "text-red-500"}`}>
                    {isReturnPositive ? <FaCaretUp className="w-6 h-6 mr-1" /> : <FaCaretDown className="w-6 h-6 mr-1" />}
                    <span className="text-lg font-semibold">$ {dailyReturn}</span>
                  </div>
                  <div className={`flex items-center ${isReturnPercentPositive ? "text-green-500" : "text-red-500"}`}>
                    {isReturnPercentPositive ? <FaCaretUp className="w-6 h-6 mr-1" /> : <FaCaretDown className="w-6 h-6 mr-1" />}
                    <span className="text-lg font-semibold">$ {dailyReturnPercent}%</span>
                  </div>
                  <div className="flex items-center text-xs mt-4 text-muted-foreground">
                    Daily Return
                  </div>
                </div>

                {/* Daily Return */}
                <div className="flex-1 px-4 mt-9">
                  <div className="h-8 flex items-center justify-center">
                    ---
                  </div>
                  <div className="text-xs text-center">
                    30 Day Return
                  </div>
                </div>

                {/* 30 Day Return */}
                <div className="flex-1 px-4 mt-9">
                  <div className="h-8 flex items-center justify-center">
                    ---
                  </div>
                  <div className="text-xs text-center">
                    30 Day Return
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="border rounded-xl overflow-hidden h-[400px] bg-white shadow-[0px_0px_8px_0px_#00000029] max-w-[100vw]">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg text-gray-800">
              Portfolio Overview
            </h2>
            <div className="flex justify-between mt-2 shadow-[0px_0px_10px_1px_#0000001A]">
              <div className="px-4 py-2 font-medium relative after:absolute after:top-0 after:left-0 after:content-[''] after:h-[5px] after:w-full after:bg-[#28A745]">
                Top Gainers
              </div>
              <div className="px-4 py-2 text-gray-500">Top Losers</div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2 gap-5 items-center py-2">
                <div className="">
                  {
                    gainLoseData?.topGainers?.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between gap-2 border-b space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{item.symbol}</span>
                        </div>
                        <div className="">
                          <div className={`flex items-center ${item.dp > 0 ? "text-green-500" : "text-red-500"}`}>
                            {item.dp > 0 ? <FaCaretUp className="w-4 h-4 mr-1" /> : <FaCaretDown className="w-4 h-4 mr-1" />}
                            <span className="text-base font-semibold">{item.dp.toFixed(2)}%</span>
                          </div>
                          <div className={`flex items-center ${item.d > 0 ? "text-green-500" : "text-red-500"}`}>
                            {item.d > 0 ? <FaCaretUp className="w-4 h-4 mr-1" /> : <FaCaretDown className="w-4 h-4 mr-1" />}
                            <span className="text-base font-semibold">$ {item.d}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="">
                  <div className="py-4 text-center text-gray-500 text-sm">
                    {
                      gainLoseData?.topLosers?.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-2 border-b space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">{item.symbol}</span>
                          </div>
                          <div className="">
                            <div className={`flex items-center ${item.dp > 0 ? "text-green-500" : "text-red-500"}`}>
                              {item.dp > 0 ? <FaCaretUp className="w-4 h-4 mr-1" /> : <FaCaretDown className="w-4 h-4 mr-1" />}
                              <span className="text-base font-semibold">{item.dp.toFixed(2)}%</span>
                            </div>
                            <div className={`flex items-center ${item.d > 0 ? "text-green-500" : "text-red-500"}`}>
                              {item.d > 0 ? <FaCaretUp className="w-4 h-4 mr-1" /> : <FaCaretDown className="w-4 h-4 mr-1" />}
                              <span className="text-base font-semibold">$ {item.d}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="border rounded-xl overflow-hidden h-[400px] bg-white shadow-[0px_0px_8px_0px_#00000029] max-w-[100vw]">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-gray-800">
                Portfolio Performance
              </h2>
              <div className="text-xs text-green-500 flex items-center cursor-pointer hover:underline">
                See All <ArrowRight className="h-3 w-3 ml-1" />
              </div>
            </div>
            <div className="flex mt-2 shadow-[0px_0px_10px_1px_#0000001A]">
              <div className="px-4 py-2 font-medium relative after:absolute after:top-0 after:left-0 after:content-[''] after:h-[5px] after:w-full after:bg-[#28A745]">
                Overview
              </div>
              <div className="px-4 py-2 text-gray-500">Smart Score</div>
            </div>

            <div className="flex items-center justify-center h-48">
              <div className="text-xl font-medium text-gray-600">
                Coming Soon!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
