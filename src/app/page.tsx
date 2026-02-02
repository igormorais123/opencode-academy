import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  Sparkles,
  GraduationCap,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Shield,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100/80">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-[#007AFF] to-[#5856D6] rounded-[10px] flex items-center justify-center shadow-sm">
              <GraduationCap className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="font-semibold text-[15px] sm:text-[17px] tracking-tight text-gray-900">INTEIA Academy</span>
          </div>
          <Link href="/login">
            <Button variant="ghost" className="text-[#007AFF] hover:text-[#0056b3] hover:bg-blue-50/80 text-[15px] font-medium h-10 px-4 rounded-xl transition-colors">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-[88px] sm:pt-32 pb-14 sm:pb-20 px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#007AFF]/[0.08] text-[#007AFF] px-4 py-2 rounded-full text-[13px] sm:text-sm font-medium mb-8 sm:mb-10">
            <Sparkles className="w-4 h-4" />
            Cursos 100% Gratuitos
          </div>

          <h1 className="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-bold text-gray-900 leading-[1.15] tracking-tight mb-5 sm:mb-6">
            Aprenda tecnologia{" "}
            <br className="hidden sm:block" />
            com{" "}
            <span className="text-[#007AFF]">Inteligencia Artificial</span>
          </h1>

          <p className="text-[16px] sm:text-[19px] md:text-[21px] text-gray-500 max-w-[580px] mx-auto mb-8 sm:mb-10 leading-relaxed">
            Cursos praticos para iniciantes. Aprenda no seu ritmo com
            acompanhamento de IA e passo a passo detalhado.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 px-4 sm:px-0">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="bg-[#007AFF] hover:bg-[#0062CC] active:bg-[#004EA6] text-white px-8 h-[52px] sm:h-14 text-[16px] sm:text-[17px] font-semibold rounded-full w-full sm:w-auto shadow-[0_2px_8px_rgba(0,122,255,0.3)] hover:shadow-[0_4px_16px_rgba(0,122,255,0.35)] transition-all duration-200">
                Comecar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <span className="text-gray-400 text-[13px] sm:text-sm">Sem cartao de credito</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-[26px] sm:text-[32px] font-bold text-gray-900 tracking-tight">2</div>
              <div className="text-[12px] sm:text-[13px] text-gray-400 font-medium uppercase tracking-wider mt-1">Cursos</div>
            </div>
            <div className="text-center">
              <div className="text-[26px] sm:text-[32px] font-bold text-gray-900 tracking-tight">16</div>
              <div className="text-[12px] sm:text-[13px] text-gray-400 font-medium uppercase tracking-wider mt-1">Modulos</div>
            </div>
            <div className="text-center">
              <div className="text-[26px] sm:text-[32px] font-bold text-gray-900 tracking-tight">24/7</div>
              <div className="text-[12px] sm:text-[13px] text-gray-400 font-medium uppercase tracking-wider mt-1">Coach IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-14 sm:py-24 px-5 sm:px-6 lg:px-8 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-center text-gray-900 tracking-tight mb-3">
            Escolha seu curso
          </h2>
          <p className="text-center text-gray-500 mb-10 sm:mb-14 max-w-lg mx-auto text-[15px] sm:text-[17px] leading-relaxed">
            Dois caminhos para dominar a IA. Escolha o que faz mais sentido para voce.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {/* OpenCode Card */}
            <Link href="/cursos/opencode-academy" className="block group">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,122,255,0.12)] transition-all duration-300 h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#007AFF]/[0.08] rounded-[14px] flex items-center justify-center mb-5">
                  <Terminal className="w-6 h-6 sm:w-7 sm:h-7 text-[#007AFF]" />
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#007AFF]/[0.08] text-[#007AFF] px-2.5 py-1 rounded-full text-[11px] sm:text-[12px] font-medium mb-3">
                  Gratuito
                </div>
                <h3 className="font-bold text-[20px] sm:text-[22px] text-gray-900 mb-2 tracking-tight">OpenCode Academy</h3>
                <p className="text-gray-500 text-[14px] sm:text-[15px] leading-relaxed mb-4">
                  Automatize seu trabalho com IA no terminal. Ideal para nao-programadores que querem usar IA sem precisar aprender codigo.
                </p>
                <div className="flex items-center gap-4 text-[12px] sm:text-[13px] text-gray-400">
                  <span>8 modulos</span>
                  <span>30+ licoes</span>
                  <span>~2h</span>
                </div>
                <div className="mt-5 flex items-center text-[#007AFF] text-[14px] sm:text-[15px] font-medium group-hover:gap-2 gap-1.5 transition-all">
                  Ver curso <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Claude Code Card */}
            <Link href="/cursos/claude-code" className="block group">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(217,119,6,0.12)] transition-all duration-300 h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500/[0.08] rounded-[14px] flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />
                </div>
                <div className="inline-flex items-center gap-1.5 bg-amber-500/[0.08] text-amber-600 px-2.5 py-1 rounded-full text-[11px] sm:text-[12px] font-medium mb-3">
                  Gratuito
                </div>
                <h3 className="font-bold text-[20px] sm:text-[22px] text-gray-900 mb-2 tracking-tight">Claude Code</h3>
                <p className="text-gray-500 text-[14px] sm:text-[15px] leading-relaxed mb-4">
                  Programe com o Claude Code da Anthropic. Aprenda a usar IA que le, edita e cria codigo direto no seu terminal.
                </p>
                <div className="flex items-center gap-4 text-[12px] sm:text-[13px] text-gray-400">
                  <span>8 modulos</span>
                  <span>34 licoes</span>
                  <span>~2h</span>
                </div>
                <div className="mt-5 flex items-center text-amber-600 text-[14px] sm:text-[15px] font-medium group-hover:gap-2 gap-1.5 transition-all">
                  Ver curso <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-center text-gray-900 tracking-tight mb-3">
            Por que INTEIA Academy?
          </h2>
          <p className="text-center text-gray-500 mb-10 sm:mb-14 max-w-lg mx-auto text-[15px] sm:text-[17px] leading-relaxed">
            Criado especialmente para quem esta comecando. Cada passo e explicado
            de forma simples e clara.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <FeatureCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="Zero Experiencia Necessaria"
              description="Feito para qualquer pessoa que nunca escreveu uma linha de codigo. Explicamos tudo do zero."
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Coach IA 24 horas"
              description="Travou em algum passo? Nosso coach inteligente conhece todos os erros comuns e te ajuda na hora."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Ambiente Seguro"
              description="Aprenda no seu ritmo, sem pressao. Cada conquista e celebrada com confete!"
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Micro-passos"
              description="Cada licao e dividida em pequenos passos que voce confirma antes de avancar. Impossivel se perder."
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-6 h-6" />}
              title="Windows e Mac"
              description="Instrucoes especificas para seu sistema operacional. Sem confusao com comandos diferentes."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Pratica Real"
              description="Exercicios praticos em cada modulo. Voce aprende fazendo, nao so lendo."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-[#007AFF] to-[#5856D6]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[24px] sm:text-[32px] font-bold text-white tracking-tight mb-4 sm:mb-5">
            Pronto para comecar?
          </h2>
          <p className="text-white/80 text-[16px] sm:text-[18px] mb-8 sm:mb-10 leading-relaxed">
            Junte-se a centenas de pessoas que estao aprendendo a usar IA.
            Nao precisa de cartao de credito.
          </p>
          <div className="px-4 sm:px-0">
            <Link href="/login" className="w-full sm:w-auto inline-block">
              <Button size="lg" className="bg-white text-[#007AFF] hover:bg-white/95 active:bg-white/90 px-8 h-[52px] sm:h-14 text-[16px] sm:text-[17px] font-semibold rounded-full w-full sm:w-auto shadow-[0_2px_12px_rgba(0,0,0,0.1)] transition-all duration-200">
                Criar Conta Gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 px-5 sm:px-6 lg:px-8 border-t border-gray-100/80 safe-bottom">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-[#007AFF] to-[#5856D6] rounded-md flex items-center justify-center">
                <GraduationCap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-medium text-[14px] text-gray-900">INTEIA Academy</span>
            </div>
            <div className="text-[12px] sm:text-[13px] text-gray-400">
              Criado por{" "}
              <a
                href="https://inteia.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007AFF] hover:underline text-link"
              >
                INTEIA
              </a>
              {" "}- Instituto de Treinamento e Estudos em IA
            </div>
            <div className="text-[12px] sm:text-[13px] text-gray-400">
              2024 - Todos os direitos reservados
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#007AFF]/[0.08] rounded-[12px] flex items-center justify-center text-[#007AFF] mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-[16px] sm:text-[17px] text-gray-900 mb-1.5 tracking-tight">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-[14px] sm:text-[15px]">{description}</p>
    </div>
  );
}
