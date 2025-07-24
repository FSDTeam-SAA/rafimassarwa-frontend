"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { PortfolioProvider } from "@/components/context/portfolioContext";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import { useSocketContext } from "@/providers/SocketProvider";

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

  const { newsNotification } = useSocketContext();

  useEffect(() => {
    if (newsNotification) {
      toast(newsNotification?.message);
    }
  }, [newsNotification]);

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
