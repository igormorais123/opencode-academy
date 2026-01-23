import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST/Update OS preference
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { os } = body;

    if (!os || !["windows", "mac"].includes(os)) {
      return NextResponse.json({ error: "Invalid OS" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { preferredOs: os },
    });

    return NextResponse.json({ success: true, os: user.preferredOs });
  } catch (error) {
    console.error("Error saving OS preference:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
