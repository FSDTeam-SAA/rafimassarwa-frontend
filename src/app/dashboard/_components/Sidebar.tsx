"use client"

import { LayoutDashboard, LogOut, MicVocal, Newspaper, Settings, TableRowsSplit, UserRoundPlus, Users, Youtube } from "lucide-react"
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
import { FaBlogger } from "react-icons/fa"
import { usePathname } from "next/navigation"
import clsx from "clsx"

// Menu items.
const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Youtube Video", url: "/dashboard/youtube-video", addUrl:"/dashboard/youtube-video/add-video", icon: Youtube },
  { title: "News", url: "/dashboard/news", addUrl : "/dashboard/news/add-news", icon: Newspaper },
  { title: "Ads", url: "/dashboard/ads", addUrl : "/dashboard/ads/add-ads", icon: TableRowsSplit },
  { title: "Blogs", url: "/dashboard/blogs", addUrl : "/dashboard/blogs/add-blogs", icon: FaBlogger },
  { title: "Influencers", url: "/influencers", icon: Users },
  { title: "Advertisement", url: "/advertisement", icon: MicVocal },
  { title: "Refer", url: "/refer", icon: UserRoundPlus },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="bg-white pb-8 pt-5 flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image 
              src={'/images/StockLogo.png'}
              alt="stock logo"
              height={54}
              width={48}
              className="mx-auto"
            />
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-8">
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url || pathname === item.addUrl;
                return (
                  <SidebarMenuItem key={item.title} className="rounded-lg mt-2">
                    <SidebarMenuButton
                      className={clsx(
                        "pl-5 text-xl py-5 font-medium flex gap-3 items-center",
                        {
                          "bg-[#28a745] hover:bg-[#24923d] hover:text-white text-white": isActive,
                          "hover:bg-[#28a745] hover:text-white": !isActive,
                        }
                      )}
                      asChild
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div>
          <button className="flex gap-2 font-medium pl-7"> <LogOut /> Log Out</button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
