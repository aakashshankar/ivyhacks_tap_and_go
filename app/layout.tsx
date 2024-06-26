import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css"
          rel="stylesheet"
        ></link>
      </head>
      <body className={`${inter.className} flex justify-center bg-black`}>
        <div className="w-full h-[940px] max-w-sm mx-auto my-5 rounded-2xl bg-[#F0ECE4] overflow-auto">
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
