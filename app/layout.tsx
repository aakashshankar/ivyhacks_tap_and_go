import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body className={`${inter.className} flex justify-center`}>
        <div className="w-full h-[844px] max-w-sm mx-auto border-2 my-5 px-6 rounded-xl">
          <Header />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
