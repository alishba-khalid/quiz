import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { checkSignupLimit, recordSignup, getClientIp } from "@/lib/rate-limiter";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!checkSignupLimit(ip)) {
      return NextResponse.json(
        { error: "Too many sign-up attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const rawEmail = body?.email;
    const password = body?.password;
    const rawName = body?.name;

    if (typeof rawEmail !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Store emails lowercased so "Bob@x.com" and "bob@x.com" can't become two accounts.
    const email = rawEmail.trim().toLowerCase();
    const name = typeof rawName === "string" ? rawName.trim().slice(0, 100) : null;

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (password.length < 8 || password.length > 200) {
      return NextResponse.json(
        { error: "Password must be between 8 and 200 characters" },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    recordSignup(ip);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
        plan: "FREE",
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
