"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Loader2, 
  ArrowLeft,
  ArrowRight,
  Home,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CoachButton } from "@/components/coach/CoachButton";
import { CodeBox } from "@/components/course/CodeBox";
import { TipBox } from "@/components/course/TipBox";
import { WarningBox } from "@/components/course/WarningBox";
import { TheoryBox } from "@/components/course/TheoryBox";
import { StepChecker } from "@/components/course/StepChecker";
import { lessonCelebration, microCelebration } from "@/components/course/Confetti";
import { modules, Step } from "@/content/modules";

interface UserProgress {
  completedLessons: string[];
  completedSteps: string[];
  currentModule: number;
  currentLesson: number;
  totalTimeMinutes: number;
}

export default function LessonPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  
  const moduleId = parseInt(params.moduleId as string);
  const lessonId = parseInt(params.lessonId as string);
  
  const [os, setOs] = useState<"windows" | "mac">("windows");
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    completedSteps: [],
    currentModule: 0,
    currentLesson: 0,
    totalTimeMinutes: 0,
  });
  const [lessonStartTime] = useState(Date.now());

  const module = modules[moduleId];
  const lesson = module?.lessons[lessonId];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    // Load OS preference
    const savedOS = localStorage.getItem("opencode-os");
    if (savedOS === "mac" || savedOS === "windows") {
      setOs(savedOS);
    }

    // Load progress
    const savedProgress = localStorage.getItem("opencode-progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem("opencode-progress", JSON.stringify(newProgress));
  };

  const isStepCompleted = (stepIndex: number) => {
    return progress.completedSteps.includes(`${moduleId}-${lessonId}-${stepIndex}`);
  };

  const markStepComplete = (stepIndex: number) => {
    const stepKey = `${moduleId}-${lessonId}-${stepIndex}`;
    if (progress.completedSteps.includes(stepKey)) return;

    microCelebration();

    const newProgress = {
      ...progress,
      completedSteps: [...progress.completedSteps, stepKey],
    };
    saveProgress(newProgress);
  };

  const isLessonComplete = () => {
    if (!lesson) return false;
    const checkersInLesson = lesson.steps.filter(s => s.type === "checker").length;
    const completedInLesson = lesson.steps.filter((s, i) => 
      s.type === "checker" && isStepCompleted(i)
    ).length;
    // If no checkers, lesson is complete when viewed
    return checkersInLesson === 0 || completedInLesson === checkersInLesson;
  };

  const markLessonComplete = () => {
    const lessonKey = `${moduleId}-${lessonId}`;
    if (progress.completedLessons.includes(lessonKey)) return;

    const timeSpent = Math.round((Date.now() - lessonStartTime) / 60000);
    
    lessonCelebration();

    const newProgress = {
      ...progress,
      completedLessons: [...progress.completedLessons, lessonKey],
      totalTimeMinutes: progress.totalTimeMinutes + timeSpent,
      currentModule: moduleId,
      currentLesson: lessonId,
    };
    saveProgress(newProgress);
  };

  const getNextLesson = () => {
    if (lessonId < module.lessons.length - 1) {
      return { moduleId, lessonId: lessonId + 1 };
    }
    if (moduleId < modules.length - 1) {
      return { moduleId: moduleId + 1, lessonId: 0 };
    }
    return null; // Course completed
  };

  const getPrevLesson = () => {
    if (lessonId > 0) {
      return { moduleId, lessonId: lessonId - 1 };
    }
    if (moduleId > 0) {
      const prevModule = modules[moduleId - 1];
      return { moduleId: moduleId - 1, lessonId: prevModule.lessons.length - 1 };
    }
    return null;
  };

  const getLessonProgress = () => {
    if (!lesson) return 0;
    const checkers = lesson.steps.filter(s => s.type === "checker");
    if (checkers.length === 0) return 100;
    
    let completedCount = 0;
    for (let i = 0; i < lesson.steps.length; i++) {
      if (lesson.steps[i].type === "checker" && isStepCompleted(i)) {
        completedCount++;
      }
    }
    return Math.round((completedCount / checkers.length) * 100);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#007AFF]" />
      </div>
    );
  }

  if (!module || !lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Licao nao encontrada</p>
        <Link href="/curso">
          <Button>Voltar ao curso</Button>
        </Link>
      </div>
    );
  }

  const nextLesson = getNextLesson();
  const prevLesson = getPrevLesson();
  const lessonProgress = getLessonProgress();
  const lessonComplete = isLessonComplete();

  // Mark as complete if all steps done
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (lessonComplete && !progress.completedLessons.includes(`${moduleId}-${lessonId}`)) {
      markLessonComplete();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonComplete]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <Link href="/curso" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="text-xs text-gray-500">Modulo {moduleId}</div>
                <div className="font-medium text-gray-900">{lesson.title}</div>
              </div>
            </div>
            <Link href="/curso">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <Progress value={lessonProgress} className="h-1" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Lesson Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-[#007AFF] mb-2">
            <span className="bg-blue-50 px-2 py-0.5 rounded">Modulo {moduleId}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">Licao {lessonId + 1} de {module.lessons.length}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson.title}</h1>
        </div>

        {/* Lesson Steps */}
        <div className="space-y-6">
          {lesson.steps.map((step, index) => {
            // Filter by OS if specified
            if (step.osSpecific && step.osSpecific !== "both" && step.osSpecific !== os) {
              return null;
            }

            return renderStep(step, index, os, isStepCompleted, markStepComplete);
          })}
        </div>

        {/* Completion Message */}
        {lessonComplete && (
          <div className="mt-12 p-6 bg-green-50 border border-green-100 rounded-2xl text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Licao concluida!
            </h3>
            <p className="text-gray-600 mb-6">
              Voce completou todos os passos desta licao.
            </p>
            {nextLesson ? (
              <Link href={`/curso/modulo/${nextLesson.moduleId}/${nextLesson.lessonId}`}>
                <Button className="bg-[#007AFF] hover:bg-[#0056b3] text-white px-8 py-5 rounded-xl">
                  Proxima Licao
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/curso">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-xl">
                  Voltar ao Dashboard
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
          {prevLesson ? (
            <Link href={`/curso/modulo/${prevLesson.moduleId}/${prevLesson.lessonId}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {/* Lesson dots */}
          <div className="flex items-center gap-1">
            {module.lessons.map((_, i) => (
              <Link key={i} href={`/curso/modulo/${moduleId}/${i}`}>
                <div className={`
                  w-2 h-2 rounded-full transition-colors
                  ${i === lessonId 
                    ? "bg-[#007AFF] w-4" 
                    : progress.completedLessons.includes(`${moduleId}-${i}`)
                      ? "bg-green-400"
                      : "bg-gray-300"
                  }
                `} />
              </Link>
            ))}
          </div>

          {nextLesson && !lessonComplete ? (
            <Button variant="outline" disabled className="gap-2 opacity-50">
              Proxima
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : nextLesson ? (
            <Link href={`/curso/modulo/${nextLesson.moduleId}/${nextLesson.lessonId}`}>
              <Button variant="outline" className="gap-2">
                Proxima
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/curso">
              <Button variant="outline" className="gap-2">
                Dashboard
                <Home className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </main>

      {/* Coach Button */}
      <CoachButton />
    </div>
  );
}

function renderStep(
  step: Step, 
  index: number, 
  os: "windows" | "mac",
  isStepCompleted: (index: number) => boolean,
  markStepComplete: (index: number) => void
) {
  const text = step.content;

  switch (step.type) {
    case "text":
      return (
        <div 
          key={index} 
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: formatText(text) }}
        />
      );

    case "code":
      return (
        <CodeBox 
          key={index} 
          code={step.codeContent || text}
          language="bash"
        />
      );

    case "tip":
      return <TipBox key={index}>{text}</TipBox>;

    case "warning":
      return <WarningBox key={index}>{text}</WarningBox>;

    case "theory":
      return (
        <TheoryBox key={index} title="Saiba mais">
          {text}
        </TheoryBox>
      );

    case "checker":
      return (
        <div key={index} className="my-6">
          <p className="text-gray-700 mb-4 font-medium">{text}</p>
          <StepChecker
            onSuccess={() => markStepComplete(index)}
            onNeedHelp={() => {
              // Open coach panel
              window.dispatchEvent(new CustomEvent('openCoach'));
            }}
            successText={isStepCompleted(index) ? "Feito!" : "Consegui!"}
          />
        </div>
      );

    case "image":
      return (
        <div key={index} className="my-6">
          <img 
            src={text} 
            alt=""
            className="rounded-xl border border-gray-200 shadow-sm max-w-full"
          />
        </div>
      );

    case "quiz":
      return (
        <div key={index} className="bg-purple-50 border border-purple-100 rounded-xl p-6">
          <p className="font-medium text-gray-900 mb-4">{text}</p>
          <div className="space-y-2">
            {step.options?.map((opt, i) => (
              <button
                key={i}
                className="w-full text-left p-3 rounded-lg border border-purple-200 hover:border-purple-400 hover:bg-purple-100 transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

function formatText(text: string): string {
  // Convert markdown-like syntax to HTML
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\n\n/g, '</p><p class="mt-4">')
    .replace(/\n/g, '<br />');
}
