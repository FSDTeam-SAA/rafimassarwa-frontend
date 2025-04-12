// import Image from "next/image";

// export default function StockTrackingTable() {
//   // Sample data - in a real app this would come from an API
//   const stocks = [
//     {
//       company: "PANW",
//       subtext: "Salesforce",
//       smartScore: "120.20",
//       priceChange: "71.24 (3.2%)",
//       isNegative: true,
//       rating: 39,
//       buyCount: 30,
//       holdCount: 7,
//       sellCount: 2,
//     },
//     {
//       company: "PANW",
//       subtext: "Salesforce",
//       smartScore: "120.20",
//       priceChange: "71.24 (3.2%)",
//       isNegative: true,
//       rating: 39,
//       buyCount: 30,
//       holdCount: 7,
//       sellCount: 2,
//     },
//     {
//       company: "PANW",
//       subtext: "Salesforce",
//       smartScore: "120.20",
//       priceChange: "71.24 (3.2%)",
//       isNegative: true,
//       rating: 39,
//       buyCount: 30,
//       holdCount: 7,
//       sellCount: 2,
//     },
//     {
//       company: "PANW",
//       subtext: "Salesforce",
//       smartScore: "120.20",
//       priceChange: "71.24 (3.2%)",
//       isNegative: true,
//       rating: 39,
//       buyCount: 30,
//       holdCount: 7,
//       sellCount: 2,
//     },
//     {
//       company: "PANW",
//       subtext: "Salesforce",
//       smartScore: "120.20",
//       priceChange: "71.24 (3.2%)",
//       isNegative: true,
//       rating: 39,
//       buyCount: 30,
//       holdCount: 7,
//       sellCount: 2,
//     },
//   ];

//   return (
//     <div className="w-full overflow-x-auto">
//         <div className="mt-4 grid grid-cols-4 gap-2 rounded-t-md bg-green-50 p-2 text-sm font-medium">
//                 <div>Company</div>
//                 <div>Smart Score</div>
//                 <div>Price & Change</div>
//                 <div>Rating in Last 30 <br /> Days</div>
//               </div>
      
//       {/* Stock rows */}
//       <div className="bg-white rounded-b-md">
//         {stocks.map((stock, index) => (
//           <div
//             key={index}
//             className={`grid grid-cols-4 p-3 items-center ${
//               index !== stocks.length - 1 ? "border-b border-gray-200" : ""
//             }`}
//           >
//             {/* Company */}
//             <div>
//               <div className="text-[#2e7d32] font-medium">{stock.company}</div>
//               <div className="text-gray-500 text-sm">{stock.subtext}</div>
//             </div>

//             {/* Smart Score */}
//             <div className="font-medium">
//               <p className="ml-16">{stock.smartScore}</p>
//               <div className="flex items-center gap-1">
//                 {stock.isNegative && (
//                 //   <ArrowDown className="text-red-500 mr-1 h-4 w-4" />
//                 <Image src="/images/downarrow.png" alt="daownarrow" width={15} height={15}/>
//                 )}
//                 <span
//                   className={
//                     stock.isNegative ? "text-red-500" : "text-green-500"
//                   }
//                 >
//                   {stock.priceChange}
//                 </span>
//               </div>
//             </div>

//             {/* Price & Change */}
//             <div className="flex items-center ml-8">
//               <div
//                 className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#28A745]"
//                 style={{
//                   filter: "blur(3px)",
//                   boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.3)",
//                 }}
//               >
//                 <Image
//                   src="/images/lock.png"
//                   alt="lock-image"
//                   width={20}
//                   height={20}
//                   className="absolute"
//                 />
//               </div>
//             </div>

//             {/* Rating */}
//             <div className="flex items-center">
//               <div className="flex gap-3">
//                 <div className="w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center">
//                   <span className="text-lg font-bold">{stock.rating}</span>
//                 </div>

