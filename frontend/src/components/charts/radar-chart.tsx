export interface RadarSeries {
  label: string;
  color: string;
  values: number[]; // 0–100
}

export function RadarChart({
  axes,
  series,
  size = 300,
  ariaLabel,
}: {
  axes: string[];
  series: RadarSeries[];
  size?: number;
  ariaLabel: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 48;
  const angle = (i: number) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const pt = (i: number, v: number) => [
    cx + Math.cos(angle(i)) * r * (v / 100),
    cy + Math.sin(angle(i)) * r * (v / 100),
  ];
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto block w-full max-w-[340px] text-on-surface-variant"
      role="img"
      aria-label={ariaLabel}
    >
      {[25, 50, 75, 100].map((ring) => (
        <polygon
          key={ring}
          points={axes.map((_, i) => pt(i, ring).join(",")).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeOpacity={ring === 100 ? 0.22 : 0.1}
          strokeDasharray={ring === 100 ? undefined : "3 3"}
        />
      ))}
      {axes.map((a, i) => {
        const [x, y] = pt(i, 100);
        const [lx, ly] = pt(i, 122);
        const anchor =
          Math.abs(lx - cx) < 8 ? "middle" : lx > cx ? "start" : "end";
        return (
          <g key={a}>
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.1}
            />
            <text
              x={lx}
              y={ly + 4}
              fontSize="10.5"
              textAnchor={anchor}
              fill="currentColor"
            >
              {a}
            </text>
          </g>
        );
      })}
      {series.map((s) => (
        <g key={s.label}>
          <polygon
            points={s.values.map((v, i) => pt(i, v).join(",")).join(" ")}
            fill={s.color}
            fillOpacity={0.12}
            stroke={s.color}
            strokeWidth={1.75}
            strokeLinejoin="round"
          />
          {s.values.map((v, i) => {
            const [x, y] = pt(i, v);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={2.6}
                fill="#fff"
                stroke={s.color}
                strokeWidth={1.5}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}
