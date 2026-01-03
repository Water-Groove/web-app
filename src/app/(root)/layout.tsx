import Navbar from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-16 md:pb-0">{children}</main>
      <Footer />
    </>
  );
}
