"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { FiArrowDown, FiArrowUp } from "react-icons/fi"; // Assuming you have react-icons installed
import { usePortfolio } from "../../context/portfolioContext";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface Transaction {
  event: "buy" | "sell";
  price: number;
  quantity: number;
  date?: string;
  _id: string;
}

interface Stock {
  symbol: string;
  companyName: string;
  logo: string;
  sector: string;
  currentPrice: number;
  quantity: number;
  holdingValue: number;
  portfolioPercentage: string | number;
  transactions: number;
  alltransection: Transaction[];
  lastTransaction: string;
  date: string;
  monthlyGains: number | string;
}

interface SummarizedTransaction {
  companyName: string;
  logo: string;
  portfolioPercentage: string | number;
  monthlyGains: number | string;
  event: "buy" | "sell";
  balance: number;
  date?: string;
}

export default function RecentActivityTable() {
  const { selectedPortfolioId } = usePortfolio();

  const { data: performaceData, isLoading: isLoadingPortfolioData } = useQuery({
    queryKey: ["portfolioPerformance"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-performance/${selectedPortfolioId}`
      );
      return response.json();
    },
    enabled: !!selectedPortfolioId,
  });

  const transactionHistory = performaceData?.transactionHistory;

  console.log("transactionHistory", transactionHistory);

  console.log("performaceData : ", performaceData);

  const summarizedTransactions = transactionHistory?.flatMap((stock: Stock) => {
    let totalBuys = 0;
    let totalSells = 0;

    stock.alltransection.forEach((t) => {
      if (t.event === "buy") {
        totalBuys += t.quantity;
      } else if (t.event === "sell") {
        totalSells += t.quantity;
      }
    });

    const rows = [];
    if (totalBuys > 0) {
      rows.push({
        companyName: stock.companyName,
        logo: stock.logo,
        portfolioPercentage: stock.portfolioPercentage,
        monthlyGains: stock.monthlyGains,
        event: "buy",
        balance: totalBuys,
        date: stock.date,
      });
    }
    if (totalSells > 0) {
      rows.push({
        companyName: stock.companyName,
        logo: stock.logo,
        portfolioPercentage: stock.portfolioPercentage,
        monthlyGains: stock.monthlyGains,
        event: "sell",
        balance: totalSells,
        date: stock.date,
      });
    }
    return rows;
  });

  return (
    <div className="px-3 py-2 rounded-2xl shadow-[0px_0px_16px_0px_#00000029] overflow-x-scroll lg:overflow-x-auto">
      <div className="py-2 px-3">
        <h2 className="text-2xl font-medium pb-4">Transaction History</h2>{" "}
        {/* Updated title */}
      </div>
      {isLoadingPortfolioData ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin w-10 h-10 text-green-500" />
        </div>
      ) : (
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="text-xs h-[70px] bg-[#EAF6EC]">
              <TableHead className="text-left">Company Name</TableHead>
              <TableHead className="text-center">% of Portfolio</TableHead>
              <TableHead className="text-center">Return</TableHead>
              <TableHead className="text-center">No. of Transactions</TableHead>
              <TableHead className="text-center">Last Transaction</TableHead>
              <TableHead className="text-center">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summarizedTransactions?.map(
              (transaction: SummarizedTransaction, idx: string) => (
                <TableRow
                  key={transaction.companyName + transaction.event + idx}
                  className="h-[70px]"
                >
                  {/* Logo + Company */}
                  <TableCell className="font-medium text-center">
                    <div className="flex gap-4 items-center">
                      <div className="h-[30px] w-[30px] p-1 rounded-full flex justify-center items-center bg-gray-100">
                        <Image
                          src={transaction.logo}
                          alt={transaction.companyName}
                          width={100}
                          height={100}
                          className="w-[20px] h-[20px] object-contain"
                        />
                      </div>
                      <div className="text-base">
                        <h4>{transaction.companyName}</h4>
                      </div>
                    </div>
                  </TableCell>

                  {/* Portfolio % */}
                  <TableCell className="text-center text-sm">
                    {typeof transaction.portfolioPercentage === "number"
                      ? transaction.portfolioPercentage.toFixed(2)
                      : parseFloat(transaction.portfolioPercentage).toFixed(
                          2
                        ) || "N/A"}
                    %
                  </TableCell>

                  {/* Monthly Gains */}
                  <TableCell className="text-sm">
                    <div
                      className={`flex items-center justify-center gap-1 ${
                        Number(transaction.monthlyGains) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {Number(transaction.monthlyGains) >= 0 ? (
                        <FiArrowUp />
                      ) : (
                        <FiArrowDown />
                      )}
                      {Number(transaction.monthlyGains).toFixed(2)}%
                    </div>
                  </TableCell>

                  {/* Aggregated Balance */}
                  <TableCell className="text-center text-sm">
                    {transaction.balance}
                  </TableCell>

                  {/* Event */}
                  <TableCell className="text-center text-sm">
                    {transaction.event}
                  </TableCell>

                  {/* Date (you could also show last transaction date instead of stock.date) */}
                  <TableCell className="text-center text-sm">
                    {transaction.date || "N/A"}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
