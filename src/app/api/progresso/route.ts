import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET progress for current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const progress = await prisma.progress.findFirst({
      where: { user: { email: session.user.email } },
    });

    if (!progress) {
      return NextResponse.json({
        completedLessons: [],
        completedSteps: [],
        currentModule: 0,
        currentLesson: 0,
        totalTimeMinutes: 0,
      });
    }

    return NextResponse.json({
      completedLessons: JSON.parse(progress.completedLessons || "[]"),
      completedSteps: JSON.parse(progress.completedSteps || "[]"),
      currentModule: progress.currentModule,
      currentLesson: progress.currentLesson,
      totalTimeMinutes: progress.totalTimeMinutes,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST/Update progress
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { completedLessons, completedSteps, currentModule, currentLesson, totalTimeMinutes } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const progress = await prisma.progress.upsert({
      where: { userId: user.id },
      update: {
        completedLessons: JSON.stringify(completedLessons || []),
        completedSteps: JSON.stringify(completedSteps || []),
        currentModule: currentModule || 0,
        currentLesson: currentLesson || 0,
        totalTimeMinutes: totalTimeMinutes || 0,
        lastActivityAt: new Date(),
      },
      create: {
        userId: user.id,
        completedLessons: JSON.stringify(completedLessons || []),
        completedSteps: JSON.stringify(completedSteps || []),
        currentModule: currentModule || 0,
        currentLesson: currentLesson || 0,
        totalTimeMinutes: totalTimeMinutes || 0,
      },
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
