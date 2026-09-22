import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxen — The Ultimate Shield For Your Masterpiece",
  description:
    "Perlindungan tanpa kompromi untuk mahakarya otomotif Anda. Paint Protection Film, Window Car Film, dan Wrapping PET dengan standar kualitas global.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans bg-ink text-white antialiased">
        {children}
      </body>
    </html>
  );
}