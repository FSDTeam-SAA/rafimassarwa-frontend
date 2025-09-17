/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLanguage } from "@/providers/LanguageProvider";
import React from "react";

export const OliveValue = ({ stockData }: any) => {
  const { dictionary } = useLanguage();

  // Calculate percentage difference
  const percentDiff =
    ((stockData?.valuationBar?.currentPrice -
      stockData?.valuationBar?.fairValue) /
      stockData?.valuationBar?.fairValue) *
    100;
  const isOvervalued =
    stockData?.valuationBar?.currentPrice > stockData?.valuationBar?.fairValue;
  const isUndervalued =
    stockData?.valuationBar?.currentPrice < stockData?.valuationBar?.fairValue;
  const isFairlyValued =
    Math.abs(
      stockData?.valuationBar?.currentPrice - stockData?.valuationBar?.fairValue
    ) < 0.01;

  // Determine colors based on valuation
  const getGradientColors = () => {
    if (isFairlyValued) {
      return {
        start: "#FFD700",
        middle: "#00A719",
        end: "#00A719",
      };
    } else if (isUndervalued) {
      return {
        start: "#00A719",
        middle: "#FFD700",
        end: "#FFD700",
      };
    } else {
      return {
        start: "#FFD700",
        middle: "#FF5733",
        end: "#FF5733",
      };
    }
  };

  const gradientColors = getGradientColors();

  // Get status text and color
  const getStatusInfo = () => {
    if (isFairlyValued) {
      return { text: "Fair Value", bgColor: "#28A745", textColor: "#28A745" };
    } else if (isUndervalued) {
      return { text: "Under Value", bgColor: "#FFD700", textColor: "#FFD700" };
    } else {
      return { text: "Over Value", bgColor: "#FF5733", textColor: "#FF5733" };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="mt-10">
      <svg
        width="587"
        height="94"
        viewBox="0 0 587 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[50px] lg:h-[93px]"
      >
        {/* Main curved path */}
        <path
          d="M25.4393 61.2056C25.2118 57.086 28.9466 49.3388 45.7053 51.3069H219.843C223.437 51.463 230.624 49.5612 230.624 40.7051C230.965 44.239 233.394 51.3069 240.382 51.3069H424.823C428.371 51.2093 435.672 53.0525 436.491 61.2056"
          stroke="url(#paint0_linear_dynamic)"
          strokeWidth="12"
        />

        {/* Under Value Box */}
        <rect x="0.5" y="1.33398" width="87" height="23" fill="white" />
        <rect x="0.5" y="1.33398" width="115" height="23" stroke="#C8C8C8" />
        <text
          x="55"
          y="16"
          textAnchor="middle"
          className="text-xs font-medium border border-red-600"
          fill="#FFD700"
        >
          {dictionary.undervalued}
        </text>

        {/* Fair Value Box */}
        <rect
          x="187.5"
          y="1.33398"
          width="87"
          height="23"
          stroke="#C8C8C8"
          fill="white"
        />
        <text
          x="231"
          y="16"
          textAnchor="middle"
          className="text-xs font-medium"
          fill="#28A745"
        >
          {dictionary.fairlyValued}
        </text>

        {/* Over Value Box */}
        <rect
          x="374.5"
          y="1.33398"
          width="87"
          height="23"
          stroke="#C8C8C8"
          fill="white"
          className="bg-green-500"
        />
        <text
          x="418"
          y="16"
          textAnchor="middle"
          className="text-xs font-medium"
          fill="#FF5733"
        >
          {dictionary.overvalued}
        </text>

        {/* Price indicators */}
        <text
          x="231"
          y="88"
          textAnchor="middle"
          className="text-sm font-bold"
          fill="black"
        >
          ${stockData?.valuationBar?.fairValue}
        </text>

        <text
          x={`${
            stockData?.valuationBar?.currentPrice <
            stockData?.valuationBar?.fairValue
              ? 118
              : 344
          }`}
          y="88"
          textAnchor="middle"
          className={`text-sm font-bold`}
          fill="#FF5733"
        >
          ${stockData?.valuationBar?.currentPrice}
        </text>

        {/* Status indicator box */}
        <rect
          x="461.5"
          y="41.334"
          width="125"
          height="52"
          rx="3.5"
          stroke="#C8C8C8"
          fill="white"
        />

        <text
          x="524"
          y="65"
          textAnchor="middle"
          className="text-xs font-bold"
          fill={"#03AC13"}
        >
          {Math.abs(percentDiff).toFixed(2)}%
        </text>
        <text
          x="524"
          y="77"
          textAnchor="middle"
          className="text-xs font-medium"
          fill={"#03AC13"}
        >
          {statusInfo.text}
        </text>

        {/* Directional arrows */}
        {isUndervalued && (
          <path
            d="M230.201 30.084C230.778 29.084 232.222 29.084 232.799 30.084L241.026 44.334C241.604 45.334 240.882 46.584 239.727 46.584H223.273C222.118 46.584 221.396 45.334 221.974 44.334L230.201 30.084Z"
            fill="#03AC13"
          />
        )}

        {isOvervalued && (
          <path
            d="M352.293 75.5411C352.683 75.9316 353.317 75.9316 353.707 75.5411L360.071 69.1771C360.462 68.7866 360.462 68.1534 360.071 67.7629C359.681 67.3724 359.047 67.3724 358.657 67.7629L353 73.4198L347.343 67.7629C346.953 67.3724 346.319 67.3724 345.929 67.7629C345.538 68.1534 345.538 68.7866 345.929 69.1771L352.293 75.5411ZM352 24.834L352 74.834L354 74.834L354 24.834L352 24.834Z"
            fill="#FF5733"
          />
        )}

        {/* Dynamic gradient definition */}
        <defs>
          <linearGradient
            id="paint0_linear_dynamic"
            x1="25.4297"
            y1="50.9553"
            x2="436.491"
            y2="50.9553"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors.start} />
            <stop offset="0.5" stopColor={gradientColors.middle} />
            <stop offset="1" stopColor={gradientColors.end} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
