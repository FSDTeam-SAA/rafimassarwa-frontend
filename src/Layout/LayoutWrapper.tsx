"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { PortfolioProvider } from "@/components/context/portfolioContext";


export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute =
    pathname === "/registration" ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/enter-otp" ||
    pathname === "/reset-password" ||
    pathname === "/verify-email";

  const shouldHideFooterSpecific =
    pathname.includes("my-portfolio") || pathname.includes("stock");
  return (
    <>


      <PortfolioProvider>
        {!isAuthRoute && !isDashboardRoute && <Navbar />}
        <main>{children}</main>
      </PortfolioProvider>

      {!isAuthRoute && !isDashboardRoute && !shouldHideFooterSpecific && <Footer />}
    </>
  );
}