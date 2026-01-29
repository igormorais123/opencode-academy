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
            <div className="w-8 h-8 bg-[#007AFF] rounded-[10px] flex items-center justify-center shadow-sm">
              <Terminal className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="font-semibold text-[15px] sm:text-[17px] tracking-tight text-gray-900">OpenCode Academy</span>
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
            Curso 100% Gratuito
          </div>

          <h1 className="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-bold text-gray-900 leading-[1.15] tracking-tight mb-5 sm:mb-6">
            Aprenda a programar{" "}
            <br className="hidden sm:block" />
            com{" "}
            <span className="text-[#007AFF]">Inteligencia Artificial</span>
          </h1>

          <p className="text-[16px] sm:text-[19px] md:text-[21px] text-gray-500 max-w-[540px] mx-auto mb-8 sm:mb-10 leading-relaxed">
            Sem experiencia previa necessaria. O OpenCode faz a programacao por voce
            enquanto voce aprende passo a passo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 px-4 sm:px-0">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="bg-[#007AFF] hover:bg-[#0062CC] active:bg-[#004EA6] text-white px-8 h-[52px] sm:h-14 text-[16px] sm:text-[17px] font-semibold rounded-full w-full sm:w-auto shadow-[0_2px_8px_rgba(0,122,255,0.3)] hover:shadow-[0_4px_16px_rgba(0,122,255,0.35)] transition-all duration-200">
                Comecar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <span className="text-gray-400 text-[13px] sm:text-sm">2 horas para completar</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-[26px] sm:text-[32px] font-bold text-gray-900 tracking-tight">8</div>
              <div className="text-[12px] sm:text-[13px] text-gray-400 font-medium uppercase tracking-wider mt-1">Modulos</div>
            </div>
            <div className="text-center">
              <div className="text-[26px] sm:text-[32px] font-bold text-gray-900 tracking-tight">30+</div>
              <div className="text-[12px] sm:text-[13px] text-gray-400 font-medium uppercase tracking-wider mt-1">Licoes</div>
            </div>
            <div className="text-center">
              <div className="text-[26px] sm:text-[32px] font-bold text-gray-900 tracking-tight">24/7</div>
              <div className="text-[12px] sm:text-[13px] text-gray-400 font-medium uppercase tracking-wider mt-1">Coach IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 sm:py-24 px-5 sm:px-6 lg:px-8 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-center text-gray-900 tracking-tight mb-3">
            Por que OpenCode Academy?
          </h2>
          <p className="text-center text-gray-500 mb-10 sm:mb-14 max-w-lg mx-auto text-[15px] sm:text-[17px] leading-relaxed">
            Criado especialmente para quem nunca programou. Cada passo e explicado
            de forma simples e clara.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <FeatureCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="Zero Experiencia Necessaria"
              description="Feito para juristas, servidores publicos e qualquer pessoa que nunca escreveu uma linha de codigo."
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
              title="Projeto Real"
              description="Ao final do curso, voce tera criado seu primeiro programa funcional com ajuda da IA."
            />
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="py-14 sm:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-bold text-center text-gray-900 tracking-tight mb-3">
            O que voce vai aprender
          </h2>
          <p className="text-center text-gray-500 mb-8 sm:mb-12 text-[15px] sm:text-[17px]">
            8 modulos que te levam do zero ao seu primeiro projeto
          </p>

          <div className="space-y-2.5 sm:space-y-3">
            <ModulePreview number={0} title="Boas-vindas" duration="5 min" />
            <ModulePreview number={1} title="O que e o OpenCode?" duration="10 min" />
            <ModulePreview number={2} title="Preparando seu computador" duration="20 min" />
            <ModulePreview number={3} title="Instalando o OpenCode" duration="15 min" />
            <ModulePreview number={4} title="Sua primeira conversa com a IA" duration="15 min" />
            <ModulePreview number={5} title="Criando seu primeiro projeto" duration="20 min" />
            <ModulePreview number={6} title="Editando e evoluindo" duration="15 min" />
            <ModulePreview number={7} title="Proximos passos" duration="10 min" />
          </div>

          <div className="text-center mt-10 sm:mt-14 px-4 sm:px-0">
            <Link href="/login" className="w-full sm:w-auto inline-block">
              <Button size="lg" className="bg-[#007AFF] hover:bg-[#0062CC] active:bg-[#004EA6] text-white px-8 h-[52px] sm:h-14 text-[16px] sm:text-[17px] font-semibold rounded-full w-full sm:w-auto shadow-[0_2px_8px_rgba(0,122,255,0.3)] hover:shadow-[0_4px_16px_rgba(0,122,255,0.35)] transition-all duration-200">
                Comecar o Curso Gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial/CTA Section */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 bg-[#007AFF]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[24px] sm:text-[32px] font-bold text-white tracking-tight mb-4 sm:mb-5">
            Pronto para comecar?
          </h2>
          <p className="text-white/80 text-[16px] sm:text-[18px] mb-8 sm:mb-10 leading-relaxed">
            Junte-se a centenas de pessoas que estao aprendendo a usar IA para programar.
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
              <div className="w-6 h-6 bg-[#007AFF] rounded-md flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-medium text-[14px] text-gray-900">OpenCode Academy</span>
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

function ModulePreview({ 
  number, 
  title, 
  duration 
}: { 
  number: number; 
  title: string; 
  duration: string;
}) {
  return (
    <div className="flex items-center gap-3.5 p-3.5 sm:p-4 bg-[#F5F5F7] rounded-[14px] hover:bg-gray-100 active:bg-gray-200/60 transition-colors duration-200">
      <div className="w-10 h-10 bg-[#007AFF] text-white rounded-[10px] flex items-center justify-center font-semibold text-[15px] flex-shrink-0">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 text-[15px] sm:text-[16px] truncate">{title}</div>
      </div>
      <div className="text-[12px] sm:text-[13px] text-gray-400 flex-shrink-0 font-medium">{duration}</div>
    </div>
  );
}
