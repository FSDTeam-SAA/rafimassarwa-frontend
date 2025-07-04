import { Info, X } from "lucide-react";
import React from "react";

const StockAds = () => {
  return (
    <div className="relative bg-[#f5fbf6] rounded-lg p-10 shadow-lg">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button className="text-gray-700 hover:text-gray-900">
          <Info className="h-5 w-5" />
        </button>
        <button className="text-gray-700 hover:text-gray-900">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Banner Ads</h2>
      </div>
    </div>
  );
};

export default StockAds;
