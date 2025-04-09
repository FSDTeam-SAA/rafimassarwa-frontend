import React from 'react'
import Portfolio from '@/components/murakkabs_portfolio/Portfolio'
import UnderRader from '@/components/murakkabs_portfolio/UnderRader'
import BannerAds from '@/components/murakkabs_portfolio/BannerAds'
import Articles from '@/components/murakkabs_portfolio/Articles'
import TopData from '@/components/murakkabs_portfolio/TopData'

export default function page() {
  return (
    <>
        <TopData/>
        <Portfolio /> 
        <UnderRader />
        <BannerAds/>
        <Articles/>
    </>
  )
}
