import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { polar } from "@/lib/polar";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user?.polarCustomerId) {
      return NextResponse.json({ error: "Polar customer not found" }, { status: 400 });
    }

    const customerSession = await polar.customerSessions.create({
      customerId: user.polarCustomerId,
    });

    return NextResponse.json({ url: customerSession.customerPortalUrl });
  } catch (error: any) {
    console.error("Billing portal error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
