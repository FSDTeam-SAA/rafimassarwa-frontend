"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface StockNewsItem {
  _id: string;
  newsImage: string;
  newsTitle: string;
  time: string;
  createdAt: string;
}

interface MoreFromTipProps {
  stockNews: StockNewsItem[];
}

export default function MoreFromTip({ stockNews }: MoreFromTipProps) {
  const [moreStockNews, setMoreStockNews] = useState(3);
  const pathName = usePathname();
  const isNewsPage = pathName === "/news";

  const customSlice = () => {
    setMoreStockNews((prev) => prev + 3);
  };

  if (!stockNews || stockNews.length === 0) {
    return (
      <div className="text-center text-2xl text-red-500">No news available</div>
    );
  }

  // Separate initial 3 and remaining for Deep Research
  const initialNews = stockNews.slice(0, 3);
  const extraNews = stockNews.slice(3, moreStockNews);

  return (
    <div className="mb-[80px] container mx-auto">
      <h1 className="text-[32px] font-semibold mb-6">
        {isNewsPage ? "Olive Stock News" : "Deep Research"}
      </h1>

      {isNewsPage ? (
        // 📰 News Layout: Grid of cards
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stockNews.slice(0, moreStockNews).map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <>
          {/* 🔍 Initial Deep Research Layout: 1 large + 2 small */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Main Right Article */}
            <div className="md:col-span-2 border rounded-xl pb-2">
              <Image
                src={initialNews[0]?.newsImage}
                alt="Main Research"
                width={800}
                height={600}
                className="w-full h-[543px] object-cover rounded-t-xl mb-2 bg-black"
              />
              <div className="text-xs text-gray-500 mb-1 px-2">
                Olive Stock News
              </div>
              <h3 className="text-sm font-medium mb-2 px-2">
                {initialNews[0]?.newsTitle}
              </h3>
              <hr className="my-3 px-3" />
              <div className="flex items-center justify-between px-2">
                <span className="text-xs text-gray-500">
                  {new Date(initialNews[0]?.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/news/${initialNews[0]?._id}`} target="_blank">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs h-7 px-3"
                  >
                    READ
                  </Button>
                </Link>
              </div>
            </div>

            {/* Left 2 stacked cards */}
            <div className="flex flex-col gap-6">
              {[initialNews[1], initialNews[2]].map(
                (item) =>
                  item && (
                    <div
                      key={item._id}
                      className="flex flex-col border pb-3 rounded-md"
                    >
                      <Image
                        src={item.newsImage}
                        alt="Mini Research"
                        width={300}
                        height={200}
                        className="w-full h-[196px] object-cover rounded-t-md mb-2 bg-teal-900"
                      />
                      <div className="text-xs text-gray-500 mb-1 px-2">
                        Olive Stock News
                      </div>
                      <h3 className="text-sm font-medium mb-2 px-2">
                        {item.newsTitle}
                      </h3>
                      <div className="flex items-center justify-between mt-auto px-2">
                        <span className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <Link href={`/news/${item._id}`} target="_blank">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full text-xs h-7 px-3"
                          >
                            READ
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* 📄 Extra Cards after clicking "More Deep Research" */}
          {extraNews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {extraNews.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          )}
        </>
      )}

      {/* 🔘 Show More Button */}
      {moreStockNews < stockNews.length && (
        <div className="flex justify-end mt-4">
          <button
            onClick={customSlice}
            className="text-xs text-blue-500 hover:underline"
          >
            {isNewsPage
              ? "More Stock Analysis & News >"
              : "More Deep Research >"}
          </button>
        </div>
      )}
    </div>
  );
}

// 🧩 Simple Card Component (shared)
function NewsCard({ news }: { news: StockNewsItem }) {
  return (
    <div className="border rounded-xl pb-2 flex flex-col h-full">
      <Image
        src={news.newsImage}
        alt="News"
        width={300}
        height={200}
        className="w-full object-cover mb-2 rounded-t-xl h-[200px]"
      />
      <div className="text-xs text-gray-500 mb-2 px-2 mt-5">
        Olive Stock News
      </div>
      <h3 className="text-sm font-medium mb-2 px-2">{news.newsTitle}</h3>
      <div className="flex items-center justify-between mt-auto px-2">
        <span className="text-xs text-gray-500">
          {new Date(news.createdAt).toLocaleDateString()}
        </span>
        <Link href={`/news/${news._id}`} target="_blank">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs h-7 px-3"
          >
            READ
          </Button>
        </Link>
      </div>
    </div>
  );
}
