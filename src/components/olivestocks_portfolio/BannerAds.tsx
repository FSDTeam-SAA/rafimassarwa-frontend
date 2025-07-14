"use client";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Info, SquareX } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function BannerAds() {
  const axiosInstance = useAxios();

  const { data: bannerAds = [] } = useQuery({
    queryKey: ["banner-ads"],
    queryFn: async () => {
      const res = await axiosInstance("/admin/ads/all-ads");
      return res.data.data;
    },
  });

  console.log(bannerAds);

  return (
    <section className="my-5">
      <div className="container mx-auto">
        <div className="relative">
          <Image
            src="/images/murakkabs_portfolio_page/ads.png"
            alt="ad"
            width={1500}
            height={1000}
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute right-1.5 top-0 flex gap-1">
            <button>
              <Info className="" />
            </button>
            <button>
              {" "}
              <SquareX className="" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
