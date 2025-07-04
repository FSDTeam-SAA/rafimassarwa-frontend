import Image from "next/image"
import Link from "next/link"

export default function PUBanner() {
    return (
        <section className="pt-32 pb-10 sm:pt-20 md:pt-28 lg:pt-36 bg-[#EAF6EC] overflow-hidden">
            <div className="container mx-auto px-3 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                    <div className="md:col-span-1 lg:col-span-3">
                        <Image
                            src="/images/explore_plan_page/banlogo.png"
                            alt="logo"
                            width={500}
                            height={500}
                            className="w-32 h-24 sm:w-28 sm:h-20 lg:w-32 lg:h-24 object-cover mb-6 sm:mb-8 lg:mb-10 hidden md:block"
                        />
                        <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] font-bold pb-4 sm:pb-6 lg:pb-8 max-w-[740px] leading-[120%]">
                            Next-Level Stock Research: Simple, Smart & Growing
                        </h2>
                        <p className="max-w-[435px] text-sm sm:text-base lg:text-[16px] font-medium text-[#595959] pb-0 md:pb-0">
                            Real-time data & AI-powered insights for smarter investing
                        </p>
                        <div className="flex md:gap-8 gap-2 mt-8">
                            <Link href='/explore-plan' className="inline-flex items-center justify-center rounded-md bg-green-500 md:px-20 px-10 py-4 text-[14px] md:text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Upgrade Now</Link>
                            <Link href='/explore-plan' className="inline-flex items-center justify-center rounded-md bg-transparent border border-green-500 md:px-20 px-10 py-4 text-[14px] md:text-base font-medium text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Explore Our Plans</Link>
                        </div>
                    </div>
                    <div className="md:col-span-1 lg:col-span-2 md:justify-end hidden md:flex">
                        <Image
                            src="/images/plan_upgrade_page/banner.png"
                            alt="banner arrow"
                            width={1000}
                            height={1000}
                            className="w-full max-w-[300px] md:max-w-full md:max-h-[360px] lg:max-h-[460px] object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
