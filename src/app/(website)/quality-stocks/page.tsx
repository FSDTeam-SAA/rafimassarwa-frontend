import React from "react";
// import Articles from '@/components/murakkabs_portfolio/Articles'
// import TopData from '@/components/murakkabs_portfolio/TopData'
import QualityStocks from "@/components/quality-stocks/QualityStocks";
import StockTickerCarousel from "@/components/Watchlist/StockTickerCarousel";
import Articles from "@/shared/Articles";
import { SocketProvider } from "@/providers/SocketProvider";
import BannerAds from "@/components/News/BannerAds";

export default function page() {
  return (
    <div className="lg:-mt-8">
      <div className="">
        <SocketProvider>
          <StockTickerCarousel />
        </SocketProvider>
      </div>
      <QualityStocks />

      <BannerAds />
      <Articles />
    </div>
  );
}
