"use client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Define types for options data
type OptionData = {
    callPrice: number
    callPercentage: number
    strikePrice: number
    putPrice: number
    putPercentage: number
}

// Dummy data for options
const dummyOptionsData = {
    expirationDate: "Mar 21, 2025",
    options: [
        { callPrice: 5.95, callPercentage: 26.6, strikePrice: 210.0, putPrice: 0.57, putPercentage: -67.8 },
        { callPrice: 4.0, callPercentage: 26.98, strikePrice: 212.5, putPrice: 1.09, putPercentage: -59.93 },
        { callPrice: 2.41, callPercentage: 22.34, strikePrice: 215.0, putPrice: 1.99, putPercentage: -51.46 },
        { callPrice: 1.28, callPercentage: 13.27, strikePrice: 217.5, putPrice: 3.4, putPercentage: -40.87 },
        { callPrice: 0.57, callPercentage: -1.72, strikePrice: 220.0, putPrice: 5.3, putPercentage: -33.33 },
        { callPrice: 0.24, callPercentage: -20.0, strikePrice: 222.5, putPrice: 7.4, putPercentage: -24.1 },
    ] as OptionData[],
}

export default function OptionsPrices() {
    // Format price to always show 2 decimal places
    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`
    }

    // Format percentage with + or - sign and % symbol
    const formatPercentage = (percentage: number) => {
        const sign = percentage > 0 ? "+" : ""
        return `${sign}${percentage.toFixed(2)}%`
    }

    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="pb-0">
                <CardTitle className="text-xl font-bold">Options Prices</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <div className="border-b border-gray-200 p-4">
                    <p className="text-sm">Expiration Date: {dummyOptionsData.expirationDate}</p>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4 text-center">Calls</TableHead>
                                <TableHead className="w-1/4 text-center"></TableHead>
                                <TableHead className="w-1/4 text-center">Puts</TableHead>
                                <TableHead className="w-1/4 text-center"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dummyOptionsData.options.map((option, index) => (
                                <TableRow key={index} className="border-b border-gray-200">
                                    <TableCell className="py-3 text-left">{formatPrice(option.callPrice)}</TableCell>
                                    <TableCell
                                        className={cn("py-3 text-right", option.callPercentage >= 0 ? "text-green-500" : "text-red-500")}
                                    >
                                        {formatPercentage(option.callPercentage)}
                                    </TableCell>
                                    <TableCell className="py-3 text-center">{option.strikePrice.toFixed(1)}</TableCell>
                                    <TableCell className="py-3 text-left">{formatPrice(option.putPrice)}</TableCell>
                                    <TableCell
                                        className={cn("py-3 text-right", option.putPercentage >= 0 ? "text-green-500" : "text-red-500")}
                                    >
                                        {formatPercentage(option.putPercentage)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            <CardFooter className="flex justify-center py-2">
                <a href="#" className="text-blue-500 text-sm flex items-center">
                    Detailed Option Prices
                    <ChevronRight className="h-4 w-4 ml-1" />
                </a>
            </CardFooter>
        </Card>
    )
}
