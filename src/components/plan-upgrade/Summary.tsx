"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CardForm from './CardForm'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import StripeProvider from '@/providers/stripe-provider'


export default function Summary() {

    const { data: session } = useSession()
    const [clientSecret, setClientSecret] = useState("")


    const searchParams = useSearchParams()
    const subscriptionId = searchParams.get("subscriptionId")
    const price = searchParams.get("price")
    const duration = searchParams.get("duration")
    const planType = searchParams.get("planType")

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                if (!session?.user?.accessToken) return toast.error("User not logged in");
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session?.user?.accessToken}`,
                    },
                    body: JSON.stringify({
                        userId: session?.user?.id,
                        subscriptionId,
                        price,
                    }),
                });
                const data = await res.json();
                setClientSecret(data.clientSecret);
            } catch (err) {
                console.error("Error creating payment intent:", err);
            }
        };

        if (session?.user?.accessToken && subscriptionId && price) {
            createPaymentIntent();
        }
    }, [session?.user?.accessToken, session?.user?.id, subscriptionId, price]);


    return (
        <section className='py-20'>
            <div className="container mx-auto px-3 lg:px-0">
                <div className="grid lg:grid-cols-2 gap-24">
                    <div className="flex flex-col gap-6">
                        <h2 className='text-2xl font-semibold'>Summary</h2>
                        <div className="">
                            <h3 className='text-lg font-medium pb-3'>Recurring Payment Terms:</h3>
                            <ul className='list-disc list-inside flex flex-col gap-3 text-[16px] text-[#595959]'>
                                <li>${price}, charged every {duration == "yearly" ? "year" : "month"}</li>
                                <li>Charges includes Applicable VAT/GST and/or Sale Taxes</li>
                            </ul>
                        </div>
                        <div className="flex justify-between items-center py-5 border-y-2">
                            <h5 className='text-2xl font-semibold'>Total:</h5>
                            <p className='text-2xl font-semibold'>${price}</p>
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
                    {clientSecret ?
                        (
                            <StripeProvider clientSecret={clientSecret}>
                                <CardForm planType={planType as string} />
                            </StripeProvider>
                        )
                        :
                        (
                            <div className="py-8 lg:py-20 container mx-auto px-3 lg:px-0">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="mt-4 text-gray-600">Loading payment method...</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
