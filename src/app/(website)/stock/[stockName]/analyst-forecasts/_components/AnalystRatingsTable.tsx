"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LockIcon, Star, UserPlus, FileText, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Analyst {
  id: string
  name: string
  image: string
  rating: number
  isPremium: boolean
  firm: string
  priceTarget: string | null
  position: string | null
  upside: string | null
  action: string
  date: string
}

export default function AnalystRatingsTable() {
  const [showMore, setShowMore] = useState(false)
  const [displayCount] = useState(6)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const analysts: Analyst[] = [
    {
      id: "1",
      name: "Analyst 1",
      image: "/abstract-profile.png",
      rating: 5,
      isPremium: true,
      firm: "TD Cowen",
      priceTarget: null,
      position: null,
      upside: null,
      action: "Reiterated",
      date: "02/20/25",
    },
    {
      id: "2",
      name: "Analyst 2",
      image: "/abstract-profile.png",
      rating: 4,
      isPremium: true,
      firm: "TD Cowen",
      priceTarget: null,
      position: null,
      upside: null,
      action: "Reiterated",
      date: "02/20/25",
    },
    {
      id: "3",
      name: "Analyst 3",
      image: "/abstract-profile.png",
      rating: 5,
      isPremium: true,
      firm: "TD Cowen",
      priceTarget: null,
      position: null,
      upside: null,
      action: "Reiterated",
      date: "02/20/25",
    },
    {
      id: "4",
      name: "John Smith",
      image: "/abstract-profile.png",
      rating: 5,
      isPremium: false,
      firm: "TD Cowen",
      priceTarget: "$290",
      position: "Buy",
      upside: "35.45%/Upside",
      action: "Assigned",
      date: "02/20/25",
    },
    {
      id: "5",
      name: "Sarah Johnson",
      image: "/abstract-profile.png",
      rating: 5,
      isPremium: false,
      firm: "TD Cowen",
      priceTarget: "$290",
      position: "Buy",
      upside: "35.45%/Upside",
      action: "Assigned",
      date: "02/20/25",
    },
    {
      id: "6",
      name: "Michael Brown",
      image: "/abstract-profile.png",
      rating: 5,
      isPremium: false,
      firm: "TD Cowen",
      priceTarget: "$290",
      position: "Buy",
      upside: "35.45%/Upside",
      action: "Assigned",
      date: "02/20/25",
    },
    {
      id: "7",
      name: "Emily Davis",
      image: "/abstract-profile.png",
      rating: 4,
      isPremium: false,
      firm: "TD Cowen",
      priceTarget: "$295",
      position: "Buy",
      upside: "37.21%/Upside",
      action: "Assigned",
      date: "02/20/25",
    },
    {
      id: "8",
      name: "Robert Wilson",
      image: "/abstract-profile.png",
      rating: 5,
      isPremium: true,
      firm: "TD Cowen",
      priceTarget: null,
      position: null,
      upside: null,
      action: "Reiterated",
      date: "02/20/25",
    },
    {
      id: "9",
      name: "Jennifer Lee",
      image: "/abstract-profile.png",
      rating: 4,
      isPremium: false,
      firm: "TD Cowen",
      priceTarget: "$285",
      position: "Buy",
      upside: "33.02%/Upside",
      action: "Assigned",
      date: "02/20/25",
    },
    {
      id: "10",
      name: "David Martinez",
      image: "/abstract-profile.png",
      rating: 5,
      isPremium: true,
      firm: "TD Cowen",
      priceTarget: null,
      position: null,
      upside: null,
      action: "Reiterated",
      date: "02/20/25",
    },
  ]

  const displayedAnalysts = analysts.slice(0, showMore ? analysts.length : displayCount)

  const handleShowMore = () => {
    setShowMore(!showMore)
  }

  // Mobile card view for each analyst
  const renderMobileCard = (analyst: Analyst, index: number) => {
    return (
      <div key={analyst.id} className={`p-4 rounded-lg mb-4 border ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={analyst.isPremium ? "blur-[3px]" : ""}>
            <Avatar className="h-12 w-12 border-2 border-white">
              <Image src={analyst.image || "/placeholder.svg"} alt={analyst.name} width={48} height={48} />
            </Avatar>
          </div>
          <div className="flex-1">
            {analyst.isPremium ? (
              <div className="text-blue-500 font-medium blur-[3px]">xxxxxxxxxxxxxxxx</div>
            ) : (
              <div className="font-medium">{analyst.name}</div>
            )}
            <div className="flex text-amber-400 relative">
              {Array.from({ length: analyst.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              {analyst.isPremium && (
                <div className="absolute -top-3 left-16 bg-amber-400 rounded-full p-0.5 z-10">
                  <LockIcon className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Expert Firm</span>
            <span>{analyst.firm}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Price Target</span>
            {analyst.priceTarget ? (
              <span>{analyst.priceTarget}</span>
            ) : (
              <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                <LockIcon className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Position</span>
            {analyst.position ? (
              <span className="text-emerald-500 font-medium">{analyst.position}</span>
            ) : (
              <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                <LockIcon className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Upside / Downside</span>
            {analyst.upside ? (
              <span className="text-emerald-500 font-medium">{analyst.upside}</span>
            ) : (
              <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                <LockIcon className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Action</span>
            <span>{analyst.action}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Date</span>
            <span>{analyst.date}</span>
          </div>
        </div>

        <div className="flex justify-between mt-3 pt-2 border-t">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Follow</span>
            {analyst.isPremium ? (
              <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                <LockIcon className="h-3 w-3 text-white" />
              </div>
            ) : (
              <div className="text-blue-500">
                <UserPlus className="h-5 w-5" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500">Article</span>
            {analyst.isPremium ? (
              <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                <LockIcon className="h-3 w-3 text-white" />
              </div>
            ) : (
              <div className="text-blue-500">
                <FileText className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Desktop table view
  const renderDesktopTable = () => {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-800 text-center">Analyst Profile</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Expert Firm</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Price Target</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Position</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Upside / Downside</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Action</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Date</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Follow</TableHead>
              <TableHead className="font-semibold text-gray-800 text-center">Article</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedAnalysts.map((analyst, index) => (
              <TableRow key={analyst.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="py-3 text-center align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <div className={analyst.isPremium ? "blur-[3px]" : ""}>
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <Image src={analyst.image || "/placeholder.svg"} alt={analyst.name} width={40} height={40} />
                      </Avatar>
                    </div>
                    <div>
                      {analyst.isPremium ? (
                        <div className="text-blue-500 font-medium blur-[3px]">xxxxxxxxxxxxxxxx</div>
                      ) : (
                        <div className="font-medium">{analyst.name}</div>
                      )}
                      <div className="flex text-amber-400 justify-center relative">
                        {Array.from({ length: analyst.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                        {analyst.isPremium && (
                          <div className="absolute -top-6 bg-amber-400 rounded-full p-0.5 z-10">
                            <LockIcon className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center align-middle border-none">{analyst.firm}</TableCell>
                <TableCell className="text-center align-middle border-none">
                  {analyst.priceTarget ? (
                    analyst.priceTarget
                  ) : (
                    <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center mx-auto">
                      <LockIcon className="h-3 w-3 text-white" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center align-middle border-none">
                  {analyst.position ? (
                    <span className="text-emerald-500 font-medium">{analyst.position}</span>
                  ) : (
                    <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center mx-auto">
                      <LockIcon className="h-3 w-3 text-white" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center align-middle border-none">
                  {analyst.upside ? (
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-emerald-500 font-medium">{analyst.upside}</span>
                    </div>
                  ) : (
                    <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center mx-auto">
                      <LockIcon className="h-3 w-3 text-white" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center align-middle border-none">{analyst.action}</TableCell>
                <TableCell className="text-center align-middle">{analyst.date}</TableCell>
                <TableCell className="text-center align-middle">
                  {analyst.isPremium ? (
                    <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center mx-auto">
                      <LockIcon className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <div className="text-blue-500 flex justify-center">
                      <UserPlus className="h-5 w-5" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center align-middle">
                  {analyst.isPremium ? (
                    <div className="bg-amber-400 rounded-full p-1 w-6 h-6 flex items-center justify-center mx-auto">
                      <LockIcon className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <div className="text-blue-500 flex justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden border rounded-lg">
      {isMobile ? (
        <div className="p-2">{displayedAnalysts.map((analyst, index) => renderMobileCard(analyst, index))}</div>
      ) : (
        renderDesktopTable()
      )}
      <div className="bg-gradient-to-t from-gray-400 via-white to-white py-2 px-4 text-center">
        <Button className="text-blue-500 bg-inherit hover:bg-inherit text-sm font-medium" onClick={handleShowMore}>
          <span>{showMore ? "-Show Less Ratings" : "+Show More Ratings"}</span>
          <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showMore ? "rotate-180" : ""}`} />
        </Button>
      </div>
    </div>
  )
}
