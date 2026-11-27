const nf = new Intl.NumberFormat("en-US");

export function fmt(v: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(v);
}

export function fmtInt(v: number) {
  return nf.format(Math.round(v));
}

/** Compact large numbers: 42,000 → 42k, 1.2M. */
export function fmtCompact(v: number) {
  if (Math.abs(v) >= 1_000_000) return `${fmt(v / 1_000_000, 1)}M`;
  if (Math.abs(v) >= 10_000) return `${fmt(v / 1000, 0)}k`;
  if (Math.abs(v) >= 1000) return `${fmt(v / 1000, 1)}k`;
  return fmt(v, v < 10 && v % 1 ? 1 : 0);
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
