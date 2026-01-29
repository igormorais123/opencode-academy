import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  title: "OpenCode Academy | Aprenda a programar com IA",
  description: "Curso interativo para iniciantes aprenderem a usar o OpenCode, a ferramenta de programação assistida por IA. Sem experiencia necessaria.",
  keywords: ["OpenCode", "programacao", "IA", "inteligencia artificial", "curso", "iniciantes"],
  authors: [{ name: "INTEIA - Instituto de Treinamento e Estudos em IA" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OpenCode Academy",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "OpenCode Academy | Aprenda a programar com IA",
    description: "Curso interativo para iniciantes aprenderem a usar o OpenCode",
    type: "website",
    locale: "pt_BR",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
