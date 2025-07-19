import Image from "next/image";
import Link from "next/link";
import { useUserPayment } from "../context/paymentContext";

interface TrendingStock {
  symbol: string;
  currentPrice: number;
  priceChange: number | null;
  percentChange: number | null;
  buy: number;
  hold: number;
  sell: number;
  targetMean: number | null;
  upsidePercent: string | null;
}

interface StockTrackingTableProps {
  trendingStocks: TrendingStock[];
}

export default function StockTrackingTable({
  trendingStocks,
}: StockTrackingTableProps) {
  console.log(trendingStocks);

  const { paymentType } = useUserPayment();

  if (!trendingStocks || trendingStocks.length === 0) {
    return (
      <div className="mt-4 p-8 text-center text-gray-500">
        No trending stocks data available
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] w-full max-w-4xl mx-auto">
        <div className="mt-4 grid grid-cols-4 gap-2 rounded-t-md bg-green-50 p-2 text-sm font-medium">
          <div>Stock Info</div>
          <div className="ml-10">Price & Changes</div>
          <div className="ml-7">Price</div>
          <div>
            Upside <br /> Potential
          </div>
        </div>

        <div className="bg-white rounded-b-md">
          {trendingStocks.map((stock, index) => {
            return (
              <div
                key={`${stock.symbol}-${index}`}
                className={`grid grid-cols-4 p-3 items-center ${
                  index !== trendingStocks.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {/* Stock Info */}
                <div className="flex items-center">
                  <Link href={`/search-result?q=${stock?.symbol}`}>
                    {" "}
                    <div>
                      <div className="text-[#2e7d32] font-medium">
                        {stock.symbol}
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Company */}
                <div className="ml-10">
                  <div className="text-green-500 font-medium">
                    ${stock.currentPrice || "N/A"}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {stock.priceChange !== null && stock.percentChange !== null
                      ? `${
                          stock.priceChange >= 0 ? "+" : ""
                        }${stock.priceChange.toFixed(
                          2
                        )} (${stock.percentChange.toFixed(2)}%)`
                      : "No change data"}
                  </div>
                </div>

                {/* Rating & Price Target */}
                <div className="flex items-center ml-8">
                  {paymentType === "free" ? (
                    <div
                      className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#28A745] z-0"
                      style={{
                        filter: "blur(1px)",
                        boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Image
                        src="/images/lock.png"
                        alt="lock-image"
                        width={20}
                        height={20}
                        className="absolute z-1000"
                      />
                    </div>
                  ) : (
                    <>
                      <div>${stock?.targetMean?.toFixed(2)}</div>
                    </>
                  )}
                </div>

                {/* Upside Potential */}
                <div className="text-green-500 font-medium mt-3 ml-3">
                  {paymentType === "free" ? (
                    <div
                      className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#28A745] z-0"
                      style={{
                        filter: "blur(1px)",
                        boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Image
                        src="/images/lock.png"
                        alt="lock-image"
                        width={20}
                        height={20}
                        className="absolute z-1000"
                      />
                    </div>
                  ) : (
                    <>
                      {stock.upsidePercent ? `${stock.upsidePercent}%` : "N/A"}
                      <div className="text-green-500 text-sm">
                        {stock.upsidePercent ? "Upside" : "No data"}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
