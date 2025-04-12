// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { ChevronRight, Lock, Menu, X } from "lucide-react"

// export default function QualityStocks() {
//   const [activeTab, setActiveTab] = useState("all")
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

//   const stockData = [
//     {
//       symbol: "AAPL",
//       rating: "Strong Buy",
//       ratingPercentage: 80,
//       price: "$120.00",
//       priceUpside: "50.00%",
//       ratingScore: 39,
//       buyHoldSell: [
//         { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
//         { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
//         { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
//       ],
//       monthPercentage: "-7.24%",
//       marketCap: "$2.34T",
//       lastRating: "2 Days Ago",
//       sector: "Technology",
//     },
//     {
//       symbol: "AAPL",
//       rating: "Strong Buy",
//       ratingPercentage: 80,
//       price: "$120.00",
//       priceUpside: "50.00%",
//       ratingScore: 39,
//       buyHoldSell: [
//         { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
//         { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
//         { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
//       ],
//       monthPercentage: "-7.24%",
//       marketCap: "$2.34T",
//       lastRating: "2 Days Ago",
//       sector: "Technology",
//     },
//     {
//       symbol: "AAPL",
//       rating: "Strong Buy",
//       ratingPercentage: 80,
//       price: "$120.00",
//       priceUpside: "50.00%",
//       ratingScore: 39,
//       buyHoldSell: [
//         { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
//         { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
//         { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
//       ],
//       monthPercentage: "-7.24%",
//       marketCap: "$2.34T",
//       lastRating: "2 Days Ago",
//       sector: "Technology",
//     },
//     {
//       symbol: "AAPL",
//       rating: "Strong Buy",
//       ratingPercentage: 80,
//       price: "$120.00",
//       priceUpside: "50.00%",
//       ratingScore: 39,
//       buyHoldSell: [
//         { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
//         { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
//         { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
//       ],
//       monthPercentage: "-7.24%",
//       marketCap: "$2.34T",
//       lastRating: "2 Days Ago",
//       sector: "Technology",
//     },
//     {
//       symbol: "AAPL",
//       rating: "Strong Buy",
//       ratingPercentage: 80,
//       price: "$120.00",
//       priceUpside: "50.00%",
//       ratingScore: 39,
//       buyHoldSell: [
//         { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
//         { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
//         { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
//       ],
//       monthPercentage: "-7.24%",
//       marketCap: "$2.34T",
//       lastRating: "2 Days Ago",
//       sector: "Technology",
//     },
//   ]

//   const MobileStockCard = (stockData) => (
//     <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center border-2 border-white shadow-sm backdrop-blur-lg">
//             <Lock className="h-6 w-6 rounded-full text-red-600" />
//           </div>
//           <div className="font-medium">{stock.symbol}</div>
//         </div>
//         <div className="text-red-500 font-medium">{stock.monthPercentage}</div>
//       </div>

//       <div className="grid grid-cols-2 gap-2 mb-3">
//         <div>
//           <div className="text-xs text-gray-500">Stock Rating</div>
//           <div className="font-medium text-sm">{stock.rating}</div>
//           <div className="h-1.5 w-full bg-gray-200 rounded-full mt-1">
//             <div className="h-1.5 bg-green-500 rounded-full" style={{ width: `${stock.ratingPercentage}%` }}></div>
//           </div>
//         </div>

//         <div>
//           <div className="text-xs text-gray-500">Price Target</div>
//           <div className="text-green-600 font-medium">{stock.price}</div>
//           <div className="text-xs text-gray-500">({stock.priceUpside} upside)</div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-2 mb-3">
//         <div>
//           <div className="text-xs text-gray-500">Ratings</div>
//           <div className="flex items-center mt-1">
//             <div className="w-8 h-8 rounded-full border border-yellow-400 flex items-center justify-center text-sm font-medium">
//               {stock.ratingScore}
//             </div>
//             <div className="ml-2 space-y-0.5">
//               {stock.buyHoldSell.map((item, i) => (
//                 <div key={i} className="flex items-center text-xs">
//                   <div className={`w-2 h-2 rounded-full ${item.color} mr-1`}></div>
//                   <span className={`${item.textColor}`}>{item.type}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div>
//           <div className="text-xs text-gray-500">Market Cap</div>
//           <div className="font-medium">{stock.marketCap}</div>
//           <div className="text-xs text-gray-500 mt-1">Last: {stock.lastRating}</div>
//         </div>
//       </div>

