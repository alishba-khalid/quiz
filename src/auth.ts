import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // Link to an existing account with the same email. Only safe because the
            // signIn callback rejects unverified Google emails and linkAccount below
            // clears any password that was set without proving email ownership.
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [GitHub({ clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET })]
      : []),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user || !user.password) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email_verified === true;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }

      // Only hit DB on initial sign-in (user present) or explicit session update
      if (user || trigger === "update") {
        const email = (user?.email ?? token.email) as string | undefined;
        if (email) {
          const dbUser = await db.user.findUnique({
            where: { email },
            select: { id: true, plan: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.plan = dbUser.plan;
          }
        }
      }

      if (trigger === "update" && session) {
        token.plan = session.plan || token.plan;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).plan = (token.plan as string) || "FREE";
      }
      return session;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (account.provider !== "google" || !user.id) return;
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { password: true, emailVerified: true },
      });
      if (!dbUser) return;
      // Signup never verifies email, so a password on an unverified account may
      // have been set by someone else who registered this address first.
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: dbUser.emailVerified ?? new Date(),
          ...(dbUser.password && !dbUser.emailVerified ? { password: null } : {}),
        },
      });
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
