"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { PortfolioProvider } from "@/components/context/portfolioContext";
import { Suspense } from "react";

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
      <Suspense>
        {" "}
        <PortfolioProvider>
          {!isAuthRoute && !isDashboardRoute && <Navbar />}
          <main>{children}</main>
        </PortfolioProvider>
      </Suspense>

      {!isAuthRoute && !isDashboardRoute && !shouldHideFooterSpecific && (
        <Footer />
      )}
    </>
  );
}
