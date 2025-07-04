"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Define news item type
type NewsItem = {
    id: string
    title: string
    source: string
    timeAgo: string
    imageUrl?: string
}

// Dummy news data
const dummyNews: NewsItem[] = [
    {
        id: "1",
        title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says",
        source: "Verge",
        timeAgo: "3m ago",
    },
    {
        id: "2",
        title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says",
        source: "Verge",
        timeAgo: "3m ago",
    },
    {
        id: "3",
        title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says",
        source: "Verge",
        timeAgo: "3m ago",
    },
    {
        id: "4",
        title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says",
        source: "Verge",
        timeAgo: "3m ago",
    },
    {
        id: "5",
        title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says",
        source: "Verge",
        timeAgo: "3m ago",
    },
    {
        id: "6",
        title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says",
        source: "Verge",
        timeAgo: "3m ago",
    },
    {
        id: "7",
        title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says",
        source: "Verge",
        timeAgo: "3m ago",
    },
    {
        id: "8",
        title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says",
        source: "Verge",
        timeAgo: "3m ago",
    },
]

type NewsTabType = "all" | "olive"

export default function OverviewNewsFeed() {
    const [activeTab, setActiveTab] = React.useState<NewsTabType>("all")

    return (
        <Card className="w-full overflow-hidden shadow-md">
            <div className="p-4 pb-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">AAPL Stock Chart & Stats</h2>
            </div>

            <div className="relative">
                <div
                    className="absolute top-0 left-0 h-1.5 bg-green-500"
                    style={{
                        width: "50%",
                        transform: activeTab === "all" ? "translateX(0)" : "translateX(100%)",
                        transition: "transform 0.3s ease",
                    }}
                ></div>

                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as NewsTabType)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent">
                        <TabsTrigger
                            value="all"
                            className={cn(
                                "py-3 sm:py-4 px-2 text-sm sm:text-base font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            All News
                        </TabsTrigger>
                        <TabsTrigger
                            value="olive"
                            className={cn(
                                "py-3 sm:py-4 px-2 text-sm sm:text-base font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-0",
                                "data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500",
                            )}
                        >
                            Olive Stocks News
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dummyNews.map((newsItem) => (
                        <div key={newsItem.id} className="flex items-start space-x-3 border border-gray-100 rounded-md p-2">
                            {/* News image */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-md flex-shrink-0"></div>

                            {/* News content */}
                            <div className="flex flex-col flex-grow min-w-0">
                                <h3 className="text-sm font-medium line-clamp-3">{newsItem.title}</h3>

                                <div className="mt-auto flex items-center justify-between pt-2">
                                    <span className="text-xs text-gray-500">{newsItem.timeAgo}</span>
                                    <Badge variant="outline" className="text-xs rounded-full border-blue-400 text-blue-500">
                                        AAPL
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
