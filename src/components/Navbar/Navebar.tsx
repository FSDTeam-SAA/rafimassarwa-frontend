"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Navigation links array
const navigationLinks = [
  { name: "Home", href: "/", isActive: true },
  { name: "Murakkab's Portfolio", href: "/murakkabs-portfolio", isActive: false },
  { name: "Quality Stocks", href: "/quality-stocks", isActive: false },
  { name: "Stock of the Month", href: "/stock-of-the-month", isActive: false },
  { name: "My Portfolio", href: "/portfolio", isActive: false },
  { name: "Watchlist", href: "/watchlist", isActive: false },
  { name: "News", href: "/news", isActive: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn("fixed top-0 z-50 w-full border-b border-gray-200 bg-white transition-all duration-300", {
        "shadow-md py-3": scrolled,
        "py-4": !scrolled,
      })}
    >
      <div className="mx-auto flex container items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Stock-logo-1.png"
              alt="Tree Logo"
              width={100}
              height={100}
              className={cn("transition-all duration-300", {
                "h-[50px] w-[40px]": scrolled,
                "h-14 w-12": !scrolled,
              })}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex">
          <ul className="flex space-x-8">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-base font-medium transition-all duration-300 ${
                    link.isActive ? "text-green-600 hover:text-green-700" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block w-[111px] h-[51px]">
          <Button className="bg-green-500 hover:bg-green-600 transition-all duration-300 w-full h-full text-base">Log in</Button>
        </div>

        {/* Mobile menu with Sheet */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[350px]">
              <div className="mt-6 flex flex-col space-y-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-2 py-2 text-base font-medium ${
                      link.isActive ? "text-green-600 hover:text-green-700" : "text-gray-700 hover:text-gray-900"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4 px-2">
                  <Button className="w-full bg-green-500 hover:bg-green-600">Log in</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
