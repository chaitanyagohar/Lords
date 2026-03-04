import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Load the specific weights used on their site
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Lords & Co. | Property Is Honour |EST. 2025",
  description: "Discover premium real estate with Lords & Co. We provide expert guidance for buying, selling, and investing in exclusive properties. Property Is Honour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans bg-white text-gray-800 antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}