"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type NewsCategory = "all" | "bearish" | "bullish";
type NewsSentiment = "Neutral" | "Bearish" | "Bullish";

interface NewsItemType {
  id: number;
  time: string;
  headline: string;
  source: string;
  sentiment: NewsSentiment;
  category: NewsCategory[];
}

// Mock data with variety
const mockNewsData: NewsItemType[] = [
  {
    id: 1,
    time: "2 hours ago",
    headline:
      "Morgan Stanley's near-term rally call: CIO Mike Wilson sees beaten-up.",
    source: "CNBC",
    sentiment: "Neutral",
    category: ["all", "bearish"],
  },
  {
    id: 2,
    time: "3 hours ago",
    headline:
      "Apple's iPhone 16 demand expected to exceed forecasts, analysts say.",
    source: "Bloomberg",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 3,
    time: "4 hours ago",
    headline: "Tech stocks face headwinds as interest rates remain elevated.",
    source: "Reuters",
    sentiment: "Bearish",
    category: ["all", "bearish"],
  },
  {
    id: 4,
    time: "5 hours ago",
    headline:
      "Apple services revenue hits all-time high, boosting investor confidence.",
    source: "Financial Times",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 5,
    time: "6 hours ago",
    headline: "Supply chain constraints could impact Apple's Q3 deliveries.",
    source: "WSJ",
    sentiment: "Bearish",
    category: ["all", "bearish"],
  },
  {
    id: 6,
    time: "7 hours ago",
    headline: "Apple's AI strategy remains unclear as competitors advance.",
    source: "CNBC",
    sentiment: "Neutral",
    category: ["all", "bearish"],
  },
  {
    id: 7,
    time: "8 hours ago",
    headline: "New MacBook Pro models expected to drive holiday sales surge.",
    source: "Bloomberg",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 8,
    time: "9 hours ago",
    headline:
      "Apple's market cap approaches $3 trillion again as momentum builds.",
    source: "Reuters",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 9,
    time: "10 hours ago",
    headline: "Analysts concerned about Apple's exposure to Chinese market.",
    source: "Financial Times",
    sentiment: "Bearish",
    category: ["all", "bearish"],
  },
  {
    id: 10,
    time: "11 hours ago",
    headline:
      "Apple's services bundle strategy paying off, subscription growth accelerates.",
    source: "WSJ",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 11,
    time: "12 hours ago",
    headline: "iPhone sales in emerging markets show signs of weakness.",
    source: "CNBC",
    sentiment: "Bearish",
    category: ["all", "bearish"],
  },
  {
    id: 12,
    time: "13 hours ago",
    headline:
      "Apple's cash reserves give it advantage in uncertain economic climate.",
    source: "Bloomberg",
    sentiment: "Neutral",
    category: ["all", "bullish"],
  },
  {
    id: 13,
    time: "14 hours ago",
    headline: "App Store facing increased regulatory scrutiny in EU markets.",
    source: "Reuters",
    sentiment: "Bearish",
    category: ["all", "bearish"],
  },
  {
    id: 14,
    time: "15 hours ago",
    headline: "Apple's share buyback program continues to support stock price.",
    source: "Financial Times",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 15,
    time: "16 hours ago",
    headline:
      "Competition in wearables market intensifies as Apple Watch sales plateau.",
    source: "WSJ",
    sentiment: "Neutral",
    category: ["all", "bearish"],
  },
  {
    id: 16,
    time: "17 hours ago",
    headline:
      "Apple's R&D spending increases 15% year-over-year, focusing on AI.",
    source: "CNBC",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 17,
    time: "18 hours ago",
    headline:
      "Institutional investors increasing AAPL positions ahead of earnings.",
    source: "Bloomberg",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 18,
    time: "19 hours ago",
    headline:
      "Apple supplier reports production delays, potential impact on new products.",
    source: "Reuters",
    sentiment: "Bearish",
    category: ["all", "bearish"],
  },
  {
    id: 19,
    time: "20 hours ago",
    headline:
      "Apple's privacy features continue to disrupt digital advertising market.",
    source: "Financial Times",
    sentiment: "Neutral",
    category: ["all", "bullish"],
  },
  {
    id: 20,
    time: "21 hours ago",
    headline: "Analysts divided on Apple's valuation as P/E ratio expands.",
    source: "WSJ",
    sentiment: "Neutral",
    category: ["all", "bearish"],
  },
  {
    id: 21,
    time: "22 hours ago",
    headline: "Apple's India manufacturing strategy showing early success.",
    source: "CNBC",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 22,
    time: "23 hours ago",
    headline: "Tech sector rotation could pressure AAPL shares in near term.",
    source: "Bloomberg",
    sentiment: "Bearish",
    category: ["all", "bearish"],
  },
  {
    id: 23,
    time: "1 day ago",
    headline:
      "Apple's ecosystem lock-in effect strengthens as services expand.",
    source: "Reuters",
    sentiment: "Bullish",
    category: ["all", "bullish"],
  },
  {
    id: 24,
    time: "1 day ago",
    headline:
      "Component costs rising, could impact Apple's margins in coming quarters.",
    source: "Financial Times",
    sentiment: "Bearish",
    category: ["all", "bearish"],
  },
];

