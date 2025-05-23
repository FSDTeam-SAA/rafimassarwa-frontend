import { PortfolioPerformance } from '@/components/Portfolio/performance/portfolio-performance'
import RecentActivity from '@/components/Portfolio/performance/recent-activity'
import React from 'react'

export default function page() {
    return (
        <div className='lg:w-[95%]'>
            <div>
                <PortfolioPerformance />
            </div>
            <div>
                <RecentActivity />
            </div>
        </div>
    )
}
