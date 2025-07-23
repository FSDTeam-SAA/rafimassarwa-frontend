"use client";

import type React from "react";

import LatestArticles from "@/shared/Articles";
import StockDashboard from "@/shared/StockDashboard";
import Image from "next/image";
import StockTickerCarousel from "../Watchlist/StockTickerCarousel";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import YoutubeVideo from "./YoutubeVideo/YoutubeVideo";
import { useLanguage } from "@/providers/LanguageProvider";

interface NewsItem {
  _id: string;
  newsImage?: string;
  symbol?: string;
  createdAt?: number;
  newsTitle: string;
  lang?: string;
}

const PrivateHome = () => {
  const axiosInstance = useAxios();
  const { dictionary, selectedLangCode } = useLanguage();

  const { data: stockNews = [], isLoading } = useQuery<NewsItem[]>({
    queryKey: ["private-news"],
    queryFn: async () => {
      const res = await axiosInstance("/admin/news/all-news");
      return res.data.data;
    },
  });

  const filteredNews = stockNews?.filter(
    (news) => news?.lang === selectedLangCode
  );

  const truncateText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + "...";
  };

  if(isLoading) return <div className="min-h-screen flex flex-col items-center justify-center">Loading...</div>

  return (
    <div className="mt-28 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-5">
        <StockTickerCarousel />
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <Link
          href="/my-portfolio"
          className="inline-block rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
        >
          {dictionary.myPortfolio}
        </Link>
        <Link
          href="/watchlist"
          className="inline-block rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          {dictionary?.watchlist}
        </Link>
        <Link
          href="/news"
          className="inline-block rounded-md bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
        >
          {dictionary?.news}
        </Link>
      </div>

      <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-10">
        <div className="col-span-1 lg:col-span-2">
          {filteredNews[4] && (
            <Link href={`/news/${filteredNews[4]._id}`} rel="noopener noreferrer">
              <div className="cursor-pointer hover:opacity-90 transition-opacity">
                <Image
                  src={
                    filteredNews[4].newsImage ||
                    "/placeholder.svg?height=270&width=500"
                  }
                  alt={filteredNews[4].newsTitle}
                  width={500}
                  height={270}
                  className="w-full object-cover"
                  style={{ aspectRatio: "500 / 270" }}
                />
                <div className="flex items-center gap-2 mt-2 mb-1">
                  <span className="text-xs text-gray-500 uppercase font-medium">
                    {filteredNews[4].symbol}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(filteredNews[4]?.createdAt || 0).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="font-medium mt-3 text-lg md:text-xl leading-tight">
                  {truncateText(filteredNews[4].newsTitle, 80)}
                </h1>
              </div>
            </Link>
          )}

          {filteredNews[3] && (
            <Link href={`/news/${filteredNews[3]._id}`} rel="noopener noreferrer">
              <div className="mt-6 md:mt-8 cursor-pointer hover:opacity-90 transition-opacity">
                <Image
                  src={
                    filteredNews[3].newsImage ||
                    "/placeholder.svg?height=270&width=500"
                  }
                  alt={filteredNews[3].newsTitle}
                  width={500}
                  height={270}
                  className="w-full object-cover"
                  style={{ aspectRatio: "500 / 270" }}
                />
                <div className="flex items-center gap-2 mt-2 mb-1">
                  <span className="text-xs text-gray-500 uppercase font-medium">
                    {filteredNews[3].symbol}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(filteredNews[3]?.createdAt || 0).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="font-medium mt-3 text-lg md:text-xl leading-tight">
                  {truncateText(filteredNews[3].newsTitle, 80)}
                </h1>
              </div>
            </Link>
          )}
        </div>

        <div className="col-span-1 lg:col-span-3">
          {filteredNews[0] && (
            <Link href={`/news/${filteredNews[0]._id}`} rel="noopener noreferrer">
              <div className="cursor-pointer hover:opacity-90 transition-opacity">
                <Image
                  src={
                    filteredNews[0].newsImage ||
                    "/placeholder.svg?height=450&width=800"
                  }
                  alt={filteredNews[0].newsTitle}
                  width={800}
                  height={450}
                  className="w-full object-cover"
                  style={{ aspectRatio: "800 / 450" }}
                />
                <div className="flex items-center justify-center gap-2 mt-4 mb-2">
                  <span className="text-sm text-gray-500 uppercase font-medium">
                    {filteredNews[0].symbol}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    {new Date(filteredNews[0]?.createdAt || 0).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-xs text-blue-600 uppercase font-medium px-2 py-1 bg-blue-50 rounded">
                    {filteredNews[0].symbol}
                  </span>
                </div>
                <h1 className="font-bold my-4 md:my-5 text-2xl md:text-[40px] w-full lg:w-[90%] mx-auto text-center leading-tight">
                  {filteredNews[0].newsTitle}
                </h1>
              </div>
            </Link>
          )}
        </div>

        <div className="col-span-1 lg:col-span-2">
          {filteredNews[1] && (
            <Link href={`/news/${filteredNews[1]._id}`} rel="noopener noreferrer">
              <div className="cursor-pointer hover:opacity-90 transition-opacity">
                <Image
                  src={
                    filteredNews[1].newsImage ||
                    "/placeholder.svg?height=270&width=500"
                  }
                  alt={filteredNews[1].newsTitle}
                  width={500}
                  height={270}
                  className="w-full object-cover"
                  style={{ aspectRatio: "500 / 270" }}
                />
                <div className="flex items-center gap-2 mt-2 mb-1">
                  <span className="text-xs text-gray-500 uppercase font-medium">
                    {filteredNews[1].symbol}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(filteredNews[1]?.createdAt || 0).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="font-medium mt-3 text-lg md:text-xl leading-tight">
                  {truncateText(filteredNews[1].newsTitle, 80)}
                </h1>
              </div>
            </Link>
          )}

          {filteredNews[2] && (
            <Link href={`/news/${filteredNews[2]._id}`} rel="noopener noreferrer">
              <div className="mt-6 md:mt-8 cursor-pointer hover:opacity-90 transition-opacity">
                <Image
                  src={
                    filteredNews[2].newsImage ||
                    "/placeholder.svg?height=270&width=500"
                  }
                  alt={filteredNews[2].newsTitle}
                  width={500}
                  height={270}
                  className="w-full object-cover"
                  style={{ aspectRatio: "500 / 270" }}
                />
                <div className="flex items-center gap-2 mt-2 mb-1">
                  <span className="text-xs text-gray-500 uppercase font-medium">
                    {filteredNews[2].symbol}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(filteredNews[2]?.createdAt || 0).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="font-medium mt-3 text-lg md:text-xl leading-tight">
                  {truncateText(filteredNews[2].newsTitle, 80)}
                </h1>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center my-8 md:my-16 gap-4 md:gap-2">
        {filteredNews.slice(4, 8).map((news) => (
          <Link
            key={news._id}
            href={`/news/${news._id}`}
            rel="noopener noreferrer"
          >
            <div className="flex gap-2 items-center cursor-pointer hover:opacity-90 transition-opacity">
              <div>
                <Image
                  src={news.newsImage || "/placeholder.svg?height=56&width=88"}
                  alt={news.newsTitle}
                  width={88}
                  height={56}
                  className="rounded-2xl object-cover"
                />
              </div>
              <div className="max-w-[200px]">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[10px] text-gray-500 uppercase font-medium">
                    {news.symbol}
                  </span>
                  <span className="text-[10px] text-gray-400">•</span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(news?.createdAt || 0).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="font-bold text-[14px] leading-tight">
                  {truncateText(news.newsTitle, 60)}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <YoutubeVideo />
      </div>

      <div className="mb-12 md:mb-16">
        <LatestArticles />
      </div>

      <div>
        <StockDashboard />
      </div>
    </div>
  );
};

export default PrivateHome;
