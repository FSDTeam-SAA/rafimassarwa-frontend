import "../globals.css";
import { Poppins } from 'next/font/google';
import Navbar from "@/components/Navbar/Navebar";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
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
