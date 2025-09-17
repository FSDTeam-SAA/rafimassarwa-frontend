/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLanguage } from "@/providers/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import Olive from "./olive";
import { OliveValue } from "./olive-value";

export const OliveSection = ({ stockData }: any) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { dictionary } = useLanguage();

  return (
    <div className="w-full lg:w-1/2 shadow-md p-6 rounded-xl border bg-white">
      <div className="flex gap-3 lg:gap-0 justify-between items-center mb-10">
        <div className="flex items-center gap-1 lg:gap-4 lg:w-1/3">
          <h1 className="lg:text-xl font-bold mb-2 text-gray-800 truncate ">
            {stockData?.company}
          </h1>
          {stockData?.logo && (
            <Image
              src={stockData.logo}
              alt="Company Logo"
              width={1000}
              height={1000}
              className="lg:h-[38px] h-[25px] w-[25px] lg:w-[38px] rounded-full"
            />
          )}
        </div>

        <div className=" lg:w-1/3 flex justify-end">
          <Link href={`/deep-research/${query}`}>
            <button className="bg-green-500 text-sm lg:text-lg text-white font-semibold py-1 px-1 lg:px-3 lg:py-2 rounded-lg">
              {dictionary.deepResearch2}
            </button>
          </Link>
        </div>

        <div className="lg:w-1/3 flex items-center justify-end">
          <Image
            src={
              stockData?.shariaCompliant
                ? "/images/chad.png"
                : "/images/chadRed.png"
            }
            alt="Chad Logo"
            width={1000}
            height={1000}
            className="lg:h-[40px] lg:w-[40px] h-[30px] w-[30px]"
          />

          <div className="relative group inline-block">
            {/* Tooltip Trigger Icon */}
            <Link href={"/graphic-concept"}>
              <div className="lg:h-5 lg:w-5 h-4 w-4 rounded-full bg-gray-500 text-white flex justify-center items-center cursor-pointer text-sm">
                ?
              </div>
            </Link>

            {/* Tooltip Box */}
            <div className="absolute z-10 hidden group-hover:block bg-white border border-gray-300 shadow-lg px-2 py-1 rounded-md w-max min-w-[150px] top-full mt-1 left-1/2 -translate-x-1/2">
              <p className="text-xs text-gray-700 whitespace-pre-wrap">
                {stockData?.reason}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Olive stockData={stockData} />

      <OliveValue stockData={stockData} />
    </div>
  );
};
