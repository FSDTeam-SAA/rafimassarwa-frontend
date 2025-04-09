import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'

export default function Articles() {
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <div className="pb-4">
                    <h2 className='text-3xl font-semibold'>Latest Articles</h2>
                </div>
                <Tabs defaultValue="allstocks" className=''>
                    <TabsList className='bg-transparent mb-3 text-[16px]'>
                        <TabsTrigger value="allstocks">All Stocks</TabsTrigger>
                        <TabsTrigger value="another1">Another Stocks</TabsTrigger>
                        <TabsTrigger value="another2">Another Stocks</TabsTrigger>
                        <TabsTrigger value="another3">Another Stocks</TabsTrigger>
                        <TabsTrigger value="another4">Another Stocks</TabsTrigger>
                        <TabsTrigger value="another5">Another Stocks</TabsTrigger>
                        <TabsTrigger value="another6">Another Stocks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="allstocks">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="another1">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article2.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article2.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article2.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="another2">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="another3">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="another4">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="another5">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="another6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                            <div className="p-4 border rounded-2xl">
                                <Image
                                    src='/images/murakkabs_portfolio_page/article.png'
                                    alt='article'
                                    width={600}
                                    height={500}
                                    className='w-full h-[300px] object-cover'
                                />
                                <h5 className='font-medium text-[16px] text-[#595959] py-3'>Market News</h5>
                                <h2 className='text-lg font-medium pb-3'>Want up to 11% Dividend Yield? Analysts Select 2 D</h2>
                                <div className="flex justify-between items-center">
                                    <p className='font-normal text-[16px]'>10.00 pm, 20/11/25</p>
                                    <span className='uppercase text-base font-semibold px-5 py-1 border border-[#28A745] rounded-3xl'>TSLA</span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
