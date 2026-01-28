import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  weight: ["400"],
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Hub | Home",
  description: "সেরা স্বাদের খাবার এবং দ্রুত ডেলিভারির জন্য Food Hub-এ যোগ দিন। আপনার পছন্দের ডিশ এখন মাত্র কয়েক ক্লিকের দূরত্বে। Fresh, Local, Fast!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable} antialiased dark:bg-[#0a0a0a] bg-gray-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
