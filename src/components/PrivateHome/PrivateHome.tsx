"use client";

import type React from "react";

import LatestArticles from "@/shared/Articles";
import StockDashboard from "@/shared/StockDashboard";
import Image from "next/image";
import StockTickerCarousel from "../Watchlist/StockTickerCarousel";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Star, TrendingUp, TrendingDown } from "lucide-react";
import useAxios from "@/hooks/useAxios";
import { useDebounce } from "@/hooks/useDebounce";

interface StockResult {
  symbol: string;
  description: string;
  flag: string;
  price: number;
  change: number;
  percentChange: number;
}

interface SearchResponse {
  success: boolean;
  results: StockResult[];
}

const PrivateHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const axiosInstance = useAxios();

  // TanStack Query for search
  const debouncedQuery = useDebounce(searchQuery, 500); // wait 1 second

  const { data: searchData, isLoading } = useQuery<SearchResponse>({
    queryKey: ["stocks-search", debouncedQuery],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/stocks/search?q=${debouncedQuery}`
      );
      return response.data;
    },
    enabled: debouncedQuery.length > 0, // only fetch if query isn't empty
    staleTime: 30000,
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 0);
  };

  const handleStockSelect = (stock: StockResult) => {
    setSearchQuery(stock.symbol);
    setShowResults(false);
    // Add your navigation logic here
    console.log("Selected stock:", stock);
  };

  return (
    <div className="mt-28 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-5">
        <StockTickerCarousel />
      </div>

      {/* ADDED: Quick-access shortcut buttons/links */}
      <div className="mb-6 flex justify-center space-x-4">
        <Link
          href="/my-portfolio"
          className="inline-block rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
        >
          Portfolio
        </Link>
        <Link
          href="/watchlist"
          className="inline-block rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Watchlist
        </Link>
        <Link
          href="/news"
          className="inline-block rounded-md bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
        >
          News
        </Link>
      </div>

      {/* Updated Search Section */}
      <div className="relative mb-8 md:mb-10" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery.length > 0 && setShowResults(true)}
            className="border border-green-500 rounded-md p-2 w-full outline-0 h-[48px] sm:h-[56px] md:h-[64px] focus:border-2 pr-12"
            placeholder="Search any Stock....."
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
                <p className="mt-2">Searching...</p>
              </div>
            ) : searchData?.results && searchData.results.length > 0 ? (
              <>
                <div className="p-3 border-b border-gray-100 flex items-center gap-2">
                  <Star className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Search Results
                  </span>
                </div>
                {searchData.results.map((stock, index) => (
                  <Link key={`${stock.symbol}-${index}`} href={`/search-result?q=${stock?.symbol}`}>
                    <div
                      onClick={() => handleStockSelect(stock)}
                      className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {stock.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {stock.symbol}
                            </span>
                            <Image
                              src={stock.flag}
                              alt="Country flag"
                              width={4}
                              height={4}
                              className="w-4 h-4"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            <span className="text-sm text-gray-600">
                              NASDAQ
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {stock.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ${stock.price.toFixed(2)}
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm ${
                            stock.change >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          <span>
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change.toFixed(2)} (
                            {stock.percentChange.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : searchQuery.length > 1 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No stocks found for {searchQuery}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-10">
        {/* this is 1 layout */}
        <div className="col-span-1 lg:col-span-2">
          <div>
            <Image
              src="/images/cart.png"
              alt="Stock market chart"
              width={500}
              height={270}
              className="w-full"
              style={{ aspectRatio: "500 / 270" }}
            />

            <h1 className="font-medium mt-3 text-lg md:text-xl">
              Lorem Ipsum&nbsp;is simply
              <br className="hidden md:block" />
              Lorem simply.
            </h1>

            <p className="text-sm md:text-base">
              Lorem Ipsum&nbsp;is simply Lorem
              <br className="hidden md:block" /> Lorem Ipsum&nbsp;is simply.
            </p>
          </div>

          <div className="mt-6 md:mt-8">
            <Image
              src="/images/cart.png"
              alt="Stock market chart"
              width={500}
              height={270}
              className="w-full"
              style={{ aspectRatio: "500 / 270" }}
            />

            <h1 className="font-medium mt-3 text-lg md:text-xl">
              Lorem Ipsum&nbsp;is simply
              <br className="hidden md:block" />
              Lorem simply.
            </h1>

            <p className="text-sm md:text-base">
              Lorem Ipsum&nbsp;is simply Lorem
              <br className="hidden md:block" /> Lorem Ipsum&nbsp;is simply.
            </p>
          </div>
        </div>

        {/* this is 2 layout */}
        <div className="col-span-1 lg:col-span-3">
          <Image
            src="/images/cart.png"
            alt="Stock market chart"
            width={800}
            height={450}
            className="w-full"
            style={{ aspectRatio: "800 / 450" }}
          />
          <h1 className="font-bold my-4 md:my-5 text-2xl md:text-[40px] w-full lg:w-[90%] mx-auto text-center leading-tight">
            Want up to 11% Dividend Yield?
          </h1>

          <p className="w-full lg:w-[80%] mx-auto text-center text-sm md:text-base">
            Lorem Ipsum&nbsp;is simply dummy text of the printing and
            typesetting industry.&nbsp;
          </p>
        </div>

        {/* this is 3 layout */}
        <div className="col-span-1 lg:col-span-2">
          <div>
            <Image
              src="/images/cart.png"
              alt="Stock market chart"
              width={500}
              height={270}
              className="w-full"
              style={{ aspectRatio: "500 / 270" }}
            />

            <h1 className="font-medium mt-3 text-lg md:text-xl">
              Lorem Ipsum&nbsp;is simply
              <br className="hidden md:block" />
              Lorem simply.
            </h1>

            <p className="text-sm md:text-base">
              Lorem Ipsum&nbsp;is simply Lorem
              <br className="hidden md:block" /> Lorem Ipsum&nbsp;is simply.
            </p>
          </div>

          <div className="mt-6 md:mt-8">
            <Image
              src="/images/cart.png"
              alt="Stock market chart"
              width={500}
              height={270}
              className="w-full"
              style={{ aspectRatio: "500 / 270" }}
            />

            <h1 className="font-medium mt-3 text-lg md:text-xl">
              Lorem Ipsum&nbsp;is simply
              <br className="hidden md:block" />
              Lorem simply.
            </h1>

            <p className="text-sm md:text-base">
              Lorem Ipsum&nbsp;is simply Lorem
              <br className="hidden md:block" /> Lorem Ipsum&nbsp;is simply.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center my-8 md:my-16 gap-4 md:gap-2">
        <div className="flex gap-2 items-center">
          <div>
            <Image
              src="/images/cart.png"
              alt="Stock market chart"
              width={88}
              height={56}
              className="rounded-2xl"
            />
          </div>

          <div>
            <h1 className="font-bold text-[14px] leading-tight">
              Lorem Ipsum&nbsp;is simply
              <br className="hidden md:inline" /> Lorem simply.{" "}
            </h1>
            <p className="text-[12px] md:text-[14px]">
              Lorem Ipsum&nbsp;is simply.{" "}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <Image
              src="/images/cart.png"
              alt="Stock market chart"
              width={88}
              height={56}
              className="rounded-2xl"
            />
          </div>

          <div>
            <h1 className="font-bold text-[14px] leading-tight">
              Lorem Ipsum&nbsp;is simply
              <br className="hidden md:inline" /> Lorem simply.{" "}
            </h1>
            <p className="text-[12px] md:text-[14px]">
              Lorem Ipsum&nbsp;is simply.{" "}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <Image
              src="/images/cart.png"
              alt="Stock market chart"
              width={88}
              height={56}
              className="rounded-2xl"
            />
          </div>

          <div>
            <h1 className="font-bold text-[14px] leading-tight">
              Lorem Ipsum&nbsp;is simply
              <br className="hidden md:inline" /> Lorem simply.{" "}
            </h1>
            <p className="text-[12px] md:text-[14px]">
              Lorem Ipsum&nbsp;is simply.{" "}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <Image
              src="/images/cart.png"
              alt="Stock market chart"
              width={88}
              height={56}
              className="rounded-2xl"
            />
          </div>

          <div>
            <h1 className="font-bold text-[14px] leading-tight">
              Lorem Ipsum&nbsp;is simply
              <br className="hidden md:inline" /> Lorem simply.{" "}
            </h1>
            <p className="text-[12px] md:text-[14px]">
              Lorem Ipsum&nbsp;is simply.{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl mb-6 md:mb-10 font-semibold leading-tight">
          Want up to 11% Dividend Yield?
        </h1>

        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/8EDwgRmnJr8?si=PPdCwHz16TMOQ5ME"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>

        <p className="mt-4 md:mt-5 text-sm md:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
          minima.
        </p>
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
