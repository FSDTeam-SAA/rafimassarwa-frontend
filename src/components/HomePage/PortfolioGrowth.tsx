import Image from "next/image"
import { Star } from "lucide-react"

const features = [
  "Expert Market Insights",
  "Breaking News & In-Depth Stock Analysis",
  "Data-Backed Investment Decisions",
  "Real-Time Portfolio Tracking",
  "Discover Hidden Investment Opportunities",
]

export default function PortfolioGrowth() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="overflow-hidden rounded-lg bg-white">
          <div className="grid grid-cols-1 items-center md:grid-cols-2">
            {/* Left side - Image */}
            <div className="h-full w-full">
              <Image
                src="/images/grow.png"
                alt="Growing investment chart"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Right side - Content */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-black md:text-4xl">
                Growing Your Portfolio and Building Lasting Wealth.
              </h2>

              <p className="mt-6 text-xl text-gray-800">Take Control of Your Financial Future with Olives Stocks!</p>

              <ul className="mt-8 space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="mr-2 h-5 w-5 flex-shrink-0 fill-green-500 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <a
                  href="#upgrade"
                  className="inline-block w-full rounded-md bg-green-500 px-6 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 md:w-auto"
                >
                  Upgrade Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
