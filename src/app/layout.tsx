import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ContextProvider } from "@/context/context";
import { KyeContextProvider } from "@/components/third-party/context/keyContext";
import { CartContextProvider } from "@/context/cartContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MLS Jewels",
  description: "Jewellery app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KyeContextProvider>
          <CartContextProvider>
            <ContextProvider>
              <Navbar />
              {children}
              <Footer />
            </ContextProvider>
          </CartContextProvider>
        </KyeContextProvider>
      </body>
    </html>
  );
}
