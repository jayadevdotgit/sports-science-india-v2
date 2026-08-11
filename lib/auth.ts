import { createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE = "ssi_admin_session";

function sign(data: string): string {
  return createHmac("sha256", process.env.ADMIN_SECRET || "ssi-admin-secret").update(data).digest("hex");
}

export function createSessionToken(): string {
  const payload = `${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || "";
  const expectedPass = process.env.ADMIN_PASSWORD || "";
  if (!expectedUser || !expectedPass) return false;
  const ua = Buffer.from(username);
  const ub = Buffer.from(expectedUser);
  const pa = Buffer.from(password);
  const pb = Buffer.from(expectedPass);
  if (ua.length !== ub.length || pa.length !== pb.length) return false;
  return timingSafeEqual(ua, ub) && timingSafeEqual(pa, pb);
}

export { SESSION_COOKIE };
