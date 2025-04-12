"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const stockTickerData = [
  { symbol: "S&P", value: 8222.3, change: 0.02, changePercent: 0.86, trend: "up" as const },
  { symbol: "DOW", value: 3456.8, change: 0.03, changePercent: 1.86, trend: "up" as const },
  { symbol: "NASDAQ", value: 15200.5, change: 0.02, changePercent: 0.86, trend: "up" as const },
  { symbol: "FTSE", value: 7200.2, change: 0.03, changePercent: 0.86, trend: "up" as const },
  { symbol: "NIKKEI", value: 30000.1, change: 0.02, changePercent: 0.86, trend: "up" as const },
  { symbol: "NIKKEI", value: 30000.1, change: 0.02, changePercent: 0.86, trend: "up" as const },
  { symbol: "NIKKEI", value: 30000.1, change: 0.02, changePercent: 0.86, trend: "up" as const },
  { symbol: "NIKKEI", value: 30000.1, change: 0.02, changePercent: 0.86, trend: "up" as const },
  { symbol: "NIKKEI", value: 30000.1, change: 0.02, changePercent: 0.86, trend: "up" as const },
  
];

export default function StockTickerCarousel() {
  return (
    <div className="mt-28 mx-auto max-w-[1440px]">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {stockTickerData.map((stock, index) => (
            <CarouselItem key={index} className="basis-[220px] md:basis-[240px]">
              <div className="px-4 py-3">
                <div className="flex items-center gap-4">
                  {/* Stock Info */}
                  <div className="">
                    <div className="">
                      <div className="text-[12px] text-blue-600 font-semibold">{stock.symbol}</div>
                      <div className="text-[12px] font-bold text-black">{stock.value.toLocaleString()}</div>
                    </div>
                    <div>
                      <span
                        className="text-black text-[12px]"
                      >
                        {stock.trend === "up" ? "+" : "-"}
                        {stock.change.toLocaleString()} ({stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="h-10 w-20">
                    <Image src="/images/svgTrack.svg" alt="svg iamge" width={200} height={100} className="object-cover"/>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom styled controls */}
        <CarouselPrevious className="!left-[-24px] !bg-white !shadow-md hover:!bg-gray-100 transition" />
        <CarouselNext className="!right-[-24px] !bg-white !shadow-md hover:!bg-gray-100 transition" />
      </Carousel>
      <hr />
    </div>
  );
}
