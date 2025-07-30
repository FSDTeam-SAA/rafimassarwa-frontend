"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { useSocketContext } from "@/providers/SocketProvider";
import Image from "next/image";
import Link from "next/link";

export default function StockTickerCarousel() {
  const staticStockNames = [
    { name: "S&P 500" },
    { name: "Dow 30" },
    { name: "APPLE INC" },
    { name: "Russell 2000" },
    { name: "MICROSOFT CORP" },
    { name: "TESLA INC" },
    { name: "META PLATFORMS INC-CLASS A" },
  ];

  const linkedStocks = [
    "APPLE INC",
    "MICROSOFT CORP",
    "TESLA INC",
    "META PLATFORMS INC-CLASS A",
  ];

  const getStockName = (name: string) => {
    const match = staticStockNames.find((s) => s.name === name);
    return match?.name || name;
  };

  const { notifications } = useSocketContext();

  return (
    <div className="mx-auto container w-full lg:mt-20 mt-8">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {notifications.map((stock, index) => (
            <CarouselItem
              key={index}
              className="basis-[220px] md:basis-[240px]"
            >
              <div className="px-4 py-3 hover:bg-gray-50 rounded-md transition">
                <div className="flex items-center gap-4">
                  {/* Stock Info */}
                  <div>
                    <div className="text-[12px] text-blue-600 font-semibold">
                      {linkedStocks.includes(stock.name) ? (
                        <Link
                          href={`/search-result?q=${(stock.symbol)}`}
                          className="hover:underline"
                        >
                          {getStockName(stock.name)}
                        </Link>
                      ) : (
                        getStockName(stock.name)
                      )}
                    </div>
                    <div className="text-[12px] font-bold text-black">
                      {parseFloat(stock.currentPrice)?.toFixed(2)}
                    </div>
                    <div>
                      <span
                        className={`text-xs font-medium ${
                          parseFloat(stock.change) >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {parseFloat(stock.change)?.toFixed(2)} (
                        {parseFloat(stock.percent)?.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="h-10 w-20">
                    <Image
                      src="/images/svgTrack.svg"
                      alt="svg image"
                      width={200}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext className="!right-0 !bg-white !shadow-md hover:!bg-gray-100 transition" />
      </Carousel>
      <hr />
    </div>
  );
}
