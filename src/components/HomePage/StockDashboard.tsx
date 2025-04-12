"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import AllStock from "./AllStock";
import { BestRatedStocks } from "./BestRatedStocks";
import WorstRatedStocks from "./WorstRatedStocks";
import ByRating from "./ByRating";
import SellingRating from "./SellingRating";

export default function StockDashboard() {
  const [activeTrendingTab, setActiveTrendingTab] = useState("all");
  const [activeTopStocksTab, setActiveTopStocksTab] = useState("buy");

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Trending Stocks Card */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-4">
              <h2 className="text-xl font-bold">Trending Stocks</h2>

              {/* Tabs */}
              <div className="mt-4 flex border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium ${activeTrendingTab === "all" ? "border-black" : "text-gray-400 hover:text-gray-900"}`}
                  onClick={() => setActiveTrendingTab("all")}
                >
                  All Stocks
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTrendingTab === "best" ? "border-black" : "text-gray-400 hover:text-gray-900"}`}
                  onClick={() => setActiveTrendingTab("best")}
                >
                  Best Rated
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTrendingTab === "worst" ? "border-black" : "text-gray-600 hover:text-gray-900"}`}
                  onClick={() => setActiveTrendingTab("worst")}
                >
                  Worst Rated
                </button>
              </div>

              {/* Tab Content */}
              

              {/* Render Content Based on Active Tab */}
              {activeTrendingTab === "all" ? (
                <AllStock />
              ) : activeTrendingTab === "best" ? (
                <BestRatedStocks />
              ) : (
               <WorstRatedStocks />
              )}

              {/* Footer */}
              <div className="mt-4 flex justify-end">
                <a href="#" className="flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                  All Trending Stocks
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Top Stocks Card */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-4">
              <h2 className="text-xl font-bold">Top Stocks</h2>

              {/* Tabs */}
              <div className="mt-4 flex border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium ${activeTopStocksTab === "buy" ? "border-black" : "text-gray-600 hover:text-gray-900"}`}
                  onClick={() => setActiveTopStocksTab("buy")}
                >
                  Buy Ratings
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTopStocksTab === "sell" ? "border-black" : "text-gray-600 hover:text-gray-900"}`}
                  onClick={() => setActiveTopStocksTab("sell")}
                >
                  Sell Ratings
                </button>
              </div>

              {/* Tab Content */}
              {activeTopStocksTab === "buy" ? (
                <ByRating />
              ) : (
                <SellingRating />
              )}

              {/* Footer */}
              <div className="mt-4 flex justify-end">
                <a href="#" className="flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                  All Top Stocks
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
