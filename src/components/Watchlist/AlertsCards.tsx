"use client"

import { Check } from "lucide-react"

export default function AlertsCards() {
  return (
    <div className="flex flex-col md:flex-row gap-4 container mx-auto my-[100px]">
      {/* Set Up Email Alerts Card */}
      <div className="w-1/2 rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="bg-blue-50 px-4 py-3">
          <h3 className="text-base font-semibold text-gray-900">Set Up Email Alerts</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>
            <span className="ml-2 text-sm text-gray-700">Select Stocks from your watchlist for email alerts</span>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>
            <span className="ml-2 text-sm text-gray-700">Your account is limited to email alerts on 30 stocks</span>
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
          <h3 className="text-base font-semibold text-gray-900">Upgrade to Premium</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>
            <span className="ml-2 text-sm text-gray-700">Receive email alerts for up to 30 stocks</span>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>
            <span className="ml-2 text-sm text-gray-700">Get advanced access to interactive research tools</span>
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-6 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
