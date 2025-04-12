"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const tabs = [
  "All Stocks",
  "Market News",
  "Crypto",
  "Tech",
  "Energy",
  "Healthcare",
  "Finance",
]

const articles = [
  {
    id: 1,
    category: "Market News",
    title: "Want up to 11% Dividend Yield? Analysts Select 2 D",
    timestamp: "10.00 pm, 20/11/25",
    tag: "TSLA",
    image: "/images/cart.png",
  },
  {
    id: 2,
    category: "Tech",
    title: "Apple’s Q1 Results Surpass Expectations",
    timestamp: "1.00 pm, 20/11/25",
    tag: "AAPL",
    image: "/images/cart.png",
  },
  {
    id: 3,
    category: "Crypto",
    title: "Bitcoin Hits New High in 2025",
    timestamp: "9.00 am, 20/11/25",
    tag: "BTC",
    image: "/images/cart.png",
  },
]

export default function LatestArticles() {
  const [activeTab, setActiveTab] = useState("All Stocks")

  const filteredArticles =
    activeTab === "All Stocks"
      ? articles
      : articles.filter((article) => article.category === activeTab)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-3xl font-bold">Latest Articles</h2>

        {/* Scrollable Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className="overflow-hidden rounded-lg border-[1px] border-black bg-white shadow-sm p-3"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-md">
                  <Image
                    src={article.image}
                    alt="Financial dashboard"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 text-sm text-gray-600">{article.category}</div>
                  <h3 className="mb-2 text-lg font-semibold">{article.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.timestamp}</span>
                    <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium">
                      {article.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No articles found for {activeTab}</p>
          )}
        </div>

        {/* See All Link */}
        <div className="mt-8 flex justify-end">
          <Link href="/news" className="text-base font-medium text-black hover:underline">
            See All News
          </Link>
        </div>
      </div>
    </section>
  )
}
