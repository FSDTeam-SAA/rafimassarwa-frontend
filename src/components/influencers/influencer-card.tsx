import { MapPinned } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { CiMail } from 'react-icons/ci'
import { FiPhoneCall } from 'react-icons/fi'
import { Button } from '../ui/button'


export interface InfluencerCardProps {
    image: string
    name: string
    followers: number
    address: string
    phone: string
    email: string
}

export default function InfluencerCard({
    image,
    name,
    followers,
    address,
    phone,
    email
}: InfluencerCardProps) {
    return (
        <div className='w-full p-5 rounded-md border border-[#E0E0E0]'>
            <div className="flex justify-center pb-5">
                <Image
                    src={image}
                    alt={name}
                    width={500}
                    height={500}
                    className="w-1/2 aspect-square object-contain"
                />
            </div>
            <div className="pb-5">
                <h4 className='font-semibold text-2xl text-black pb-2'>
                    {name}
                </h4>
                <h6 className='text-base text-[#595959]'>{followers} followers</h6>
            </div>
            <div className="">
                <ul className='space-y-5'>
                    <li className='flex items-start gap-2'>
                        <MapPinned className='h-5 w-5 text-[#28A745]' />
                        <p className='text-xl'>{address}</p>
                    </li>
                    <li className='flex items-start gap-2'>
                        <FiPhoneCall className='h-5 w-5 text-[#28A745]' />
                        <p className='text-xl'>{phone}</p>
                    </li>
                    <li className='flex items-start gap-2'>
                        <CiMail className='h-5 w-5 text-[#28A745]' />
                        <p className='text-xl'>{email}</p>
                    </li>
                </ul>
            </div>
            <Button
                variant="secondary"
                className='w-full mt-5 bg-[#28A745] text-white hover:bg-[#347543]'>
                Contact
            </Button>
        </div>
    )
}
