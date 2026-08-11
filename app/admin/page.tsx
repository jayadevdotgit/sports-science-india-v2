"use client";

import { useEffect, useState } from "react";
import { LogOut, Download, Loader2, Lock, User, FileSpreadsheet } from "lucide-react";

type AuthState = "checking" | "authed" | "guest";

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (active) setAuthState(res.ok ? "authed" : "guest");
      } catch {
        if (active) setAuthState("guest");
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Invalid username or password.");
        setBusy(false);
        return;
      }
      setAuthState("authed");
      setUsername("");
      setPassword("");
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthState("guest");
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch("/api/bookings/export");
      if (res.status === 401) {
        setAuthState("guest");
        return;
      }
      if (!res.ok) {
        alert("Failed to generate Excel export.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = res.headers
        .get("Content-Disposition")
        ?.match(/filename="(.+)"/)?.[1] || "ssi-bookings.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  if (authState === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <Loader2 size={24} className="animate-spin text-orange-500" />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] p-6 text-white">
      {authState === "guest" ? (
        <div className="w-full max-w-sm rounded-3xl border border-orange-500/20 bg-[#0c0c0e] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/40 bg-orange-500/10 text-orange-400">
            <Lock size={24} />
          </div>
          <h1 className="mt-5 text-center text-xl font-bold">Admin Login</h1>
          <p className="mt-1 text-center text-xs text-gray-400">
            Sign in to download booking data.
          </p>

          {error && (
            <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-300">
                <User size={12} className="text-orange-400" /> Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="SSIAdmin"
                autoComplete="username"
                className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] p-3 text-sm text-white outline-none transition focus:border-orange-500"
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-300">
                <Lock size={12} className="text-orange-400" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] p-3 text-sm text-white outline-none transition focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 p-3 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:opacity-50"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              Sign In
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md rounded-3xl border border-orange-500/20 bg-[#0c0c0e] p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/40 bg-orange-500/10 text-orange-400">
            <FileSpreadsheet size={24} />
          </div>
          <h1 className="mt-5 text-xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-xs text-gray-400">
            Download all booking data as an Excel file.
          </p>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 p-3.5 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            Download Bookings (.xlsx)
          </button>

          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-800 p-3 text-sm font-semibold text-gray-300 transition hover:border-gray-600 hover:text-white"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}
    </main>
  );
}
