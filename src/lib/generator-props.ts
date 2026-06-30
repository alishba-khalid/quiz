import { auth } from "@/auth";
import { db } from "@/lib/db";

const FREE_LIMIT = 1;

export async function getGeneratorProps() {
  const session = await auth();
  const isPro = (session?.user as any)?.plan === "PRO";

  let usageCount = 0;
  if (session?.user?.email && !isPro) {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { usageCount: true },
    });
    usageCount = user?.usageCount ?? 0;
  }

  return {
    isLoggedIn: !!session,
    isPro,
    creditsLeft: isPro ? Infinity : Math.max(0, FREE_LIMIT - usageCount),
  };
}
