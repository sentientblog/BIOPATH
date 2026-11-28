globalThis.__nitro_main__ = import.meta.url;
import { H3Core, HTTPError, NodeResponse, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, serve, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
// node_modules/nitro/dist/runtime/internal/polyfills/fast-response.mjs
if (globalThis.Response !== NodeResponse) globalThis.Response = NodeResponse;
// node_modules/nitro/dist/runtime/_libs/hookable.mjs
function e$1(t, n, r, i) {
	for (let a = r; a < t.length; a += 1) try {
		let r = i ? i.run(() => t[a](...n)) : t[a](...n);
		if (r && typeof r.then == `function`) return Promise.resolve(r).then(() => e$1(t, n, a + 1, i));
	} catch (e) {
		return Promise.reject(e);
	}
}
var t$1 = class {
	_hooks;
	constructor() {
		this._hooks = {};
	}
	hook(e, t) {
		return !e || typeof t != `function` ? () => {} : (this._hooks[e] = this._hooks[e] || [], this._hooks[e].push(t), () => {
			t &&= (this.removeHook(e, t), void 0);
		});
	}
	removeHook(e, t) {
		let n = this._hooks[e];
		if (n) {
			let r = n.indexOf(t);
			r !== -1 && n.splice(r, 1), n.length === 0 && (this._hooks[e] = void 0);
		}
	}
	callHook(t, ...n) {
		let r = this._hooks[t];
		if (r && r.length !== 0) return e$1(r.slice(), n, 0);
	}
};
// node_modules/nitro/dist/runtime/_libs/ufo.mjs
String.fromCharCode;
var e = /%2f/gi;
function t(e = ``) {
	try {
		return decodeURIComponent(`` + e);
	} catch {
		return `` + e;
	}
}
function n(n) {
	return t(n.replace(e, `%252F`));
}
var r = /\/$|\/\?|\/#/;
var i = /^\.?\//;
function a(e = ``, t) {
	return t ? r.test(e) : e.endsWith(`/`);
}
function o(e = ``, t) {
	if (!t) return (a(e) ? e.slice(0, -1) : e) || `/`;
	if (!a(e, !0)) return e || `/`;
	let n = e, r = ``, i = e.indexOf(`#`);
	i !== -1 && (n = e.slice(0, i), r = e.slice(i));
	let [o, ...s] = n.split(`?`);
	return ((o.endsWith(`/`) ? o.slice(0, -1) : o) || `/`) + (s.length > 0 ? `?${s.join(`?`)}` : ``) + r;
}
function s(e = ``, t) {
	if (!t) return e.endsWith(`/`) ? e : e + `/`;
	if (a(e, !0)) return e || `/`;
	let n = e, r = ``, i = e.indexOf(`#`);
	if (i !== -1 && (n = e.slice(0, i), r = e.slice(i), !n)) return r;
	let [o, ...s] = n.split(`?`);
	return o + `/` + (s.length > 0 ? `?${s.join(`?`)}` : ``) + r;
}
function c(e = ``) {
	return e.startsWith(`/`);
}
function l(e = ``) {
	return c(e) ? e : `/` + e;
}
function u(e) {
	return e && e !== `/`;
}
function d(e, ...t) {
	let n = e || ``;
	for (let e of t.filter((e) => u(e))) if (n) {
		let t = e.replace(i, ``);
		n = s(n) + t;
	} else n = e;
	return n;
}
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/alert-CtZmzlNy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"434-138P68Tfq8SqStOqLNz8LJL4kIg\"",
		"mtime": "2026-11-28T05:26:52.502Z",
		"size": 1076,
		"path": "../public/assets/alert-CtZmzlNy.js"
	},
	"/assets/allocation-CKsY56rI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24e6-5joRUw2GSsjc0436mBI74mFPzuw\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 9446,
		"path": "../public/assets/allocation-CKsY56rI.js"
	},
	"/assets/badge-DOH1wn7Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bc-yUJdkk19wdvTQT2RiUoZtjvyrwY\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 1212,
		"path": "../public/assets/badge-DOH1wn7Y.js"
	},
	"/assets/card-C7AdZSvd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-1mLW9p8IsJ/At/XTjJA2UY3Tpls\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 256,
		"path": "../public/assets/card-C7AdZSvd.js"
	},
	"/assets/chart-tooltip-sVDCrJuG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29b-r+vnVVLyVRS2yvm8E/jcI+p8WFI\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 667,
		"path": "../public/assets/chart-tooltip-sVDCrJuG.js"
	},
	"/assets/control-chart-BkYrc3t7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2e-mrDYJ/qutmvyxJ+f8xTBcsYplPY\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 2606,
		"path": "../public/assets/control-chart-BkYrc3t7.js"
	},
	"/assets/dist-BRg9-h4a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a92d-5SopF7h7Ytz072H1fY3imf8t7cw\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 43309,
		"path": "../public/assets/dist-BRg9-h4a.js"
	},
	"/assets/dist-CVNHHeMv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"280-Vb1QhT2w91Lt7lcYvpnBMsPBsFc\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 640,
		"path": "../public/assets/dist-CVNHHeMv.js"
	},
	"/assets/end-use-dIlt3FcI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c09-7gI8kcOJ/AjDgGPqX4NIk6oLhVc\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 7177,
		"path": "../public/assets/end-use-dIlt3FcI.js"
	},
	"/assets/feedstocks-DGxe5AwN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2aa3-grLqkvn33I/cEVh/NRCEKJokE5w\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 10915,
		"path": "../public/assets/feedstocks-DGxe5AwN.js"
	},
	"/assets/feedstocks._feedstockId-BRlPqkTV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3dc6-+KQ86tC0clxqcjoycsGu1bGBDtg\"",
		"mtime": "2026-11-28T05:26:52.503Z",
		"size": 15814,
		"path": "../public/assets/feedstocks._feedstockId-BRlPqkTV.js"
	},
	"/assets/fingerprinting-3gvZPUh3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e5-2vZkM9W1Nimb2LmSEwz5YOeeycg\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 5093,
		"path": "../public/assets/fingerprinting-3gvZPUh3.js"
	},
	"/assets/format-CdWdYl7w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7e34-hXsvtHeMn3zGOIi7z7mJTfDPS90\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 32308,
		"path": "../public/assets/format-CdWdYl7w.js"
	},
	"/assets/formulation-C6oSHON-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2453-2XEEAPK1XEivVp71ThQuiwDKv3I\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 9299,
		"path": "../public/assets/formulation-C6oSHON-.js"
	},
	"/assets/icon-DIKV7K5B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f7a-L4Eyz0W7ez26r6dYvAVIg6RS+cA\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 36730,
		"path": "../public/assets/icon-DIKV7K5B.js"
	},
	"/assets/index-BuEoxnkT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"78b08-afidyF3Zlml6sjx1F/FyYnyvl+M\"",
		"mtime": "2026-11-28T05:26:52.502Z",
		"size": 494344,
		"path": "../public/assets/index-BuEoxnkT.js"
	},
	"/assets/index-xs8hw6Xx.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1268e-dNP06SRW4ijyC6zcigQrJH0TLPs\"",
		"mtime": "2026-11-28T05:26:52.505Z",
		"size": 75406,
		"path": "../public/assets/index-xs8hw6Xx.css"
	},
	"/assets/link-B2xVbU8g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7d0-ldZLbsKCFemBv6yIj8Uj9i2U8rU\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 63440,
		"path": "../public/assets/link-B2xVbU8g.js"
	},
	"/assets/modules._moduleId-BKwGEH4t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b1b-8kxqMzpfL2JXOEkNmulUNyixULg\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 6939,
		"path": "../public/assets/modules._moduleId-BKwGEH4t.js"
	},
	"/assets/modules._moduleId-DNl4XOrK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61-1XgCXMswT/tbStkU970KIYuwzv8\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 97,
		"path": "../public/assets/modules._moduleId-DNl4XOrK.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/page-gPFMGYV9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"187a-dPOIMB7ArLtJ6HDgweUQncbckBQ\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 6266,
		"path": "../public/assets/page-gPFMGYV9.js"
	},
	"/assets/pathways-Dh34ixl8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40c2-jlUX4koGuzDUUo0W0C0af9+HeIY\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 16578,
		"path": "../public/assets/pathways-Dh34ixl8.js"
	},
	"/assets/radar-chart-46Dp3oM_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d2-QeoAaokL2S0m2Ao9OlbPVqqX2Lo\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 1234,
		"path": "../public/assets/radar-chart-46Dp3oM_.js"
	},
	"/assets/reports-CA6auWtD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26ce-Km0b6YZ1xdw5QiRoa6xDh4zzgVk\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 9934,
		"path": "../public/assets/reports-CA6auWtD.js"
	},
	"/assets/routes-C-oQ0CxD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28b5-QB0uq+EpcUO2zU0qVnS+4UGUpr0\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 10421,
		"path": "../public/assets/routes-C-oQ0CxD.js"
	},
	"/assets/scoring-BGVH1HUy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196f-JfkoiAoAx4oFkAAz8xLMXee/XGo\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 6511,
		"path": "../public/assets/scoring-BGVH1HUy.js"
	},
	"/assets/select-BWCuDeMw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5afc-DgL1jrsSQYv8QDhbnQQvSD54aLU\"",
		"mtime": "2026-11-28T05:26:52.504Z",
		"size": 23292,
		"path": "../public/assets/select-BWCuDeMw.js"
	},
	"/assets/source-intelligence-Dov-vfOm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4077-cWe7UFk9zzlehj1KM5O92HO/iz0\"",
		"mtime": "2026-11-28T05:26:52.505Z",
		"size": 16503,
		"path": "../public/assets/source-intelligence-Dov-vfOm.js"
	},
	"/assets/table-ClL62Ylx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e7-kDN90C7e3gnrat5Ao8QY+JP1lyg\"",
		"mtime": "2026-11-28T05:26:52.505Z",
		"size": 1255,
		"path": "../public/assets/table-ClL62Ylx.js"
	},
	"/assets/tabs-CtPg3hSu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14b4-BA7ZcJaC8HGaP/dZMkeJFTWxik4\"",
		"mtime": "2026-11-28T05:26:52.505Z",
		"size": 5300,
		"path": "../public/assets/tabs-CtPg3hSu.js"
	},
	"/assets/textarea-Dlhfu26-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"800-CYm2uqAynPRX/gtEcgrWIwlucKU\"",
		"mtime": "2026-11-28T05:26:52.505Z",
		"size": 2048,
		"path": "../public/assets/textarea-Dlhfu26-.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"3aee-JckObXLTAe3A6+myIgdybrrPxqQ\"",
		"mtime": "2026-11-28T05:26:54.665Z",
		"size": 15086,
		"path": "../public/favicon.ico"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"1f2-ehVgbZ4vr6c4ZCtrjW5WyHmOTzo\"",
		"mtime": "2026-11-28T05:26:54.665Z",
		"size": 498,
		"path": "../public/favicon.svg"
	},
	"/img/avatar.jpg": {
		"type": "image/jpeg",
		"etag": "\"c8d7-EY3FOlb12gDeha1gZCcbU4shy+w\"",
		"mtime": "2026-11-28T05:26:54.661Z",
		"size": 51415,
		"path": "../public/img/avatar.jpg"
	},
	"/img/fs-avocado.jpg": {
		"type": "image/jpeg",
		"etag": "\"776b-Sft4GZsspxADVcDleu7Fa7u1h7s\"",
		"mtime": "2026-11-28T05:26:54.661Z",
		"size": 30571,
		"path": "../public/img/fs-avocado.jpg"
	},
	"/img/fs-bsg.jpg": {
		"type": "image/jpeg",
		"etag": "\"c691-amObq/b1+CTwOcuWS5QzV8kv1+o\"",
		"mtime": "2026-11-28T05:26:54.662Z",
		"size": 50833,
		"path": "../public/img/fs-bsg.jpg"
	},
	"/img/fs-coffee-pulp.jpg": {
		"type": "image/jpeg",
		"etag": "\"16980-G+AZXRos5SAYV7WlDqzBuC7kJJA\"",
		"mtime": "2026-11-28T05:26:54.661Z",
		"size": 92544,
		"path": "../public/img/fs-coffee-pulp.jpg"
	},
	"/img/fs-okara.jpg": {
		"type": "image/jpeg",
		"etag": "\"5ee1-ue0d6bKl5dFA94FU5AUItIwrZbs\"",
		"mtime": "2026-11-28T05:26:54.661Z",
		"size": 24289,
		"path": "../public/img/fs-okara.jpg"
	},
	"/img/fs-sunflower.jpg": {
		"type": "image/jpeg",
		"etag": "\"6b0e-y/OctjB0vgXJVxlT+RrIYIZft98\"",
		"mtime": "2026-11-28T05:26:54.662Z",
		"size": 27406,
		"path": "../public/img/fs-sunflower.jpg"
	},
	"/img/hero-field.png": {
		"type": "image/png",
		"etag": "\"1d462d-5t4kDh0YyBUcj/WGkh5kgJcoHlA\"",
		"mtime": "2026-11-28T05:26:54.668Z",
		"size": 1918509,
		"path": "../public/img/hero-field.png"
	},
	"/img/project-avocado.jpg": {
		"type": "image/jpeg",
		"etag": "\"588b-B385D33+TryKdpfVOVM0was4vA8\"",
		"mtime": "2026-11-28T05:26:54.662Z",
		"size": 22667,
		"path": "../public/img/project-avocado.jpg"
	},
	"/img/project-bsg.jpg": {
		"type": "image/jpeg",
		"etag": "\"5cf5-8Gl4zhuz0anrBvPt5qPLgv5OYDM\"",
		"mtime": "2026-11-28T05:26:54.662Z",
		"size": 23797,
		"path": "../public/img/project-bsg.jpg"
	},
	"/img/project-coffee-pulp.jpg": {
		"type": "image/jpeg",
		"etag": "\"941a-GanXPFaSkAADo1ngHxvbV4uyYAw\"",
		"mtime": "2026-11-28T05:26:54.663Z",
		"size": 37914,
		"path": "../public/img/project-coffee-pulp.jpg"
	}
};
// #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path)).catch((error) => {
		if (error?.code !== "ENOENT") throw error;
	});
}
// #nitro/virtual/public-assets
var publicAssetBases = { "/assets/": { "maxAge": 31536e3 } };
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
function hasAsset(id = "") {
	return !!(public_assets_data_default[id] || public_assets_data_default[id + ".gz"] || public_assets_data_default[id + ".br"] || public_assets_data_default[id + ".zst"]);
}
// node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var noCacheHeaders = { "cache-control": "no-store" };
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	const path = l(o(event.url.pathname));
	let id = path.includes("%") ? n(path) : path;
	if (!hasAsset(id) && !hasAsset(d(id, "index.html")) && !isPublicAssetURL(id)) return;
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((entry) => {
		const [name, ...parameters] = entry.split(";");
		const quality = parameters.map((parameter) => parameter.trim().split("=")).find(([key]) => key.toLowerCase() === "q")?.[1];
		const weight = quality === void 0 ? 1 : Number.parseFloat(quality);
		return {
			ext: EncodingMap[name.trim().toLowerCase()],
			weight: Number.isNaN(weight) ? 1 : weight
		};
	}).filter((entry) => entry.ext && entry.weight > 0).sort((a, b) => b.weight - a.weight || (a.ext < b.ext ? -1 : a.ext > b.ext ? 1 : 0)).map((entry) => entry.ext), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, d(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) throw new HTTPError({
			status: 404,
			headers: noCacheHeaders
		});
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	const data = readAsset(id);
	return typeof data?.then === "function" ? data.then((resolved) => assertAssetData(resolved)) : assertAssetData(data);
});
function assertAssetData(data) {
	if (data === null || data === void 0) throw new HTTPError({
		status: 404,
		headers: noCacheHeaders
	});
	return data;
}
// #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = {
		route: "/assets/**",
		rank: 0,
		rules: [{
			name: "headers",
			route: "/assets/**",
			handler: headers,
			options: { "cache-control": "public, max-age=31536000, immutable" }
		}]
	};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		let s = p.split("/");
		let l = s.length;
		let _w;
		if (l > 1) {
			if (s[1] === "assets") r.push(l > 2 ? {
				data: $0,
				params: {
					"0": _w = p.slice(8),
					_: _w
				}
			} : {
				data: $0,
				params: {}
			});
		}
		return r.reverse();
	};
})();
var _lazy_f5be5d4feb5a0ac2 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_f5be5d4feb5a0ac2
	};
	return ((_m, p) => {
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		const w = p.slice(1);
		return {
			data,
			params: w ? {
				"0": w,
				_: w
			} : {}
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
// node_modules/nitro/dist/runtime/internal/error/utils.mjs
function createErrorHeaders(error, event, unhandled) {
	const headers = new Headers(unhandled ? {} : error.headers);
	const errHeaders = event.res?.errHeaders;
	if (errHeaders) for (const [name, value] of errHeaders) if (name === "set-cookie") headers.append(name, value);
	else headers.set(name, value);
	return headers;
}
// node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = createErrorHeaders(error, event, unhandled);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
// #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
// #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => {
		event.context.routeRules = getRouteRules(event.req.method, event.url.pathname).routeRules;
		if (event.req.method === "HEAD") {
			const route = findRoute("HEAD", event.url.pathname);
			return route?.data.method ? route : findRoute("GET", event.url.pathname);
		}
		return findRoute(event.req.method, event.url.pathname);
	};
	h3App["~middleware"].push(createRouteRulesMiddleware());
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~middleware"].push(createCacheRuleMiddleware());
	return h3App;
}
// node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new t$1();
}
function getRouteRules(method, pathname) {
	return matchRouteRules(method, pathname);
}
function createRouteRulesMiddleware() {
	const middleware = (event, next) => {
		const { rules, cache } = resolveRouteRuleChains(event.req.method, event.url.pathname);
		if (cache) event[kCacheRule] = cache;
		return rules ? rules(event, next) : next();
	};
	return markUntraced(middleware);
}
function createCacheRuleMiddleware() {
	const middleware = (event, next) => {
		const cache = event[kCacheRule];
		return cache ? cache(event, next) : next();
	};
	return markUntraced(middleware);
}
var _matchRouteRules;
function matchRouteRules(method, pathname) {
	return (_matchRouteRules ??= memoizeRouteRulesMatcher(createMatcherFromFind(findRouteRules)))(method, pathname);
}
var kCacheRule = /* @__PURE__ */ Symbol("nitro.cacheRule");
var _routeRuleChains = /* @__PURE__ */ new WeakMap();
function resolveRouteRuleChains(method, pathname) {
	const { matchedRules, routeRuleMiddleware } = matchRouteRules(method, pathname);
	if (routeRuleMiddleware.length === 0) return {};
	let chains = _routeRuleChains.get(routeRuleMiddleware);
	if (!chains) {
		const hasCache = !!matchedRules.cache?.handler;
		const rules = hasCache ? routeRuleMiddleware.slice(0, -1) : routeRuleMiddleware;
		chains = {
			rules: rules.length > 0 ? composeMiddleware(rules) : void 0,
			cache: hasCache ? routeRuleMiddleware.at(-1) : void 0
		};
		_routeRuleChains.set(routeRuleMiddleware, chains);
	}
	return chains;
}
function markUntraced(middleware) {
	middleware.__traced__ = true;
	return middleware;
}
// node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
// #nitro/virtual/server-entry
var serverEntryOptions = {};
// #nitro/virtual/tracing
var tracingSrvxPlugins = [];
// node_modules/nitro/dist/runtime/internal/serve.mjs
function resolveServeOptions(opts) {
	const { port, hostname, tls, ...entryOptions } = serverEntryOptions;
	const env = globalThis.process?.env || {};
	const _parsedPort = Number.parseInt(env.NITRO_PORT ?? env.PORT ?? "");
	const cert = env.NITRO_SSL_CERT;
	const key = env.NITRO_SSL_KEY;
	const socketPath = env.NITRO_UNIX_SOCKET;
	const resolved = {
		...entryOptions,
		port: Number.isNaN(_parsedPort) ? port ?? 3e3 : _parsedPort,
		hostname: env.NITRO_HOST || env.HOST || hostname,
		tls: cert && key ? {
			cert,
			key
		} : tls,
		...opts,
		plugins: [...tracingSrvxPlugins, ...opts.plugins || []]
	};
	for (const runtime of [
		"node",
		"bun",
		"deno"
	]) if (entryOptions[runtime] && opts[runtime]) resolved[runtime] = {
		...entryOptions[runtime],
		...opts[runtime]
	};
	if (socketPath) {
		resolved.node = {
			...resolved.node,
			path: socketPath
		};
		resolved.bun = {
			...resolved.bun,
			unix: socketPath
		};
		resolved.deno = {
			...resolved.deno,
			path: socketPath
		};
	}
	return resolved;
}
// node_modules/nitro/dist/runtime/internal/shutdown.mjs
function setupCloseHooks(server) {
	const closeServer = server.close.bind(server);
	let closeHooks;
	server.close = (closeActiveConnections) => closeServer(closeActiveConnections).finally(() => closeHooks ??= callCloseHooks());
}
async function callCloseHooks() {
	try {
		await useNitroHooks().callHook("close");
	} catch (error) {
		console.error("[nitro] Error while calling `close` hooks:", error);
	}
}
// node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var nitroApp = useNitroApp();
var server = serve(resolveServeOptions({ fetch: nitroApp.fetch }));
server.ready().catch((error) => {
	console.error("[nitro] Failed to start server:", error);
	process.exit(1);
});
setupCloseHooks(server);
trapUnhandledErrors();
var node_server_default = {};
export { node_server_default as default };
