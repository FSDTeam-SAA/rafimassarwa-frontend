"use client";
import { useState } from "react";
import PriceChart from "./Chart/PriceChart";
import TargetChart from "./Chart/TargetChart";
import CashFlowChart from "./Chart/CashFlowChart";
import RevenueChart from "./Chart/RevenueChart";
import EpsChart from "./Chart/EpsChart";
import EarningChart from "./Chart/EarningChart";
import LatestArticles from "@/shared/Articles";
import StockDashboard from "@/shared/StockDashboard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { QuadrantSection } from "./olive-details-components/quadrant-seciton";
import { OliveSection } from "./olive-details-components/olive-section";

const SearchResult = () => {
  const [isActive, setIsActive] = useState("price");
  const [isActive2, setIsActive2] = useState("revenue");
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { dictionary } = useLanguage();

  const axiosInstance = useAxios();

  const { data: stockData = {}, isLoading } = useQuery({
    queryKey: ["stock-overview", query],
    queryFn: async () => {
      const res = await axiosInstance(
        `/stocks/get-stock-overview?symbol=${query}`
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
        <Loader2 className="h-12 w-12 animate-spin text-green-500" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* section 1  */}
      <div className="w-full shadow-lg p-6 border rounded-xl bg-white">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[500px]">
          {/* Quadrant Section */}
          <QuadrantSection stockData={stockData} />

          {/* Results Section */}
          <OliveSection stockData={stockData} />
        </div>
      </div>

      {/* section 2 */}
      <div className="w-full shadow-lg p-3 lg:p-6 border rounded-xl bg-white mt-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center border-b-2 border-[#737373] pb-2">
          <div>
            <h1 className=" text-3xl font-semibold">{stockData?.company}</h1>
            <p className="text-[16px] text-gray-400 mt-2">
              {stockData?.exchange}
            </p>
          </div>

          <div className="flex items-center gap-5 max-w-full lg:max-w-none">
            <button
              className={`border border-green-500 w-[157px] py-2 rounded-lg text-green-500 font-semibold ${
                isActive === "price" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setIsActive("price")}
            >
              {dictionary.price}
            </button>

            <button
              className={`border border-green-500 w-[157px] py-2 rounded-lg text-green-500 font-semibold ${
                isActive === "target" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setIsActive("target")}
            >
              {dictionary.target}
            </button>

            <button
              className={`border border-green-500 py-2 rounded-lg text-green-500 font-semibold w-[157px] ${
                isActive === "cashFlow" ? "bg-green-500 text-white " : ""
              }`}
              onClick={() => setIsActive("cashFlow")}
            >
              {dictionary.cashFlow}
            </button>
          </div>
        </div>

        <div className="mt-4">
          {(isActive === "price" && <PriceChart />) ||
            (isActive === "target" && <TargetChart />) ||
            (isActive === "cashFlow" && <CashFlowChart />)}
        </div>
      </div>

      {/* section 3 */}
      <div className="w-full shadow-lg p-6 border rounded-xl bg-white mt-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center border-b-2 border-[#737373] pb-2">
          <div>
            <h1 className=" text-3xl font-semibold">{stockData?.company}</h1>
            <p className="text-[16px] text-gray-400 mt-2">
              {stockData?.exchange}
            </p>
          </div>

          <div className="flex items-center gap-5 max-w-full lg:max-w-none">
            <button
              className={`border border-green-500 w-[157px] py-2 rounded-lg text-green-500 font-semibold ${
                isActive2 === "revenue" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setIsActive2("revenue")}
            >
              {dictionary.revenue}
            </button>

            <button
              className={`border border-green-500 w-[157px] py-2 rounded-lg text-green-500 font-semibold ${
                isActive2 === "eps" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setIsActive2("eps")}
            >
              {dictionary.eps}
            </button>

            <button
              className={`border border-green-500 py-2 rounded-lg text-green-500 font-semibold w-[157px] ${
                isActive2 === "earning" ? "bg-green-500 text-white " : ""
              }`}
              onClick={() => setIsActive2("earning")}
            >
              {dictionary.earnings}
            </button>
          </div>
        </div>

        <div className="mt-4">
          {(isActive2 === "revenue" && <RevenueChart />) ||
            (isActive2 === "eps" && <EpsChart />) ||
            (isActive2 === "earning" && <EarningChart />)}
        </div>
      </div>

      {/* section 4 */}
      <LatestArticles />

      {/* section 5 */}
      <StockDashboard />
    </div>
  );
};

export default SearchResult;
