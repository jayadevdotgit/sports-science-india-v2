import { ChevronDown, FileText, ShieldCheck } from 'lucide-react';

export default function HRPolicy() {
  return (
    <details className="group mt-7 overflow-hidden rounded-2xl border border-orange-500/20 bg-[#101011] text-left">
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 outline-none transition hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400 [&::-webkit-details-marker]:hidden">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400"><FileText size={19} aria-hidden="true" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-white">HR Policy &amp; Employment Terms</span>
          <span className="mt-1 block text-xs leading-5 text-white/50">Probation, notice period &amp; early release</span>
        </span>
        <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-orange-400 transition-transform group-open:rotate-180" />
      </summary>

      <div className="border-t border-white/10 p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400">Sports Science India · Staff guidelines</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ['6 months', 'Probation'],
            ['1 month', 'Notice during probation'],
            ['3 months', 'Notice after probation'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3">
              <strong className="block text-sm font-semibold text-orange-300">{value}</strong>
              <span className="mt-1 block text-[10px] leading-4 text-white/55">{label}</span>
            </div>
          ))}
        </div>

        <ol className="mt-5 space-y-5 text-xs leading-6 text-white/65">
          <li><h3 className="mb-1 text-sm font-semibold text-white">01 · Probation period</h3><p>The first six months from the employee’s joining date constitute the probation period.</p></li>
          <li><h3 className="mb-1 text-sm font-semibold text-white">02 · Resignation during probation</h3><p>Employees resigning before completing six months of service must provide one month’s written notice and serve the notice period, unless an earlier release is approved in writing by management.</p></li>
          <li><h3 className="mb-1 text-sm font-semibold text-white">03 · Resignation after probation</h3><p>After completion of the six-month probation period, employees must provide three months’ written notice before leaving their employment.</p></li>
          <li><h3 className="mb-1 text-sm font-semibold text-white">04 · Early release</h3><p>An employee may request a shorter notice period. Early release is subject to management’s written approval, including confirmation of the agreed last working day and any applicable settlement terms.</p></li>
          <li><h3 className="mb-1 text-sm font-semibold text-white">05 · Unserved notice &amp; final settlement</h3><p>If an employee does not serve the required one-month notice during probation and has no approved early release, any notice-pay recovery or adjustment must follow the appointment terms and applicable law. Earned salary and statutory dues will be settled within applicable legal timelines; they will not be automatically forfeited.</p></li>
        </ol>

        <div className="mt-5 flex items-start gap-2 rounded-xl bg-orange-500/[0.07] p-3 text-[11px] leading-5 text-orange-100/75">
          <ShieldCheck size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-400" />
          <p>Read these guidelines together with your appointment letter and applicable law. Contact the SSI office administrator for clarification or an early-release request. Leave eligibility is governed separately by the leave policy.</p>
        </div>
      </div>
    </details>
  );
}
