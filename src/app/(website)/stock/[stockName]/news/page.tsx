"use client";

import RecentNews from "@/components/overview/news";
import { Loader2 } from "lucide-react";
import StockNews from "./_components/StockNews";
import StockPremiumBanner from "@/components/Portfolio/chart/chart-bottom";
import OverviewFAQ from "@/components/overview/overview-faq";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const Page = () => {
  const axiosInstance = useAxios();
  const params = useParams();
  const stockName = params.stockName;

  const { data: allNews = [], isLoading } = useQuery({
    queryKey: ["overview-news"],
    queryFn: async () => {
      const res = await axiosInstance(`/admin/news/market-news?symbol=${stockName.toString().toUpperCase()}`);
      return res.data.data;
    },
  });

  if (isLoading)
    return (
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
        <Loader2 className="h-12 w-12 animate-spin text-green-500" />
      </div>
    );

  return (
    <div className="lg:w-[75vw]">
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-xl font-bold">
            <span className=" uppercase">({stockName})</span> Stock News &
            Sentiment
          </h3>
        </div>

      </div>

      {/* page layout */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="lg:w-[75%]">
          <div>
            <StockNews stockNews={allNews} />
          </div>

          <div className="mt-16">
            <OverviewFAQ />
          </div>

          <div className="mt-16">
            <StockPremiumBanner />
          </div>
        </div>

        <div className="lg:w-[25%]">
          <RecentNews />
        </div>
      </div>
    </div>
  );
};

export default Page;
