import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastContainer, toast } from 'react-toastify';
import "./globals.css";

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
        <ToastContainer
          position="top-center"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
