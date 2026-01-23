"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Terminal, Chrome, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#007AFF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#007AFF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo ao OpenCode Academy
            </h1>
            <p className="text-gray-600">
              Entre com sua conta Google para comecar o curso
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-6 text-base font-medium bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-3" />
              ) : (
                <Chrome className="w-5 h-5 mr-3 text-[#4285F4]" />
              )}
              {isLoading ? "Entrando..." : "Continuar com Google"}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Usamos sua conta Google apenas para identificacao.
              Seus dados estao seguros.
            </p>
          </div>

          {/* Benefits reminder */}
          <div className="mt-8 space-y-3">
            <BenefitItem text="Salve seu progresso automaticamente" />
            <BenefitItem text="Receba certificado ao concluir" />
            <BenefitItem text="Acesse de qualquer dispositivo" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-gray-400">
        Ao entrar, voce concorda com nossos termos de uso
      </footer>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}
