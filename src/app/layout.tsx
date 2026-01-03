import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Welcome to Water Groove",
  description:
    "Water Groove Investment Platform is a digital investment system that enables individuals and organizations to invest in verified asset-backed ventures managed by Water Groove",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
