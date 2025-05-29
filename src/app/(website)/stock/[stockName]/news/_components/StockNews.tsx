import StockAds from "@/shared/StockAds";
import MarketNewsCard from "./MarketNewsCard";
import { ChevronRight } from "lucide-react";

export default function StockNews() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-4">
          <MarketNewsCard
            image="/images/news-cart.png"
            title="Broadcom (AVGO) is About to Report Q1..."
            timeAgo="15d ago"
            tags={[{ name: "AAPL" }, { name: "AVGO" }]}
          />
        </div>

        <div className="lg:col-span-2">
          <MarketNewsCard
            image="/images/news-cart.png"
            title="Broadcom (AVGO) is About to Report Q1..."
            timeAgo="15d ago"
            tags={[{ name: "AAPL" }, { name: "AVGO" }]}
            showBannerAd={true}
          />

          <div className="mt-5">
            <StockAds />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <MarketNewsCard
          image="/images/news-cart.png"
          title="Broadcom (AVGO) is About to Report Q1..."
          timeAgo="15d ago"
          tags={[{ name: "AAPL" }, { name: "AVGO" }]}
        />

        <MarketNewsCard
          image="/images/news-cart.png"
          title="Broadcom (AVGO) is About to Report Q1..."
          timeAgo="15d ago"
          tags={[{ name: "AAPL" }, { name: "AVGO" }]}
        />

        <MarketNewsCard
          image="/images/news-cart.png"
          title="Broadcom (AVGO) is About to Report Q1..."
          timeAgo="15d ago"
          tags={[{ name: "AAPL" }, { name: "AVGO" }]}
        />
      </div>

      <div className="font-medium text-blue-500 text-xl mt-2 flex justify-end">
        <button className="flex items-center gap-2 ">
          <h1>More AAPL News</h1>
          <h1>
            <ChevronRight />
          </h1>
        </button>
      </div>
    </div>
  );
}
