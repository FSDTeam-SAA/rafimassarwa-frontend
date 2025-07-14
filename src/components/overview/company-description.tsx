import Link from 'next/link'
import React from 'react'

export default function CompanyDescription() {
    return (
        <div className='space-y-4 shadow-[0px_0px_10px_1px_#00000040] py-5 px-3'>
            <h2 className='text-xl font-semibold'>Company Description</h2>
            <div className="">
                <h3 className='text-base font-semibold pb-3'>Apple</h3>
                <div className="text-xs">
                    <p className='line-clamp-5'>Apple Inc. (AAPL) is a leading multinational technology company headquartered in Cupertino, California. The company designs, manufactures, and markets a wide array of consumer electronics, software, and services. Apple&apos;s core products include the iPhone, iPad, Mac.</p>
                    <Link href={""} className='text-[#2695FF]'>
                        Show More
                    </Link>
                </div>
            </div>
        </div>
    )
}

