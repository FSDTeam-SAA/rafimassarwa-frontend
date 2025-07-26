"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Pagination, Navigation } from 'swiper/modules'

export default function Review() {

    const reviews = [
        {
            id: 1,
            clientImage: "/images/explore_plan_page/client.png",
            clientName: "Robert Fox",
            role: "Customer",
            stars: 4,
            comment: "“Good Experience”",
            description: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.”"
        },
        {
            id: 2,
            clientImage: "/images/explore_plan_page/client.png",
            clientName: "Robert Fox",
            role: "Customer",
            stars: 5,
            comment: "“Good Experience”",
            description: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.”"
        },
        {
            id: 3,
            clientImage: "/images/explore_plan_page/client.png",
            clientName: "Robert Fox",
            role: "Customer",
            stars: 3,
            comment: "“Good Experience”",
            description: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.”"
        },
        {
            id: 4,
            clientImage: "/images/explore_plan_page/client.png",
            clientName: "Robert Fox",
            role: "Customer",
            stars: 3,
            comment: "“Good Experience”",
            description: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.”"
        },
        {
            id: 5,
            clientImage: "/images/explore_plan_page/client.png",
            clientName: "Robert Fox",
            role: "Customer",
            stars: 3,
            comment: "“Good Experience”",
            description: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.”"
        },
        {
            id: 6,
            clientImage: "/images/explore_plan_page/client.png",
            clientName: "Robert Fox",
            role: "Customer",
            stars: 3,
            comment: "“Good Experience”",
            description: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id augue viverra, ullamcorper dolor at, luctus libero. Maecenas suscipit, nisl quis pellentesque laoreet, nibh neque congue dui, ut gravida.”"
        },
    ]

    return (
        <section className="py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4">
                <div className="pb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Our Client Reviews</h2>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <Card className="h-full">
                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-3 items-center">
                                            <Image
                                                src={review.clientImage}
                                                alt={review.clientName}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <h5 className="font-semibold">{review.clientName}</h5>
                                                <p className="text-sm text-gray-500">{review.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            {Array.from({ length: 5 }).map((_, starIndex) => (
                                                <FaStar
                                                    key={starIndex}
                                                    className={starIndex < review.stars ? 'text-[#FF8A00]' : 'text-gray-300'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-center mt-4 px-2">
                                        <p className="text-lg font-semibold mb-2">{review.comment}</p>
                                        <p className="text-sm text-gray-600">{review.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}