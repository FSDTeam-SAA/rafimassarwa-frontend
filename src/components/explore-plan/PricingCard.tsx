"use client"

import { ArrowRight, Check } from "lucide-react"

export default function PricingCard() {


    const premiumFeatures = [
        "Premium Stock Analysis",
        "New Investment Ideas",
        "Smart Portfolio Research",
        "Premium Research Tools",
        "Daily Expert Insights",
        "Premium Expert Access",
        "Follow 30 Stocks",
        "PDF Export",
        "Priority Support"  
    ]



    const ultimateFeatures = [
        "Premium Stock Analysis",
        "New Investment Ideas",
        "Smart Portfolio Research",
        "Premium Research Tools",
        "Daily Expert Insights",
        "Premium Expert Access",
        "Follow 30 Stocks",
        "PDF Export",
        "Priority Support"
    ]


    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
                {/* Premium Plan */}
                <div className="border border-blue-400 rounded-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-5">Premium Plan</h2>
                    <div className="flex items-baseline mb-4">
                        <span className="text-3xl md:text-4xl font-bold text-green-500">$99</span>
                        <span className="text-gray-600 ml-1">/month</span>
                    </div>

                    <p className="text-gray-700 text-[18px] mb-6">Includes all features of TipRanks Plus, and unlocks:</p>

                    <ul className="space-y-3 mb-8">
                        {premiumFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <span className="bg-green-500 rounded-full p-1 mr-3">
                                    <Check className="h-3 w-3 text-white" />
                                </span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="text-gray-700 mb-8">30 day money-back guarantee on yearly plan</p>

                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors w-full sm:w-auto mx-auto">
                        Get started
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>

                {/* Ultimate Plan */}
                <div className="border border-blue-400 rounded-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-5">Ultimate Plan</h2>
                    <div className="flex items-baseline mb-4">
                        <span className="text-3xl md:text-4xl font-bold text-green-500">$199</span>
                        <span className="text-gray-600 ml-1">/month</span>
                    </div>

                    <p className="text-gray-700 text-[18px] mb-6">Includes all features of TipRanks Premium, and unlocks:</p>

                    <ul className="space-y-3 mb-8">
                        {ultimateFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <span className="bg-green-500 rounded-full p-1 mr-3">
                                    <Check className="h-3 w-3 text-white" />
                                </span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="text-gray-700 mb-8">30 day money-back guarantee</p>

                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors w-full sm:w-auto mx-auto">
                        Get started
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
