import GrowContactForm from '@/components/grow-with-influencers/grow-contact-form'
import React from 'react'

export default function page() {
    return (
        <div className='container mx-auto px-2 md:px-5 lg:px-20 lg:py-20 py-8'>
            <h2 className='text-bse md:text-2xl lg:text-4xl font-semibold pb-6 text-center'>Grow your business with the Influencer</h2>
            <GrowContactForm />
        </div>
    )
}
