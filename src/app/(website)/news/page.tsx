import BannerAds from '@/components/News/BannerAds'
import EarningsReportsInsights from '@/components/News/EarningsReportsInsights'
import ExpertSpotlight from '@/components/News/ExpertSpotlight'
import MoreFromTip from '@/components/News/MoreFromTip'
import StockMarketNews from '@/components/News/StockMarketNews'
import StockNewsMain from '@/components/News/StoctNewsMain'
import TipRanksLabs from '@/components/News/TipRanksLabs'
import React from 'react'

const NewsPage = () => {
  return (
    <div className='mt-24'>
        <BannerAds />
        <StockNewsMain />
        <StockMarketNews />
        <ExpertSpotlight />
        <TipRanksLabs />
        <EarningsReportsInsights />
        <MoreFromTip />
    </div>
  )
}

export default NewsPage