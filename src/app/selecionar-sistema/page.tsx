"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Terminal, Loader2, Monitor, Apple } from "lucide-react";
import { lessonCelebration } from "@/components/course/Confetti";

type OS = "windows" | "mac";

export default function SelecionarSistemaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedOS, setSelectedOS] = useState<OS | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSelectOS = (os: OS) => {
    setSelectedOS(os);
  };

  const handleContinue = async () => {
    if (!selectedOS) return;
    
    setIsLoading(true);
    
    // Save OS preference
    localStorage.setItem("opencode-os", selectedOS);
    
    // Update user preference in database
    try {
      await fetch("/api/progresso/os", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ os: selectedOS }),
      });
    } catch {
      // Continue even if API fails
    }
    
    lessonCelebration();
    
    setTimeout(() => {
      router.push("/curso");
    }, 800);
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#007AFF] rounded-lg flex items-center justify-center">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold">OpenCode Academy</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-xl text-center">
          {/* Welcome */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Ola, {session?.user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Qual sistema operacional voce usa?
          </p>

          {/* OS Selection */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <OSCard
              os="windows"
              icon={<Monitor className="w-12 h-12" />}
              label="Windows"
              description="Windows 10 ou 11"
              selected={selectedOS === "windows"}
              onClick={() => handleSelectOS("windows")}
            />
            <OSCard
              os="mac"
              icon={<Apple className="w-12 h-12" />}
              label="Mac"
              description="macOS"
              selected={selectedOS === "mac"}
              onClick={() => handleSelectOS("mac")}
            />
          </div>

          {/* Info box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
            <p className="text-sm text-blue-800">
              Voce podera mudar isso depois nas configuracoes do curso.
              Escolha o sistema que voce usa no dia a dia.
            </p>
          </div>

          {/* Continue button */}
          <Button
            onClick={handleContinue}
            disabled={!selectedOS || isLoading}
            className="bg-[#007AFF] hover:bg-[#0056b3] text-white px-10 py-6 text-lg rounded-full disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Preparando...
              </>
            ) : (
              "Comecar o Curso"
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}

function OSCard({
  os,
  icon,
  label,
  description,
  selected,
  onClick,
}: {
  os: OS;
  icon: React.ReactNode;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        p-8 rounded-2xl border-2 transition-all duration-200
        ${selected 
          ? "border-[#007AFF] bg-blue-50 shadow-lg scale-105" 
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
        }
      `}
    >
      <div className={`mb-4 ${selected ? "text-[#007AFF]" : "text-gray-400"}`}>
        {icon}
      </div>
      <div className={`text-xl font-semibold mb-1 ${selected ? "text-[#007AFF]" : "text-gray-900"}`}>
        {label}
      </div>
      <div className="text-sm text-gray-500">{description}</div>
      
      {selected && (
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-[#007AFF] font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Selecionado
        </div>
      )}
    </button>
  );
}
