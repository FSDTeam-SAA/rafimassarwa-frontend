import Image from "next/image";
import { Star } from "lucide-react";

export default function AnalystRatingTable() {
  const analysts = [
    {
      name: "Bessie Cooper",
      title: "Price & Change",
      avatar: "/images/stoct-img.png",
      rating: 5,
      company: "SMTC",
      subtext: "Semtech",
      ratingPercentage: "90.45%",
    },
    {
      name: "Dianne Russell",
      title: "Price & Change",
      avatar: "/images/stoct-img.png",
      rating: 5,
      company: "SMTC",
      subtext: "Semtech",
      ratingPercentage: "90.45%",
    },
    {
      name: "Savannah Nguyen",
      title: "Price & Change",
      avatar: "/images/stoct-img.png",
      rating: 5,
      company: "SMTC",
      subtext: "Semtech",
      ratingPercentage: "90.45%",
    },
    {
      name: "Darrell Steward",
      title: "Price & Change",
      avatar: "/images/stoct-img.png",
      rating: 5,
      company: "Price & Change",
      subtext: "",
      ratingPercentage: "90.45%",
    },
    {
      name: "Esther Howard",
      title: "Price & Change",
      avatar: "/images/stoct-img.png",
      rating: 5,
      company: "SMTC",
      subtext: "Semtech",
      ratingPercentage: "90.45%",
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] w-full max-w-4xl mx-auto">
        <div className="mt-4 grid grid-cols-4 gap-2 rounded-t-md bg-green-50 p-2 text-sm font-medium">
          <div>Analyst & Firm</div>
          <div className="ml-10">Company</div>
          <div className="ml-7">
            Rating &<br /> Price Target
          </div>
          <div>
            Rating in <br /> Last 30 Days
          </div>
        </div>

        <div className="bg-white rounded-b-md">
          {analysts.map((analyst, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 p-3 items-center ${
                index !== analysts.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {/* Analyst & Firm */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-yellow-100 mr-3">
                  <Image
                    src={analyst.avatar || "/placeholder.svg"}
                    alt={analyst.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-[14px]">{analyst.name}</div>
                  <div className="text-gray-500 text-xs">{analyst.title}</div>
                  <div className="flex mt-1">
                    {[...Array(analyst.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Company */}
              <div className="ml-10">
                <div className="text-green-500 font-medium">
                  {analyst.company}
                </div>
                {analyst.subtext && (
                  <div className="text-gray-500 text-sm">{analyst.subtext}</div>
                )}
              </div>

              {/* Rating & Price Target */}
              <div className="flex items-center ml-8">
                <div
                  className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#28A745] z-0"
                  style={{
                    filter: "blur(3px)",
                    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Image
                    src="/images/lock.png"
                    alt="lock-image"
                    width={20}
                    height={20}
                    className="absolute z-1000"
                  />
                </div>
              </div>

              {/* Rating in Last 30 Days */}
              <div className="text-green-500 font-medium mt-3 ml-3">
                {analyst.ratingPercentage}
                <div className="text-green-500">Upsides</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
