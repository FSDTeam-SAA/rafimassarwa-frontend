import React from "react";
import Portfolio from "@/components/olivestocks_portfolio/Portfolio";
import StockTickerCarousel from "@/components/Watchlist/StockTickerCarousel";
import Articles from "@/shared/Articles";
import BannerAds from "@/components/News/BannerAds";

export default function page() {
  return (
    <div className="lg:-mt-8">
      <StockTickerCarousel />
      <div className="container mx-auto">
        <Portfolio title="Olive Stocks Portfolio" />
      </div>
      <BannerAds />
      <Articles />
    </div>
  );
}
