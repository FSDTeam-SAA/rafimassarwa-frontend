import React from "react";
import PortfolioPanels from "@/components/Portfolio/PortfolioPanels";
import StockWatchlistTable from "@/components/Watchlist/StockWatchlistTable";
import BannerAds from "@/components/News/BannerAds";
import Article from "@/components/HomePage/Articles";

const MyPortfolio = () => {
  return (
    <div>
      <PortfolioPanels />
      <StockWatchlistTable />
      <div className="mt-[100px]">
        <BannerAds />
      </div>
      <div>
        <Article />
      </div>
    </div>
  );
};

export default MyPortfolio;
