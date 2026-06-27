import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const worksheet = await db.worksheet.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!worksheet) {
      return NextResponse.json({ error: "Worksheet not found" }, { status: 404 });
    }

    if (worksheet.user.email !== session.user.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const dbUser = await db.user.findUnique({
      where: { email: session.user.email },
      select: { plan: true },
    });

    const isPro = dbUser?.plan === "PRO";

    const responseContent = {
      ...worksheet,
      answerKey: isPro ? worksheet.answerKey : null,
    };

    return NextResponse.json(responseContent);
  } catch (error: any) {
    console.error("Fetch worksheet error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const worksheet = await db.worksheet.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!worksheet) {
      return NextResponse.json({ error: "Worksheet not found" }, { status: 404 });
    }

    if (worksheet.user.email !== session.user.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.worksheet.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Worksheet deleted successfully" });
  } catch (error: any) {
    console.error("Delete worksheet error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
