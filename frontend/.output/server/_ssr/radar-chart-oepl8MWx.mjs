import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/radar-chart-oepl8MWx.js
var import_jsx_runtime = require_jsx_runtime();
function RadarChart({ axes, series, size = 300, ariaLabel }) {
	const cx = size / 2;
	const cy = size / 2;
	const r = size / 2 - 48;
	const angle = (i) => Math.PI * 2 * i / axes.length - Math.PI / 2;
	const pt = (i, v) => [cx + Math.cos(angle(i)) * r * (v / 100), cy + Math.sin(angle(i)) * r * (v / 100)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${size} ${size}`,
		className: "mx-auto block w-full max-w-[340px] text-on-surface-variant",
		role: "img",
		"aria-label": ariaLabel,
		children: [
			[
				25,
				50,
				75,
				100
			].map((ring) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: axes.map((_, i) => pt(i, ring).join(",")).join(" "),
				fill: "none",
				stroke: "currentColor",
				strokeOpacity: ring === 100 ? .22 : .1,
				strokeDasharray: ring === 100 ? void 0 : "3 3"
			}, ring)),
			axes.map((a, i) => {
				const [x, y] = pt(i, 100);
				const [lx, ly] = pt(i, 122);
				const anchor = Math.abs(lx - cx) < 8 ? "middle" : lx > cx ? "start" : "end";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: cx,
					y1: cy,
					x2: x,
					y2: y,
					stroke: "currentColor",
					strokeOpacity: .1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: lx,
					y: ly + 4,
					fontSize: "10.5",
					textAnchor: anchor,
					fill: "currentColor",
					children: a
				})] }, a);
			}),
			series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: s.values.map((v, i) => pt(i, v).join(",")).join(" "),
				fill: s.color,
				fillOpacity: .12,
				stroke: s.color,
				strokeWidth: 1.75,
				strokeLinejoin: "round"
			}), s.values.map((v, i) => {
				const [x, y] = pt(i, v);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x,
					cy: y,
					r: 2.6,
					fill: "#fff",
					stroke: s.color,
					strokeWidth: 1.5
				}, i);
			})] }, s.label))
		]
	});
}
export { RadarChart };
