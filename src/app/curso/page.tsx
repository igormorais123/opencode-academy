"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Terminal, 
  Loader2, 
  LogOut, 
  Settings,
  Trophy,
  Clock,
  CheckCircle2,
  PlayCircle,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CoachButton } from "@/components/coach/CoachButton";
import { modules } from "@/content/modules";

interface UserProgress {
  completedLessons: string[];
  currentModule: number;
  currentLesson: number;
  totalTimeMinutes: number;
}

export default function CursoPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    currentModule: 0,
    currentLesson: 0,
    totalTimeMinutes: 0,
  });
  const [os, setOs] = useState<"windows" | "mac">("windows");

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
    } else {
      router.push("/selecionar-sistema");
    }

    // Load progress from localStorage (will sync with API later)
    const savedProgress = localStorage.getItem("opencode-progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, [router]);

  const getTotalLessons = () => {
    return modules.reduce((acc, m) => acc + m.lessons.length, 0);
  };

  const getProgressPercent = () => {
    const total = getTotalLessons();
    return total > 0 ? Math.round((progress.completedLessons.length / total) * 100) : 0;
  };

  const isModuleUnlocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return true;
    // Module is unlocked if all lessons of previous module are completed
    const prevModule = modules[moduleIndex - 1];
    return prevModule.lessons.every((_, lessonIndex) => 
      progress.completedLessons.includes(`${moduleIndex - 1}-${lessonIndex}`)
    );
  };

  const isLessonCompleted = (moduleIndex: number, lessonIndex: number) => {
    return progress.completedLessons.includes(`${moduleIndex}-${lessonIndex}`);
  };

  const getModuleProgress = (moduleIndex: number) => {
    const module = modules[moduleIndex];
    const completed = module.lessons.filter((_, i) => 
      isLessonCompleted(moduleIndex, i)
    ).length;
    return { completed, total: module.lessons.length };
  };

  const getNextLesson = () => {
    for (let mi = 0; mi < modules.length; mi++) {
      for (let li = 0; li < modules[mi].lessons.length; li++) {
        if (!isLessonCompleted(mi, li) && isModuleUnlocked(mi)) {
          return { moduleIndex: mi, lessonIndex: li };
        }
      }
    }
    return null; // Course completed
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#007AFF]" />
      </div>
    );
  }

  const nextLesson = getNextLesson();
  const progressPercent = getProgressPercent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/curso" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#007AFF] rounded-lg flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">OpenCode Academy</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* OS Badge */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {os === "windows" ? "Windows" : "Mac"}
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                    <AvatarFallback className="bg-[#007AFF] text-white">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2 border-b">
                  <p className="font-medium">{session?.user?.name}</p>
                  <p className="text-sm text-gray-500">{session?.user?.email}</p>
                </div>
                <DropdownMenuItem onClick={() => router.push("/selecionar-sistema")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Mudar Sistema
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Welcome & Stats */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {progressPercent === 100 
                  ? "Parabens! Voce completou o curso!"
                  : `Ola, ${session?.user?.name?.split(" ")[0]}!`
                }
              </h1>
              <p className="text-gray-600">
                {progressPercent === 100 
                  ? "Voce dominou o OpenCode!"
                  : nextLesson 
                    ? "Continue de onde parou"
                    : "Comece sua jornada"
                }
              </p>
            </div>

            {nextLesson && (
              <Link href={`/curso/modulo/${nextLesson.moduleIndex}/${nextLesson.lessonIndex}`}>
                <Button className="bg-[#007AFF] hover:bg-[#0056b3] text-white px-6 py-5 rounded-xl">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  {progress.completedLessons.length === 0 ? "Comecar" : "Continuar"}
                </Button>
              </Link>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progresso do curso</span>
              <span className="text-sm font-medium text-[#007AFF]">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                {progress.completedLessons.length}
              </div>
              <div className="text-sm text-gray-500">Licoes completas</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900">
                <Clock className="w-5 h-5 text-[#007AFF]" />
                {progress.totalTimeMinutes}
              </div>
              <div className="text-sm text-gray-500">Minutos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900">
                <Trophy className="w-5 h-5 text-yellow-500" />
                {modules.filter((_, i) => {
                  const { completed, total } = getModuleProgress(i);
                  return completed === total;
                }).length}
              </div>
              <div className="text-sm text-gray-500">Modulos</div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Modulos do Curso</h2>
        <div className="space-y-4">
          {modules.map((module, moduleIndex) => {
            const unlocked = isModuleUnlocked(moduleIndex);
            const { completed, total } = getModuleProgress(moduleIndex);
            const isComplete = completed === total;
            
            return (
              <div
                key={module.id}
                className={`
                  bg-white rounded-xl p-5 border transition-all
                  ${unlocked 
                    ? "border-gray-100 shadow-sm hover:shadow-md cursor-pointer" 
                    : "border-gray-100 opacity-60"
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  {/* Module Number */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0
                    ${isComplete 
                      ? "bg-green-100 text-green-600" 
                      : unlocked 
                        ? "bg-[#007AFF] text-white" 
                        : "bg-gray-100 text-gray-400"
                    }
                  `}>
                    {isComplete ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : unlocked ? (
                      moduleIndex
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>

                  {/* Module Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-lg ${unlocked ? "text-gray-900" : "text-gray-400"}`}>
                      {module.title}
                    </h3>
                    <p className={`text-sm mt-1 ${unlocked ? "text-gray-600" : "text-gray-400"}`}>
                      {module.description}
                    </p>
                    
                    {/* Lessons progress */}
                    <div className="flex items-center gap-2 mt-3">
                      <Progress 
                        value={(completed / total) * 100} 
                        className="h-1.5 flex-1 max-w-[200px]" 
                      />
                      <span className="text-xs text-gray-500">
                        {completed}/{total} licoes
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  {unlocked && !isComplete && (
                    <Link 
                      href={`/curso/modulo/${moduleIndex}/${
                        module.lessons.findIndex((_, i) => !isLessonCompleted(moduleIndex, i))
                      }`}
                    >
                      <Button variant="outline" size="sm" className="rounded-lg">
                        {completed > 0 ? "Continuar" : "Iniciar"}
                      </Button>
                    </Link>
                  )}
                  
                  {isComplete && (
                    <Link href={`/curso/modulo/${moduleIndex}/0`}>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        Revisar
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Lessons (expanded if unlocked and in progress) */}
                {unlocked && completed > 0 && !isComplete && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = isLessonCompleted(moduleIndex, lessonIndex);
                        return (
                          <Link
                            key={lesson.id}
                            href={`/curso/modulo/${moduleIndex}/${lessonIndex}`}
                            className={`
                              text-xs px-3 py-1.5 rounded-full transition-colors
                              ${isCompleted 
                                ? "bg-green-100 text-green-700" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }
                            `}
                          >
                            {isCompleted && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                            {lesson.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Coach Button */}
      <CoachButton />
    </div>
  );
}