//                 <div className="">
//                   <div className="flex flex-col items-end text-sm">
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-green-500 mr-1"></div>
//                       <span>{stock.buyCount} Buy</span>
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-yellow-400 mr-1"></div>
//                       <span>{stock.holdCount} Hold</span>
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-red-500 mr-1"></div>
//                       <span>{stock.sellCount} Hold</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       {/* <div className="flex justify-end mt-2">
//         <Link href="#" className="text-[#2e7d32] font-medium flex items-center">
//           All Trending Stocks <span className="ml-1">→</span>
//         </Link>
//       </div> */}
//     </div>
//   );
// }



import Image from "next/image";

export default function StockTrackingTable() {
  const stocks = [
    {
      company: "PANW",
      subtext: "Salesforce",
      smartScore: "120.20",
      priceChange: "71.24 (3.2%)",
      isNegative: true,
      rating: 39,
      buyCount: 30,
      holdCount: 7,
      sellCount: 27,
    },
    {
      company: "PANW",
      subtext: "Salesforce",
      smartScore: "120.20",
      priceChange: "71.24 (3.2%)",
      isNegative: true,
      rating: 39,
      buyCount: 30,
      holdCount: 7,
      sellCount: 52,
    },
    {
      company: "PANW",
      subtext: "Salesforce",
      smartScore: "120.20",
      priceChange: "71.24 (3.2%)",
      isNegative: true,
      rating: 39,
      buyCount: 30,
      holdCount: 7,
      sellCount: 42,
    },
    {
      company: "PANW",
      subtext: "Salesforce",
      smartScore: "120.20",
      priceChange: "71.24 (3.2%)",
      isNegative: true,
      rating: 39,
      buyCount: 30,
      holdCount: 7,
      sellCount: 28,
    },
    {
      company: "PANW",
      subtext: "Salesforce",
      smartScore: "120.20",
      priceChange: "71.24 (3.2%)",
      isNegative: true,
      rating: 39,
      buyCount: 30,
      holdCount: 7,
      sellCount: 52,
    },
    // Add more items as needed
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[700px] lg:max-w-4xl mx-auto">
        {/* Header */}
        <div className="mt-4 grid grid-cols-4 gap-2 rounded-t-md bg-green-50 p-2 text-sm font-medium">
          <div>Company</div>
          <div>Smart Score</div>
          <div>Price & Change</div>
          <div>
            Rating in Last 30 <br /> Days
          </div>
        </div>

        {/* Table Rows */}
        <div className="bg-white rounded-b-md">
          {stocks.map((stock, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 p-3 items-center ${
                index !== stocks.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {/* Company */}
              <div>
                <div className="text-[#2e7d32] font-medium">
                  {stock.company}
                </div>
                <div className="text-gray-500 text-sm">{stock.subtext}</div>
              </div>

              {/* Smart Score */}
              <div className="font-medium">
                <p className="ml-16">{stock.smartScore}</p>
                <div className="flex items-center gap-1">
                  {stock.isNegative && (
                    <Image
                      src="/images/downarrow.png"
                      alt="downarrow"
                      width={15}
                      height={15}
                    />
                  )}
                  <span
                    className={
                      stock.isNegative ? "text-red-500" : "text-green-500"
                    }
                  >
                    {stock.priceChange}
                  </span>
                </div>
              </div>

              {/* Price & Change */}
              <div className="flex items-center ml-8">
                <div
                  className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#28A745]"
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
                    className="absolute"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center">
                    <span className="text-lg font-bold">{stock.rating}</span>
                  </div>

                  <div className="">
                    <div className="flex flex-col items-end text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500"></div>
                        <span>{stock.buyCount} Buy</span>
                      </div>
                      <div className="flex items-center gap-[3px]">
                        <div className="w-3 h-3 bg-yellow-400"></div>
                        <span>{stock.holdCount} Hold</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500"></div>
                        <span>{stock.sellCount} Sell</span> {/* Fixed typo here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
