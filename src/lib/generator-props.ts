import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function getGeneratorProps() {
  const session = await auth();

  // Read the plan from the DB, not the session: the JWT only refreshes the plan
  // at sign-in, so a user who just upgraded would otherwise still look FREE.
  let isPro = false;
  if (session?.user?.email) {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { plan: true },
    });
    isPro = user?.plan === "PRO";
  }

  return {
    isLoggedIn: !!session,
    isPro,
  };
}
