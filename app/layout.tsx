import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AppInitializer } from "@/components/app-initializer"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trips Management System | Intersnack",
  description: "Business trip management and optimization system for Intersnack Vietnam",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppInitializer>
          <div className="min-h-screen bg-background">
            {/* Global Header with Logo */}
            <div className="fixed top-0 right-0 z-50 p-4">
              <Image
                src="/intersnack-logo.png"
                alt="Intersnack"
                width={120}
                height={60}
                className="object-contain opacity-90 hover:opacity-100 transition-opacity"
                priority
              />
            </div>
            
            {/* Main Content */}
            {children}
          </div>
          <Toaster />
        </AppInitializer>
      </body>
    </html>
  )
}