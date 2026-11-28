import "../_runtime.mjs";
import { cn } from "./router-ChhPpYzB.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		className: cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
		...props
	});
}
export { Card };
