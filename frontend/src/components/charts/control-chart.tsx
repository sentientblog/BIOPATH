import { useState } from "react";
import { useWidth } from "./use-width";
import { ChartTooltip } from "./chart-tooltip";
import { fmt } from "@/lib/format";

export interface ControlPoint {
  id: string;
  label: string;
  value: number;
}

/** Individuals control chart: points with mean and ±2σ limits. */
export function ControlChart({
  points,
  mean,
  sd,
  unit,
  height = 240,
  ariaLabel,
  onSelect,
  selectedId,
}: {
  points: ControlPoint[];
  mean: number;
  sd: number;
  unit: string;
  height?: number;
  ariaLabel: string;
  onSelect?: (id: string) => void;
  selectedId?: string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const pad = { top: 16, right: 52, bottom: 28, left: 44 };
  const ucl = mean + 2 * sd;
  const lcl = mean - 2 * sd;
  const vals = points.map((p) => p.value);
  const lo = Math.min(lcl - sd * 0.6, ...vals);
  const hi = Math.max(ucl + sd * 0.6, ...vals);
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const x = (i: number) =>
    pad.left +
    (points.length <= 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number) => pad.top + innerH - ((v - lo) / (hi - lo)) * innerH;
  const path = points
    .map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.value)}`)
    .join(" ");
  const ticks = [lo, (lo + mean) / 2, mean, (mean + hi) / 2, hi];
  const every = Math.ceil(points.length / Math.max(2, Math.floor(innerW / 70)));

  return (
    <div ref={ref} className="relative w-full">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={ariaLabel}
        className="block text-on-surface-variant"
      >
        <rect
          x={pad.left}
          y={y(ucl)}
          width={innerW}
          height={y(lcl) - y(ucl)}
          fill="var(--sage)"
          opacity={0.7}
        />
        {ticks.map((t, i) => (
          <text
            key={i}
            x={pad.left - 8}
            y={y(t) + 4}
            fontSize="11"
            textAnchor="end"
            fill="currentColor"
            className="tnum"
          >
            {fmt(t, 1)}
          </text>
        ))}
        {[
          { v: ucl, l: "+2σ" },
          { v: mean, l: "Mean" },
          { v: lcl, l: "−2σ" },
        ].map((ln) => (
          <g key={ln.l}>
            <line
              x1={pad.left}
              x2={pad.left + innerW}
              y1={y(ln.v)}
              y2={y(ln.v)}
              stroke={ln.l === "Mean" ? "var(--brand)" : "var(--outline)"}
              strokeDasharray={ln.l === "Mean" ? undefined : "4 3"}
              strokeOpacity={0.8}
            />
            <text
              x={pad.left + innerW + 6}
              y={y(ln.v) + 4}
              fontSize="10.5"
              fill="currentColor"
            >
              {ln.l}
            </text>
          </g>
        ))}
        <path
          d={path}
          fill="none"
          stroke="var(--forest)"
          strokeWidth={1.5}
          strokeOpacity={0.6}
        />
        {points.map((p, i) => {
          const out = p.value > ucl || p.value < lcl;
          const sel = selectedId === p.id;
          return (
            <g
              key={p.id}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect?.(p.id)}
              style={{ cursor: onSelect ? "pointer" : "default" }}
            >
              <circle cx={x(i)} cy={y(p.value)} r={10} fill="transparent" />
              <circle
                cx={x(i)}
                cy={y(p.value)}
                r={sel ? 5.5 : out ? 4.5 : 3.5}
                fill={out ? "var(--risk)" : sel ? "var(--brand)" : "#fff"}
                stroke={out ? "var(--risk)" : "var(--brand)"}
                strokeWidth={1.75}
              />
            </g>
          );
        })}
        {points.map((p, i) =>
          i % every === 0 ? (
            <text
              key={p.id}
              x={x(i)}
              y={height - 8}
              fontSize="10.5"
              textAnchor="middle"
              fill="currentColor"
            >
              {p.label}
            </text>
          ) : null,
        )}
      </svg>
      {hover !== null && points[hover] && (
        <ChartTooltip
          x={x(hover)}
          y={y(points[hover].value) - 20}
          containerWidth={width}
        >
          <p className="font-semibold text-on-surface">{points[hover].id}</p>
          <p className="text-on-surface-variant">
            {points[hover].label} ·{" "}
            <span className="type-data text-on-surface">
              {fmt(points[hover].value, 2)}
            </span>{" "}
            {unit}
          </p>
          <p className="text-on-surface-variant">
            z ={" "}
            <span className="type-data">
              {fmt((points[hover].value - mean) / sd, 2)}
            </span>
          </p>
        </ChartTooltip>
      )}
    </div>
  );
}
