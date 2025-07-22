import { Toaster } from "@/components/shared/sonner";
import { cn } from "@/lib/utils";
import TanstackProviders from "@/providers/tanstack.provider";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Suspense } from "react";
import "../styles/css/globals.css";
import AnonymousAuthStatus from "./_components/anonymous-auth-status";
import FooterSection from "./_components/footer-section";
import HeaderSection from "./_components/header-section";
import LoginModal from "./_components/login-modal";
import ProjectModal from "./_components/project-modal";
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adazolhub | ProdSight AI",
  description:
    "ProdSight helps anyone with an idea turn it into a real product—faster and with less stress. Whether you're a developer, designer, or just getting started, our AI tools guide you every step of the way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={cn(outfit.className, "bg-neutral-50")}>
        <HeaderSection />
        <TanstackProviders>
          {children}

          <FooterSection />
        </TanstackProviders>
        <LoginModal />
        <Suspense>
          <ProjectModal />
        </Suspense>
        <Toaster position="top-right" expand />
        {/* <ScreenIndicator /> */}
        <AnonymousAuthStatus />
      </body>
      <script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></script>
    </html>
  );
}
