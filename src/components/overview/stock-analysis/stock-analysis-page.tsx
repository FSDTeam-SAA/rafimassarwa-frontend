"use client"

import React from 'react'
import RecentNews from '../news'
import StockAnalysisTopCard from './top-stock-analysis'
import BusinessOverview from './business-chart-full'
import BusinessOverviewDescription from './business-description'
import FinancialStatementOverview from './financial-statement'
import RiskAnalysis from './risk-analysis'
import EarningsCallSummary from './earning-summary'
import PerformanceCoverage from './media-coverage-chart'
import Glossary from './glossary'

export default function StockAnalysisPage() {


    return (
        <div className='flex min-h-screen flex-col lg:p-4 md:p-6 lg:w-[80vw] w-[98vw]'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-5">
                <div className="col-span-full lg:col-span-5">
                    <StockAnalysisTopCard />
                    <div className="mt-20">
                        <BusinessOverview />
                    </div>
                    <BusinessOverviewDescription />
                    <FinancialStatementOverview />
                    <RiskAnalysis />
                    <PerformanceCoverage />
                    <div className="mt-14 lg:mt-20">
                        <EarningsCallSummary />
                    </div>
                    <div className="mt-14 lg:mt-20">
                        <Glossary />
                    </div>
                </div>
                <div className="col-span-full lg:col-span-2">
                    <RecentNews />
                </div>
            </div>
        </div>
    )
}
