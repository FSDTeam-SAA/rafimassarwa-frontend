"use client";

import { Check } from "lucide-react";
import { useUserPayment } from "../context/paymentContext";
import Link from "next/link";

export default function AlertsCards() {
  const { paymentType } = useUserPayment();

  console.log(paymentType);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-16">
        {/* Set Up Email Alerts Card */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="bg-blue-50 px-4 py-3">
            <h3 className="text-base font-semibold text-gray-900">
              Set Up Email Alerts
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-700">
                Select Stocks from your watchlist for email alerts
              </span>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-700">
                Your account is limited to email alerts on 30 stocks
              </span>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade to Premium Card */}
        <div className="flex-1 rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
          <div className="bg-green-50 px-4 py-3">
            <h3 className="text-base font-semibold text-gray-900">
              {paymentType === "free"
                ? "Upgrade to Premium"
                : paymentType === "Premium"
                ? "Upgrade to Ultimate"
                : "Congrats! You are a Ultimate user."}
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-700">
                Receive email alerts for up to 30 stocks
              </span>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-700">
                Get advanced access to interactive research tools
              </span>
            </div>
            <div className="flex justify-end mt-4">
              <Link href={"/explore-plan"}>
                <button className="px-6 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors">
                  Upgrade Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
