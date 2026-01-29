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
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "OpenCode Academy | Aprenda a programar com IA",
  description: "Curso interativo para iniciantes aprenderem a usar o OpenCode, a ferramenta de programação assistida por IA. Sem experiência necessária.",
  keywords: ["OpenCode", "programação", "IA", "inteligência artificial", "curso", "iniciantes"],
  authors: [{ name: "INTEIA - Instituto de Treinamento e Estudos em IA" }],
  openGraph: {
    title: "OpenCode Academy | Aprenda a programar com IA",
    description: "Curso interativo para iniciantes aprenderem a usar o OpenCode",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
