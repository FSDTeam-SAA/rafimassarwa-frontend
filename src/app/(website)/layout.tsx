import LayoutWrapper from "@/Layout/LayoutWrapper";
import "../globals.css";
import "react-quill/dist/quill.snow.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import AuthSessionProvider from "@/components/Authentication/session-provider";
import NextTopLoader from "nextjs-toploader"; // <- Import the loader
import { SocketProvider } from "@/providers/SocketProvider";
import { PaymentProvider } from "@/components/context/paymentContext";
import QueryProvider from "@/Layout/query-provider";
import { TableReloadProvider } from "@/components/context/table-reload-context";
import LanguageProvider from "@/providers/LanguageProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} antialiased overflow-x-hidden`}>
        <NextTopLoader
          initialPosition={0.08}
          crawlSpeed={200}
          color="#16A34A"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #16A34A,0 0 5px #16A34A"
          easing="ease"
        />

        <AuthSessionProvider>
          <QueryProvider>
            <LanguageProvider>
              <TableReloadProvider>
                <PaymentProvider>
                  <LayoutWrapper>
                    <SocketProvider>{children}</SocketProvider>
                  </LayoutWrapper>
                </PaymentProvider>
              </TableReloadProvider>
            </LanguageProvider>
          </QueryProvider>
        </AuthSessionProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
