// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipes For Gout – 100% Flare-Free Meals",
  description: "Delicious recipes that actually lower uric acid.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-beige antialiased`}>
        {/* THIS IS THE MAGIC LINE THAT FINALLY FIXES EVERYTHING */}
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}