//       <div className="text-xs text-gray-500">
//         Sector: <span className="font-medium text-gray-700">{stock.sector}</span>
//       </div>
//     </div>
//   )

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
//       <div className="px-3 py-2 rounded-2xl shadow-[0px_0px_5.5px_0px_#00000040]">
//         {/* Header with tabs */}
//         <div className="p-4 border-b">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl sm:text-2xl font-medium">Quality Stocks</h2>
//             <button
//               className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-gray-100"
//               onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
//             >
//               {mobileFiltersOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>

//           {/* Desktop tabs */}
//           <div className="hidden md:flex gap-6 text-[16px]">
//             <button
//               className={`pb-2 ${activeTab === "all" ? "border-b-2 border-green-500 font-medium" : "text-gray-500"}`}
//               onClick={() => setActiveTab("all")}
//             >
//               All Stocks
//             </button>
//             <button
//               className={`pb-2 ${activeTab === "best" ? "border-b-2 border-green-500 font-medium" : "text-gray-500"}`}
//               onClick={() => setActiveTab("best")}
//             >
//               Best Rated
//             </button>
//             <button
//               className={`pb-2 ${activeTab === "worst" ? "border-b-2 border-green-500 font-medium" : "text-gray-500"}`}
//               onClick={() => setActiveTab("worst")}
//             >
//               Worst Rated
//             </button>
//           </div>

//           {/* Mobile tabs (collapsible) */}
//           <div className={`md:hidden flex flex-col gap-4 mt-2 ${mobileFiltersOpen ? "block" : "hidden"}`}>
//             <button
//               className={`pb-2 ${activeTab === "all" ? "border-b-2 border-green-500 font-medium" : "text-gray-500"}`}
//               onClick={() => {
//                 setActiveTab("all")
//                 setMobileFiltersOpen(false)
//               }}
//             >
//               All Stocks
//             </button>
//             <button
//               className={`pb-2 ${activeTab === "best" ? "border-b-2 border-green-500 font-medium" : "text-gray-500"}`}
//               onClick={() => {
//                 setActiveTab("best")
//                 setMobileFiltersOpen(false)
//               }}
//             >
//               Best Rated
//             </button>
//             <button
//               className={`pb-2 ${activeTab === "worst" ? "border-b-2 border-green-500 font-medium" : "text-gray-500"}`}
//               onClick={() => {
//                 setActiveTab("worst")
//                 setMobileFiltersOpen(false)
//               }}
//             >
//               Worst Rated
//             </button>
//           </div>
//         </div>

