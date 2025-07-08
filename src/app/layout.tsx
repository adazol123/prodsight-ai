import type { Metadata } from 'next'
import { Outfit, Geist_Mono } from 'next/font/google'
import '../styles/css/globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Adazolhub | ProdSight AI',
  description:
    "ProdSight helps anyone with an idea turn it into a real product—faster and with less stress. Whether you're a developer, designer, or just getting started, our AI tools guide you every step of the way."
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${outfit.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
