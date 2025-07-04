import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'


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
        <section className='py-12 md:py-16 lg:py-20'>
            <div className="container mx-auto">
                <div className="pb-10">
                    <h2 className='text-[40px] font-bold'>Our Client Reviews</h2>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {reviews.map((review, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-3 items-center">
                                                    <Image
                                                        src={review.clientImage}
                                                        alt={`${review.clientName}`}
                                                        width={1000}
                                                        height={1000}
                                                        className='w-10 h-10 rounded-full'
                                                    />
                                                    <div className="">
                                                        <h5>{review.clientName}</h5>
                                                        <p>{review.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {Array.from({ length: 5 }).map((_, starIndex) => {
                                                        const isGolden = starIndex < review.stars;
                                                        return (
                                                            <FaStar
                                                                key={starIndex}
                                                                className={isGolden ? 'text-[#FF8A00]' : 'text-gray-300'}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="text-center mt-4 px-6 text-[16px] font-semibold">
                                                <p>{review.comment}</p>
                                                <p>{review.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='hidden lg:flex'/>
                    <CarouselNext className='hidden lg:flex'/>
                </Carousel>
            </div>
        </section>
    )
}
