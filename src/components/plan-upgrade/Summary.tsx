import Image from 'next/image'
import React from 'react'
import CardForm from './CardForm'


export default function Summary() {

    return (
        <section className='py-20'>
            <div className="container mx-auto px-3 lg:px-0">
                <div className="grid lg:grid-cols-2 gap-24">
                    <div className="flex flex-col gap-6">
                        <h2 className='text-2xl font-semibold'>Summary</h2>
                        <div className="">
                            <h3 className='text-lg font-medium pb-3'>Recurring Payment Terms:</h3>
                            <ul className='list-disc list-inside flex flex-col gap-3 text-[16px] text-[#595959]'>
                                <li>$359.00, charged every year</li>
                                <li>Charges includes Applicable VAT/GST and/or Sale Taxes</li>
                            </ul>
                        </div>
                        <div className="flex justify-between items-center py-5 border-y-2">
                            <h5 className='text-2xl font-semibold'>Total:</h5>
                            <p className='text-2xl font-semibold'>$359.00</p>
                        </div>
                        <div className="">
                            <h4 className='text-lg font-medium pb-3'>Safe & secure payment </h4>
                            <p className='tex-[16px] text-[#595959] leading-[150%]'>By clicking the Play button, you are agreeing to our Terms of Service and Privacy Statement. You are also authorizing us to charge your credit/debit card at the price above now and before each new subscription serm. For any questions please contact support@@tipnenka.com</p>
                        </div>
                        <div className="grid grid-cols-6 gap-6">
                            <Image
                                src='/images/plan_upgrade_page/visacard.png'
                                alt='visa card'
                                width={1000}
                                height={1000}
                                className='w-full h-auto object-cover'
                            />
                            <Image
                                src='/images/plan_upgrade_page/paypalcard.png'
                                alt='visa card'
                                width={1000}
                                height={1000}
                                className='w-full h-auto object-cover'
                            />
                            <Image
                                src='/images/plan_upgrade_page/card.png'
                                alt='visa card'
                                width={1000}
                                height={1000}
                                className='w-full h-auto object-cover'
                            />
                            <Image
                                src='/images/plan_upgrade_page/visacard.png'
                                alt='visa card'
                                width={1000}
                                height={1000}
                                className='w-full h-auto object-cover'
                            />
                            <Image
                                src='/images/plan_upgrade_page/paypalcard.png'
                                alt='visa card'
                                width={1000}
                                height={1000}
                                className='w-full h-auto object-cover'
                            />
                            <Image
                                src='/images/plan_upgrade_page/card.png'
                                alt='visa card'
                                width={1000}
                                height={1000}
                                className='w-full h-auto object-cover'
                            />
                        </div>
                    </div>
                    <CardForm />
                </div>
            </div>
        </section>
    )
}
