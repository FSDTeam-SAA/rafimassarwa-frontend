"use client"

import { useState } from "react"
import { Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { FaCheckSquare } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoTriangleSharp } from "react-icons/io5";



interface SubscriptionPlan {
    title: string
    description: string
    price: number
    features: {
        featuresType: string
        type: string[]
    }
    duration: "monthly" | "yearly"
}

export default function SubscriptionPricing() {
    const [isAnnual, setIsAnnual] = useState(true)

    // Sample data based on your mongoose model
    const plans: SubscriptionPlan[] = [
        {
            title: "FREE",
            description: "Perfect for new investors starting their journey",
            price: 0,
            features: {
                featuresType: "CORE FEATURES",
                type: ["Portfolio tracking", "Watchlist management", "Market news", "Basic insights"],
            },
            duration: "monthly",
        },
        {
            title: "PREMIUM",
            description: "Built for serious investors seeking expert guidance",
            price: isAnnual ? 199 : 19,
            features: {
                featuresType: "PREMIUM FEATURES",
                type: [
                    "Portfolio tracking",
                    "Watchlist management",
                    "Market news",
                    "Basic insights",
                    "Olive Stocks' ratings",
                    "Shariah compliance filter",
                    "Deep research reports",
                    "PDF export",
                    "Advanced analytics",
                ],
            },
            duration: isAnnual ? "yearly" : "monthly",
        },
        {
            title: "ULTIMATE",
            description: "Unlock exclusive strategies, billionaire portfolios, and elite insights",
            price: isAnnual ? 399 : 39,
            features: {
                featuresType: "ULTIMATE FEATURES",
                type: [
                    "Portfolio tracking",
                    "Watchlist management",
                    "Market news",
                    "Basic insights",
                    "Olive Stocks' ratings",
                    "Shariah compliance filter",
                    "Deep research reports",
                    "PDF export",
                    "Advanced analytics",
                    "Olive Stocks' official portfolio",
                    "Under the Radar' stock picks",
                    "AI-guided recommendations",
                    "Billionaire portfolios",
                    "Priority support",
                ],
            },
            duration: isAnnual ? "yearly" : "monthly",
        },
    ]

    const premiumFeatures = [
        "Olive Stocks' ratings",
        "Shariah compliance filter",
        "Deep research reports",
        "PDF export",
        "Advanced analytics",
    ]

    const ultimateFeatures = [
        "Olive Stocks' official portfolio",
        "Under the Radar' stock picks",
        "AI-guided recommendations",
        "Billionaire portfolios",
        "Priority support",
    ]

    return (
        <div className="py-8 lg:py-20 container mx-auto px-3 lg:px-0">
            <div>
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Invest Smarter. Choose Your Edge.</h1>
                    <p className="text-lg text-gray-600 mb-2">Choose the plan that matches your ambition.</p>
                    <p className="text-sm text-gray-500 max-w-4xl mx-auto">
                        Every plan includes expert-grade tools, intelligent insights, and powerful portfolio-building features.
                    </p>
                </div>

                {/* Billing Toggle */}
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

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <Card
                            key={plan.title}
                            className={`relative ${plan.title === "PREMIUM"
                                ? "border-2 border-blue-500 shadow-xl lg:scale-105"
                                : plan.title === "ULTIMATE"
                                    ? "border-2 border-green-500 shadow-lg"
                                    : "border border-gray-200"
                                }`}
                        >
                            {/* Badges */}
                            {plan.title === "PREMIUM" && (
                                <div className="absolute -top-4 left-1/2 transform w-full -translate-x-1/2 flex gap-2 justify-center">
                                    <Badge className="bg-[linear-gradient(90deg,_#3773F8_25%,_#4F46E5_100%)] text-white py-1 lg:py-2 px-2 lg:px-6 md:px-2">MOST POPULAR</Badge>
                                    <IoTriangleSharp className="h-8 w-8 text-[#4F46E5]" />
                                    <Badge className="bg-[linear-gradient(90deg,_#3773F8_25%,_#4F46E5_100%)] text-white flex gap-2 lg:py-2 py-1 px-2 lg:px-6 md:px-2"><Star fill="yellow" className="text-[yellow] h-4 w-4" /> Recommended</Badge>
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

                                {/* Pricing */}
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
                                        {["Portfolio tracking", "Watchlist management", "Market news", "Basic insights"].map((feature) => (
                                            <li key={feature} className="flex items-center text-sm">
                                                <FaCheckSquare className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                <span>{feature}</span>
                                                {feature === "Market news" && plan.title === "FREE" && (
                                                    <Info className="h-3 w-3 text-gray-400 ml-1" />
                                                )}
                                                {feature === "Basic insights" && plan.title === "FREE" && (
                                                    <span className="text-gray-400 ml-1">📈</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Premium Features */}
                                {(plan.title === "PREMIUM" || plan.title === "ULTIMATE") && (
                                    <div>
                                        <h4 className="font-semibold text-sm text-blue-600 mb-3 bg-[#EEF2FF] pl-4 py-2 rounded-md">PREMIUM FEATURES</h4>
                                        <ul className="space-y-2">
                                            {premiumFeatures.map((feature) => (
                                                <li key={feature} className="flex items-center text-sm">
                                                    <FaCheckSquare className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                    {feature === "Shariah compliance filter" && <Info className="h-3 w-3 text-gray-400 ml-1" />}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Premium Features - Excluded for FREE */}
                                {plan.title === "FREE" && (
                                    <div>
                                        <h4 className="font-semibold text-sm text-blue-400 mb-3 bg-[#EEF2FF] pl-4 py-2 rounded-md">PREMIUM FEATURES</h4>
                                        <ul className="space-y-2">
                                            {premiumFeatures.map((feature) => (
                                                <li key={feature} className="flex items-center text-sm text-gray-400">
                                                    <ImCross className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                    {feature === "Shariah compliance filter" && <Info className="h-3 w-3 text-gray-400 ml-1" />}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Ultimate Features */}
                                <div>
                                    <h4
                                        className={`font-semibold text-sm mb-3 bg-[#EEF2FF] pl-4 py-2 rounded-md ${plan.title === "ULTIMATE" ? "text-green-600" : "text-green-400"
                                            }`}
                                    >
                                        {plan.title === "ULTIMATE" ? "👑 ULTIMATE FEATURES" : "ULTIMATE FEATURES"}
                                        {plan.title === "ULTIMATE" && (
                                            <span className="text-xs ml-2 bg-green-100 text-green-800 px-2 py-1 rounded">
                                                ULTIMATE EXCLUSIVES
                                            </span>
                                        )}
                                    </h4>
                                    <ul className="space-y-2">
                                        {ultimateFeatures.map((feature) => (
                                            <li key={feature} className="flex items-center text-sm">
                                                {plan.title === "ULTIMATE" ? (
                                                    <>
                                                        <FaCheckSquare className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                        <span>{feature}</span>
                                                        <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-800">
                                                            Exclusive
                                                        </Badge>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ImCross className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                                                        <span className="text-gray-400">{feature}</span>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-6">
                                <div className="w-full space-y-4">
                                    <Button
                                        className={`w-full ${plan.title === "FREE"
                                            ? "bg-gray-600 hover:bg-gray-700"
                                            : plan.title === "PREMIUM"
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-green-600 hover:bg-green-700"
                                            }`}
                                    >
                                        {plan.title === "FREE"
                                            ? "Start Free Today →"
                                            : plan.title === "PREMIUM"
                                                ? "Unlock Pro Insights →"
                                                : "Claim Your Elite Access →"}
                                    </Button>

                                    {plan.title === "FREE" && (
                                        <p className="text-xs text-gray-500 text-center">No credit card required</p>
                                    )}

                                    {plan.title === "PREMIUM" && (
                                        <div className="text-center space-y-1">
                                            <p className="text-xs text-gray-500">Billed annually, auto-renews until canceled</p>
                                            <p className="text-xs text-green-600 font-medium">Trusted by Professionals</p>
                                        </div>
                                    )}

                                    {plan.title === "ULTIMATE" && (
                                        <div className="text-center space-y-1">
                                            <p className="text-xs text-gray-500">Billed annually, auto-renews until canceled</p>
                                            <p className="text-xs text-green-600 font-medium">Elite Investor Choice</p>
                                            <p className="text-xs text-gray-400">Used by professional hedge fund managers</p>
                                        </div>
                                    )}
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
