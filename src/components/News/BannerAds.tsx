"use client";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function BannerAds() {
  const axiosInstance = useAxios();

  const [isVisible, setIsVisible] = useState(false);

  const { data: adsResponse = [] } = useQuery({
    queryKey: ["banner-ads"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/ads/all-ads");
      return response.data.data;
    },
  });

  const addsData = adsResponse[0];

  return (
    <div>
      {isVisible ? (
        <div></div>
      ) : (
        <div>
          {addsData?.publish ? (
            <div className=" container relative h-[200px] rounded-sm mb-6 mx-auto mt-10">
              <div className="absolute top-2 right-5 flex items-center gap-2">
                {/* <button className="p-[1px] cursor-pointer">
              <Info className="h-4 w-4" />
            </button> */}
                <button onClick={() => setIsVisible(true)} className="">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <Image
                src={addsData?.imageLink}
                alt="ads.png"
                width={1000}
                height={1000}
                className="w-full h-full rounded-lg"
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
