"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { GoDesktopDownload } from "react-icons/go"
import { MdOutlineAccountCircle, MdOutlineSupportAgent } from "react-icons/md"
import { IoIosStarHalf } from "react-icons/io"
import { RiNewspaperLine } from "react-icons/ri"
import { SiSimpleanalytics } from "react-icons/si"
import { FaRegCalendarAlt, FaChartLine } from "react-icons/fa"
import { CiShare1 } from "react-icons/ci"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { usePortfolio } from "../context/portfolioContext"
import { Edit, Trash, ChevronDown, Check } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
}

export function PortfolioSidebar() {
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const sidebarItems: SidebarItem[] = [
    {
      icon: <GoDesktopDownload />,
      label: "Portfolio",
      href: "/my-portfolio",
    },
    {
      icon: <MdOutlineAccountCircle />,
      label: "My Account",
      href: "/my-portfolio/my-account",
    },
    {
      icon: <IoIosStarHalf />,
      label: "Performance",
      href: "/my-portfolio/performance",
    },
    {
      icon: <RiNewspaperLine />,
      label: "My News",
      href: "/my-portfolio/my-news",
    },
    {
      icon: <SiSimpleanalytics />,
      label: "Analysis",
      href: "/my-portfolio/analysis",
    },
    {
      icon: <FaRegCalendarAlt />,
      label: "My Calendar",
      href: "/my-portfolio/my-calendar",
    },
    {
      icon: <FaChartLine />,
      label: "Chart",
      href: "/my-portfolio/chart",
    },
    {
      icon: <CiShare1 />,
      label: "Refer with friends",
      href: "/my-portfolio/refer-with-friends",
    },
    {
      icon: <MdOutlineSupportAgent />,
      label: "Support",
      href: "/my-portfolio/support",
    },
  ]

  const { data: session } = useSession()
  const { data: portfolioData } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/get`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })
      const data = await res.json()
      return data
    },
    enabled: !!session?.user?.accessToken,
  })

  const { selectedPortfolioId, setSelectedPortfolioId } = usePortfolio()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    if (portfolioData?.length > 0) {
      const validStored = portfolioData.find((p: { _id: string }) => p._id === selectedPortfolioId)
      const defaultId = validStored?._id || portfolioData[0]._id
      setSelectedPortfolioId(defaultId)
    }
  }, [portfolioData, selectedPortfolioId, setSelectedPortfolioId])

  const handleDeletePortfolio = async (portfolioId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protfolio/${portfolioId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      })
      if (!res.ok) throw new Error("Failed to delete portfolio")
      toast.success("Portfolio deleted successfully")

      // Invalidate and refetch portfolio data
      await queryClient.invalidateQueries({ queryKey: ["portfolio"] })

      // If deleted portfolio was selected, select the first available one
      if (portfolioData && portfolioData.length > 1) {
        const remainingPortfolios = portfolioData.filter((p: { _id: string }) => p._id !== portfolioId)
        if (remainingPortfolios.length > 0) {
          setSelectedPortfolioId(remainingPortfolios[0]._id)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete portfolio")
    }
  }

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null)
  const [editedName, setEditedName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleEditClick = (portfolio: { _id: string; name: string }) => {
    setEditingPortfolioId(portfolio._id)
    setEditedName(portfolio.name)
    setIsEditDialogOpen(true)
    setIsPopoverOpen(false) // Close the popover when opening edit dialog
  }

  const updatePortfolioName = async () => {
    if (!editingPortfolioId || !editedName || isUpdating) return

    setIsUpdating(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protfolio/${editingPortfolioId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({ name: editedName }),
      })

      if (!res.ok) throw new Error("Failed to update portfolio")

      toast.success("Portfolio name updated")

      // Invalidate and refetch portfolio data
      await queryClient.invalidateQueries({ queryKey: ["portfolio"] })

      // Close dialog and reset state
      setIsEditDialogOpen(false)
      setEditingPortfolioId(null)
      setEditedName("")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update portfolio name")
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePortfolioSelect = (portfolioId: string) => {
    setSelectedPortfolioId(portfolioId)
    setIsPopoverOpen(false)
  }

  // Get selected portfolio name for display
  const selectedPortfolio = portfolioData?.find((p: { _id: string }) => p._id === selectedPortfolioId)

  return (
    <Sidebar className="max-h-lvh z-40 shadow-[2px_0px_8px_0px_#00000029]">
      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="flex items-center gap-2 py-[44px]">
            <Image
              src="/images/Stock-logo-1.png"
              alt="Logo"
              width={350}
              height={150}
              className="w-20 h-16 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-base font-medium text-black">Smart</span>
              <span className="text-xl font-medium text-black">Portfolio</span>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent className="pt-4 border-t">
            <SidebarMenu className="gap-0">
              {/* Custom Portfolio Selector */}
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isPopoverOpen}
                    className="flex items-center justify-between gap-3 px-7 py-3 text-base border border-green-500 rounded-md w-full h-auto bg-transparent"
                  >
                    <span className="truncate">{selectedPortfolio?.name || "Select Portfolio"}</span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <div className="p-2">
                    <div className="text-sm font-medium text-gray-700 px-2 py-1">Your Portfolios</div>
                    {portfolioData?.length > 0 ? (
                      portfolioData.map((portfolio: { _id: string; name: string }) => (
                        <div
                          key={portfolio._id}
                          className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md group"
                        >
                          <div
                            className="flex items-center flex-1 cursor-pointer"
                            onClick={() => handlePortfolioSelect(portfolio._id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedPortfolioId === portfolio._id ? "opacity-100" : "opacity-0",
                              )}
                            />
                            <span className="text-sm">{portfolio.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditClick(portfolio)
                            }}
                          >
                            <Edit className="h-3 w-3 text-gray-500 hover:text-blue-500" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-gray-500">No portfolio available</div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-7 py-8 text-xl rounded-none",
                          isActive
                            ? "bg-[#EAF6EC] text-[#28A745] relative after:absolute after:h-full after:w-1 after:bg-[#28A745] after:right-0 after:top-0"
                            : "text-[#4E4E4E] hover:text-gray-900",
                        )}
                      >
                        <span
                          className={cn(
                            "h-8 w-8 rounded-md flex justify-center items-center p-1 border",
                            isActive ? "text-[#28A745] border-[#28A745]" : "text-gray-500",
                          )}
                        >
                          {item.icon}
                        </span>
                        <span className={cn("text-xs font-semibold", isActive ? "text-[#28A745]" : "")}>
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}

              <SidebarMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center gap-3 py-2 px-3 rounded-md-6 mt-7 bg-red-500 text-white cursor-pointer">
                      <Trash className="h-4 w-4" />
                      Delete This Portfolio
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Portfolio</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this portfolio? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => {
                          if (selectedPortfolioId) {
                            handleDeletePortfolio(selectedPortfolioId)
                          } else {
                            toast.error("You don't have any portfolio to delete")
                          }
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Edit Portfolio Name Dialog */}
      <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Portfolio Name</AlertDialogTitle>
            <AlertDialogDescription>Enter the new name for your portfolio.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="New Portfolio Name"
              className="w-full"
              disabled={isUpdating}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isUpdating) {
                  updatePortfolioName()
                }
              }}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsEditDialogOpen(false)} disabled={isUpdating}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={updatePortfolioName} disabled={isUpdating || !editedName.trim()}>
              {isUpdating ? "Saving..." : "Save Name"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  )
}
