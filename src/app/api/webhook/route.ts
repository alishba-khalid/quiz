import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";
import { db } from "@/lib/db";

// The subset of Polar's order/subscription payload this handler reads.
type WebhookData = {
  id?: string;
  subscriptionId?: string;
  customerId?: string;
  metadata?: { userId?: string };
  customer?: { id?: string; externalId?: string; email?: string };
};

export async function POST(req: NextRequest) {
  let event: Awaited<ReturnType<typeof polar.validateWebhook>>;
  try {
    event = await polar.validateWebhook({ request: req });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Polar webhook validation failed:", message);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  const payload = event as unknown as { type?: string; data?: WebhookData };
  const data: WebhookData = payload.data ?? (event as unknown as WebhookData);

  try {
    const eventType = payload.type;

    if (eventType === "subscription.active" || eventType === "order.paid") {
      const userId = data.metadata?.userId || data.customer?.externalId;
      const polarCustomerId = data.customerId || data.customer?.id;
      // On order.paid, data.id is the order id — the subscription id lives in subscriptionId.
      const polarSubscriptionId =
        eventType === "order.paid" ? data.subscriptionId : data.id;

      if (userId) {
        await db.user.update({
          where: { id: userId },
          data: { plan: "PRO", polarCustomerId, polarSubscriptionId },
        });
      } else if (data.customer?.email) {
        await db.user.updateMany({
          where: { email: data.customer.email },
          data: { plan: "PRO", polarCustomerId, polarSubscriptionId },
        });
      }
    }

    // subscription.canceled only means "won't renew" — the user keeps Pro until the
    // paid period ends, at which point Polar sends subscription.revoked.
    if (eventType === "subscription.revoked") {
      const polarSubscriptionId = data.id;
      if (polarSubscriptionId) {
        await db.user.updateMany({
          where: { polarSubscriptionId },
          data: { plan: "FREE", polarSubscriptionId: null },
        });
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new NextResponse("Webhook processing error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
