import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/chart-tooltip-DR1YBCQa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Tracks an element's width so SVG charts can lay out in real pixels. */
function useWidth(fallback = 640) {
	const ref = (0, import_react.useRef)(null);
	const [width, setWidth] = (0, import_react.useState)(fallback);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const ro = new ResizeObserver(([entry]) => setWidth(Math.max(240, Math.floor(entry.contentRect.width))));
		ro.observe(el);
		return () => ro.disconnect();
	}, []);
	return [ref, width];
}
function ChartTooltip({ x, y, children, containerWidth }) {
	const flip = x > containerWidth - 180;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute z-10 min-w-36 rounded-lg border border-hairline bg-card px-3 py-2 text-xs shadow-float",
		style: {
			left: flip ? void 0 : x + 12,
			right: flip ? containerWidth - x + 12 : void 0,
			top: Math.max(0, y - 12)
		},
		role: "status",
		children
	});
}
export { ChartTooltip, useWidth };
