import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
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
      <body>
        <nav className="space-x-4 p-5 w-1/3 mx-auto">
          <Link href="/cars" className="py-2 px-5 bg-yellow-300">
            Автомобили
          </Link>
          <Link href="/cars/add" className="py-2 px-5 bg-yellow-300 ">
            Добавить автомобиль
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
