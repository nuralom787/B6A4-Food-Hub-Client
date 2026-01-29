import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar className="sticky top-0 z-10 bg-background dark:bg-gray-900" />
      <div className="max-w-screen-2xl mx-auto px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}
