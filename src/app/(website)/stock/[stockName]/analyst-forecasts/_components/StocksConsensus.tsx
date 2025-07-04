import { Lock } from "lucide-react";

export default function StocksConsensus() {
  return (
    <div>
      <h2 className="text-xl font-bold pb-4">
        Stocks with the Highest Top Analyst Consensus in the Technology Sector
      </h2>
      <div className="border border-gray-200 rounded-md overflow-hidden max-w-full">
        <div className="flex justify-between items-center overflow-x-auto gap-1 md:gap-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="min-w-[150px] p-4 border-r border-gray-200 text-center flex justify-between h-full"
              >
                <div>
                  <Lock className="text-amber-500 w-5 h-5" />
                </div>
                <div>
                  <div className="text-teal-500 font-bold text-lg">74.23%</div>
                  <div className="text-teal-500">Upside</div>
                </div>
              </div>
            ))}
        </div>

        <div className="bg-[#e0e0e0] p-4">
          <p className="text-gray-700">
            Find stocks in the <span className="font-semibold">Technology</span>{" "}
            sector that are highly recommended by Top Performing Analysts.
          </p>
        </div>
      </div>
    </div>
  );
}
