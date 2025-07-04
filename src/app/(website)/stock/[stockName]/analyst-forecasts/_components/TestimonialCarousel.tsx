"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TestimonialProps {
  id: string;
  name: string;
  position: string;
  avatar: string;
  rating: number;
  successRate: number;
  averageReturn: number;
  ratingType: "buy" | "sell";
  ratingMonths: number;
  transactionSuccess: number;
  averageReturnPerTrade: number;
  holdingPeriod: string;
  locked?: boolean;
}

const testimonials: TestimonialProps[] = [
  {
    id: "1",
    name: "Michael Walkley",
    position: "Canaccord Genuity",
    avatar: "/diverse-profile-avatars.png",
    rating: 5,
    successRate: 90,
    averageReturn: 3.72,
    ratingType: "buy",
    ratingMonths: 6,
    transactionSuccess: 89.74,
    averageReturnPerTrade: 35.56,
    holdingPeriod: "1 Year",
    locked: false,
  },
  {
    id: "2",
    name: "Michael Walkley",
    position: "Canaccord Genuity",
    avatar: "/diverse-profile-avatars.png",
    rating: 5,
    successRate: 90,
    averageReturn: 3.72,
    ratingType: "buy",
    ratingMonths: 6,
    transactionSuccess: 89.74,
    averageReturnPerTrade: 35.56,
    holdingPeriod: "1 Year",
    locked: true,
  },
  {
    id: "3",
    name: "Michael Walkley",
    position: "Canaccord Genuity",
    avatar: "/diverse-profile-avatars.png",
    rating: 5,
    successRate: 90,
    averageReturn: 3.72,
    ratingType: "buy",
    ratingMonths: 6,
    transactionSuccess: 89.74,
    averageReturnPerTrade: 35.56,
    holdingPeriod: "1 Year",
    locked: false,
  },
  {
    id: "4",
    name: "Michael Walkley",
    position: "Canaccord Genuity",
    avatar: "/diverse-profile-avatars.png",
    rating: 5,
    successRate: 90,
    averageReturn: 3.72,
    ratingType: "buy",
    ratingMonths: 6,
    transactionSuccess: 89.74,
    averageReturnPerTrade: 35.56,
    holdingPeriod: "1 Year",
    locked: true,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (testimonials.length - visibleCount + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= testimonials.length - visibleCount}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={cn(
                "flex-shrink-0 transition-all duration-300 px-2",
                `w-full sm:w-1/2 lg:w-1/3`
              )}
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-1">
        {Array.from({ length: testimonials.length - visibleCount + 1 }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index ? "bg-blue-500 w-4" : "bg-gray-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialProps }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden h-full">
      <div className="p-4">
        {/* Header with avatar and name */}
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <div className={testimonial.locked ? "filter blur-sm" : ""}>
              <Image
                src={
                  testimonial.avatar ||
                  "/placeholder.svg?height=40&width=40&query=profile"
                }
                alt={testimonial.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="relative">
            <div className={testimonial.locked ? "filter blur-sm" : ""}>
              <h3 className="font-medium text-blue-500">{testimonial.name}</h3>
              <p className="text-sm text-gray-600">{testimonial.position}</p>
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
            {testimonial.locked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Lock className="h-5 w-5 text-orange-500" />
                <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
              </div>
            )}
          </div>
        </div>

        {/* Star Rating */}

        {/* Success Rate Section */}
        <div className="bg-blue-50 p-3 rounded-md mb-3">
          <p className="font-medium text-gray-800 mb-2">Success Rate</p>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">
                35/39 ratings generated profit
              </p>
            </div>

            <div>
              <svg className="w-20 h-20" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray={`${testimonial.successRate} 100`}
                  strokeDashoffset="25"
                  transform="rotate(-90 18 18)"
                />
                <text
                  x="18"
                  y="18"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#10b981"
                  fontWeight="bold"
                >
                  {testimonial.successRate}%
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Average Return Section */}
        <div className="border-t border-b py-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800">Average Return</p>
            <div className="bg-green-500 text-white font-medium px-2 py-1 rounded text-sm">
              +{testimonial.averageReturn}%
            </div>
          </div>
        </div>

        {/* Rating Info */}
        <div className="text-sm text-gray-600 mb-3">
          Reiterated a{" "}
          {testimonial.locked ? (
            <span className="inline-flex items-center">
              <Lock className="h-4 w-4 text-orange-500 fill-orange-500 mr-1" />
            </span>
          ) : (
            <span className="text-blue-500 font-medium">
              {testimonial.ratingType}
            </span>
          )}{" "}
          rating {testimonial.ratingMonths} months ago
        </div>

        {/* Follow Button */}
        <div className="flex justify-center mb-3">
          <Button
            variant="outline"
            size="sm"
            className="w-40 rounded-full border-blue-400 text-blue-500 hover:bg-blue-50"
          >
            <span className="mr-1">+</span> Follow
          </Button>
        </div>

        {/* Performance Text */}
        <div className="text-sm text-gray-700">
          Copying{" "}
          {testimonial.locked ? (
            <span className="inline-flex items-center relative">
              <span className="filter blur-sm">Michael Walkley</span>
              <Lock className="h-4 w-4 text-orange-500 fill-orange-500 absolute inset-0 m-auto" />
            </span>
          ) : (
            <span className="text-blue-500">{testimonial.name}</span>
          )}{" "}
          trades and holding each position for{" "}
          <span className="font-medium">{testimonial.holdingPeriod}</span> would
          result in{" "}
          <span className="text-green-500">
            {testimonial.transactionSuccess}%
          </span>{" "}
          of your transactions generating a profit, with an average return of
          <span className="text-green-500">
            {" "}
            +{testimonial.averageReturnPerTrade}%
          </span>{" "}
          per trade.
        </div>
      </div>
    </div>
  );
}
