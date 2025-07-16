import { Toaster } from '@/components/shared/sonner'
import TanstackProviders from '@/providers/tanstack.provider'
import type { Metadata } from 'next'
import { Geist_Mono, Outfit } from 'next/font/google'
import '../styles/css/globals.css'
import AnonymousAuthStatus from './_components/anonymous-auth-status'
import HeaderSection from './_components/header-section'
import LoginModal from './_components/login-modal'
import ProjectModal from './_components/project-modal'
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
      <head>
        <script
          src='https://challenges.cloudflare.com/turnstile/v0/api.js'
          async
          defer
        ></script>
      </head>
      <body className={`${outfit.variable} ${geistMono.variable} antialiased`}>
        <HeaderSection />
        <AnonymousAuthStatus />
        <TanstackProviders>
        {children}
        </TanstackProviders>
        <LoginModal />
        <ProjectModal />
        <Toaster position='top-right' expand />
      </body>
    </html>
  )
}
