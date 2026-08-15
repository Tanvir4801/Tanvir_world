import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanvir's World | Full-Stack Developer",
  description: "Interactive 3D developer portfolio for Tanvir Patel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-black text-white selection:bg-brand/30">
        {children}
      </body>
    </html>
  );
}
