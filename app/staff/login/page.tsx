'use client';

import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Kibo from '@/components/panda/Kibo';

export default function StaffLogin() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const background = '#050505';
    const previous = document.body.style.background;
    document.body.style.background = background;
    return () => {
      document.body.style.background = previous;
    };
  }, []);

  async function submit(mode: 'request' | 'verify') {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/staff/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode, email, code }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (mode === 'verify') { window.location.assign('/staff'); return; }
      setSent(true); setMessage(data.message);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to connect. Please try again.'); }
    finally { setBusy(false); }
  }

  return (
    <>
      <Navbar />
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40 h-32 bg-[#050505]" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{ background: '#050505' }} />
      <main className="relative z-10 !max-w-none !p-0 !pt-32 lg:!pt-28 max-lg:bg-[#050505]" style={{ minHeight: '100vh', background: 'transparent' }}>
      <div className="relative flex overflow-hidden bg-[#050505] text-white">

        <section className="relative hidden w-[48%] flex-col justify-between border-r border-white/10 px-14 py-12 lg:flex xl:px-24">
          <div aria-hidden="true" className="h-8" />
          <div className="max-w-xl pb-8">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-orange-400"><span className="h-px w-8 bg-orange-500" /> Staff workspace</div>
            <h1 className="max-w-lg text-5xl font-semibold leading-[1.08] tracking-[-0.04em] xl:text-6xl">The work behind every <span className="text-orange-400">stronger athlete.</span></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-white/55">Your secure workspace for attendance, time off, and keeping the SSI team moving together.</p>
            <div className="mt-10 grid max-w-md gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><ShieldCheck size={19} className="text-orange-400" /><p className="mt-3 text-sm font-medium text-white/85">Private by design</p><p className="mt-1 text-xs leading-5 text-white/45">Only registered SSI staff can enter.</p></div><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><CheckCircle2 size={19} className="text-orange-400" /><p className="mt-3 text-sm font-medium text-white/85">Simple daily flow</p><p className="mt-1 text-xs leading-5 text-white/45">Check in, request leave, stay clear.</p></div></div>
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/25">Sports Science India · Bhubaneswar</p>
        </section>

        <section className="relative flex w-full items-start justify-center px-6 pb-12 pt-10 max-lg:pt-24 sm:px-10 sm:py-10 lg:w-[52%] lg:items-center lg:px-16 lg:py-10">
          <div className="w-full max-w-[430px] max-lg:max-w-sm max-lg:rounded-3xl max-lg:border max-lg:border-orange-500/20 max-lg:bg-[#0c0c0e] max-lg:p-6 max-lg:shadow-[0_20px_80px_rgba(0,0,0,0.8)] sm:max-lg:p-8">
            <div className="mb-8 max-lg:text-center"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400 max-lg:mx-auto"><LockKeyhole size={22} /></div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-400">Staff portal</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">Welcome back.</h2><p className="mt-3 text-sm leading-6 text-white/45">Sign in with your registered work email to access your SSI workspace.</p></div>
            <form onSubmit={(event) => { event.preventDefault(); void submit(sent ? 'verify' : 'request'); }} className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-left shadow-2xl shadow-black/30 sm:p-7 max-lg:rounded-none max-lg:border-0 max-lg:bg-transparent max-lg:p-0 max-lg:shadow-none">
              <label className="block text-sm text-white/70">Work email<span className="relative mt-2 block"><Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30" /><input className="h-13 w-full rounded-xl border border-white/10 bg-black/25 pl-11 pr-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-orange-400/70 focus:ring-2 focus:ring-orange-400/10" type="email" autoComplete="email" placeholder="you@yourcompany.com" required maxLength={254} value={email} disabled={sent} onChange={(event) => setEmail(event.target.value)} /></span></label>
              {sent && <label className="block text-sm text-white/70">Six-digit code<input className="mt-2 h-13 w-full rounded-xl border border-white/10 bg-black/25 px-4 text-center text-2xl tracking-[0.45em] text-white outline-none transition placeholder:text-white/25 focus:border-orange-400/70 focus:ring-2 focus:ring-orange-400/10" autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6}" placeholder="000000" required maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} /></label>}
              <button className="flex h-13 w-full items-center justify-between rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50" disabled={busy}>{busy ? 'Please wait…' : sent ? 'Verify & sign in' : 'Send sign-in code'}<ArrowRight size={18} /></button>
              {sent && <button className="mx-auto flex text-xs text-white/45 underline-offset-4 transition hover:text-white hover:underline" type="button" disabled={busy} onClick={() => { setSent(false); setCode(''); setMessage(''); }}>Change email / request a new code</button>}
            </form>
            {message && <p role="status" className="mt-4 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm leading-6 text-orange-100/80">{message}</p>}
            <div className="mt-7 flex items-start gap-3 border-t border-white/10 pt-5 text-xs leading-5 text-white/35"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-orange-400/70" /><p>Leave approvals are handled by the SSI office administrator.</p></div>
            <a href="/" className="mt-7 inline-flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-white"><ArrowLeft size={14} /> Back to Sports Science India</a>
          </div>
        </section>
      </div>
      </main>
      <Kibo />
    </>
  );
}