//         {/* Desktop Table View */}
//         <div className="hidden md:block overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="text-xs h-[70px] bg-[#EAF6EC]">
//                 <TableHead className="text-xs font-medium py-4">Company</TableHead>
//                 <TableHead className="text-xs font-medium">Stock Rating</TableHead>
//                 <TableHead className="text-xs font-medium">
//                   <div className="flex items-center">Analyst Price Target</div>
//                 </TableHead>
//                 <TableHead className="text-xs font-medium">
//                   <div className="flex items-center">
//                     Ratings in Last 72 Days
//                     <span className="ml-1">▼</span>
//                   </div>
//                 </TableHead>
//                 <TableHead className="text-xs font-medium">1 Month %</TableHead>
//                 <TableHead className="text-xs font-medium">Market Cap</TableHead>
//                 <TableHead className="text-xs font-medium">Last Rating</TableHead>
//                 <TableHead className="text-xs font-medium">Sector</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {stockData.map((stock, index) => (
//                 <TableRow key={index} className="border-b h-[90px]">
//                   <TableCell className="py-4">
//                     <div className="flex items-center gap-2">
//                       <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center border-2 border-white shadow-sm backdrop-blur-lg">
//                         <Lock className="h-6 w-6 rounded-full text-red-600" />
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="space-y-1">
//                       <div className="font-medium text-sm">{stock.rating}</div>
//                       <div className="h-1.5 w-32 bg-gray-200 rounded-full">
//                         <div
//                           className="h-1.5 bg-green-500 rounded-full"
//                           style={{ width: `${stock.ratingPercentage}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-green-600 font-medium">{stock.price}</div>
//                     <div className="text-xs text-gray-500">({stock.priceUpside} upside)</div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center">
//                       <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center text-sm font-medium">
//                         {stock.ratingScore}
//                       </div>
//                       <div className="ml-2 space-y-1">
//                         {stock.buyHoldSell.map((item, i) => (
//                           <div key={i} className="flex items-center text-xs">
//                             <div className={`w-2 h-2 rounded-full ${item.color} mr-1`}></div>
//                             <span className={`${item.textColor}`}>{item.type}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-red-500">{stock.monthPercentage}</TableCell>
//                   <TableCell>{stock.marketCap}</TableCell>
//                   <TableCell>{stock.lastRating}</TableCell>
//                   <TableCell>{stock.sector}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Mobile Card View */}
//         <div className="md:hidden px-2 py-4">
//           {stockData.map((stock, index) => (
//             <MobileStockCard key={index} stock={stock} index={index} />
//           ))}
//         </div>

//         {/* Pagination - Same for both views */}
//         <div className="flex justify-end p-4 items-center gap-2">
//           <button className="w-8 h-8 rounded-md bg-green-100 text-green-600 flex items-center justify-center">1</button>
//           <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center">2</button>
//           <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center hidden sm:flex">
//             3
//           </button>
//           <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center">...</button>
//           <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center hidden sm:flex">
//             17
//           </button>
//           <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronRight, Lock, Menu, X } from "lucide-react"

