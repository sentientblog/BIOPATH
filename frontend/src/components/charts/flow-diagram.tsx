import { useMemo, useState } from "react";
import { useWidth } from "./use-width";
import { fmtCompact } from "@/lib/format";

export interface Flow {
  source: string;
  target: string;
  value: number;
}

const PALETTE = [
  "#25834b",
  "#3d6753",
  "#123d2c",
  "#6ccb72",
  "#a4d0b9",
  "#d99b35",
  "#6f7a6f",
  "#7fda98",
];

/** Two-column flow (Sankey-style) diagram: sources on the left, targets on the right. */
export function FlowDiagram({
  flows,
  sourceLabel,
  targetLabel,
  unit,
  ariaLabel,
}: {
  flows: Flow[];
  sourceLabel: string;
  targetLabel: string;
  unit: string;
  ariaLabel: string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  const compact = width < 520;
  const nodeW = 10;
  const labelW = compact ? 92 : 150;
  const gap = 10;
  const layout = useMemo(() => {
    const sources = [...new Set(flows.map((f) => f.source))];
    const targets = [...new Set(flows.map((f) => f.target))];
    const sTot = (n: string) =>
      flows.filter((f) => f.source === n).reduce((a, f) => a + f.value, 0);
    const tTot = (n: string) =>
      flows.filter((f) => f.target === n).reduce((a, f) => a + f.value, 0);
    sources.sort((a, b) => sTot(b) - sTot(a));
    targets.sort((a, b) => tTot(b) - tTot(a));
    const total = flows.reduce((a, f) => a + f.value, 0) || 1;
    const rows = Math.max(sources.length, targets.length);
    const height = Math.max(220, rows * 46);
    const avail = height - 24 - gap * (rows - 1);
    const scale = avail / total;
    const place = (names: string[], tot: (n: string) => number) => {
      let yy = 12;
      const extra =
        (height -
          24 -
          names.reduce((a, n) => a + tot(n) * scale, 0) -
          gap * (names.length - 1)) /
        2;
      yy += Math.max(0, extra);
      return Object.fromEntries(
        names.map((n) => {
          const h = Math.max(2, tot(n) * scale);
          const r = { y: yy, h, total: tot(n) };
          yy += h + gap;
          return [n, r];
        }),
      );
    };
    return {
      sources,
      targets,
      sPos: place(sources, sTot),
      tPos: place(targets, tTot),
      scale,
      height,
    };
  }, [flows]);

  const x0 = labelW;
  const x1 = width - labelW;
  const sOff: Record<string, number> = {};
  const tOff: Record<string, number> = {};
  const color = (s: string) =>
    PALETTE[layout.sources.indexOf(s) % PALETTE.length];

  if (!flows.length) return null;
  return (
    <div ref={ref} className="w-full">
      <div className="mb-2 flex justify-between text-xs text-muted-foreground">
        <span className="type-eyebrow">{sourceLabel}</span>
        <span className="type-eyebrow">{targetLabel}</span>
      </div>
      <svg
        width={width}
        height={layout.height}
        role="img"
        aria-label={ariaLabel}
        className="block"
      >
        {flows.map((f) => {
          const s = layout.sPos[f.source];
          const t = layout.tPos[f.target];
          const h = Math.max(1, f.value * layout.scale);
          const sy = s.y + (sOff[f.source] ?? 0);
          const ty = t.y + (tOff[f.target] ?? 0);
          sOff[f.source] = (sOff[f.source] ?? 0) + h;
          tOff[f.target] = (tOff[f.target] ?? 0) + h;
          const a = x0 + nodeW;
          const b = x1;
          const mid = (a + b) / 2;
          const d = `M${a},${sy} C${mid},${sy} ${mid},${ty} ${b},${ty} L${b},${ty + h} C${mid},${ty + h} ${mid},${sy + h} ${a},${sy + h} Z`;
          const dim = hover && hover !== f.source && hover !== f.target;
          return (
            <path
              key={`${f.source}-${f.target}`}
              d={d}
              fill={color(f.source)}
              fillOpacity={dim ? 0.08 : 0.32}
              className="transition-[fill-opacity] duration-200"
            >
              <title>{`${f.source} → ${f.target}: ${fmtCompact(f.value)} ${unit}`}</title>
            </path>
          );
        })}
        {layout.sources.map((n) => {
          const p = layout.sPos[n];
          return (
            <g
              key={n}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(null)}
              className="cursor-default"
            >
              <rect
                x={x0}
                y={p.y}
                width={nodeW}
                height={p.h}
                rx={2}
                fill={color(n)}
              />
              <text
                x={x0 - 8}
                y={p.y + p.h / 2 - 2}
                fontSize="11.5"
                textAnchor="end"
                fill="var(--on-surface)"
                fontWeight={500}
              >
                {compact && n.length > 13 ? `${n.slice(0, 12)}…` : n}
              </text>
              <text
                x={x0 - 8}
                y={p.y + p.h / 2 + 11}
                fontSize="10.5"
                textAnchor="end"
                fill="var(--on-surface-variant)"
                className="tnum"
              >
                {fmtCompact(p.total)} {unit}
              </text>
            </g>
          );
        })}
        {layout.targets.map((n) => {
          const p = layout.tPos[n];
          return (
            <g
              key={n}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(null)}
            >
              <rect
                x={x1}
                y={p.y}
                width={nodeW}
                height={p.h}
                rx={2}
                fill="var(--forest)"
              />
              <text
                x={x1 + nodeW + 8}
                y={p.y + p.h / 2 - 2}
                fontSize="11.5"
                fill="var(--on-surface)"
                fontWeight={500}
              >
                {compact && n.length > 13 ? `${n.slice(0, 12)}…` : n}
              </text>
              <text
                x={x1 + nodeW + 8}
                y={p.y + p.h / 2 + 11}
                fontSize="10.5"
                fill="var(--on-surface-variant)"
                className="tnum"
              >
                {fmtCompact(p.total)} {unit}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
