"use client";

import BannerAds from "@/components/News/BannerAds";
import MoreFromTip from "@/components/News/MoreFromTip";
import StockMarketNews from "@/components/News/StockMarketNews";
import StockNewsMain from "@/components/News/StoctNewsMain";
import TipRanksLabs from "@/components/News/TipRanksLabs";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const NewsPage = () => {
  const axiosInstance = useAxios();
  const session = useSession();

  const { data: allNews = [], isLoading } = useQuery({
    queryKey: ["all-news"],
    queryFn: async () => {
      const res = await axiosInstance("/admin/news/market-news");
      return res.data.data;
    },
  });


  const { mutate: getMyNews, data: myNews = [] } = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/news/get-protfolio-news`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user?.accessToken}`,
          },
          body: JSON.stringify({ protfolioId: "685e7dd716e4516fae31cc3e" }),
        }
      );
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    getMyNews();
  }, [getMyNews]);


  const { data: stockNews = [] } = useQuery({
    queryKey: ["stock-news"],
    queryFn: async () => {
      const res = await axiosInstance("/admin/news/all-news");
      return res.data.data;
    },
  });

  const firstNews = myNews[10];
  const rightSide = stockNews[1];
  const leftSide1 = stockNews[2];
  const leftSide2 = stockNews[3];

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 min-h-screen flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!allNews || allNews.length === 0) {
    return (
      <div className="text-2xl text-red-500 min-h-screen flex flex-col items-center justify-center">
        No news available
      </div>
    );
  }

  return (
    <div className="lg:mb-20 mt-14 my-5">
      <BannerAds />
      <TipRanksLabs
        rightSide={rightSide}
        leftSide1={leftSide1}
        leftSide2={leftSide2}
      />
      <MoreFromTip stockNews={stockNews} />
      <StockNewsMain firstNews={firstNews} />
      <StockMarketNews allNews={myNews} />
    </div>
  );
};

export default NewsPage;
