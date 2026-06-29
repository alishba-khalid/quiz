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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const checkout = await polar.checkouts.create({
      products: [process.env.POLAR_PRODUCT_ID || ""],
      customerEmail: user.email!,
      externalCustomerId: user.id,
      successUrl: `${req.nextUrl.origin}/dashboard?success=true`,
      metadata: { userId: user.id },
    });

    return NextResponse.json({ url: checkout.url });
  } catch (error: any) {
    console.error("Polar checkout error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
