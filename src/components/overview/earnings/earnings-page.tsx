import React from 'react'
import EarningsPageEarningsCallSummary from './earnings-page-earnings-call-summary'
import RecentNews from '../news'
import EarningsHistoryChart from './earnings-history-chart'
import EarningsHistoryTable from './earnings-history-table'
import PriceChangesTable from './price-changes'
import OverviewFAQ from '../overview-faq'
import MarketNewsCard from '@/app/(website)/stock/[stockName]/news/_components/MarketNewsCard'
import StockPremiumBanner from '@/components/Portfolio/chart/chart-bottom'


const dummyMarketNews = [
    {
        image: "/images/murakkabs_portfolio_page/article2.png",
        title: "Broadcom (AVGO) Is About to Report Q1...",
        timeAgo: "2d Ago",
        tags: ["Technology", "Broadcom"]
    },
    {
        image: "/images/murakkabs_portfolio_page/article2.png",
        title: "Broadcom (AVGO) Is About to Report Q1...",
        timeAgo: "2d Ago",
        tags: ["Technology", "Broadcom"]
    },
    {
        image: "/images/murakkabs_portfolio_page/article2.png",
        title: "Broadcom (AVGO) Is About to Report Q1...",
        timeAgo: "2d Ago",
        tags: [
            { name: "Technology", color: "#28A745" },
            { name: "Broadcom", color: "#28A745" }
        ]
    },
]


export default function EarningsPage() {
    return (
        <div className='flex min-h-screen flex-col lg:p-4 md:p-6 lg:w-[80vw] w-[98vw]'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-5">
                <div className="col-span-full lg:col-span-5">
                    <EarningsPageEarningsCallSummary />
                    <div className="mt-8 lg:mt-20">
                        <EarningsHistoryChart />
                    </div>
                    <div className="mt-8 lg:mt-20">
                        <EarningsHistoryTable />
                    </div>
                    <div className="mt-8 lg:mt-20">
                        <PriceChangesTable />
                    </div>
                    <div className="mt-8 lg:mt-20">
                        <OverviewFAQ />
                    </div>
                    <div className="mt-8 lg:mt-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {
                                dummyMarketNews.map((item, index) => {
                                    return (
                                        <MarketNewsCard key={index} image={item.image} title={item.title} timeAgo={item.timeAgo} tags={[{ name: "AAPL" }, { name: "AVGO" }]} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-20">
                        <StockPremiumBanner />
                    </div>
                </div>
                <div className="col-span-full lg:col-span-2">
                    <RecentNews />
                </div>
            </div>
        </div>
    )
}
