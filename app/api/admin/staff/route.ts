import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { staffBackend, StaffError, STAFF_ADMIN_EMAIL } from "@/lib/staff/backend";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Administrator sign-in required." }, { status: 401 });
}

async function isAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  try {
    const data = await staffBackend({ operation: "read", actor: STAFF_ADMIN_EMAIL });
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const status = error instanceof StaffError ? error.status : 503;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Staff records are unavailable." }, { status });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized();
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  try {
    const payload = await request.json();
    if (!payload || !["decision", "staff"].includes(payload.action)) {
      return NextResponse.json({ error: "Unsupported staff admin action." }, { status: 400 });
    }
    const data = await staffBackend({ ...payload, operation: payload.action, actor: STAFF_ADMIN_EMAIL });
    return NextResponse.json(data);
  } catch (error) {
    const status = error instanceof StaffError ? error.status : 503;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Staff records are unavailable." }, { status });
  }
}
