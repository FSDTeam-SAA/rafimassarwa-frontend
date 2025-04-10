// import type { Metadata } from "next";
import "../globals.css";
import { Poppins } from 'next/font/google';
import Navbar from "@/components/Navbar/Navebar";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // Specify weights you need
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
