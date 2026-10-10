// Short-lived handoff from OTP verification to the workspace. Never persisted.
let pending: {data: Record<string, unknown>; expires: number} | null = null;

export function setWorkspaceBootstrap(data: unknown) {
  pending = null;
  if (!data || typeof data !== 'object') return;
  const value = data as Record<string, unknown>;
  if (!value.me || !Array.isArray(value.people) || !Array.isArray(value.attendance) || !Array.isArray(value.leave) || typeof value.today !== 'string') return;
  pending = {data: value, expires: Date.now() + 30_000};
}

export function takeWorkspaceBootstrap() {
  const value = pending;
  pending = null;
  return value && value.expires > Date.now() ? value.data : null;
}
