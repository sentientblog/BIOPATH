import { cn } from "@/lib/utils";

/** Material Symbols Outlined icon — the icon set used in the Stitch design. */
export function Icon({
  name,
  size = 20,
  filled = false,
  className,
  label,
}: {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
  /** When set, the icon is announced; otherwise it is decorative. */
  label?: string;
}) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={{
        fontSize: size,
        width: size,
        height: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size >= 24 ? 24 : 20}`,
      }}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {name}
    </span>
  );
}
