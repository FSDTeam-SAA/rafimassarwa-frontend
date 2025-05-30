import LayoutWrapper from "@/Layout/LayoutWrapper";
import "../globals.css";
import { Poppins } from "next/font/google";
import {Toaster} from 'sonner'
import AuthSessionProvider from "@/components/Authentication/session-provider";

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
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthSessionProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
