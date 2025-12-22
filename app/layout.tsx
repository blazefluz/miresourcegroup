import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-heading" })
const _geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "M.I Resource Group | Oil & Gas Support Services",
  description:
    "No.1 Support Services Provider in Nigeria's Oil & Gas Industry - Engineering, Procurement, Supply Chain Management",
  icons: {
    icon: [
      {
        url: "/MIResourcesLogo.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/MIResourcesLogo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
