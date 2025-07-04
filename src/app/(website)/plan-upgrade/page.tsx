import PUBanner from '@/components/plan-upgrade/PUBanner'
import Summary from '@/components/plan-upgrade/Summary'
import FAQ from '@/shared/FAQ'
import Review from '@/shared/Review'
import React from 'react'

export default function page() {
    return (
        <main>
            <PUBanner />
            <Summary />
            <FAQ />
            <Review />
        </main>
    )
}
