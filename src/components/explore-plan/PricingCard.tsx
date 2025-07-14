"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { FaCheckSquare } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { IoTriangleSharp } from "react-icons/io5"
import Link from "next/link"

interface ApiFeature {
    name: string
    active: boolean
}

interface ApiFeatureGroup {
    featuresType: string
    type: ApiFeature[]
}

interface ApiSubscriptionPlan {
    _id: string
    title: string
    description: string
    monthly_price: number
    yearly_price: number
    features: ApiFeatureGroup[]
    duration: string
    createdAt: string
    updatedAt: string
}

interface SubscriptionPlan {
    id: string
    title: string
    description: string
    price: number
    features: {
        featuresType: string
        type: string[]
    }
    duration: "monthly" | "yearly"
    allFeatures: ApiFeatureGroup[]
    originalData: ApiSubscriptionPlan // Store original API data
}

export default function SubscriptionPricing() {
    const [isAnnual, setIsAnnual] = useState(true)
    const [plans, setPlans] = useState<SubscriptionPlan[]>([])
    const [originalApiData, setOriginalApiData] = useState<ApiSubscriptionPlan[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch subscription plans from API
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`)
                if (!response.ok) {
                    throw new Error("Failed to fetch subscription plans")
                }
                const data = await response.json()
                if (data.success && data.data) {
                    // Store original API data
                    setOriginalApiData(data.data)

                    const transformedPlans = data.data.map((plan: ApiSubscriptionPlan) => ({
                        id: plan._id,
                        title: plan.title.toUpperCase(),
                        description: plan.description,
                        price: isAnnual ? plan.yearly_price : plan.monthly_price,
                        features: {
                            featuresType: "CORE FEATURES",
                            type:
                                plan.features
                                    .find((f) => f.featuresType.toLowerCase() === "core")
                                    ?.type.filter((feature) => feature.active)
                                    .map((feature) => feature.name) || [],
                        },
                        duration: isAnnual ? "yearly" : ("monthly" as "monthly" | "yearly"),
                        allFeatures: plan.features,
                        originalData: plan, // Store reference to original data
                    }))
                    setPlans(transformedPlans)
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
                console.error("Error fetching subscription plans:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchPlans()
    }, [isAnnual]) // Remove isAnnual dependency to avoid refetching

    // Update plans when billing cycle changes
    useEffect(() => {
        if (originalApiData.length > 0) {
            const updatedPlans = originalApiData.map((apiPlan) => ({
                id: apiPlan._id,
                title: apiPlan.title.toUpperCase(),
                description: apiPlan.description,
                price: isAnnual ? apiPlan.yearly_price : apiPlan.monthly_price, // Use actual API prices
                features: {
                    featuresType: "CORE FEATURES",
                    type:
                        apiPlan.features
                            .find((f) => f.featuresType.toLowerCase() === "core")
                            ?.type.filter((feature) => feature.active)
                            .map((feature) => feature.name) || [],
                },
                duration: isAnnual ? "yearly" : ("monthly" as "monthly" | "yearly"),
                allFeatures: apiPlan.features,
                originalData: apiPlan,
            }))
            setPlans(updatedPlans)
        }
    }, [isAnnual, originalApiData])

    // Helper function to get features by type
    const getFeaturesByType = (plan: SubscriptionPlan, featureType: string) => {
        const featureGroup = plan.allFeatures?.find((f) => f.featuresType.toLowerCase() === featureType.toLowerCase())
        return featureGroup?.type || []
    }

    // Helper function to check if feature is active for plan
    const isFeatureActive = (plan: SubscriptionPlan, featureName: string) => {
        for (const featureGroup of plan.allFeatures || []) {
            const feature = featureGroup.type.find((f) => f.name === featureName)
            if (feature) {
                return feature.active
            }
        }
        return false
    }

    if (loading) {
        return (
            <div className="py-8 lg:py-20 container mx-auto px-3 lg:px-0">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading subscription plans...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-8 lg:py-20 container mx-auto px-3 lg:px-0">
                <div className="text-center">
                    <p className="text-red-600">Error loading subscription plans: {error}</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8 lg:py-20 container mx-auto px-3 lg:px-0">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Invest Smarter. Choose Your Edge.</h1>
                <p className="text-lg text-gray-600 mb-2">Choose the plan that matches your ambition.</p>
                <p className="text-sm text-gray-500 max-w-4xl mx-auto">
                    Every plan includes expert-grade tools, intelligent insights, and powerful portfolio-building features.
                </p>
            </div>

            <div className="flex items-center justify-center mb-6 lg:mb-20">
                <span className={`mr-3 text-xs lg:text-sm font-medium ${!isAnnual ? "text-gray-900" : "text-gray-500"}`}>
                    Monthly Billing
                </span>
                <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="mx-2 data-[state=checked]:bg-[#493EF9]" />
                <span className={`ml-3 text-xs lg:text-sm font-medium ${isAnnual ? "text-gray-900" : "text-gray-500"}`}>
                    Annual Billing
                    <span className="pl-2 text-[#22C55E]">( Save 20% )</span>
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <Card
                        key={plan.id}
                        className={`relative ${plan.title === "PREMIUM"
                            ? "border-2 border-blue-500 shadow-xl lg:scale-105"
                            : plan.title === "ULTIMATE"
                                ? "border-2 border-green-500 shadow-lg"
                                : "border border-gray-200"
                            }`}
                    >
                        {plan.title === "PREMIUM" && (
                            <div className="absolute -top-4 left-1/2 transform w-full -translate-x-1/2 flex gap-2 justify-center">
                                <Badge className="bg-[linear-gradient(90deg,_#3773F8_25%,_#4F46E5_100%)] text-white py-1 lg:py-2 px-2 lg:px-6 md:px-2">
                                    MOST POPULAR
                                </Badge>
                                <IoTriangleSharp className="h-8 w-8 text-[#4F46E5]" />
                                <Badge className="bg-[linear-gradient(90deg,_#3773F8_25%,_#4F46E5_100%)] text-white flex gap-2 lg:py-2 py-1 px-2 lg:px-6 md:px-2">
                                    <Star fill="yellow" className="text-[yellow] h-4 w-4" /> Recommended
                                </Badge>
                            </div>
                        )}
                        {plan.title === "ULTIMATE" && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <Badge className="bg-green-500 text-white">🏆 All Access</Badge>
                            </div>
                        )}

                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                            <CardDescription className="text-sm text-gray-600 min-h-[3rem] flex items-center">
                                {plan.description}
                            </CardDescription>
                            <div className="mt-4">
                                <div className="flex items-baseline justify-center">
                                    <span className="text-4xl font-bold">${plan.price}</span>
                                    <span className="text-gray-500 ml-1">/{isAnnual ? "year" : "month"}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">billed {isAnnual ? "annually" : "monthly"}</p>
                            </div>
                            {plan.title === "FREE" && <p className="text-sm text-gray-600 mt-2">No credit card required</p>}
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Core Features */}
                            <div>
                                <h4 className="font-semibold text-sm text-gray-900 mb-3">CORE FEATURES</h4>
                                <ul className="space-y-2">
                                    {getFeaturesByType(plan, "core").map((feature) => (
                                        <li key={feature.name} className="flex items-center text-sm">
                                            <FaCheckSquare className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                            <span>{feature.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Premium Features */}
                            <div>
                                <h4
                                    className={`font-semibold text-sm mb-3 bg-[#EEF2FF] pl-4 py-2 rounded-md ${plan.title === "PREMIUM" || plan.title === "ULTIMATE" ? "text-blue-600" : "text-blue-400"
                                        }`}
                                >
                                    PREMIUM FEATURES
                                </h4>
                                <ul className="space-y-2">
                                    {getFeaturesByType(plan, "premium").map((feature) => (
                                        <li key={feature.name} className="flex items-center text-sm">
                                            {isFeatureActive(plan, feature.name) ? (
                                                <>
                                                    <FaCheckSquare className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                    <span>{feature.name}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ImCross className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                                                    <span className="text-gray-400">{feature.name}</span>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Ultimate Features */}
                            <div>
                                <h4
                                    className={`font-semibold text-sm mb-3 bg-[#EEF2FF] pl-4 py-2 rounded-md ${plan.title === "ULTIMATE" ? "text-green-600" : "text-green-400"
                                        }`}
                                >
                                    {plan.title === "ULTIMATE" ? "👑 ULTIMATE FEATURES" : "ULTIMATE FEATURES"}
                                </h4>
                                <ul className="space-y-2">
                                    {getFeaturesByType(plan, "ultimate").map((feature) => (
                                        <li key={feature.name} className="flex items-center text-sm">
                                            {isFeatureActive(plan, feature.name) ? (
                                                <>
                                                    <FaCheckSquare className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                    <span>{feature.name}</span>
                                                    <Badge variant="secondary" className="ml-2 text-xs text-nowrap bg-green-100 text-green-800">
                                                        Exclusive
                                                    </Badge>
                                                </>
                                            ) : (
                                                <>
                                                    <ImCross className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                                                    <span className="text-gray-400">{feature.name}</span>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-6">
                            <div className="w-full space-y-4">
                                {plan.title === "FREE" ? (
                                    <Button
                                        disabled
                                        className="w-full bg-gray-400 cursor-not-allowed"
                                    >
                                        Current Plan
                                    </Button>
                                ) : (
                                    <Link
                                        href={`/plan-upgrade?subscriptionId=${plan.id}&price=${plan.price}&duration=${isAnnual ? "yearly" : "monthly"}&planType=${plan.title}`}
                                    >
                                        <Button
                                            className={`w-full ${plan.title === "PREMIUM"
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-green-600 hover:bg-green-700"
                                                }`}
                                        >
                                            {plan.title === "PREMIUM"
                                                ? "Unlock Pro Insights →"
                                                : "Claim Your Elite Access →"}
                                        </Button>
                                    </Link>
                                )}

                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
