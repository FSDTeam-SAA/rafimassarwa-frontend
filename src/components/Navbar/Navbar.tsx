"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  TrendingUp,
  Star,
  Calendar,
  Briefcase,
  Eye,
  Newspaper,
  LogIn,
  Menu,
  LogOut,
  Search,
  type LucideIcon,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { BiNotification } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { MdDashboard } from "react-icons/md";
import { useUserPayment } from "../context/paymentContext";

// Define the shape of navigation items
interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

// Type for stock search results
interface StockResult {
  symbol: string;
  description: string;
  flag: string;
  price: number;
  change: number;
  percentChange: number;
  exchange: string;
  logo?: string;
}

// Response format for search API
interface SearchResponse {
  success: boolean;
  results: StockResult[];
}


export default function Navbar() {
  const pathname = usePathname(); // Current route path
  const [open, setOpen] = useState(false); // Mobile menu open state
  const { data: session, status } = useSession(); // User session data

  const { paymentType } = useUserPayment();

  const navigationLinks: NavItem[] = [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Olive Stock's Portfolio",
      href: `${paymentType === "Premium" || paymentType === "Ultimate" ? "/olivestocks-portfolio" : "/explore-plan"}`,
      icon: TrendingUp,
    },
    {
      name: "Quality Stocks",
      href: `${paymentType === "Premium" || paymentType === "Ultimate" ? "/quality-stocks" : "/explore-plan"}`,
      icon: Star
    },
    { name: "Stock of the Month", href: "/stock-of-month", icon: Calendar },
    { name: "My Portfolio", href: "/my-portfolio", icon: Briefcase },
    { name: "Watchlist", href: "/watchlist", icon: Eye },
    { name: "News", href: "/news", icon: Newspaper },
  ];

  // Search functionality
  const axiosInstance = useAxios();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(searchQuery, 500);

  // Fetch user details from our backend (only if session exists)
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/get-user/${session?.user?.id}`
      );
      const data = await res.json();
      return data;
    },
    select: (data) => data?.data, // Extract the data property from response
    enabled: !!session?.user?.id, // Only fetch if we have a user session
  });

  // Stock search query
  const { data: searchData, isLoading } = useQuery<SearchResponse>({
    queryKey: ["navbar-stock-search", debouncedQuery],
    queryFn: async () => {
      const res = await axiosInstance.get(`/stocks/search?q=${debouncedQuery}`);
      return res.data;
    },
    enabled: debouncedQuery.length > 0, // Only search when we have a query
    staleTime: 30000, // Cache results for 30 seconds
  });

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 0);
  };

  // Reset search when a stock is selected
  const handleStockSelect = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  // Helper to get initials from name for avatar fallback
  const getInitials = (name?: string) => {
    if (!name) return "U";
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    return initials.slice(0, 2); // Max 2 letters
  };

  // Desktop auth section (right side of navbar)
  const renderAuthSection = () => {
    // Show loading state while session is being checked
    if (status === "loading") {
      return (
        <div className="hidden lg:block flex-shrink-0">
          <div
            className={cn(
              "bg-gray-200 animate-pulse rounded-full transition-all duration-300",
              "h-8 w-20" // Fixed size
            )}
          />
        </div>
      );
    }

    // Logged in state - shows user dropdown
    if (session?.user) {
      return (
        <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
          {/* Notification bell icon */}
          <Link href="/notification">
            <Bell className="text-green-600" />

          </Link>

          {/* User dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-1 cursor-pointer hover:bg-white/20 rounded-full transition-all duration-300 px-2 py-1"
                )}
              >
                {/* User avatar - uses profile photo if available */}
                <Avatar
                  className={cn("transition-all duration-300", "h-6 w-6")} // Fixed size
                >
                  <AvatarImage
                    src={
                      userData?.profilePhoto || // First try backend profile photo
                      session.user.image || // Then auth provider image
                      "/placeholder.svg" // Fallback placeholder
                    }
                    alt={userData?.userName || session.user.name || "User"}
                  />
                  <AvatarFallback className="text-xs font-semibold bg-green-500 text-white">
                    {getInitials(userData?.userName || session.user.name)}
                  </AvatarFallback>
                </Avatar>

                {/* User name and role - now fixed to always show "xl:block" */}
                <div className={cn("text-left transition-all duration-300", "hidden xl:block")}>
                  <p
                    className={cn(
                      "font-semibold text-gray-700 leading-tight transition-all duration-300",
                      "text-xs" // Fixed size
                    )}
                  >
                    {userData?.userName || session.user.name || "User"}
                  </p>
                  <p
                    className={cn(
                      "text-gray-500 leading-tight transition-all duration-300 capitalize",
                      "text-xs"
                    )}
                  >
                    {userData?.role || session.user.role || "Member"}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>

            {/* Dropdown content */}
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {userData?.userName || session.user.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userData?.email || session.user.email || "No email"}
                  </p>
                  {
                    userData?.role === "admin" && (
                      <Link href="/dashboard">
                        <Button
                          className="w-full justify-start text-white hover:bg-green-600 bg-green-500 my-2"
                          size="sm"
                        >
                          <MdDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                    )
                  }
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    // Logged out state - shows login button
    return (
      <Link href="/login" className="hidden lg:block flex-shrink-0">
        <Button
          className={cn(
            "bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-full",
            "px-3 py-2 text-sm" // Fixed size
          )}
        >
          <LogIn
            className={cn("transition-all duration-300", "h-3 w-3 mr-1")} // Fixed size
          />
          <span
            className={cn("transition-all duration-300", "hidden xl:inline")} // Fixed visibility
          >
            Log in
          </span>
        </Button>
      </Link>
    );
  };

  // Mobile auth section (shown in sidebar menu)
  const renderMobileAuthSection = () => {
    if (session?.user) {
      return (
        <div className="mt-4 px-2 border-t pt-4">
          {/* User info section */}
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg mb-3">
            <Link href="/notification">
              <BiNotification className="text-green-600" />
            </Link>

            {/* Mobile avatar */}
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  userData?.profilePhoto ||
                  session.user.image ||
                  "/placeholder.svg"
                }
                alt={userData?.userName || session.user.name || "User"}
              />
              <AvatarFallback className="bg-green-500 text-white font-semibold">
                {getInitials(userData?.userName || session.user.name)}
              </AvatarFallback>
            </Avatar>

            {/* Mobile user details */}
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {userData?.userName || session.user.name || "User"}
              </p>
              <p className="text-sm text-gray-600">
                {userData?.email || session.user.email || "No email"}
              </p>
              <p className="text-xs text-green-600 capitalize">
                {userData?.role || session.user.role || "Member"}
              </p>
            </div>
          </div>

          {
            userData?.role === "admin" && (
              <Link href="/dashboard">
                <Button
                  className="w-full justify-start text-green-600 hover:text-green-600 hover:bg-green-50"
                  size="sm"
                >
                  <MdDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            )
          }

          {/* Logout button */}
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      );
    }

    // Mobile login button
    return (
      <div className="mt-4 px-2">
        <Link href="/login" className="block w-full">
          <Button className="w-full bg-green-500 hover:bg-green-600 rounded-full">
            <LogIn className="mr-2 h-4 w-4" />
            Log in
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <>
      {/* Fixed header that stays at top of page */}
      <header
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full transition-all duration-700 ease-in-out",
          "pt-1" // Always use 'pt-1'
        )}
      >
        <div
          className={cn(
            "transition-all duration-700 ease-in-out mx-auto px-4",
            "container" // Always use 'container'
          )}
        >
          {/* Main navbar container with glass effect */}
          <div className="bg-white/10 border border-gray-200/50 backdrop-blur-lg rounded-full shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between px-4 py-3">
              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/images/Stock-logo-1.png"
                  alt="Stock Logo"
                  width={32}
                  height={40}
                  className={cn("transition-all duration-300", "h-8 w-6")} // Fixed size
                />
              </Link>

              {/* Desktop navigation links */}
              <div className="hidden lg:flex items-center gap-1 flex-1 justify-center mx-4">
                {navigationLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "relative cursor-pointer text-[12px] font-semibold px-3 py-2 rounded-full transition-colors",
                        "text-gray-700 hover:text-green-600",
                        isActive && "bg-green-50 text-green-600",
                        "px-4" // Fixed padding
                      )}
                    >
                      {/* Show text on larger screens, icon on smaller */}
                      <span
                        className={cn(
                          "transition-all duration-300",
                          "hidden xl:inline" // Fixed visibility for text
                        )}
                      >
                        {item.name}
                      </span>
                      <span
                        className={cn(
                          "transition-all duration-300",
                          "xl:hidden" // Fixed visibility for icon
                        )}
                      >
                        <Icon size={16} strokeWidth={2.5} /> {/* Fixed size */}
                      </span>

                      {/* Active state indicator animation */}
                      {isActive && (
                        <motion.div
                          layoutId="lamp"
                          className="absolute inset-0 w-full bg-green-500/10 rounded-full -z-10"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-green-500 rounded-t-full">
                            <div className="absolute w-8 h-4 bg-green-500/20 rounded-full blur-md -top-1 -left-1" />
                            <div className="absolute w-6 h-4 bg-green-500/20 rounded-full blur-md -top-1" />
                            <div className="absolute w-3 h-3 bg-green-500/20 rounded-full blur-sm top-0 left-1.5" />
                          </div>
                        </motion.div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Stock search bar - desktop only */}
              <div
                className="hidden lg:block relative w-[200px] mx-4"
                ref={searchRef}
              >
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length > 0 && setShowResults(true)}
                  className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

                {/* Search results dropdown */}
                {showResults && (
                  <div className="absolute top-11 -left-20 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 mt-2 max-h-96 w-[500px] overflow-y-auto">
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
                        <p className="mt-2 text-sm">Searching...</p>
                      </div>
                    ) : searchData?.results?.length ? (
                      <>
                        <div className="p-3 border-b border-gray-100 flex items-center gap-2">
                          <Search className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Search Results
                          </span>
                        </div>
                        {searchData.results.map((stock, index) => (
                          <Link
                            key={`${stock.symbol}-${index}`}
                            href={`/search-result?q=${stock.symbol}`}
                            onClick={handleStockSelect}
                          >
                            <div className="flex items-center justify-between p-4 hover:bg-gray-50 border-b last:border-none cursor-pointer">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                  {stock.logo ? (
                                    <Image
                                      src={stock.logo}
                                      alt="Logo"
                                      width={40}
                                      height={40}
                                      className="rounded-full object-contain"
                                    />
                                  ) : (
                                    <span className="text-xs text-gray-400">
                                      N/A
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold text-gray-900">
                                      {stock.symbol}
                                    </p>
                                    {stock.flag && (
                                      <Image
                                        src={stock.flag}
                                        alt="Flag"
                                        width={16}
                                        height={16}
                                        className="w-4 h-4"
                                        onError={(e) => {
                                          e.currentTarget.style.display =
                                            "none";
                                        }}
                                      />
                                    )}
                                    <span className="text-xs text-gray-600">
                                      {stock.exchange}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    {stock.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-sm text-gray-900">
                                  ${stock.price?.toFixed(2)}
                                </p>
                                <p
                                  className={`text-xs font-medium ${stock.change >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                                >
                                  {stock.change >= 0 ? "+" : ""}
                                  {stock.change?.toFixed(2)} (
                                  {stock.percentChange?.toFixed(2)}%)
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        <p>
                          No results found for <strong>{searchQuery}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Render auth section (right side) */}
              {renderAuthSection()}

              {/* Mobile menu button - hidden on desktop */}
              <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <Menu className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[80%] sm:w-[350px]">
                    <div className="mt-6 flex flex-col space-y-4">
                      {/* Mobile navigation links */}
                      {navigationLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-2 py-2 text-base font-medium rounded-lg transition-colors ${isActive
                              ? "text-green-600 bg-green-50"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                              }`}
                            onClick={() => setOpen(false)}
                          >
                            <Icon size={20} />
                            {link.name}
                          </Link>
                        );
                      })}
                      {/* Mobile auth section */}
                      {renderMobileAuthSection()}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div
        className={cn(
          "transition-all duration-700",
          "h-16" // Always use 'h-16'
        )}
      />
    </>
  );
}