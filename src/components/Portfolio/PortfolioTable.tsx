"use client"

import { ChevronDown, ChevronUp, Loader2, Trash, Settings, Plus, Pencil } from "lucide-react"
import { IoWarningOutline } from "react-icons/io5"
import { FiEdit2 } from "react-icons/fi"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Input } from "../ui/input"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { usePortfolio } from "./portfolioContext"
import { toast } from "sonner"
import Portfolio from "../olivestocks_portfolio/Portfolio"
import { Button } from "../ui/button"
import { min } from "date-fns"

interface AddHoldingData {
  symbol: string
  quantity: number
  price: number
}

interface TransactionData {
  portfolioId: string
  symbol: string
  price: number
  event: "buy" | "sell"
  quantity: number
}

interface ColumnVisibility {
  costBasis: boolean
  unrealizedPL: boolean
  plPercent: boolean
  weight: boolean
  valuation: boolean
  priceTarget: boolean
}

interface HoldingItem {
  avgBuyPrice: number
  change: number
  costBasis: number
  holdingGain: string
  holdingPrice: string
  logo: string
  name: string
  olives: {
    financialHealth: string
    competitiveAdvantage: string
    valuation: string
  }
  oneMonthReturn: string
  pL: number
  percent: number
  price: number
  quadrant: string
  shares: number
  symbol: string
  unrealized: number
  value: string
}