export default function QualityStocks() {
  const [activeTab, setActiveTab] = useState("all")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const stockData = [
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    {
      symbol: "AAPL",
      rating: "Strong Buy",
      ratingPercentage: 80,
      price: "$120.00",
      priceUpside: "50.00%",
      ratingScore: 39,
      buyHoldSell: [
        { type: "3D Buy", color: "bg-green-500", textColor: "text-green-500" },
        { type: "7D Hold", color: "bg-yellow-400", textColor: "text-yellow-500" },
        { type: "2 Hold", color: "bg-red-500", textColor: "text-red-500" },
      ],
      monthPercentage: "-7.24%",
      marketCap: "$2.34T",
      lastRating: "2 Days Ago",
      sector: "Technology",
    },
    // Add more stock objects if needed
  ]

  const MobileStockCard = ({ stock }: { stock: typeof stockData[0] }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center border-2 border-white shadow-sm backdrop-blur-lg">
            <Lock className="h-6 w-6 rounded-full text-red-600" />
          </div>
          <div className="font-medium">{stock.symbol}</div>
        </div>
        <div className="text-red-500 font-medium">{stock.monthPercentage}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <div className="text-xs text-gray-500">Stock Rating</div>
          <div className="font-medium text-sm">{stock.rating}</div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full mt-1">
            <div className="h-1.5 bg-green-500 rounded-full" style={{ width: `${stock.ratingPercentage}%` }}></div>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Price Target</div>
          <div className="text-green-600 font-medium">{stock.price}</div>
          <div className="text-xs text-gray-500">({stock.priceUpside} upside)</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <div className="text-xs text-gray-500">Ratings</div>
          <div className="flex items-center mt-1">
            <div className="w-8 h-8 rounded-full border border-yellow-400 flex items-center justify-center text-sm font-medium">
              {stock.ratingScore}
            </div>
            <div className="ml-2 space-y-0.5">
              {stock.buyHoldSell.map((item, i) => (
                <div key={i} className="flex items-center text-xs">
                  <div className={`w-2 h-2 rounded-full ${item.color} mr-1`}></div>
                  <span className={`${item.textColor}`}>{item.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Market Cap</div>
          <div className="font-medium">{stock.marketCap}</div>
          <div className="text-xs text-gray-500 mt-1">Last: {stock.lastRating}</div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Sector: <span className="font-medium text-gray-700">{stock.sector}</span>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="px-3 py-2 rounded-2xl shadow-[0px_0px_5.5px_0px_#00000040]">
        {/* Header with tabs */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-medium">Quality Stocks</h2>
            <button
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-gray-100"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              {mobileFiltersOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Tabs */}
          <div className="hidden md:flex gap-6 text-[16px]">
            {["all", "best", "worst"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 ${activeTab === tab ? "border-b-2 border-green-500 font-medium" : "text-gray-500"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "all" ? "All Stocks" : tab === "best" ? "Best Rated" : "Worst Rated"}
              </button>
            ))}
          </div>

          <div className={`md:hidden flex flex-col gap-4 mt-2 ${mobileFiltersOpen ? "block" : "hidden"}`}>
            {["all", "best", "worst"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 ${activeTab === tab ? "border-b-2 border-green-500 font-medium" : "text-gray-500"}`}
                onClick={() => {
                  setActiveTab(tab)
                  setMobileFiltersOpen(false)
                }}
              >
                {tab === "all" ? "All Stocks" : tab === "best" ? "Best Rated" : "Worst Rated"}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-xs h-[70px] bg-[#EAF6EC]">
                <TableHead className="text-xs font-medium py-4">Company</TableHead>
                <TableHead className="text-xs font-medium">Stock Rating</TableHead>
                <TableHead className="text-xs font-medium">Analyst Price Target</TableHead>
                <TableHead className="text-xs font-medium">Ratings in Last 72 Days</TableHead>
                <TableHead className="text-xs font-medium">1 Month %</TableHead>
                <TableHead className="text-xs font-medium">Market Cap</TableHead>
                <TableHead className="text-xs font-medium">Last Rating</TableHead>
                <TableHead className="text-xs font-medium">Sector</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockData.map((stock, index) => (
                <TableRow key={index} className="border-b h-[90px]">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center border-2 border-white shadow-sm backdrop-blur-lg">
                        <Lock className="h-6 w-6 rounded-full text-red-600" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{stock.rating}</div>
                      <div className="h-1.5 w-32 bg-gray-200 rounded-full">
                        <div
                          className="h-1.5 bg-green-500 rounded-full"
                          style={{ width: `${stock.ratingPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-green-600 font-medium">{stock.price}</div>
                    <div className="text-xs text-gray-500">({stock.priceUpside} upside)</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full border border-yellow-400 flex items-center justify-center text-sm font-medium">
                        {stock.ratingScore}
                      </div>
                      <div className="ml-2 space-y-1">
                        {stock.buyHoldSell.map((item, i) => (
                          <div key={i} className="flex items-center text-xs">
                            <div className={`w-2 h-2 rounded-full ${item.color} mr-1`}></div>
                            <span className={`${item.textColor}`}>{item.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-red-500">{stock.monthPercentage}</TableCell>
                  <TableCell>{stock.marketCap}</TableCell>
                  <TableCell>{stock.lastRating}</TableCell>
                  <TableCell>{stock.sector}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden px-2 py-4">
          {stockData.map((stock, index) => (
            <MobileStockCard key={index} stock={stock} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end p-4 items-center gap-2">
          <button className="w-8 h-8 rounded-md bg-green-100 text-green-600 flex items-center justify-center">1</button>
          <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center">2</button>
          <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center hidden sm:flex">3</button>
          <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center">...</button>
          <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center hidden sm:flex">17</button>
          <button className="w-8 h-8 rounded-md text-gray-600 flex items-center justify-center">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
