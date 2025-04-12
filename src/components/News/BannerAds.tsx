import { X, Info } from "lucide-react";

export default function BannerAds() {
  return (
    <div className="relative h-[149px] bg-[#edf5ed] rounded-sm p-6 mb-6 container mx-auto shadow-sm shadow-gray-400">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button className="p-[1px] bg-[#FFFFFF] cursor-pointer">
          <Info className="h-4 w-4" />
        </button>
        <button className="bg-[#FFFFFF]">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-[32px] font-semibold text-center mt-6 mb-6">Banner Ads</h1>
      </div>
    </div>
  );
}
