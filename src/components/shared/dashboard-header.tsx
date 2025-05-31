"use client"
import { Search, Bell, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const { data: session } = useSession()
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="h-[72px] flex justify-between items-center px-4 bg-white sticky top-0 z-50 border-b">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        <div className="relative w-full max-w-[300px] hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-[18px] pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 p-3 w-full rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Search icon for mobile */}
        <Search className="w-5 h-5 sm:hidden cursor-pointer hover:text-gray-600" />

        {/* Bell Icon */}
        <Bell className="w-5 h-5 md:w-6 md:h-6 text-black cursor-pointer hover:text-gray-600" />

        {/* Divider - hidden on small screens */}
        <div className="hidden md:block w-px h-10 bg-gray-300" />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 md:gap-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
              <div className="relative">
                <Avatar className="w-8 h-8 md:w-12 md:h-12">
                  <AvatarImage
                    src={session?.user?.image || "/placeholder.svg?height=48&width=48"}
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback>{session?.user?.name ? getInitials(session.user.name) : "U"}</AvatarFallback>
                </Avatar>
                {/* Online Indicator */}
                <span className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>

              {/* Text Info - hidden on small screens */}
              <div className="hidden sm:block">
                <h2 className="text-base md:text-lg font-semibold">{session?.user?.name || "User"}</h2>
                <p className="text-xs md:text-sm text-gray-600 capitalize">{session?.user?.role || "Member"}</p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name || "User"}</p>
                <p className="text-xs leading-none text-muted-foreground">{session?.user?.email || "No email"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={()=>{router.push("/dashboard/settings")}}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
