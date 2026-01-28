import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      {children}
    </div>
  );
}
