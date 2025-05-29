import { Search } from "lucide-react"
import Image from "next/image"

// Stock data array for the grid
const stockData = Array(8).fill({
  symbol: "AAPL",
  name: "Apple",
  price: "220.00",
  change: "+1.52",
  changePercent: "+0.86%",
})

export default function StockSearchSection() {
  return (
    <section className="w-full bg-[#f0f7f0] py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            Make Informed, Data-Driven Investments
          </h2>
          <p className="mt-4 text-lg text-gray-800">
            We empower everyone with access to institutional-grade research tools and data.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search any Stock...."
              className="w-full rounded-full border border-green-300 bg-white py-3 pl-6 pr-12 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Stock Grid */}
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {stockData.slice(0, 5).map((stock, index) => (
              <div
                key={`stock-top-${index}`}
                className="flex items-center justify-between rounded-full bg-white px-4 py-3 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                    <Image
                      src="/apple-logo.svg"
                      alt="Apple Logo"
                      width={16}
                      height={16}
                      className="h-4 w-4 text-white"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-blue-500">{stock.symbol}</div>
                    <div className="text-sm font-medium">{stock.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{stock.price}</div>
                  <div className="text-xs font-medium text-green-500">
                    {stock.change} ({stock.changePercent})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
