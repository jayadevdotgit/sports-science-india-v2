"use client";

import { useEffect, useState } from "react";
import { LogOut, Download, Loader2, Lock, User, FileSpreadsheet, CalendarClock, Save, Users, Check, X, RefreshCw } from "lucide-react";
import { DOCTORS, TIME_SLOTS, defaultDoctorConfigs, type DoctorConfig } from "@/lib/booking-config";
import Navbar from "@/components/layout/Navbar";

type AuthState = "checking" | "authed" | "guest";
type Tab = "bookings" | "manage" | "staff";
type StaffPerson = { email: string; name: string; role: string; quota: number; joiningDate?: string; active?: boolean };
type StaffLeave = { id: string; email: string; type: string; start: string; end: string; days: number; reason: string; status: string; reviewed_by?: string };
type StaffData = { people: StaffPerson[]; leave: StaffLeave[]; attendance: Array<{ id: string; email: string; day: string; check_in: string; check_out?: string | null }>; today: string };

const SLOT_OPTIONS = TIME_SLOTS.flatMap((g) => g.slots);

// "HH:MM AM/PM" -> minutes; NaN when unparseable.
function slotToMinutes(slot: string): number {
  const match = slot?.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return NaN;
  let h = Number(match[1]);
  const m = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && h !== 12) h += 12;
  if (meridiem === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

// Ensure every doctor has valid slot values; fall back to per-doctor defaults otherwise.
function sanitizeConfig(config: DoctorConfig[]): DoctorConfig[] {
  const defaults = defaultDoctorConfigs();
  return config.map((doc) => {
    const base = defaults.find((d) => d.name === doc.name);
    let start = doc.start;
    let end = doc.end;
    const sMin = slotToMinutes(start);
    const eMin = slotToMinutes(end);
    if (Number.isNaN(sMin) || Number.isNaN(eMin) || eMin <= sMin) {
      start = base?.start ?? "10:00 AM";
      end = base?.end ?? "08:00 PM";
    }
    return {
      name: doc.name,
      available: doc.available !== false,
      start: start || "10:00 AM",
      end: end || "08:00 PM",
    };
  });
}

// Reorder config to match the canonical DOCTORS sequence.
function sortConfig(config: DoctorConfig[]): DoctorConfig[] {
  const order = new Map(DOCTORS.map((d, i) => [d.name, i]));
  return [...config].sort(
    (a, b) => (order.get(a.name) ?? 999) - (order.get(b.name) ?? 999)
  );
}

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [tab, setTab] = useState<Tab>("bookings");
  const [config, setConfig] = useState<DoctorConfig[]>([]);
  const [configLoading, setConfigLoading] = useState(false);
  const [configSaving, setConfigSaving] = useState(false);
  const [configMessage, setConfigMessage] = useState("");
  const [staffData, setStaffData] = useState<StaffData | null>(null);
  const [staffLoading, setStaffLoading] = useState(false);
  const [staffMessage, setStaffMessage] = useState("");

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

  // Load config whenever the Manage tab is opened while authed
  useEffect(() => {
    if (authState === "authed" && tab === "manage") {
      let active = true;
      fetch("/api/admin/config")
        .then((r) => r.json())
        .then((data) => {
          if (!active) return;
          if (Array.isArray(data?.config) && data.config.length > 0) {
            setConfig(sortConfig(sanitizeConfig(data.config)));
          } else {
            setConfig(defaultDoctorConfigs());
          }
        })
        .catch(() => {
          if (active) setConfig(defaultDoctorConfigs());
        })
        .finally(() => {
          if (active) setConfigLoading(false);
        });
      return () => {
        active = false;
      };
    }
  }, [authState, tab]);

  useEffect(() => {
    if (authState !== "authed" || tab !== "staff") return;
    let active = true;
    setStaffLoading(true);
    setStaffMessage("");
    fetch("/api/admin/staff", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Unable to load staff records.");
        if (active) setStaffData(data as StaffData);
      })
      .catch((error: unknown) => {
        if (active) setStaffMessage(error instanceof Error ? error.message : "Unable to load staff records.");
      })
      .finally(() => { if (active) setStaffLoading(false); });
    return () => { active = false; };
  }, [authState, tab]);

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

  function updateDoctor(name: string, patch: Partial<DoctorConfig>) {
    setConfig((prev) => prev.map((d) => (d.name === name ? { ...d, ...patch } : d)));
  }

  async function handleSaveConfig() {
    setConfigSaving(true);
    setConfigMessage("");
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      if (!res.ok) {
        setConfigMessage("Failed to save. Please try again.");
        return;
      }
      setConfigMessage("Saved successfully.");
    } catch {
      setConfigMessage("Failed to save. Please try again.");
    } finally {
      setConfigSaving(false);
    }
  }

  async function handleStaffDecision(id: string, status: "Approved" | "Rejected") {
    setStaffMessage("");
    try {
      const response = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "decision", id, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to update request.");
      setStaffData((previous) => previous ? { ...previous, leave: previous.leave.map((item) => item.id === id ? { ...item, status } : item) } : previous);
    } catch (error: unknown) {
      setStaffMessage(error instanceof Error ? error.message : "Unable to update request.");
    }
  }

  if (authState === "checking") {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-[#050505] pt-32 text-white">
          <Loader2 size={24} className="animate-spin text-orange-500" />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-[#050505] p-6 pt-32 text-white">
      {authState === "guest" ? (
        <div className="w-full max-w-sm rounded-3xl border border-orange-500/20 bg-[#0c0c0e] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/40 bg-orange-500/10 text-orange-400">
            <Lock size={24} />
          </div>
          <h1 className="mt-5 text-center text-xl font-bold">Admin Login</h1>
          <p className="mt-1 text-center text-xs text-gray-400">
            Sign in to manage bookings, doctor availability, staff attendance, and leave approvals.
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
          <a href="/staff/login" className="mt-5 flex items-center justify-center rounded-xl border border-gray-800 p-3 text-xs font-semibold text-gray-300 transition hover:border-orange-500/50 hover:text-white">
            Staff sign-in / leave requests
          </a>
        </div>
      ) : (
        <div className="w-full max-w-3xl rounded-3xl border border-orange-500/20 bg-[#0c0c0e] p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-500/40 bg-orange-500/10 text-orange-400">
                <FileSpreadsheet size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1><a href="/staff" className="text-sm text-orange-400 underline">Staff attendance &amp; leave approvals</a>
                <p className="text-xs text-gray-400">Bookings & doctor availability.</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-gray-800 p-2.5 text-xs font-semibold text-gray-300 transition hover:border-gray-600 hover:text-white"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-2 border-b border-gray-800">
            <button
              onClick={() => setTab("bookings")}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-semibold transition ${
                tab === "bookings"
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Download size={14} /> Bookings
            </button>
            <button
              onClick={() => {
                setTab("manage");
                setConfigLoading(true);
                setConfigMessage("");
              }}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-semibold transition ${
                tab === "manage"
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <CalendarClock size={14} /> Manage Booking
            </button>
            <button
              onClick={() => setTab("staff")}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-semibold transition ${
                tab === "staff" ? "border-orange-500 text-orange-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Users size={14} /> Staff &amp; Leave
            </button>
          </div>

          {tab === "bookings" && (
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Download all booking data as an Excel file.
              </p>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 p-3.5 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:opacity-50"
              >
                {downloading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                Download Bookings (.xlsx)
              </button>
            </div>
          )}

          {tab === "manage" && (
            <div className="mt-6">
              {configLoading ? (
                <div className="flex items-center justify-center py-10 text-gray-400">
                  <Loader2 size={20} className="mr-2 animate-spin" /> Loading availability...
                </div>
              ) : (
                <>
                  <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-white">Doctor Availability & Timings</h2>
                      <p className="text-[11px] text-gray-500">
                        Toggle availability and set each doctor&apos;s daily working hours.
                      </p>
                    </div>
                    {configMessage && (
                      <span className={`text-[11px] font-semibold ${configMessage.includes("Failed") ? "text-red-400" : "text-green-400"}`}>
                        {configMessage}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    {config.map((doc) => (
                      <div
                        key={doc.name}
                        className="rounded-2xl border border-gray-800 bg-[#0e0e12] p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <button
                              role="switch"
                              aria-checked={doc.available}
                              onClick={() => updateDoctor(doc.name, { available: !doc.available })}
                              className={`relative h-6 w-11 rounded-full transition ${
                                doc.available ? "bg-orange-500" : "bg-gray-700"
                              }`}
                            >
                              <span
                                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                                  doc.available ? "left-[22px]" : "left-0.5"
                                }`}
                              />
                            </button>
                            <div>
                              <p className="text-sm font-bold text-white">{doc.name}</p>
                              <p className={`text-[11px] ${doc.available ? "text-green-400" : "text-red-400"}`}>
                                {doc.available ? "Available for booking" : "Unavailable (hidden from booking)"}
                              </p>
                            </div>
                          </div>
                          <div className="hidden text-right text-[11px] text-gray-500 sm:block">
                            {DOCTORS.find((d) => d.name === doc.name)?.services.length ?? 0} services
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                              Start Time
                            </span>
                            <select
                              value={doc.start}
                              onChange={(e) => updateDoctor(doc.name, { start: e.target.value })}
                              disabled={!doc.available}
                              className="w-full rounded-lg border border-gray-800 bg-[#14141a] px-2 py-1.5 text-xs text-white outline-none transition focus:border-orange-500 disabled:opacity-40"
                            >
                              {SLOT_OPTIONS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </label>
                          <label className="block">
                            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                              End Time
                            </span>
                            <select
                              value={doc.end}
                              onChange={(e) => updateDoctor(doc.name, { end: e.target.value })}
                              disabled={!doc.available}
                              className="w-full rounded-lg border border-gray-800 bg-[#14141a] px-2 py-1.5 text-xs text-white outline-none transition focus:border-orange-500 disabled:opacity-40"
                            >
                              {SLOT_OPTIONS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSaveConfig}
                    disabled={configSaving}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 p-3 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:opacity-50"
                  >
                    {configSaving ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    Save Availability
                  </button>
                </>
              )}
            </div>
          )}

          {tab === "staff" && (
            <div className="mt-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white">Staff attendance &amp; leave approvals</h2>
                  <p className="text-[11px] text-gray-500">Sundays are excluded from leave deductions. Saturdays count.</p>
                </div>
                <button onClick={() => { setTab("bookings"); window.setTimeout(() => setTab("staff"), 0); }} className="flex items-center justify-center gap-2 rounded-xl border border-gray-800 px-3 py-2 text-xs text-gray-300 hover:border-gray-600">
                  <RefreshCw size={13} /> Refresh
                </button>
              </div>
              {staffMessage && <p className="mb-4 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-xs text-orange-200">{staffMessage}</p>}
              {staffLoading ? <div className="flex items-center justify-center py-10 text-gray-400"><Loader2 size={20} className="mr-2 animate-spin" /> Loading staff records...</div> : staffData ? <>
                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-800 bg-[#0e0e12] p-4"><p className="text-[11px] text-gray-500">Staff members</p><p className="mt-2 text-2xl font-bold">{staffData.people.filter(p=>p.active!==false && p.role!=='admin' && p.email!=='sportsscienceindia.office@gmail.com').length}</p></div>
                  <div className="rounded-2xl border border-gray-800 bg-[#0e0e12] p-4"><p className="text-[11px] text-gray-500">Pending approvals</p><p className="mt-2 text-2xl font-bold text-orange-300">{staffData.leave.filter((item) => item.status === "Pending").length}</p></div>
                  <div className="rounded-2xl border border-gray-800 bg-[#0e0e12] p-4"><p className="text-[11px] text-gray-500">Today&apos;s check-ins</p><p className="mt-2 text-2xl font-bold">{staffData.attendance.filter((item) => item.day === staffData.today && staffData.people.some(p=>p.email===item.email && p.active!==false && p.role!=='admin' && p.email!=='sportsscienceindia.office@gmail.com')).length}</p></div>
                </div>
                <div className="mb-5 overflow-hidden rounded-2xl border border-gray-800">
                  <div className="border-b border-gray-800 px-4 py-3"><h3 className="text-sm font-bold">Requests needing review</h3></div>
                  {staffData.leave.filter((item) => item.status === "Pending").length === 0 ? <p className="px-4 py-8 text-center text-xs text-gray-500">No pending leave requests.</p> : <div className="divide-y divide-gray-800">{staffData.leave.filter((item) => item.status === "Pending").map((item) => { const person = staffData.people.find((candidate) => candidate.email === item.email); return <div key={item.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold">{person?.name || item.email}</p><p className="mt-1 text-xs text-gray-400">{item.type} · {item.start} to {item.end} · {item.days} {item.days === 1 ? "day" : "days"}</p><p className="mt-1 text-xs text-gray-500">{item.reason}</p></div><div className="flex gap-2"><button onClick={() => handleStaffDecision(item.id, "Approved")} className="flex items-center gap-1 rounded-lg bg-green-600/20 px-3 py-2 text-xs font-semibold text-green-300 hover:bg-green-600/30"><Check size={14} /> Approve</button><button onClick={() => handleStaffDecision(item.id, "Rejected")} className="flex items-center gap-1 rounded-lg bg-red-600/20 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-600/30"><X size={14} /> Reject</button></div></div>})}</div>}
                </div>
                <div className="overflow-hidden rounded-2xl border border-gray-800"><div className="border-b border-gray-800 px-4 py-3"><h3 className="text-sm font-bold">Staff eligibility</h3><a href="/admin/staff" className="text-sm text-orange-400">Manage employees, attendance &amp; leave →</a></div><div className="divide-y divide-gray-800">{staffData.people.filter(p=>p.active!==false && p.role!=='admin' && p.email!=='sportsscienceindia.office@gmail.com').map((person) => <div key={person.email} className="flex items-center justify-between px-4 py-3"><div><p className="text-sm font-semibold">{person.name}</p><p className="text-xs text-gray-500">{person.email}</p></div><span className="text-sm text-orange-200">Joined: {person.joiningDate || "Not set"}</span></div>)}</div></div>
              </> : <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 px-4 py-6 text-center"><Users className="mx-auto mb-3 text-orange-400" size={28} /><p className="text-sm font-semibold text-orange-100">Staff approvals are ready to connect.</p><p className="mx-auto mt-2 max-w-md text-xs leading-5 text-gray-400">Install the staff portal Apps Script file and enable the staff backend in Vercel. Then this tab will show requests here with Approve and Reject buttons.</p><a href="/staff" className="mt-4 inline-block text-xs font-semibold text-orange-300 underline">Open staff portal</a></div>}
            </div>
          )}
        </div>
      )}
    </main>
    </>
  );
}
