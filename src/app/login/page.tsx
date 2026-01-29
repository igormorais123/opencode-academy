"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Terminal, Chrome, ArrowLeft, Loader2, Youtube } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingYouTube, setIsLoadingYouTube] = useState(false);

  useEffect(() => {
    if (session) {
      // Check if user has selected OS
      const savedOS = localStorage.getItem("opencode-os");
      if (savedOS) {
        router.push("/curso");
      } else {
        router.push("/selecionar-sistema");
      }
    }
  }, [session, router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/selecionar-sistema" });
    } catch {
      setIsLoading(false);
    }
  };

  const handleYouTubeLogin = async () => {
    setIsLoadingYouTube(true);
    try {
      await signIn("youtube", { callbackUrl: "/selecionar-sistema" });
    } catch {
      setIsLoadingYouTube(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#007AFF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      {/* Header */}
      <header className="px-5 pt-4 safe-top">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#007AFF] hover:text-[#0062CC] text-[15px] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-[400px]">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-[64px] h-[64px] bg-[#007AFF] rounded-[18px] flex items-center justify-center mx-auto mb-5 shadow-[0_2px_12px_rgba(0,122,255,0.25)]">
              <Terminal className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-[22px] sm:text-[26px] font-bold text-gray-900 tracking-tight mb-2">
              Bem-vindo ao OpenCode Academy
            </h1>
            <p className="text-[15px] text-gray-500">
              Entre com sua conta Google para comecar o curso
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-[20px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-gray-100/50 space-y-3">
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading || isLoadingYouTube}
              className="w-full h-[52px] text-[15px] font-medium bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 border border-gray-200 rounded-[14px] transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-3" />
              ) : (
                <Chrome className="w-5 h-5 mr-3 text-[#4285F4]" />
              )}
              {isLoading ? "Entrando..." : "Continuar com Google"}
            </Button>

            <Button
              onClick={handleYouTubeLogin}
              disabled={isLoading || isLoadingYouTube}
              className="w-full h-[52px] text-[15px] font-medium bg-[#FF0000] hover:bg-[#E60000] active:bg-[#CC0000] text-white border-0 rounded-[14px] transition-all duration-200"
            >
              {isLoadingYouTube ? (
                <Loader2 className="w-5 h-5 animate-spin mr-3" />
              ) : (
                <Youtube className="w-5 h-5 mr-3" />
              )}
              {isLoadingYouTube ? "Entrando..." : "Continuar com YouTube"}
            </Button>

            <p className="text-center text-[13px] text-gray-400 pt-2">
              Usamos sua conta apenas para identificacao.
              Seus dados estao seguros.
            </p>
          </div>

          {/* Benefits reminder */}
          <div className="mt-7 space-y-2.5">
            <BenefitItem text="Salve seu progresso automaticamente" />
            <BenefitItem text="Receba certificado ao concluir" />
            <BenefitItem text="Acesse de qualquer dispositivo" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-5 py-5 text-center text-[12px] text-gray-400 safe-bottom">
        Ao entrar, voce concorda com nossos termos de uso
      </footer>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-gray-500">
      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-[14px]">{text}</span>
    </div>
  );
}
