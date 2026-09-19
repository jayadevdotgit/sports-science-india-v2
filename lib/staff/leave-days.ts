/** Inclusive calendar dates, excluding Sundays. UTC prevents timezone/DST drift. */
export function countLeaveDays(start: string, end: string): number {
  const valid = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  if (!valid(start) || !valid(end) || end < start) return 0;
  const first = new Date(start + 'T00:00:00Z');
  const total = Math.round((Date.parse(end) - first.getTime()) / 86400000) + 1;
  const firstSunday = (7 - first.getUTCDay()) % 7;
  const sundays = firstSunday < total ? Math.floor((total - 1 - firstSunday) / 7) + 1 : 0;
  return total - sundays;
}
