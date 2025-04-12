import Image from "next/image";
import NewsCart from "./NewsCart";



export default function StockNewsMain() {
  return (
    <div className="w-full mb-[80px] container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Stock Market News</h1>

      <div className="">
        {/* Main Article */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <Image
              src="/images/news-img.png"
              alt="Stock market chart"
              width={400}
              height={300}
              className="w-full h-full object-contain rounded-lg bg-black"
            />
          </div>

          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-10">Market News</div>
            <h2 className="text-[40px] font-semiboldold mb-10 leading-[50px] text-[#000000]">
              Seeking Up to 11% Dividend <br /> Yield? Analysts Suggest 2 <br />{" "}
              Dividend Stocks to Buy
            </h2>
            <p className="text-gray-700 mb-4">
              For weeks, stocks have been volatile amid escalating uncertainties
              about the U.S. economic trajectory. With a trade war brewing{" "}
              <br /> between the U.S. an...
            </p>
            <hr className="my-8" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">3m ago</span>
              <div className="flex gap-2">
                <button className="rounded-full text-[#2695FF] text-xs px-3 border border-[#2695FF] py-[6px]">
                  EFC
                </button>
                <button className="rounded-full text-xs text-[#2695FF] px-3 border border-[#2695FF] py-[6px]">
                  GMRE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Articles */}
        <div className="mt-10">
            <NewsCart />
        </div>
      </div>
    </div>
  );
}
