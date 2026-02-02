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
  title: "INTEIA Academy | Aprenda tecnologia com IA",
  description: "Cursos praticos de IA para iniciantes. OpenCode, Claude Code e mais. Sem experiencia necessaria.",
  keywords: ["INTEIA", "OpenCode", "Claude Code", "programacao", "IA", "inteligencia artificial", "curso", "iniciantes"],
  authors: [{ name: "INTEIA - Instituto de Treinamento e Estudos em IA" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "INTEIA Academy",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "INTEIA Academy | Aprenda tecnologia com IA",
    description: "Cursos praticos de IA para iniciantes. OpenCode, Claude Code e mais.",
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
