import NextAuth from "next-auth";

// A database-free Auth.js instance: the proxy only needs to read the JWT session
// cookie. Importing "@/auth" here would bundle Prisma into the proxy a second time.
const { auth } = NextAuth({
  providers: [],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
