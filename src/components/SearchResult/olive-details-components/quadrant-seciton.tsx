/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLanguage } from "@/providers/LanguageProvider";
import Image from "next/image";
import React from "react";

export const QuadrantSection = ({stockData} : any) => {
  const { dictionary, selectedLangCode } = useLanguage();

  return (
    <div className="w-full lg:w-1/2 shadow-md lg:p-16 rounded-xl relative overflow-hidden h-[500px] border">
      {/* Axis Labels */}
      <div className="absolute top-[16px] left-1/2 -translate-x-1/2 text-center text-[12px] lg:text-sm text-gray-700 font-medium">
        {dictionary.strongFinancialHealth}
      </div>
      <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 text-center text-sm text-gray-700 font-medium">
        {dictionary.poorFinancialHealth}
      </div>
      <div
        className={`absolute top-1/2  -translate-y-1/2  text-gray-700 font-medium transform -rotate-90 origin-center text-center ${
          selectedLangCode === "ar"
            ? "left-[-85px] lg:left-[-12px] text-md"
            : "left-[-85px] lg:left-[-45px] text-sm"
        }`}
      >
        {dictionary.lowCompetitiveAdvantage}
      </div>
      <div
        className={`absolute top-1/2 -translate-y-1/2 text-sm text-gray-700 font-medium transform rotate-90 origin-center text-center ${
          selectedLangCode === "ar"
            ? "right-[-85px] lg:right-[-1px] text-md"
            : "right-[-85px] lg:right-[-45px] text-sm"
        }`}
      >
        {dictionary.highCompetitiveAdvantage}
      </div>

      {/* Dual-sided Vertical Arrow */}
      <svg
        className="absolute left-1/2 top-12 -translate-x-1/2"
        width="20"
        height="80%"
        viewBox="0 0 20 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="10" y1="0" x2="10" y2="500" stroke="gray" strokeWidth="2" />
        <polygon points="5,10 15,10 10,0" fill="gray" />
        <polygon points="5,490 15,490 10,500" fill="gray" />
      </svg>

      {/* Dual-sided Horizontal Arrow */}
      <svg
        className="absolute top-[50%] lg:top-1/2 left-7 lg:left-0 -translate-y-1/2 w-[83%] lg:w-[100%]"
        width="100%"
        height="20"
        viewBox="0 0 500 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="10" x2="500" y2="10" stroke="gray" strokeWidth="2" />
        <polygon points="10,5 10,15 0,10" fill="gray" />
        <polygon points="490,5 490,15 500,10" fill="gray" />
      </svg>

      {/* Grid Items */}
      <div className="grid grid-cols-2 gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] lg:w-[50%]">
        {[
          {
            id: "Lime Green",
            title: dictionary.limeGreen,
            color: "bg-green-300",
          },
          {
            id: "Olive Green",
            title: dictionary.oliveGreen,
            color: "bg-[#c7ffe5]",
          },
          {
            id: "Orange",
            title: dictionary.orange,
            color: "bg-[#FFA500]",
          },
          {
            id: "Yellow",
            title: dictionary.yellow,
            color: "bg-yellow-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`border px-2 py-5 lg:px-4 lg:py-10 rounded-lg text-center shadow-md h-40 lg:h-48 ${
              stockData?.quadrant === item.id && item.color
            }`}
          >
            <Image
              src="/images/tree.png"
              alt={item.title}
              width={60}
              height={60}
              className="mx-auto"
            />
            <h1 className="mt-4 text-xs lg:text-lg font-semibold text-gray-800">
              {item.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};
