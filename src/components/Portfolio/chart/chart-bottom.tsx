import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function StockPremiumBanner() {
    return (
        <div className="max-w-5xl">
            <h2 className="text-xl font-bold mb-6">Unlock Premium Insights With Olive Stocks</h2>
            <Card className="border-2 border-[#28A745] bg-[#f5fff7] mx-auto overflow-hidden lg:px-5">
                <CardContent className="lg:py-10 py-5">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="lg:p-6 flex-1">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-4">Why Go Premium?</h3>
                                <ul className="space-y-2">
                                    {[
                                        "Spot hight - conviction trades backed by expert analysis",
                                        "Discover what major investors are accunulating",
                                        "Receive timely signals on fast - moving opportunities",
                                        "Stay ahead with predictive insights and market trends",
                                        "Explore advanced screeners and in - depth stock breakdowns",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="lg:text-lg text-sm text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link href="/explore-plan">
                                    <Button className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">Subscribe Now</Button>
                                </Link>
                                <Link href="/explore-plan" className="text-blue-500 hover:underline text-sm">
                                    See Plans & Pricing
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                src="/images/premium.png"
                                alt="Tech company logos including Amazon, Apple, Bitcoin, Meta and Facebook"
                                width={1000}
                                height={1000}
                                className="w-[400px] aspect-square object-contain"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
