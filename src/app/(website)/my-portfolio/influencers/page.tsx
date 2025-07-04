import InfluencerCard from '@/components/influencers/influencer-card'
import React from 'react'


export interface Influencer {
    _id: string
    image: string
    name: string
    followers: number
    address: string
    phone: string
    email: string
}

const dummyInfluencers = [
    {
        _id: "1",
        image: "/images/influencer.jpg",
        name: "Aisha Khan",
        followers: 125000,
        address: "Gulshan Avenue, Dhaka, Bangladesh",
        phone: "+880 1711-XXXXXX",
        email: "aisha.khan@email.com",
    },
    {
        _id: "2",
        image: "/images/influencer.jpg",
        name: "Rahim Mia",
        followers: 87500,
        address: "Dhanmondi, Dhaka, Bangladesh",
        phone: "+880 19XX-XXXXXX",
        email: "rahim.mia@sample.com",
    },
    {
        _id: "3",
        image: "/images/influencer.jpg",
        name: "Taslima Rahman",
        followers: 210000,
        address: "Banani, Dhaka, Bangladesh",
        phone: "+880 18YY-YYYYYY",
        email: "taslima.r@example.net",
    },
    {
        _id: "4",
        image: "/images/influencer.jpg",
        name: "Faisal Ahmed",
        followers: 55000,
        address: "Mirpur, Dhaka, Bangladesh",
        phone: "+880 16ZZ-ZZZZZZ",
        email: "faisal.ahmed@domain.org",
    },
    {
        _id: "5",
        image: "/images/influencer.jpg",
        name: "Nadia Islam",
        followers: 180000,
        address: "Uttara, Dhaka, Bangladesh",
        phone: "+880 15AA-AAAAAA",
        email: "nadia.islam@mymail.co",
    },
];


export default function page() {
    return (
        <div className='lg:my-20 my-5'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    dummyInfluencers.map((influencer: Influencer) => (
                        <InfluencerCard
                            key={influencer._id}
                            image={influencer.image}
                            name={influencer.name}
                            followers={influencer.followers}
                            address={influencer.address}
                            phone={influencer.phone}
                            email={influencer.email}
                        />
                    ))
                }
            </div>
        </div>
    )
}
