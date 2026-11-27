import { cn } from "@/lib/utils";

/** BIOPATH AI mark: a branching pathway from one source node into three outputs. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="var(--forest)" />
      <path
        d="M9 16h5.5c2 0 3-1 4-3l1.2-2.2c.7-1.3 1.6-1.8 3-1.8H24M14.5 16H24M14.5 16c2 0 3 1 4 3l1.2 2.2c.7 1.3 1.6 1.8 3 1.8H24"
        fill="none"
        stroke="var(--leaf)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="8.5" cy="16" r="2.4" fill="#fff" />
      <circle cx="24" cy="9" r="1.8" fill="#fff" />
      <circle cx="24" cy="16" r="1.8" fill="#fff" />
      <circle cx="24" cy="23" r="1.8" fill="#fff" />
    </svg>
  );
}
