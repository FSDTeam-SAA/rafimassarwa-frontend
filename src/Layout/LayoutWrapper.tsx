"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Navbar from "@/components/Navbar/Navbar";

const queryClient = new QueryClient();

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/registration" &&
        pathname !== "/login" &&
        pathname !== "/forgot-password" &&
        pathname !== "/enter-otp" &&
        pathname !== "/reset-password" && <Navbar />}
      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
      </QueryClientProvider>
      {pathname !== "/registration" &&
        pathname !== "/login" &&
        pathname !== "/forgot-password" &&
        pathname !== "/enter-otp" &&
        pathname !== "/reset-password" &&
        !pathname.includes("my-portfolio") &&
        !pathname.includes("stock") && <Footer />}
    </>
  );
}
