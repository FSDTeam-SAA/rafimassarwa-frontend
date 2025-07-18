import NewsList from '@/components/Portfolio/my-news/news-list'
import React from 'react'
import OlivesNews from '@/components/Portfolio/my-news/olives-news'

export default function page() {
    return (
        <div className="lg:py-20 py-5 lg:w-[95%]">
            <div className='grid lg:grid-cols-10 gap-6'>
                <div className="lg:col-span-6">
                    <NewsList />
                </div>
                <div className="lg:col-span-4">
                    <OlivesNews />
                </div>
            </div>
        </div>
    )
}
