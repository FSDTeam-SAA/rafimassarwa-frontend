"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import Link from "next/link"

export default function SubscriptionCard() {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get-user/${userId}`)
      const data = await res.json()
      return data
    },
    enabled: !!userId,
  })

  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`)
      const data = await res.json()
      return data?.data || []
    },
  })

  if (userLoading || plansLoading) {
    return <div className="text-center py-8">Loading subscription details...</div>
  }

  const currentPlanTitle = user?.payment || "free"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentPlan = plans?.find((plan: any) => plan.title === currentPlanTitle)

  console.log(currentPlan)

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <CardTitle className="text-xl">My Subscription</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ✅ Current Plan */}
        <div className="rounded-lg p-4 border-2 border-[#28A745] bg-green-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">{currentPlan?.title} Plan</h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Current</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{currentPlan?.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="text-gray-500">Renews on</p>
              <p className="font-medium">
                {user?.expiryDate
                  ? new Date(user?.expiryDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                  : "N/A"}
              </p>
            </div>
            <Link href="/explore-plan">
              <Button className="bg-green-600 hover:bg-green-700">Manage</Button>
            </Link>
          </div>
        </div>

        {/* ✅ Other Available Plans */}
        <div>
          <h3 className="font-semibold mb-4">Available Plans</h3>
          {plans
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((plan: any) => plan.title !== currentPlanTitle)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((plan: any) => (
              <div key={plan._id} className="border rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between">
                  <div className="w-[85%]">
                    <h4 className="font-medium">{plan.title}</h4>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>
                  <span className="font-semibold w-[10%] text-sm">
                    {plan.monthly_price > 0 ? `$${plan.monthly_price}/mo` : "Free"}
                  </span>
                </div>
                <Link href="/explore-plan">
                  <Button className="bg-green-600 hover:bg-green-700 h-8 mt-2">Get Plan</Button>
                </Link>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
