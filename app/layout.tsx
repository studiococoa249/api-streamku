import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DB Movie",
  description: "Streaming movie, drama, short drama, dan anime dengan tampilan modern.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0b0b0f] text-white">{children}</body>
    </html>
  );
}
