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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#007AFF] rounded-lg flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">OpenCode Academy</span>
          </div>
          <Link href="/login">
            <Button variant="ghost" className="text-[#007AFF] hover:text-[#0056b3]">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007AFF] px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Curso 100% Gratuito - Beta
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Aprenda a programar com{" "}
            <span className="text-[#007AFF]">Inteligencia Artificial</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sem experiencia previa necessaria. O OpenCode faz a programacao por voce 
            enquanto voce aprende passo a passo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/login">
              <Button size="lg" className="bg-[#007AFF] hover:bg-[#0056b3] text-white px-8 py-6 text-lg rounded-full">
                Comecar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <span className="text-gray-500 text-sm">2 horas para completar</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-500">Modulos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">30+</div>
              <div className="text-sm text-gray-500">Licoes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-500">Coach IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Por que OpenCode Academy?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Criado especialmente para quem nunca programou. Cada passo e explicado 
            de forma simples e clara.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            O que voce vai aprender
          </h2>
          <p className="text-center text-gray-600 mb-12">
            8 modulos que te levam do zero ao seu primeiro projeto
          </p>

          <div className="space-y-4">
            <ModulePreview number={0} title="Boas-vindas" duration="5 min" />
            <ModulePreview number={1} title="O que e o OpenCode?" duration="10 min" />
            <ModulePreview number={2} title="Preparando seu computador" duration="20 min" />
            <ModulePreview number={3} title="Instalando o OpenCode" duration="15 min" />
            <ModulePreview number={4} title="Sua primeira conversa com a IA" duration="15 min" />
            <ModulePreview number={5} title="Criando seu primeiro projeto" duration="20 min" />
            <ModulePreview number={6} title="Editando e evoluindo" duration="15 min" />
            <ModulePreview number={7} title="Proximos passos" duration="10 min" />
          </div>

          <div className="text-center mt-12">
            <Link href="/login">
              <Button size="lg" className="bg-[#007AFF] hover:bg-[#0056b3] text-white px-8 py-6 text-lg rounded-full">
                Comecar o Curso Gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial/CTA Section */}
      <section className="py-20 px-6 bg-[#007AFF]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para comecar?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Junte-se a centenas de pessoas que estao aprendendo a usar IA para programar.
            Nao precisa de cartao de credito.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-[#007AFF] hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
              Criar Conta Gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#007AFF] rounded flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900">OpenCode Academy</span>
            </div>
            <div className="text-sm text-gray-500">
              Criado por{" "}
              <a 
                href="https://inteia.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#007AFF] hover:underline"
              >
                INTEIA
              </a>
              {" "}- Instituto de Treinamento e Estudos em IA
            </div>
            <div className="text-sm text-gray-400">
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#007AFF] mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
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
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="w-10 h-10 bg-[#007AFF] text-white rounded-lg flex items-center justify-center font-semibold">
        {number}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{title}</div>
      </div>
      <div className="text-sm text-gray-500">{duration}</div>
    </div>
  );
}
