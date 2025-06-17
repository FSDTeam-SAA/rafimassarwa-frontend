"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { usePortfolio } from "../portfolioContext"

interface StockListProps {
    onSelectStock: (symbol: string) => void
    selectedStock: string | undefined // Allow undefined for initial state
    onInitialStockLoaded: (symbol: string) => void // New prop for callback
}

export default function StockList({ onSelectStock, selectedStock, onInitialStockLoaded }: StockListProps) {
    const { data: session } = useSession();
    const { selectedPortfolioId } = usePortfolio(); // No need for setSelectedPortfolioId here

    const { data: portfolioData } = useQuery({
        queryKey: ["portfolio", selectedPortfolioId],
        queryFn: async () => {
            if (!selectedPortfolioId) {
                return null;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/get/${selectedPortfolioId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.accessToken}`,
                },
            });
            const data = await res.json();
            return data;
        },
        enabled: !!session?.user?.accessToken && !!selectedPortfolioId,
    });

    const { mutate: getOverview, data: overviewData } = useMutation({
        mutationFn: async (holdings: { symbol: string; shares: number }[]) => { // Add type for holdings
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/overview`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ holdings }),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch portfolio overview");
            }

            return res.json();
        },
    });

    // Trigger overview and set initial selected stock when portfolioData is ready
    useEffect(() => {
        if (portfolioData && portfolioData.stocks && portfolioData.stocks.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const holdings = portfolioData.stocks.map((stock: any) => ({
                symbol: stock.symbol,
                shares: stock.quantity,
            }));
            getOverview(holdings);

            // Set the first stock as selected if no stock is currently selected
            // This is crucial for initial load
            if (!selectedStock && holdings.length > 0) {
                onInitialStockLoaded(holdings[0].symbol);
            }
        }
    }, [portfolioData, getOverview, selectedStock, onInitialStockLoaded]); // Add selectedStock and onInitialStockLoaded to dependency array

    console.log("overview data: ", overviewData)

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{portfolioData && portfolioData.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[440px]">
                    <div className="space-y-1 p-4 pt-0">
                        {overviewData?.holdings?.map((stock: { symbol: string, quantity: number, _id: string, price: number, change: number, percent: number }) => (
                            <div
                                key={stock._id}
                                className={`flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-muted ${selectedStock === stock.symbol ? "bg-muted" : ""
                                    }`}
                                onClick={() => onSelectStock(stock.symbol)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-10 items-center justify-center rounded bg-blue-100 text-xs text-blue-600">
                                        {stock.symbol}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{stock.symbol}</div>
                                        {/* <div className="text-xs text-muted-foreground">{stock.name}</div> */}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium">${stock.price.toFixed(2)}</div>
                                    <div className={`text-xs ${stock.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                                        {stock.change >= 0 ? "+" : ""}
                                        {stock.change.toFixed(2)} ({stock.change >= 0 ? "+" : ""}
                                        {stock.percent.toFixed(2)}%)
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}