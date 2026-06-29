import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  let event: Awaited<ReturnType<typeof polar.validateWebhook>>;
  try {
    event = await polar.validateWebhook({ request: req });
  } catch (error: any) {
    console.error("Polar webhook validation failed:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const data = (event as any).data ?? event;

  try {
    const eventType = (event as any).type as string | undefined;

    if (eventType === "subscription.active" || eventType === "order.paid") {
      const userId = data.metadata?.userId || data.customer?.externalId;
      const polarCustomerId = data.customerId || data.customer?.id;
      const polarSubscriptionId = data.id || data.subscriptionId;

      if (userId) {
        await db.user.update({
          where: { id: userId },
          data: { plan: "PRO", polarCustomerId, polarSubscriptionId },
        });
      } else if (data.customer?.email) {
        await db.user.update({
          where: { email: data.customer.email },
          data: { plan: "PRO", polarCustomerId, polarSubscriptionId },
        });
      }
    }

    if (eventType === "subscription.revoked" || eventType === "subscription.canceled") {
      const polarSubscriptionId = data.id;
      if (polarSubscriptionId) {
        await db.user.updateMany({
          where: { polarSubscriptionId },
          data: { plan: "FREE", polarSubscriptionId: null },
        });
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return new NextResponse("Webhook processing error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
