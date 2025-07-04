"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Copy, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PiShareFat } from "react-icons/pi";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FaArrowUpFromWaterPump } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Define the referral data type
interface Referral {
    id: string
    name: string
    date: string
    earn: string
}

// Create dummy data that matches the image
const dummyReferrals: Referral[] = Array.from({ length: 15 }, (_, i) => ({
    id: String(i + 1).padStart(2, "0"),
    name: "Mokaddis",
    date: "20/02/2025",
    earn: "$0.08",
}))

export default function ReferralDashboard() {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil(dummyReferrals.length / itemsPerPage)

    const [open, setOpen] = useState(false)
    const link = "https://website_url/20/link"

    // Calculate total amount
    const totalAmount = dummyReferrals
        .reduce((sum, referral) => {
            return sum + Number.parseFloat(referral.earn.replace("$", ""))
        }, 0)
        .toFixed(2)

    // Get current page data
    const currentReferrals = dummyReferrals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Handle pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }


    const copyToClipboard = () => {
        navigator.clipboard.writeText(link)
        toast({
            title: "Copied to clipboard"
        })
    }


    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="p-4 flex justify-between items-center border-b border-[#0D3459] mb-10">
                        <div className="flex items-center gap-2">
                            <span className="text-base font-medium">Total Amount</span>
                            <span className="text-green-500 text-base font-semibold">${totalAmount}</span>
                            <FaArrowUpFromWaterPump className="h-4 w-4" />
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-500"
                            onClick={() => setOpen(true)}
                        >
                            <PiShareFat className="h-4 w-4 mr-1" />
                            Share
                        </Button>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogContent className="p-0 border-none max-w-md rounded-xl">
                                <div className="bg-white rounded-xl relative p-6 mt-10">
                                    {/* Link input */}
                                    <div className="mb-6">
                                        <div className="flex items-center mb-2">
                                            <span className="text-sm mr-2">Link</span>
                                            <div className="flex-1 border rounded-md overflow-hidden flex items-center">
                                                <Input
                                                    value={link}
                                                    readOnly
                                                    className="border-0 flex-1 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 px-3"
                                                />
                                                <button onClick={copyToClipboard} className="px-2 h-full flex items-center justify-center">
                                                    <Copy className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Share by section */}
                                    <div className="mb-6 text-center">
                                        <p className="text-sm mb-3">Share By</p>
                                        <div className="flex items-center justify-center gap-4">
                                            <button className="w-8 h-8 rounded-full flex items-center justify-center border">
                                                <Facebook className="h-4 w-4" />
                                            </button>
                                            <button className="w-8 h-8 rounded-full flex items-center justify-center border">
                                                <Instagram className="h-4 w-4" />
                                            </button>
                                            <button className="w-8 h-8 rounded-full flex items-center justify-center border">
                                                <Twitter className="h-4 w-4" />
                                            </button>
                                            <button className="w-8 h-8 rounded-full flex items-center justify-center border">
                                                <Linkedin className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit button */}
                                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md h-10">Submit</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="overflow-hidden border rounded-xl">

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center text-base font-semibold">Referral Id</TableHead>
                                        <TableHead className="text-center text-base font-semibold">Name</TableHead>
                                        <TableHead className="text-center text-base font-semibold">Date</TableHead>
                                        <TableHead className="text-center text-base font-semibold">Earn</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentReferrals.map((referral) => (
                                        <TableRow key={referral.id} className="h-14">
                                            <TableCell className="font-medium text-center text-[#4E4E4E] text-base ">{referral.id}</TableCell>
                                            <TableCell className="text-center text-[#4E4E4E] text-base ">{referral.name}</TableCell>
                                            <TableCell className="text-center text-[#4E4E4E] text-base ">{referral.date}</TableCell>
                                            <TableCell className="text-center text-[#4E4E4E] text-base ">{referral.earn}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>

                    {/* Pagination */}
                    <div className="p-2 flex justify-end items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4 text-[#28A745]" />
                        </Button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNumber = i + 1
                            return (
                                <Button
                                    key={pageNumber}
                                    variant={currentPage === pageNumber ? "default" : "outline"}
                                    size="icon"
                                    className={`h-8 w-8 p-0 ${currentPage === pageNumber ? "bg-[#28A745] hover:bg-[#28A745] text-white" : ""}`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </Button>
                            )
                        })}

                        {totalPages > 5 && (
                            <Button variant="outline" size="icon" className="h-8 w-8 p-0" disabled>
                                ...
                            </Button>
                        )}

                        {totalPages > 5 && (
                            <Button variant="outline" size="icon" className="h-8 w-8 p-0" onClick={() => handlePageChange(7)}>
                                7
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 p-0 text-[#28A745]"
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Banner Ads */}
                <div className="md:w-[200px] h-auto">
                    <div className="bg-green-50 h-full rounded-xl flex items-center justify-center">
                        <div className="font-bold text-3xl -rotate-90 tracking-wider hidden md:flex">Banner Ads</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
