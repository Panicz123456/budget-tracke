import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Budget Tracker",
  description: "Track your income, expenses, and savings effortlessly with our intuitive budget tracker. Set goals, view spending insights, and take control of your finances—all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body
          className={`${inter.className} antialiased`}
        >
          <Toaster richColors position="bottom-right" />
          <RootProviders>
            {children}
          </RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
