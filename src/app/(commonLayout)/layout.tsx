import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      {/* <Navbar className="sticky top-0 z-10 dark:bg-[#0a0a0a] bg-gray-50" /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}
