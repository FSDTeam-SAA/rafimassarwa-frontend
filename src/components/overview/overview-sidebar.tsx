"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { MdAltRoute, MdStackedLineChart } from "react-icons/md";
import { SiRedbull } from "react-icons/si";
import { FaBookReader } from "react-icons/fa";
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
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChartBar } from "lucide-react";
import { CiMicrochip } from "react-icons/ci";
import { HiOutlineNewspaper } from "react-icons/hi";
import { LiaCoinsSolid } from "react-icons/lia";
import { GiChart } from "react-icons/gi";
import { RiPieChartFill } from "react-icons/ri";
import { TbChartBubble, TbUserDollar } from "react-icons/tb";
import { TiWaves } from "react-icons/ti";






interface SidebarItem {
    icon: React.ReactNode
    label: string
    href: string
    params?: {
        [key: string]: string
    }
}

export function OverviewSidebar({ params: { stockName } }: { params: { stockName: string } }) {
    const pathname = usePathname()

    console.log(stockName)

    const sidebarItems: SidebarItem[] = [
        {
            icon: <ChartBar />,
            label: "Overview",
            href: `/stock/aapl`,
        },
        {
            icon: <FaBookReader />,
            label: "Analyst Forecasts",
            href: "/stock/analyst-forecasts",
        },
        {
            icon: <CiMicrochip />,
            label: "AI Stock Analysis",
            href: "/stock/aapl/stock-analysis",
        },
        {
            icon: <SiRedbull />,
            label: "News & Insights",
            href: "/stock/aapl/news-insights",
        },
        {
            icon: <HiOutlineNewspaper />,
            label: "Financials",
            href: "/stock/aapl/financials",
        },
        {
            icon: <LiaCoinsSolid />,
            label: "Dividends",
            href: "/stock/aapl/dividends",
        },
        {
            icon: <MdStackedLineChart />,
            label: "Technical Analysis",
            href: "/stock/aapl/technical-analysis",
        },
        {
            icon: <MdAltRoute />,
            label: "Options",
            href: "/stock/aapl/options",
        },
        {
            icon: <GiChart />,
            label: "Chart",
            href: "/stock/aapl/chart",
        },
        {
            icon: <RiPieChartFill />,
            label: "Earnings",
            href: "/stock/aapl/earnings",
        },
        {
            icon: <TbChartBubble />,
            label: "Ownership",
            href: "/stock/aapl/ownership",
        },
        {
            icon: <TbUserDollar />,
            label: "Stock Buybacks",
            href: "/stock/aapl/stock-buybacks",
        },
        {
            icon: <TiWaves />,
            label: "Similar Stocks",
            href: "/stock/aapl/similar-stocks",
        }
    ]

    return (
        <Sidebar className="max-h-lvh z-40  shadow-[2px_0px_8px_0px_#00000029]">
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
                            <span className="text-base font-medium text-black">AAPL</span>
                            <span className="text-xl font-medium text-black">Apple</span>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="pt-4 border-t">
                        <SidebarMenu className="gap-0">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 px-7 py-8 text-xl rounded-none",
                                                    isActive ? "bg-[#EAF6EC] text-[#28A745] relative after:absolute after:h-full after:w-1 after:bg-[#28A745] after:right-0 after:top-0" : "text-[#4E4E4E] hover:text-gray-900",
                                                )}
                                            >
                                                <span className={cn("h-8 w-8 rounded-md flex justify-center items-center p-1 border", isActive ? "text-[#28A745] border-[#28A745]" : "text-gray-500")}>{item.icon}</span>
                                                <span className={cn("text-xs font-semibold", isActive ? "text-[#28A745]" : "")}>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>

    )
}
