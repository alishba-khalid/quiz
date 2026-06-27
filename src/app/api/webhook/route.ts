import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature) {
    return new NextResponse("Missing Stripe Signature", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error: any) {
    console.error("Stripe webhook verification failed:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  try {
    if (event.type === "checkout.session.completed") {
      const subscriptionId = session.subscription;
      const customerId = session.customer;
      const userId = session.metadata?.userId;

      if (userId) {
        await db.user.update({
          where: { id: userId },
          data: {
            plan: "PRO",
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
          },
        });
      } else {
        const email = session.customer_details?.email;
        if (email) {
          await db.user.update({
            where: { email },
            data: {
              plan: "PRO",
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
            },
          });
        }
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      const subscriptionId = session.subscription;
      if (subscriptionId) {
        await db.user.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: { plan: "PRO" },
        });
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscriptionId = session.id;
      if (subscriptionId) {
        await db.user.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: {
            plan: "FREE",
            stripeSubscriptionId: null,
          },
        });
      }
    }

    return new NextResponse("Webhook handled successfully", { status: 200 });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
export const dynamic = "force-dynamic";
export const revalidate = 0;
