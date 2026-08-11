import { NextResponse } from "next/server";
import { createSessionToken, verifyCredentials, SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password || !verifyCredentials(String(username), String(password))) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, createSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to process login." }, { status: 500 });
  }
}
