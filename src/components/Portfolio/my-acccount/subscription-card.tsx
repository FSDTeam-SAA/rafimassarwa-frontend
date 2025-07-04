"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

export default function SubscriptionCard() {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <CardTitle className="text-xl">My Subscription</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Plan */}
        <div className="rounded-lg p-4 border-2 border-[#28A745] bg-green-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Premium Plan</h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Current</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Access to all premium features and real-time data</p>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="text-gray-500">Renews on</p>
              <p className="font-medium">April 15, 2025</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">Manage</Button>
          </div>
        </div>

        {/* Available Plans */}
        <div>
          <h3 className="font-semibold mb-4">Available Plans</h3>

          {/* Basic Plan */}
          <div className="border rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Basic</h4>
                <p className="text-sm text-gray-500">Limited access to basic features</p>
              </div>
              <span className="font-semibold">Free</span>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="border rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Pro</h4>
                <p className="text-sm text-gray-500">Advanced features for active traders</p>
              </div>
              <span className="font-semibold">$19.99/mo</span>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Enterprise</h4>
                <p className="text-sm text-gray-500">Complete access with priority support</p>
              </div>
              <span className="font-semibold">$49.99/mo</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