export default function PortfolioTable() {
  const [editableShares, setEditableShares] = useState<Record<string, number>>({})
  const [editablePrices, setEditablePrices] = useState<Record<string, number>>({})
  const [watchlistStocks, setWatchlistStocks] = useState<Set<string>>(new Set())
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState<HoldingItem | null>(null)
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy")
  const [transactionQuantity, setTransactionQuantity] = useState<number>(0)
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    costBasis: false,
    unrealizedPL: false,
    plPercent: false,
    weight: false,
    valuation: false,
    priceTarget: false,
  })

  const { data: session } = useSession()
  const { selectedPortfolioId } = usePortfolio()
  const queryClient = useQueryClient()
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: "asc" | "desc" | null }>({
    key: null,
    direction: null,
  })

  // Fetch watchlist data
  const { data: watchlistData } = useQuery({
    queryKey: ["watchlist-stock"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protfolio/watchlist`, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })
      const data = await res.json()
      return data.data
    },
    enabled: !!session?.user?.accessToken,
  })

  // Initialize watchlist stocks
  useEffect(() => {
    if (watchlistData) {
      const watchlistSymbols = new Set(watchlistData.map((stock: any) => stock.symbol))
      setWatchlistStocks(watchlistSymbols as Set<string>)
    }
  }, [watchlistData])

  const {
    mutate: getOverview,
    data: overviewData,
    isPending: isLoadingTableData,
  } = useMutation({
    mutationFn: async (portfolioId: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/overview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: portfolioId }),
      })
      if (!res.ok) throw new Error("Failed to fetch portfolio overview")
      return res.json()
    },
  })

  useEffect(() => {
    if (overviewData?.holdings) {
      const sharesMap: Record<string, number> = {}
      const priceMap: Record<string, number> = {}
      overviewData.holdings.forEach((item: HoldingItem) => {
        sharesMap[item.symbol] = item.shares
        priceMap[item.symbol] = Number.parseFloat(item.holdingPrice)
      })
      setEditableShares(sharesMap)
      setEditablePrices(priceMap)
    }
  }, [overviewData])

  useEffect(() => {
    if (selectedPortfolioId) {
      getOverview(selectedPortfolioId)
    }
  }, [selectedPortfolioId, getOverview])

  const { mutate: DeleteStock, isPending: isDeletingStock } = useMutation({
    mutationFn: async ({ symbol, portfolioId }: { symbol: string; portfolioId: string }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protfolio/delete-stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({ symbol, portfolioId }),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio", selectedPortfolioId] })
      queryClient.invalidateQueries({ queryKey: ["portfolio-overview"] })
      getOverview(selectedPortfolioId as string)
      if (selectedPortfolioId) {
        getOverview(selectedPortfolioId)
      }
    },
  })

  const { mutate: addHolding } = useMutation({
    mutationFn: async (data: AddHoldingData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protfolio/add-stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({
          portfolioId: selectedPortfolioId,
          symbol: data.symbol,
          quantity: data.quantity,
          price: data.price,
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add stock to portfolio.")
      }
      return response.json()
    },
    onSuccess: (data) => {
      if (selectedPortfolioId) {
        getOverview(selectedPortfolioId)
      }
      toast.success(data.message || `Added stock to portfolio!`)
      queryClient.invalidateQueries({ queryKey: ["portfolio", selectedPortfolioId] })
      queryClient.invalidateQueries({ queryKey: ["portfolio-overview"] })
    },
    onError: (error) => {
      toast.error(error.message || "Error adding stock to portfolio.")
    },
  })

  // New transaction mutation
  const { mutate: addTransaction, isPending: isAddingTransaction } = useMutation({
    mutationFn: async (data: TransactionData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protfolio/add-stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add transaction.")
      }
      return response.json()
    },
    onSuccess: (data) => {
      toast.success(data.message || `Transaction added successfully!`)
      queryClient.invalidateQueries({ queryKey: ["portfolio", selectedPortfolioId] })
      queryClient.invalidateQueries({ queryKey: ["portfolio-overview"] })
      if (selectedPortfolioId) {
        getOverview(selectedPortfolioId)
      }
      setIsTransactionDialogOpen(false)
      setSelectedStock(null)
      setTransactionQuantity(0)
    },
    onError: (error) => {
      toast.error(error.message || "Error adding transaction.")
    },
  })

  const { mutate: addToWatchlist } = useMutation({
    mutationFn: async (symbol: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protfolio/watchlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({ symbol }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to add to watchlist")
      }
      return data
    },
    onSuccess: (data, symbol) => {
      setWatchlistStocks((prev) => new Set([...Array.from(prev), symbol]))
      toast.success(data.message || "Added to watchlist")
    },
    onError: (error) => {
      toast.error(error.message || "Error adding to watchlist")
    },
  })

  const { mutate: removeFromWatchlist } = useMutation({
    mutationFn: async (symbol: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protfolio/watchlist/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({ symbol }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to remove from watchlist")
      }
      return data
    },
    onSuccess: (data, symbol) => {
      setWatchlistStocks((prev) => {
        const newSet = new Set(prev)
        newSet.delete(symbol)
        return newSet
      })
      toast.success(data.message || "Removed from watchlist")
    },
    onError: (error) => {
      toast.error(error.message || "Error removing from watchlist")
    },
  })

  const handleUpdateHolding = (symbol: string, field: "shares" | "price", newValue: number) => {
    const current = overviewData?.holdings?.find((h: HoldingItem) => h.symbol === symbol)
    if (!current || !selectedPortfolioId) return

    if (field === "shares") {
      const currentShares = current.shares
      const newShares = newValue
      const difference = Math.abs(newShares - currentShares)

      if (difference === 0) return

      const event = newShares > currentShares ? "buy" : "sell"
      const price = editablePrices[symbol] ?? Number.parseFloat(current.holdingPrice)

      addTransaction({
        portfolioId: selectedPortfolioId,
        symbol,
        price,
        event,
        quantity: difference,
      })
    } else {
      // Handle price update (existing functionality)
      const quantity = editableShares[symbol] ?? current.shares
      addHolding({ symbol, quantity, price: newValue })
    }
  }

  const handleDelete = async (stockSymbol: string) => {
    DeleteStock({
      symbol: stockSymbol,
      portfolioId: selectedPortfolioId || "",
    })
  }

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" }
        if (prev.direction === "desc") return { key: null, direction: null }
      }
      return { key, direction: "asc" }
    })
  }

  const handleWatchlistToggle = (symbol: string, isChecked: boolean) => {
    if (isChecked) {
      addToWatchlist(symbol)
    } else {
      removeFromWatchlist(symbol)
    }
  }

  const handleColumnVisibilityChange = (column: keyof ColumnVisibility, checked: boolean) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: checked,
    }))
  }

  const handleTransactionSubmit = () => {
    if (!selectedStock || !selectedPortfolioId || transactionQuantity <= 0) return

    const price = editablePrices[selectedStock.symbol] ?? Number.parseFloat(selectedStock.holdingPrice)

    addTransaction({
      portfolioId: selectedPortfolioId,
      symbol: selectedStock.symbol,
      price,
      event: transactionType,
      quantity: transactionQuantity,
    })
  }

  const openTransactionDialog = (stock: HoldingItem) => {
    setSelectedStock(stock)
    setIsTransactionDialogOpen(true)
    setTransactionQuantity(1)
    setTransactionType("buy")
  }

  const sortedHoldings = useMemo(() => {
    if (!overviewData?.holdings || !sortConfig.key || !sortConfig.direction) {
      return overviewData?.holdings || []
    }

    return [...overviewData.holdings].sort((a: HoldingItem, b: HoldingItem) => {
      let valueA: unknown = a[sortConfig.key as keyof HoldingItem]
      let valueB: unknown = b[sortConfig.key as keyof HoldingItem]

      if (sortConfig.key === "avgBuyPrice") {
        valueA = a.avgBuyPrice
        valueB = b.avgBuyPrice
      }

      if (valueA === undefined || valueB === undefined) return 0

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA
      }

      return sortConfig.direction === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA))
    })
  }, [overviewData?.holdings, sortConfig])

  // Calculate totals using real data
  const totals = useMemo(() => {
    if (!sortedHoldings.length) return null

    const totalMarketValue = sortedHoldings.reduce((sum: number, item: HoldingItem) => {
      return sum + (Number.parseFloat(item.value) || 0)
    }, 0)

    const totalCostBasis = sortedHoldings.reduce((sum: number, item: HoldingItem) => {
      return sum + (item.costBasis || 0)
    }, 0)

    const totalUnrealizedPL = sortedHoldings.reduce((sum: number, item: HoldingItem) => {
      return sum + (item.unrealized || 0)
    }, 0)

    const totalPL = sortedHoldings.reduce((sum: number, item: HoldingItem) => {
      return sum + (item.pL || 0)
    }, 0)

    const totalWeight = 100

    return {
      costBasis: totalCostBasis,
      marketValue: totalMarketValue,
      unrealizedPL: totalUnrealizedPL,
      plPercent: totalPL,
      weight: totalWeight,
    }
  }, [sortedHoldings])

  const renderTableHeaders = () => (
    <TableRow className="bg-[#EAF6EC] h-[70px]">
      <TableHead className="w-[120px] text-center">Stock Name</TableHead>
      {[
        { label: "Company Name", key: "name" },
        { label: "Number of Shares", key: "shares" },
        { label: "Avg. Cost Price", key: "avgBuyPrice" },
        { label: "Market Price", key: "price" },
        { label: "Price Change", key: "change" },
        { label: "Olive's Rating", key: "quadrant" },
        { label: "Holding Gain", key: "holdingGain" },
      ].map(({ label, key }) => {
        const isActive = sortConfig.key === key
        const isAsc = isActive && sortConfig.direction === "asc"
        const isDesc = isActive && sortConfig.direction === "desc"

        return (
          <TableHead key={key} onClick={() => handleSort(key)} className="text-center cursor-pointer select-none">
            <div className="inline-flex items-center space-x-1">
              <span className="text-xs">{label}</span>
              <div className="flex flex-col">
                <ChevronUp className={`w-3 h-3 -mb-1 ${isAsc ? "text-black" : "text-gray-400"}`} />
                <ChevronDown className={`w-3 h-3 ${isDesc ? "text-black" : "text-gray-400"}`} />
              </div>
            </div>
          </TableHead>
        )
      })}
      <TableHead className="text-center">Monthly Return</TableHead>
      <TableHead className="text-center">Holding Value</TableHead>
      {columnVisibility.costBasis && <TableHead className="text-center">Cost Basis</TableHead>}
      {columnVisibility.unrealizedPL && <TableHead className="text-center">Unrealized (P&L)</TableHead>}
      {columnVisibility.plPercent && <TableHead className="text-center">P&L%</TableHead>}
      {columnVisibility.weight && <TableHead className="text-center">Weight</TableHead>}
      {columnVisibility.valuation && <TableHead className="text-center">Valuation</TableHead>}
      {columnVisibility.priceTarget && <TableHead className="text-center">Price Target</TableHead>}
      <TableHead className="text-center">Watchlist</TableHead>
      <TableHead className="text-center">Actions</TableHead>
    </TableRow>
  )

  const renderTableRow = (item: HoldingItem, index: number) => (
    <TableRow key={index} className="">
      <TableCell className="font-medium">
        <Link href={`/stock/${item.symbol.toLowerCase()}?q=${item.symbol}`}>
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <div className="flex w-8 h-8 rounded-full bg-black justify-center items-center p-2">
                <Image
                  src={item.logo || "/placeholder.svg"}
                  alt={item.name}
                  width={350}
                  height={200}
                  className="w-5 h-5 object-cover"
                />
              </div>
              <div className="">
                <span className="hover:underline hover:text-blue-400">{item.symbol}</span>
              </div>
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>
        <div className="flex gap-1 text-center items-center">
          <span>
            <IoWarningOutline className="text-[#FFD700]" />
          </span>
          <Input
            value={editableShares[item.symbol] ?? ""}
            className="text-center w-14"
            onChange={(e) =>
              setEditableShares((prev) => ({
                ...prev,
                [item.symbol]: Number(e.target.value),
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdateHolding(item.symbol, "shares", editableShares[item.symbol])
              }
            }}
          />
          <span>
            <FiEdit2
              onClick={() => handleUpdateHolding(item.symbol, "shares", editableShares[item.symbol])}
              className="text-[#28A745] cursor-pointer"
            />
          </span>
        </div>
      </TableCell>
      <TableCell className="flex justify-center items-center h-32">
        <Input
          value={editablePrices[item.symbol] ?? ""}
          className="text-center w-16"
          onChange={(e) =>
            setEditablePrices((prev) => ({
              ...prev,
              [item.symbol]: Number(e.target.value),
            }))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUpdateHolding(item.symbol, "price", editablePrices[item.symbol])
            }
          }}
        />
      </TableCell>
      <TableCell>${item.price.toFixed(2)}</TableCell>
      <TableCell className="">
        <div className="">
          <p className="flex flex-col">
            <span className={`${item.change > 0 ? "text-green-500" : "text-red-500"}`}>${item.change.toFixed(2)}</span>
            <p className="flex items-center">
              <span>
                {item.change > 0 ? (
                  <FaCaretUp className="text-2xl text-green-500" />
                ) : (
                  <FaCaretDown className="text-red-500 text-2xl" />
                )}
              </span>
              <span className={item.change > 0 ? "text-green-500" : "text-red-500"}>{item.percent.toFixed(2)}%</span>
            </p>
          </p>
        </div>
      </TableCell>
      <TableCell>
        <svg
          width="150"
          height="70"
          viewBox="0 0 369 191"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mt-4"
        >
          <path
            d="M322.624 39.3246H324.382V40.9746H322.624V39.3246ZM323.796 29.9746C326.932 30.0956 328.297 33.0656 326.434 35.2931C325.947 35.8431 325.162 36.2061 324.775 36.6681C324.382 37.1246 324.382 37.6746 324.382 38.2246H322.624C322.624 37.3061 322.624 36.5306 323.016 35.9806C323.403 35.4306 324.189 35.1061 324.675 34.7431C326.094 33.5111 325.742 31.7676 323.796 31.6246C323.33 31.6246 322.882 31.7984 322.553 32.1079C322.223 32.4173 322.038 32.837 322.038 33.2746H320.279C320.279 32.3994 320.65 31.56 321.309 30.9412C321.969 30.3223 322.863 29.9746 323.796 29.9746Z"
            fill="white"
          />
          <path
            d="M225.361 33.3092L225.484 28.8699L227.931 28.87L227.93 33.2973C244.486 37.2315 246.519 66.8143 237.377 80.1525C229.77 91.2512 221.267 88.4465 217.967 85.6568C207.491 77.3919 207.835 60.9144 209.317 53.7087C211.795 37.6732 221.045 33.4276 225.361 33.3092Z"
            fill={item.olives?.valuation || "#gray"}
          />
          <path
            d="M232.203 38.033L230.362 37.9533C236.306 42.4438 237.066 51.0313 237.196 55.5522C238.263 63.8277 236.653 76.9332 230.008 83.6572C229.187 84.6992 227.581 85.3951 226.98 85.668C237.785 86.163 240.331 62.7676 238.823 52.5304C238.049 43.6958 234.087 39.1844 232.203 38.033Z"
            fill="white"
          />
          <path
            d="M154.376 24.1034C154.35 23.9941 154.323 23.8877 154.298 23.7798L125.42 11.185L153.646 22.2997L153.698 21.329L153.617 21.302C143.54 -11.2344 100.541 3.4891 100.541 3.4891C100.541 3.4891 123.907 45.3747 154.376 24.1034Z"
            fill="#406325"
          />
          <path
            d="M188.163 36.2371L186.92 31.944L186.876 31.8099L189.446 31.4629L190.603 35.4322C207.551 34.0906 218.547 61.8171 213.94 77.4244C210.107 90.4112 201.162 90.3486 197.169 88.6939C184.675 84.0072 179.955 68.1077 179.156 60.7438C176.601 44.6088 184.096 37.6831 188.163 36.2371Z"
            fill={item.olives?.competitiveAdvantage || "#gray"}
          />
          <path
            d="M196.304 38.9141L194.527 39.4026C201.562 41.854 204.919 49.7945 206.429 54.0579C209.982 61.6075 212.469 74.5753 208.206 83.0131C207.744 84.2566 206.429 85.4113 205.941 85.8554C216.377 83.0131 211.625 59.9644 207.051 50.6827C203.605 42.5113 198.45 39.4322 196.304 38.9141Z"
            fill="white"
          />
          <path
            d="M169.566 37.823L170.951 34.0273H173.722L172.033 38.3465C175.046 38.6999 177.935 41.9549 179.003 43.5382C173.358 55.9634 178.569 70.8056 181.167 75.9537C171.947 99.1201 157.1 91.3107 153.983 84.8538C148.832 76.0409 149.64 63.767 151.04 58.1972C155.23 41.7233 165.137 37.7503 169.566 37.823Z"
            fill={item.olives?.financialHealth || "#gray"}
          />
          <path
            d="M293.557 25.8881L294.197 40.1143C253.538 19.0028 172.949 32.2187 137.737 41.4655C135.8 41.8069 102.382 51.9455 85.9151 56.972L127.913 45.9468L128.269 46.4447C124.966 58.5085 116.405 66.9304 112.538 69.6333C92.2647 81.4695 63.6111 74.5651 51.8184 69.6333C83.139 25.7598 112.419 33.5701 123.144 42.9595C213.063 15.19 274.219 20.0079 293.557 25.8881Z"
            fill="#406325"
          />
        </svg>
      </TableCell>
      <TableCell>
        {Number.parseFloat(item.holdingGain) > 0 ? (
          <div className={`flex items-center gap-2 text-[#28A745]`}>
            <span className="text-[#28A745]">
              <FaCaretUp />
            </span>
            {item.holdingGain}%
          </div>
        ) : (
          <div className={`flex items-center gap-2 text-red-500`}>
            <span className="text-red-500">
              <FaCaretDown />
            </span>
            {item.holdingGain}%
          </div>
        )}
      </TableCell>
      <TableCell className="">
        <div className={`${item.percent < 0 ? "text-red-500" : "text-[#28A745]"} flex items-center gap-2`}>
          <span>
            {item.percent < 0 ? (
              <FaCaretDown className="text-red-500 text-xl" />
            ) : (
              <FaCaretUp className="text-xl text-[#28A745]" />
            )}
          </span>
          {item.oneMonthReturn}
        </div>
      </TableCell>
      <TableCell className="text-center">
        {`$${Number(item.value).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
      </TableCell>
      {columnVisibility.costBasis && (
        <TableCell className="">
          $
          {item.costBasis.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </TableCell>
      )}
      {columnVisibility.unrealizedPL && (
        <TableCell className={`${item.unrealized >= 0 ? "text-green-600" : "text-red-600"}`}>
          $
          {item.unrealized.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </TableCell>
      )}
      {columnVisibility.plPercent && (
        <TableCell className={`${item.pL >= 0 ? "text-green-600" : "text-red-600"}`}>
          $
          {item.pL.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </TableCell>
      )}
      {columnVisibility.weight && (
        <TableCell className="">
          {((Number.parseFloat(item.value) / (totals?.marketValue || 1)) * 100).toFixed(2)}%
        </TableCell>
      )}
      {columnVisibility.valuation && <TableCell className="">{item.quadrant}</TableCell>}
      {columnVisibility.priceTarget && <TableCell className="">N/A</TableCell>}
      <TableCell>
        <div className="flex justify-center">
          <Switch
            checked={watchlistStocks.has(item.symbol)}
            onCheckedChange={(checked) => handleWatchlistToggle(item.symbol, checked)}
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => openTransactionDialog(item)}>
            <Pencil className="h-4 w-4 text-green-500 transition-colors" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <Trash className="h-4 w-4 text-red-500 hover:text-red-700 transition-colors" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete {item.symbol}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove {item.symbol} from your portfolio.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(item.symbol)}
                  disabled={isDeletingStock}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  {isDeletingStock ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  )

  const getTableMinWidth = () => {
    const baseWidth = 1200 // Base width for standard columns
    let additionalWidth = 0
    if (columnVisibility.costBasis) additionalWidth += 120
    if (columnVisibility.unrealizedPL) additionalWidth += 140
    if (columnVisibility.plPercent) additionalWidth += 100
    if (columnVisibility.weight) additionalWidth += 100
    if (columnVisibility.valuation) additionalWidth += 120
    if (columnVisibility.priceTarget) additionalWidth += 130
    return baseWidth + additionalWidth
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm mt-[100px] lg:mb-20 mb-5 overflow-hidden">
      {/* Transaction Dialog */}
      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction for {selectedStock?.symbol}</DialogTitle>
            <DialogDescription>Add a buy or sell transaction for this stock.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="transaction-type" className="text-right">
                Type
              </Label>
              <Select value={transactionType} onValueChange={(value: "buy" | "sell") => setTransactionType(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={transactionQuantity}
                onChange={(e) => setTransactionQuantity(Number(e.target.value))}
                className="col-span-3"
                min="1"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={
                  selectedStock
                    ? (editablePrices[selectedStock.symbol] ?? Number.parseFloat(selectedStock.holdingPrice))
                    : 0
                }
                onChange={(e) => {
                  if (selectedStock) {
                    setEditablePrices((prev) => ({
                      ...prev,
                      [selectedStock.symbol]: Number(e.target.value),
                    }))
                  }
                }}
                className="col-span-3"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsTransactionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleTransactionSubmit}
              disabled={isAddingTransaction || transactionQuantity <= 0}
              className="bg-[#28A745] hover:bg-[#228B3B]"
            >
              {isAddingTransaction ? "Adding..." : "Add Transaction"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="overview" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList className="gap-2 my-3 bg-transparent text-white justify-start lg:justify-start max-w-[100vw] lg:max-w-full overflow-x-scroll lg:overflow-hidden">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="essentials"
              className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2"
            >
              Olive Stocks Essentials
            </TabsTrigger>
            <TabsTrigger
              value="holdings"
              className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2"
            >
              Holdings
            </TabsTrigger>
          </TabsList>
          <div className="pr-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-[#28A745] text-white hover:bg-[#228B3B] hover:text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Columns
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Manage Table Columns</DialogTitle>
                  <DialogDescription>Select which columns you want to display in the table.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="costBasis"
                      checked={columnVisibility.costBasis}
                      onCheckedChange={(checked) => handleColumnVisibilityChange("costBasis", !!checked)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor="costBasis">Cost Basis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unrealizedPL"
                      checked={columnVisibility.unrealizedPL}
                      onCheckedChange={(checked) => handleColumnVisibilityChange("unrealizedPL", !!checked)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor="unrealizedPL">Unrealized (P&L)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="plPercent"
                      checked={columnVisibility.plPercent}
                      onCheckedChange={(checked) => handleColumnVisibilityChange("plPercent", !!checked)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor="plPercent">P&L%</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weight"
                      checked={columnVisibility.weight}
                      onCheckedChange={(checked) => handleColumnVisibilityChange("weight", !!checked)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor="weight">Weight</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="valuation"
                      checked={columnVisibility.valuation}
                      onCheckedChange={(checked) => handleColumnVisibilityChange("valuation", !!checked)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor="valuation">Valuation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="priceTarget"
                      checked={columnVisibility.priceTarget}
                      onCheckedChange={(checked) => handleColumnVisibilityChange("priceTarget", !!checked)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor="priceTarget">Price Target</Label>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Overview table */}
        <TabsContent value="overview">
          {isLoadingTableData ? (
            <div className="flex justify-center items-center h-full pb-6">
              <Loader2 className="animate-spin w-16 h-16 text-green-500" />
            </div>
          ) : (
            <div className="overflow-x-auto max-w-full">
              <Table className="min-w-max" style={{ minWidth: `${getTableMinWidth()}px` }}>
                <TableHeader>{renderTableHeaders()}</TableHeader>
                <TableBody className="text-center">
                  {sortedHoldings.map((item: HoldingItem, index: number) => renderTableRow(item, index))}
                  {/* Totals Row */}
                  {totals && (
                    <TableRow className="bg-gray-50 font-semibold border-t-2">
                      <TableCell className="text-center">Total</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-center">
                        $
                        {totals.marketValue.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      {columnVisibility.costBasis && (
                        <TableCell className="text-center">
                          $
                          {totals.costBasis.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                      )}
                      {columnVisibility.unrealizedPL && (
                        <TableCell className={`text-center ${totals.unrealizedPL >= 0 ? "text-green-600" : "text-red-600"}`}>
                          $
                          {totals.unrealizedPL.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                      )}
                      {columnVisibility.plPercent && (
                        <TableCell className={`text-center ${totals.plPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                          $
                          {totals.plPercent.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                      )}
                      {columnVisibility.weight && <TableCell className="text-center">{totals.weight}%</TableCell>}
                      {columnVisibility.valuation && <TableCell></TableCell>}
                      {columnVisibility.priceTarget && <TableCell></TableCell>}
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Olive Stocks Essentials */}
        <TabsContent value="essentials">
          <Portfolio title="" />
        </TabsContent>

        {/* Holdings content */}
        <TabsContent value="holdings">
          <div className="overflow-x-auto max-w-full">
            <Table className="min-w-max" style={{ minWidth: `${getTableMinWidth()}px` }}>
              <TableHeader>
                <TableRow className="bg-[#EAF6EC] h-[70px]">
                  <TableHead className="w-[120px] text-center">Stock Name</TableHead>
                  {[
                    { label: "Company Name", key: "name" },
                    { label: "Number of Shares", key: "shares" },
                    { label: "Share Price", key: "avgBuyPrice" },
                    { label: "Curr. Price", key: "price" },
                    { label: "Price Change", key: "change" },
                    { label: "Olive's Rating", key: "quadrant" },
                    { label: "Holding Gain", key: "holdingGain" },
                  ].map(({ label, key }) => {
                    const isActive = sortConfig.key === key
                    const isAsc = isActive && sortConfig.direction === "asc"
                    const isDesc = isActive && sortConfig.direction === "desc"

                    return (
                      <TableHead
                        key={key}
                        onClick={() => handleSort(key)}
                        className="text-center cursor-pointer select-none"
                      >
                        <div className="inline-flex items-center space-x-1">
                          <span>{label}</span>
                          <div className="flex flex-col">
                            <ChevronUp className={`w-3 h-3 -mb-1 ${isAsc ? "text-black" : "text-gray-400"}`} />
                            <ChevronDown className={`w-3 h-3 ${isDesc ? "text-black" : "text-gray-400"}`} />
                          </div>
                        </div>
                      </TableHead>
                    )
                  })}
                  <TableHead className="text-center">Holding Value</TableHead>
                  <TableHead className="text-center">Monthly Return</TableHead>
                  <TableHead className="text-center">Watchlist</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {sortedHoldings.map((item: HoldingItem, index: number) => (
                  <TableRow key={index} className="h-24">
                    <TableCell className="font-medium">
                      <Link href={`/stock/${item.symbol.toLowerCase()}?q=${item.symbol}`}>
                        <div className="flex justify-center">
                          <div className="flex items-center gap-2">
                            <div className="flex w-8 h-8 rounded-full bg-black justify-center items-center p-2">
                              <Image
                                src={item.logo || "/placeholder.svg"}
                                alt={item.name}
                                width={350}
                                height={200}
                                className="w-5 h-5 object-cover"
                              />
                            </div>
                            <div className="">
                              <span className="hover:underline hover:text-blue-400">{item.symbol}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 text-center items-center">
                        <span>
                          <IoWarningOutline className="text-[#FFD700]" />
                        </span>
                        <Input
                          value={editableShares[item.symbol] ?? ""}
                          className="text-center w-14"
                          onChange={(e) =>
                            setEditableShares((prev) => ({
                              ...prev,
                              [item.symbol]: Number(e.target.value),
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdateHolding(item.symbol, "shares", editableShares[item.symbol])
                            }
                          }}
                        />
                        <span>
                          <FiEdit2
                            onClick={() => handleUpdateHolding(item.symbol, "shares", editableShares[item.symbol])}
                            className="text-[#28A745] cursor-pointer"
                          />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editablePrices[item.symbol] ?? ""}
                        className="text-center w-16"
                        onChange={(e) =>
                          setEditablePrices((prev) => ({
                            ...prev,
                            [item.symbol]: Number(e.target.value),
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUpdateHolding(item.symbol, "price", editablePrices[item.symbol])
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell className="">
                      <div className="">
                        <p className="flex flex-col">
                          <span className={`${item.change > 0 ? "text-green-500" : "text-red-500"}`}>
                            ${item.change.toFixed(2)}
                          </span>
                          <p className="flex items-center">
                            <span>
                              {item.change > 0 ? (
                                <FaCaretUp className="text-2xl text-green-500" />
                              ) : (
                                <FaCaretDown className="text-red-500 text-2xl" />
                              )}
                            </span>
                            <span className={item.change > 0 ? "text-green-500" : "text-red-500"}>
                              {item.percent.toFixed(2)}%
                            </span>
                          </p>
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <svg
                        width="150"
                        height="70"
                        viewBox="0 0 369 191"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto mt-4"
                      >
                        <path
                          d="M322.624 39.3246H324.382V40.9746H322.624V39.3246ZM323.796 29.9746C326.932 30.0956 328.297 33.0656 326.434 35.2931C325.947 35.8431 325.162 36.2061 324.775 36.6681C324.382 37.1246 324.382 37.6746 324.382 38.2246H322.624C322.624 37.3061 322.624 36.5306 323.016 35.9806C323.403 35.4306 324.189 35.1061 324.675 34.7431C326.094 33.5111 325.742 31.7676 323.796 31.6246C323.33 31.6246 322.882 31.7984 322.553 32.1079C322.223 32.4173 322.038 32.837 322.038 33.2746H320.279C320.279 32.3994 320.65 31.56 321.309 30.9412C321.969 30.3223 322.863 29.9746 323.796 29.9746Z"
                          fill="white"
                        />
                        <path
                          d="M225.361 33.3092L225.484 28.8699L227.931 28.87L227.93 33.2973C244.486 37.2315 246.519 66.8143 237.377 80.1525C229.77 91.2512 221.267 88.4465 217.967 85.6568C207.491 77.3919 207.835 60.9144 209.317 53.7087C211.795 37.6732 221.045 33.4276 225.361 33.3092Z"
                          fill={item.olives?.valuation || "#gray"}
                        />
                        <path
                          d="M232.203 38.033L230.362 37.9533C236.306 42.4438 237.066 51.0313 237.196 55.5522C238.263 63.8277 236.653 76.9332 230.008 83.6572C229.187 84.6992 227.581 85.3951 226.98 85.668C237.785 86.163 240.331 62.7676 238.823 52.5304C238.049 43.6958 234.087 39.1844 232.203 38.033Z"
                          fill="white"
                        />
                        <path
                          d="M154.376 24.1034C154.35 23.9941 154.323 23.8877 154.298 23.7798L125.42 11.185L153.646 22.2997L153.698 21.329L153.617 21.302C143.54 -11.2344 100.541 3.4891 100.541 3.4891C100.541 3.4891 123.907 45.3747 154.376 24.1034Z"
                          fill="#406325"
                        />
                        <path
                          d="M188.163 36.2371L186.92 31.944L186.876 31.8099L189.446 31.4629L190.603 35.4322C207.551 34.0906 218.547 61.8171 213.94 77.4244C210.107 90.4112 201.162 90.3486 197.169 88.6939C184.675 84.0072 179.955 68.1077 179.156 60.7438C176.601 44.6088 184.096 37.6831 188.163 36.2371Z"
                          fill={item.olives?.competitiveAdvantage || "#gray"}
                        />
                        <path
                          d="M196.304 38.9141L194.527 39.4026C201.562 41.854 204.919 49.7945 206.429 54.0579C209.982 61.6075 212.469 74.5753 208.206 83.0131C207.744 84.2566 206.429 85.4113 205.941 85.8554C216.377 83.0131 211.625 59.9644 207.051 50.6827C203.605 42.5113 198.45 39.4322 196.304 38.9141Z"
                          fill="white"
                        />
                        <path
                          d="M169.566 37.823L170.951 34.0273H173.722L172.033 38.3465C175.046 38.6999 177.935 41.9549 179.003 43.5382C173.358 55.9634 178.569 70.8056 181.167 75.9537C171.947 99.1201 157.1 91.3107 153.983 84.8538C148.832 76.0409 149.64 63.767 151.04 58.1972C155.23 41.7233 165.137 37.7503 169.566 37.823Z"
                          fill={item.olives?.financialHealth || "#gray"}
                        />
                        <path
                          d="M293.557 25.8881L294.197 40.1143C253.538 19.0028 172.949 32.2187 137.737 41.4655C135.8 41.8069 102.382 51.9455 85.9151 56.972L127.913 45.9468L128.269 46.4447C124.966 58.5085 116.405 66.9304 112.538 69.6333C92.2647 81.4695 63.6111 74.5651 51.8184 69.6333C83.139 25.7598 112.419 33.5701 123.144 42.9595C213.063 15.19 274.219 20.0079 293.557 25.8881Z"
                          fill="#406325"
                        />
                      </svg>
                    </TableCell>
                    <TableCell>
                      {Number.parseFloat(item.holdingGain) > 0 ? (
                        <div className={`flex items-center gap-2 text-[#28A745]`}>
                          <span className="text-[#28A745]">
                            <FaCaretUp />
                          </span>
                          {item.holdingGain}%
                        </div>
                      ) : (
                        <div className={`flex items-center gap-2 text-red-500`}>
                          <span className="text-red-500">
                            <FaCaretDown />
                          </span>
                          {item.holdingGain}%
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <h1 className="text-[40px] text-[#595959] font-bold">
                        {`$${Number(item.value).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                      </h1>
                    </TableCell>
                    <TableCell className="">
                      <div
                        className={`${item.percent < 0 ? "text-red-500" : "text-[#28A745]"} flex items-center gap-2`}
                      >
                        <span>
                          {item.percent < 0 ? (
                            <FaCaretDown className="text-red-500 text-xl" />
                          ) : (
                            <FaCaretUp className="text-xl text-[#28A745]" />
                          )}
                        </span>
                        {item.oneMonthReturn}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Switch
                          checked={watchlistStocks.has(item.symbol)}
                          onCheckedChange={(checked) => handleWatchlistToggle(item.symbol, checked)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                          onClick={() => openTransactionDialog(item)}
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500 hover:text-red-700 transition-colors" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to delete {item.symbol}?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove {item.symbol} from your
                                portfolio.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.symbol)}
                                disabled={isDeletingStock}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                {isDeletingStock ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Totals Row */}
                {totals && (
                  <TableRow className="bg-gray-50 font-semibold border-t-2">
                    <TableCell className="text-center">Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-center">
                      $
                      {totals.marketValue.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
