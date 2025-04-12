import React from 'react'
import BannerAds from '@/components/murakkabs_portfolio/BannerAds'
import Articles from '@/components/murakkabs_portfolio/Articles'
import TopData from '@/components/murakkabs_portfolio/TopData'
import QualityStocks from '@/components/quality-stocks/QualityStocks'

export default function page() {
  return (
    <>
        <TopData/>
        <QualityStocks />
        <BannerAds/>
        <Articles/>
    </>
  )
}
