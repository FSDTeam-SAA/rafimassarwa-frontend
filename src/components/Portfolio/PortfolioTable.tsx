import { ChevronRight, Trash } from "lucide-react";
import { IoWarningOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { IoNotificationsOutline } from "react-icons/io5";




import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { Input } from "../ui/input";

const tableData = [
  {
    _id: 1,
    ticker: "AAPL",
    logo: '/images/appl.png',
    numberOfShares: 12,
    aiCatalyst: "/images/Ai.png",
    changeArrow: "▲",
    changeAmount: 0,
    price: 120.22,
    priceChange: 3.2,
    priceChangePercentage: "12%",
    recommendation: "Moderate Buy",
    analystPriceTarget: "/images/lock.png",
    holdingValue: "Strong",
    holdingGain: -3.2,
  },
  {
    _id: 2,
    ticker: "AAPL",
    logo: '/images/appl.png',
    numberOfShares: 12,
    aiCatalyst: "/images/Ai.png",
    changeArrow: "▲",
    changeAmount: 0,
    price: 120.22,
    priceChange: 3.2,
    priceChangePercentage: "12%",
    recommendation: "Hold",
    analystPriceTarget: "/images/lock.png",
    holdingValue: "Strong",
    holdingGain: -3.2,
  },
  {
    _id: 3,
    ticker: "AAPL",
    logo: '/images/appl.png',
    numberOfShares: 12,
    aiCatalyst: "/images/Ai.png",
    changeArrow: "▲",
    changeAmount: 0,
    price: 120.22,
    priceChange: 3.2,
    priceChangePercentage: "12%",
    recommendation: "Hold",
    analystPriceTarget: "/images/lock.png",
    holdingValue: "Strong",
    holdingGain: -3.2,
  },
  {
    _id: 4,
    ticker: "AAPL",
    logo: '/images/appl.png',
    numberOfShares: 12,
    aiCatalyst: "/images/Ai.png",
    changeArrow: "▲",
    changeAmount: 0,
    price: 120.22,
    priceChange: 3.2,
    priceChangePercentage: "12%",
    recommendation: "Moderate Buy",
    analystPriceTarget: "/images/lock.png",
    holdingValue: "Strong",
    holdingGain: -3.2,
  },
  {
    _id: 5,
    ticker: "AAPL",
    logo: '/images/appl.png',
    numberOfShares: 12,
    aiCatalyst: "/images/Ai.png",
    changeArrow: "▲",
    changeAmount: 0,
    price: 120.22,
    priceChange: 3.2,
    priceChangePercentage: "12%",
    recommendation: "Moderate Buy",
    analystPriceTarget: "/images/lock.png",
    holdingValue: "Strong",
    holdingGain: 3.2,
  },
];

export default function PortfolioTable() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm mt-[100px] container mx-auto lg:mb-20 mb-5">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="gap-2 pl-6 my-3 bg-transparent text-white justify-start lg:justify-start max-w-[100vw] lg:max-w-full overflow-x-scroll lg:overflow-hidden">
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex gap-3 items-center bg-[#BFBFBF] p-1 rounded-sm">
              <div className="">
                <Image
                  src="/images/icon-2.png"
                  alt="icon-2"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px]"
                />
              </div>
              <div className="flex gap-3">
                <Image
                  src="/images/icon-3.png"
                  width={50}
                  height={50}
                  alt="icon-3"
                  className="h-[18px] w-[18px]"
                />
                <Image
                  src="/images/icon-4.png"
                  width={50}
                  height={50}
                  alt="icon-4"
                  className="h-[18px] w-[18px]"
                />
              </div>
            </div>
          </div>
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2">Overview</TabsTrigger>
          <TabsTrigger value="tipranks" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2">Olive Stocks Essentials</TabsTrigger>
          <TabsTrigger value="holdings" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2">Holdings</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2">Performance</TabsTrigger>
          <TabsTrigger value="dividends" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2">Dividends</TabsTrigger>
          <TabsTrigger value="earnings" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2">Earnings</TabsTrigger>
          <TabsTrigger value="technicals" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2">Technicals</TabsTrigger>
        </TabsList>

        {/* Overview table */}
        <TabsContent value="overview">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#EAF6EC] h-[70px]">
                <TableHead className="w-[150px]  text-center">Stock Name</TableHead>
                <TableHead className="w-[100px]  text-center">Number of Shares</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Price Change</TableHead>
                <TableHead className="text-center">Ai Catalyst</TableHead>
                <TableHead className="text-center">Ai Consensus</TableHead>
                <TableHead className="text-center">Analyst Price Target</TableHead>
                <TableHead className="text-center">Smart Score</TableHead>
                <TableHead className="text-center">Holding Value</TableHead>
                <TableHead className="text-center">Holding Gain</TableHead>
                <TableHead className="text-center">Top Analyst Consensus</TableHead>
                <TableHead className="text-center">Alerts</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-center">
              {tableData.map((item, index) => (
                <TableRow key={index} className="h-24">
                  <TableCell className="font-medium">
                    <Link href={`/stock/${item.ticker.toLowerCase()}`}>
                      <div className="flex justify-center">
                        <div className="flex items-center gap-2">
                          <div className="flex w-8 h-8 rounded-full bg-black justify-center items-center p-2">
                            <Image
                              src={item.logo}
                              alt={item.ticker}
                              width={350}
                              height={200}
                              className="w-5 h-5 object-cover"
                            />
                          </div>
                          <div className="">
                            <span className="hover:underline hover:text-blue-400">{item.ticker}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="">
                    <div className="flex gap-1 text-center items-center">
                      <span><IoWarningOutline className="text-[#FFD700]" /></span>
                      <Input
                        value={item.numberOfShares}
                        className="text-center"
                      />
                      <span><FiEdit2 className="text-[#28A745]" /></span>
                    </div>
                  </TableCell>
                  <TableCell>
                    ${item.price}
                  </TableCell>
                  <TableCell >
                    <div className="flex items-center gap-2">
                      <span>{item.priceChange > 0 ? <TiArrowSortedUp className="text-2xl text-black" /> : <TiArrowSortedDown className="text-red-500 text-2xl" />}</span>
                      <p className="flex flex-col">
                        <span>${item.priceChange}</span>
                        <span>({(item.priceChange / item.price * 100).toFixed(2)}%)</span>
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Image
                        src={item.aiCatalyst}
                        alt={item.ticker}
                        width={350}
                        height={200}
                        className="w-5 h-5 object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item.recommendation}</TableCell>
                  <TableCell>
                    <div className="relative w-9 h-9 mx-auto flex items-center justify-center">
                      {/* Green Glow */}
                      <div className="absolute w-full h-full bg-[#28A745] rounded-full blur-[6px]"></div>

                      {/* Lock Image (on top of glow) */}
                      <Image
                        src={item.analystPriceTarget}
                        alt={item.ticker}
                        width={350}
                        height={200}
                        className="w-5 h-5 object-cover relative z-10"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="relative w-9 h-9 mx-auto flex items-center justify-center">
                      {/* Green Glow */}
                      <div className="absolute w-full h-full bg-[#28A745] rounded-full blur-[6px]"></div>

                      {/* Lock Image (on top of glow) */}
                      <Image
                        src={item.analystPriceTarget}
                        alt={item.ticker}
                        width={350}
                        height={200}
                        className="w-5 h-5 object-cover relative z-10"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.holdingValue}
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      <span>{item.holdingGain < 0 ? <TiArrowSortedDown className="text-red-500 text-2xl" /> : <TiArrowSortedUp className="text-2xl text-[#28A745]" />}</span>
                      {item.holdingGain}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="relative w-9 h-9 mx-auto flex items-center justify-center">
                      {/* Green Glow */}
                      <div className="absolute w-full h-full bg-[#28A745] rounded-full blur-[6px]"></div>

                      {/* Lock Image (on top of glow) */}
                      <Image
                        src={item.analystPriceTarget}
                        alt={item.ticker}
                        width={350}
                        height={200}
                        className="w-5 h-5 object-cover relative z-10"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <IoNotificationsOutline className="h-4 w-4" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Trash className="h-4 w-4" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* tipranks content */}
        <TabsContent value="tipranks">
          <h3 className="text-center py-10 text-2xl font-semibold text-[#28A745]">Olive Stocks Essential&apos;s data will appear there</h3>
        </TabsContent>

        {/* holdings */}
        <TabsContent value="holdings">
          <h3 className="text-center py-10 text-2xl font-semibold text-[#28A745]">Holdings data will appear there</h3>
        </TabsContent>

        {/* performance */}
        <TabsContent value="performance">
          <h3 className="text-center py-10 text-2xl font-semibold text-[#28A745]">Performance data will appear there</h3>
        </TabsContent>

        {/* dividends */}
        <TabsContent value="dividends">
          <h3 className="text-center py-10 text-2xl font-semibold text-[#28A745]">Dividends data will appear there</h3>
        </TabsContent>

        {/* earnings */}
        <TabsContent value="earnings">
          <h3 className="text-center py-10 text-2xl font-semibold text-[#28A745]">Earnings data will appear there</h3>
        </TabsContent>

        {/* technicals */}
        <TabsContent value="technicals">
          <h3 className="text-center py-10 text-2xl font-semibold text-[#28A745]">Technicals data will appear there</h3>
        </TabsContent>
      </Tabs>
      <div className="flex items-center justify-end p-4">
        <div className="flex items-center space-x-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-green-600 text-white">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600">
            2
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600">
            3
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600">
            4
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600">
            5
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
