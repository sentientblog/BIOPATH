import { __toESM } from "../_runtime.mjs";
import { ChartTooltip, useWidth } from "./chart-tooltip-DR1YBCQa.mjs";
import { fmt } from "./router-ChhPpYzB.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/control-chart-Bev-hhq6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Individuals control chart: points with mean and ±2σ limits. */
function ControlChart({ points, mean, sd, unit, height = 240, ariaLabel, onSelect, selectedId }) {
	const [ref, width] = useWidth();
	const [hover, setHover] = (0, import_react.useState)(null);
	const pad = {
		top: 16,
		right: 52,
		bottom: 28,
		left: 44
	};
	const ucl = mean + 2 * sd;
	const lcl = mean - 2 * sd;
	const vals = points.map((p) => p.value);
	const lo = Math.min(lcl - sd * .6, ...vals);
	const hi = Math.max(ucl + sd * .6, ...vals);
	const innerW = width - pad.left - pad.right;
	const innerH = height - pad.top - pad.bottom;
	const x = (i) => pad.left + (points.length <= 1 ? innerW / 2 : i / (points.length - 1) * innerW);
	const y = (v) => pad.top + innerH - (v - lo) / (hi - lo) * innerH;
	const path = points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.value)}`).join(" ");
	const ticks = [
		lo,
		(lo + mean) / 2,
		mean,
		(mean + hi) / 2,
		hi
	];
	const every = Math.ceil(points.length / Math.max(2, Math.floor(innerW / 70)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width,
			height,
			role: "img",
			"aria-label": ariaLabel,
			className: "block text-on-surface-variant",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: pad.left,
					y: y(ucl),
					width: innerW,
					height: y(lcl) - y(ucl),
					fill: "var(--sage)",
					opacity: .7
				}),
				ticks.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: pad.left - 8,
					y: y(t) + 4,
					fontSize: "11",
					textAnchor: "end",
					fill: "currentColor",
					className: "tnum",
					children: fmt(t, 1)
				}, i)),
				[
					{
						v: ucl,
						l: "+2σ"
					},
					{
						v: mean,
						l: "Mean"
					},
					{
						v: lcl,
						l: "−2σ"
					}
				].map((ln) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: pad.left,
					x2: pad.left + innerW,
					y1: y(ln.v),
					y2: y(ln.v),
					stroke: ln.l === "Mean" ? "var(--brand)" : "var(--outline)",
					strokeDasharray: ln.l === "Mean" ? void 0 : "4 3",
					strokeOpacity: .8
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: pad.left + innerW + 6,
					y: y(ln.v) + 4,
					fontSize: "10.5",
					fill: "currentColor",
					children: ln.l
				})] }, ln.l)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: path,
					fill: "none",
					stroke: "var(--forest)",
					strokeWidth: 1.5,
					strokeOpacity: .6
				}),
				points.map((p, i) => {
					const out = p.value > ucl || p.value < lcl;
					const sel = selectedId === p.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						onMouseEnter: () => setHover(i),
						onMouseLeave: () => setHover(null),
						onClick: () => onSelect?.(p.id),
						style: { cursor: onSelect ? "pointer" : "default" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: x(i),
							cy: y(p.value),
							r: 10,
							fill: "transparent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: x(i),
							cy: y(p.value),
							r: sel ? 5.5 : out ? 4.5 : 3.5,
							fill: out ? "var(--risk)" : sel ? "var(--brand)" : "#fff",
							stroke: out ? "var(--risk)" : "var(--brand)",
							strokeWidth: 1.75
						})]
					}, p.id);
				}),
				points.map((p, i) => i % every === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: x(i),
					y: height - 8,
					fontSize: "10.5",
					textAnchor: "middle",
					fill: "currentColor",
					children: p.label
				}, p.id) : null)
			]
		}), hover !== null && points[hover] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartTooltip, {
			x: x(hover),
			y: y(points[hover].value) - 20,
			containerWidth: width,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-on-surface",
					children: points[hover].id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-on-surface-variant",
					children: [
						points[hover].label,
						" ·",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "type-data text-on-surface",
							children: fmt(points[hover].value, 2)
						}),
						" ",
						unit
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-on-surface-variant",
					children: [
						"z =",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "type-data",
							children: fmt((points[hover].value - mean) / sd, 2)
						})
					]
				})
			]
		})]
	});
}
export { ControlChart };
