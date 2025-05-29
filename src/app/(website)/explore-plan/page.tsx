import EPBanner from '@/components/explore-plan/EPBanner'
import SubscriptionPricing from '@/components/explore-plan/PricingCard'
import FAQ from '@/shared/FAQ'
import Review from '@/shared/Review'
import React from 'react'

export default function page() {
  return (
    <main>
      <EPBanner />
      <SubscriptionPricing />
      <FAQ />
      <Review />
    </main>
  )
}
