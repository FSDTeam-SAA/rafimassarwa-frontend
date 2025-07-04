// Static stock data for the sidebar
export const stockData = [
    {
        symbol: "NVDA",
        name: "Nvidia",
        price: 118.53,
        change: 1.01,
        changePercent: 0.86,
    },
    {
        symbol: "AAPL",
        name: "Apple",
        price: 233.67,
        change: 2.45,
        changePercent: 1.06,
    },
    {
        symbol: "MSFT",
        name: "Microsoft",
        price: 415.32,
        change: 3.21,
        changePercent: 0.78,
    },
    {
        symbol: "GOOGL",
        name: "Alphabet",
        price: 176.89,
        change: -0.54,
        changePercent: -0.3,
    },
    {
        symbol: "AMZN",
        name: "Amazon",
        price: 187.42,
        change: 1.23,
        changePercent: 0.66,
    },
    {
        symbol: "TSLA",
        name: "Tesla",
        price: 242.98,
        change: -3.45,
        changePercent: -1.4,
    },
    {
        symbol: "META",
        name: "Meta Platforms",
        price: 478.22,
        change: 5.67,
        changePercent: 1.2,
    },
]

// Simple function to get stock info for the header
export function getStockInfo(symbol: string) {
    const stock = stockData.find((s) => s.symbol === symbol) || stockData[0]
    return {
        price: stock.price,
        change: stock.change,
        changePercent: stock.changePercent,
    }
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value)
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat("en-US").format(value)
}
