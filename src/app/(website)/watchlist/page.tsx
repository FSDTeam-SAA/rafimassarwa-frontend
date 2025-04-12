import Articles from "@/components/murakkabs_portfolio/Articles";
import BannerAds from "@/components/News/BannerAds";
import AlertsCards from "@/components/Watchlist/AlertsCards";
import StockTickerCarousel from "@/components/Watchlist/StockTickerCarousel";
import StockWatchlistTable from "@/components/Watchlist/StockWatchlistTable";
import React from "react";

const WatchlistPage = () => {
  return (
    <div>
      <StockTickerCarousel />
      <StockWatchlistTable />
      <AlertsCards />
      <BannerAds />
      <Articles />
    </div>
  );
};

export default WatchlistPage;
