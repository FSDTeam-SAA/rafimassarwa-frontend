import Link from 'next/link'
import React from 'react'


const DummyOptionsNews = [
    {
        id: 1,
        date: "March 18th",
        title: "Notable open interest changes for March 18th",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, illo architecto ut aut in veniam iste vero eum molestiae! Ipsam perspiciatis architecto eius incidunt consectetur quae! Eligendi qui suscipit laudantium quae adipisci totam nihil iusto facere, magnam maxime, tempora aut sequi quo illo nam excepturi magni ullam itaque exercitationem nemo?"
    },
    {
        id: 2,
        date: "20 th March",
        title: "Notable open interest changes for March 18th",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, illo architecto ut aut in veniam iste vero eum molestiae! Ipsam perspiciatis architecto eius incidunt consectetur quae! Eligendi qui suscipit laudantium quae adipisci totam nihil iusto facere, magnam maxime, tempora aut sequi quo illo nam excepturi magni ullam itaque exercitationem nemo?"
    },
    {
        id: 3,
        date: "201th March",
        title: "Volatility and Implied Earnings Moves This Week, January 27 – January 31, 2025",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, illo architecto ut aut in veniam iste vero eum molestiae! Ipsam perspiciatis architecto eius incidunt consectetur quae! Eligendi qui suscipit laudantium quae adipisci totam nihil iusto facere, magnam maxime, tempora aut sequi quo illo nam excepturi magni ullam itaque exercitationem nemo?"
    },
    {
        id: 4,
        date: "March 18th",
        title: "Notable open interest changes for March 18th",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, illo architecto ut aut in veniam iste vero eum molestiae! Ipsam perspiciatis architecto eius incidunt consectetur quae! Eligendi qui suscipit laudantium quae adipisci totam nihil iusto facere, magnam maxime, tempora aut sequi quo illo nam excepturi magni ullam itaque exercitationem nemo?"
    },

]


export default function OptionsNews() {


    return (
        <div className="mt-8 lg:mt-20">
            <h3 className="font-semibold pb-4 text-2xl md:text-3xl mb-4">
                AAPL Options News
            </h3>
            <div className="py-7 px-4 shadow-[0px_0px_8px_0px_#00000029] rounded-md">
                <ul>
                    <li className="flex gap-4 sm:gap-12 items-center pb-5">
                        <h5 className="w-[80px] sm:w-[120px] text-sm sm:text-base">
                            Last Price
                        </h5>
                        <h5 className="text-sm sm:text-base">Last Trade</h5>
                    </li>
                    {DummyOptionsNews.map((item) => (
                        <li key={item.id} className="flex gap-4 sm:gap-12 items-center py-3">
                            <h5 className="w-[80px] sm:w-[120px] text-sm sm:text-base">
                                {item.date}
                            </h5>
                            <Link href="">
                                <h5 className="text-[#28A745] text-sm sm:text-base hover:underline">
                                    {item.title}
                                </h5>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