// Generate additional data to reach 150 items
const additionalData = Array.from({ length: 126 }, (_, i) => {
  const sources = [
    "CNBC",
    "Bloomberg",
    "Reuters",
    "Financial Times",
    "WSJ",
    "MarketWatch",
    "Barron's",
    "Seeking Alpha",
  ];
  const sentiments: NewsSentiment[] = ["Neutral", "Bearish", "Bullish"];
  const randomSentiment =
    sentiments[Math.floor(Math.random() * sentiments.length)];
  const randomSource = sources[Math.floor(Math.random() * sources.length)];
  const timeOptions = [
    "1 hour ago",
    "2 hours ago",
    "3 hours ago",
    "4 hours ago",
    "5 hours ago",
    "6 hours ago",
    "12 hours ago",
    "1 day ago",
    "2 days ago",
  ];
  const randomTime =
    timeOptions[Math.floor(Math.random() * timeOptions.length)];

  const headlines = [
    "Apple stock movement reflects broader market uncertainty.",
    "AAPL technical indicators suggest potential breakout.",
    "Institutional investors adjusting positions in Apple ahead of product launch.",
    "Supply chain analysis reveals insights into Apple's production plans.",
    "Apple's services segment continues to drive revenue growth.",
    "Analysts revise price targets for AAPL following industry report.",
    "Market sentiment shifts on Apple following competitor announcements.",
    "Apple's international expansion faces regulatory hurdles.",
    "New patent filings hint at Apple's future product direction.",
    "Apple's cash position provides buffer against economic headwinds.",
  ];
  const randomHeadline =
    headlines[Math.floor(Math.random() * headlines.length)];

  return {
    id: i + 25,
    time: randomTime,
    headline: randomHeadline,
    source: randomSource,
    sentiment: randomSentiment,
    category: [
      "all",
      randomSentiment === "Bearish"
        ? "bearish"
        : randomSentiment === "Bullish"
        ? "bullish"
        : Math.random() > 0.5
        ? "bearish"
        : "bullish",
    ],
  };
});

const allMockNewsData = [...mockNewsData, ...additionalData];

export default function NewsComponent() {
  const [activeTab, setActiveTab] = useState<NewsCategory>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter news based on active tab
  const filteredNews = allMockNewsData.filter((item) =>
    activeTab === "all" ? true : item.category.includes(activeTab)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredNews.slice(startIndex, endIndex);

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AAPL News on the Web</h1>
      <div className="bg-white rounded-lg shadow-sm border max-w-4xl mx-auto">
        <div className="p-6 pb-0">
          {/* Custom tabs to match design */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "pb-4 px-6 font-medium",
                activeTab === "all"
                  ? "text-black border-b-2 border-green-500 -mb-px"
                  : "text-gray-500"
              )}
            >
              All News
            </button>
            <button
              onClick={() => setActiveTab("bearish")}
              className={cn(
                "pb-4 px-6 font-medium",
                activeTab === "bearish"
                  ? "text-black border-b-2 border-green-500 -mb-px"
                  : "text-gray-500"
              )}
            >
              Bearish News
            </button>
            <button
              onClick={() => setActiveTab("bullish")}
              className={cn(
                "pb-4 px-6 font-medium",
                activeTab === "bullish"
                  ? "text-black border-b-2 border-green-500 -mb-px"
                  : "text-gray-500"
              )}
            >
              Bullish News
            </button>
          </div>
        </div>

        {/* News grid */}
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-md shadow-sm">
                <div className="text-gray-500 text-sm mb-2">{item.time}</div>
                <h3 className="font-medium mb-2">{item.headline}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{item.source}</span>
                  <div className="flex items-center gap-1">
                    <Circle
                      className={`h-3 w-3 fill-current ${
                        item.sentiment === "Bullish"
                          ? "text-green-500"
                          : item.sentiment === "Bearish"
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm text-gray-500">
                      {item.sentiment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center p-4 border-t">
          <div className="text-sm text-gray-600 mr-auto">
            {filteredNews.length} Results | Showing {currentPage} out of{" "}
            {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
