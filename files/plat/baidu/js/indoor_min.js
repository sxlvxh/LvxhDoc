!
function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.BMapLib = {})
}(this, function(t) {
	"use strict";
	var e, o, c = e = c || {
		version: "1.5.0"
	};

	function n() {}
	function i(t, e) {
		this._name = t, this._baseZoom = 18, this._opts = {
			tileSize: 256
		}, c.extend(this._opts, e || {})
	}
	c.guid = "$BAIDU$", window[c.guid] = window[c.guid] || {}, c.object = c.object || {}, c.extend = c.object.extend = function(t, e) {
		for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
		return t
	}, c.dom = c.dom || {}, c.dom.g = function(t) {
		return "string" == typeof t || t instanceof String ? document.getElementById(t) : t && t.nodeName && (1 == t.nodeType || 9 == t.nodeType) ? t : null
	}, c.g = c.G = c.dom.g, c.dom.hide = function(t) {
		return (t = c.dom.g(t)).style.display = "none", t
	}, c.hide = c.dom.hide, c.lang = c.lang || {}, c.lang.isString = function(t) {
		return "[object String]" == Object.prototype.toString.call(t)
	}, c.isString = c.lang.isString, c.dom._g = function(t) {
		return c.lang.isString(t) ? document.getElementById(t) : t
	}, c._g = c.dom._g, c.dom.contains = function(t, e) {
		var o = c.dom._g;
		return t = o(t), e = o(e), t.contains ? t != e && t.contains(e) : !! (16 & t.compareDocumentPosition(e))
	}, c.browser = c.browser || {}, c.dom._NAME_ATTRS = {
		cellpadding: "cellPadding",
		cellspacing: "cellSpacing",
		colspan: "colSpan",
		rowspan: "rowSpan",
		valign: "vAlign",
		usemap: "useMap",
		frameborder: "frameBorder",
		htmlFor: "for",
		className: "class"
	}, c.dom.setAttr = function(t, e, o) {
		return t = c.dom.g(t), "style" == e ? t.style.cssText = o : (e = c.dom._NAME_ATTRS[e] || e, t.setAttribute(e, o)), t
	}, c.setAttr = c.dom.setAttr, c.dom.setAttrs = function(t, e) {
		for (var o in t = c.dom.g(t), e) c.dom.setAttr(t, o, e[o]);
		return t
	}, c.setAttrs = c.dom.setAttrs, c.string = c.string || {}, c.dom.removeClass = function(t, e) {
		for (var o, n, i = (t = c.dom.g(t)).className.split(/\s+/), r = e.split(/\s+/), a = r.length, s = 0; s < a; ++s) for (n = 0, o = i.length; n < o; ++n) if (i[n] == r[s]) {
			i.splice(n, 1);
			break
		}
		return t.className = i.join(" "), t
	}, c.rc = c.removeClass = c.dom.removeClass, c.dom.insertHTML = function(t, e, o) {
		var n, i;
		return (t = c.dom.g(t)).insertAdjacentHTML ? t.insertAdjacentHTML(e, o) : (n = t.ownerDocument.createRange(), "AFTERBEGIN" == (e = e.toUpperCase()) || "BEFOREEND" == e ? (n.selectNodeContents(t), n.collapse("AFTERBEGIN" == e)) : (n[(i = "BEFOREBEGIN" == e) ? "setStartBefore" : "setEndAfter"](t), n.collapse(i)), n.insertNode(n.createContextualFragment(o))), t
	}, c.insertHTML = c.dom.insertHTML, c.dom.show = function(t) {
		return (t = c.dom.g(t)).style.display = "", t
	}, c.show = c.dom.show, c.dom.getDocument = function(t) {
		return 9 == (t = c.dom.g(t)).nodeType ? t : t.ownerDocument || t.document
	}, c.dom.addClass = function(t, e) {
		t = c.dom.g(t);
		for (var o = e.split(/\s+/), n = t.className, i = " " + n + " ", r = 0, a = o.length; r < a; r++) i.indexOf(" " + o[r] + " ") < 0 && (n += " " + o[r]);
		return t.className = n, t
	}, c.ac = c.addClass = c.dom.addClass, c.dom._styleFixer = c.dom._styleFixer || {}, c.dom._styleFilter = c.dom._styleFilter || [], c.dom._styleFilter.filter = function(t, e, o) {
		for (var n, i = 0, r = c.dom._styleFilter; n = r[i]; i++)(n = n[o]) && (e = n(t, e));
		return e
	}, c.string.toCamelCase = function(t) {
		return t.indexOf("-") < 0 && t.indexOf("_") < 0 ? t : t.replace(/[-_][^-_]/g, function(t) {
			return t.charAt(1).toUpperCase()
		})
	}, c.dom.getStyle = function(t, e) {
		var o = c.dom;
		t = o.g(t), e = c.string.toCamelCase(e);
		var n = t.style[e];
		if (!n) {
			var i = o._styleFixer[e],
				r = t.currentStyle || getComputedStyle(t, null);
			n = i && i.get ? i.get(t, r) : r[i || e]
		}
		return (i = o._styleFilter) && (n = i.filter(e, n, "get")), n
	}, c.getStyle = c.dom.getStyle, /opera\/(\d+\.\d)/i.test(navigator.userAgent) && (c.browser.opera = +RegExp.$1), c.browser.isWebkit = /webkit/i.test(navigator.userAgent), c.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent), c.browser.isStrict = "CSS1Compat" == document.compatMode, c.dom.getPosition = function(t) {
		t = c.dom.g(t);
		var e, o, n = c.dom.getDocument(t),
			i = c.browser,
			r = c.dom.getStyle,
			a = (0 < i.isGecko && n.getBoxObjectFor && "absolute" == r(t, "position") && ("" === t.style.top || t.style.left), {
				left: 0,
				top: 0
			});
		if (t == (i.ie && !i.isStrict ? n.body : n.documentElement)) return a;
		if (t.getBoundingClientRect) {
			o = t.getBoundingClientRect(), a.left = Math.floor(o.left) + Math.max(n.documentElement.scrollLeft, n.body.scrollLeft), a.top = Math.floor(o.top) + Math.max(n.documentElement.scrollTop, n.body.scrollTop), a.left -= n.documentElement.clientLeft, a.top -= n.documentElement.clientTop;
			var s = n.body,
				l = parseInt(r(s, "borderLeftWidth")),
				d = parseInt(r(s, "borderTopWidth"));
			i.ie && !i.isStrict && (a.left -= isNaN(l) ? 2 : l, a.top -= isNaN(d) ? 2 : d)
		} else {
			e = t;
			do {
				if (a.left += e.offsetLeft, a.top += e.offsetTop, 0 < i.isWebkit && "fixed" == r(e, "position")) {
					a.left += n.body.scrollLeft, a.top += n.body.scrollTop;
					break
				}
				e = e.offsetParent
			} while (e && e != t);
			for ((0 < i.opera || 0 < i.isWebkit && "absolute" == r(t, "position")) && (a.top -= n.body.offsetTop), e = t.offsetParent; e && e != n.body;) a.left -= e.scrollLeft, i.opera && "TR" == e.tagName || (a.top -= e.scrollTop), e = e.offsetParent
		}
		return a
	}, /firefox\/(\d+\.\d)/i.test(navigator.userAgent) && (c.browser.firefox = +RegExp.$1), o = navigator.userAgent, /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(o) && !/chrome/i.test(o) && (c.browser.safari = +(RegExp.$1 || RegExp.$2)), /chrome\/(\d+\.\d)/i.test(navigator.userAgent) && (c.browser.chrome = +RegExp.$1), c.array = c.array || {}, c.array.each = function(t, e) {
		var o, n, i = t.length;
		if ("function" == typeof e) for (n = 0; n < i && (o = t[n], !1 !== e.call(t, o, n)); n++);
		return t
	}, c.each = c.array.each, c.lang.guid = function() {
		return "TANGRAM__" + (window[c.guid]._counter++).toString(36)
	}, window[c.guid]._counter = window[c.guid]._counter || 1, window[c.guid]._instances = window[c.guid]._instances || {}, c.lang.isFunction = function(t) {
		return "[object Function]" == Object.prototype.toString.call(t)
	}, c.lang.isNumber = function(t) {
		return "[object Number]" == Object.prototype.toString.call(t)
	}, c.lang.Class = function(t) {
		this.guid = t || c.lang.guid(), window[c.guid]._instances[this.guid] = this
	}, window[c.guid]._instances = window[c.guid]._instances || {}, c.lang.Class.prototype.dispose = function() {
		for (var t in delete window[c.guid]._instances[this.guid], this) c.lang.isFunction(this[t]) || delete this[t];
		this.disposed = !0
	}, c.lang.Class.prototype.toString = function() {
		return "[object " + (this._className || "Object") + "]"
	}, c.lang.Event = function(t, e) {
		this.type = t, this.returnValue = !0, this.target = e || null, this.currentTarget = null
	}, c.lang.Class.prototype.addEventListener = function(t, e, o) {
		if (c.lang.isFunction(e)) {
			!this.__listeners && (this.__listeners = {});
			var n, i = this.__listeners;
			if ("string" == typeof o && o) {
				if (/[^\w\-]/.test(o)) throw "nonstandard key:" + o;
				n = e.hashCode = o
			}
			0 != t.indexOf("on") && (t = "on" + t), "object" != typeof i[t] && (i[t] = {}), n = n || c.lang.guid(), e.hashCode = n, i[t][n] = e
		}
	}, c.lang.Class.prototype.removeEventListener = function(t, e) {
		if (c.lang.isFunction(e)) e = e.hashCode;
		else if (!c.lang.isString(e)) return;
		!this.__listeners && (this.__listeners = {}), 0 != t.indexOf("on") && (t = "on" + t);
		var o = this.__listeners;
		o[t] && o[t][e] && delete o[t][e]
	}, c.lang.Class.prototype.dispatchEvent = function(t, e) {
		for (var o in c.lang.isString(t) && (t = new c.lang.Event(t)), !this.__listeners && (this.__listeners = {}), e = e || {}) t[o] = e[o];
		var n = this.__listeners,
			i = t.type;
		if (t.target = t.target || this, t.currentTarget = this, 0 != i.indexOf("on") && (i = "on" + i), c.lang.isFunction(this[i]) && this[i].apply(this, arguments), "object" == typeof n[i]) for (o in n[i]) n[i][o].apply(this, arguments);
		return t.returnValue
	}, c.lang.inherits = function(t, e, o) {
		var n, i, r = t.prototype,
			a = new Function;
		for (n in a.prototype = e.prototype, i = t.prototype = new a, r) i[n] = r[n];
		(t.prototype.constructor = t).superClass = e.prototype, "string" == typeof o && (i._className = o)
	}, c.inherits = c.lang.inherits, c.lang.instance = function(t) {
		return window[c.guid]._instances[t] || null
	}, c.isMobile = /Mobile/i.test(navigator.userAgent), c.platform = c.platform || {}, c.platform.isAndroid = /android/i.test(navigator.userAgent), /android (\d+\.\d)/i.test(navigator.userAgent) && (c.platform.android = c.android = RegExp.$1), c.platform.isIpad = /ipad/i.test(navigator.userAgent), c.platform.isIphone = /iphone/i.test(navigator.userAgent), c.platform.iosVersion = /iphone os (\d)\_/i.test(navigator.userAgent) ? +RegExp.$1 : 0, c.lang.Event.prototype.inherit = function(t) {
		var e = this;
		if (this.domEvent = t = window.event || t, e.clientX = t.clientX || t.pageX, e.clientY = t.clientY || t.pageY, e.offsetX = t.offsetX || t.layerX, e.offsetY = t.offsetY || t.layerY, e.screenX = t.screenX, e.screenY = t.screenY, e.ctrlKey = t.ctrlKey || t.metaKey, e.shiftKey = t.shiftKey, e.altKey = t.altKey, t.touches) {
			e.touches = [];
			for (var o = 0; o < t.touches.length; o++) e.touches.push({
				clientX: t.touches[o].clientX,
				clientY: t.touches[o].clientY,
				screenX: t.touches[o].screenX,
				screenY: t.touches[o].screenY,
				pageX: t.touches[o].pageX,
				pageY: t.touches[o].pageY,
				target: t.touches[o].target,
				identifier: t.touches[o].identifier
			})
		}
		if (t.changedTouches) for (e.changedTouches = [], o = 0; o < t.changedTouches.length; o++) e.changedTouches.push({
			clientX: t.changedTouches[o].clientX,
			clientY: t.changedTouches[o].clientY,
			screenX: t.changedTouches[o].screenX,
			screenY: t.changedTouches[o].screenY,
			pageX: t.changedTouches[o].pageX,
			pageY: t.changedTouches[o].pageY,
			target: t.changedTouches[o].target,
			identifier: t.changedTouches[o].identifier
		});
		if (t.targetTouches) for (e.targetTouches = [], o = 0; o < t.targetTouches.length; o++) e.targetTouches.push({
			clientX: t.targetTouches[o].clientX,
			clientY: t.targetTouches[o].clientY,
			screenX: t.targetTouches[o].screenX,
			screenY: t.targetTouches[o].screenY,
			pageX: t.targetTouches[o].pageX,
			pageY: t.targetTouches[o].pageY,
			target: t.targetTouches[o].target,
			identifier: t.targetTouches[o].identifier
		});
		return e.rotation = t.rotation, e.scale = t.scale, e
	}, c.lang.decontrol = function(t) {
		var e = window[c.guid];
		e._instances && delete e._instances[t]
	}, c.event = {}, c.on = c.event.on = function(t, e, o) {
		return (t = c.g(t)) && (e = e.replace(/^on/, ""), t.addEventListener ? t.addEventListener(e, o, !1) : t.attachEvent && t.attachEvent("on" + e, o)), t
	}, c.un = c.event.un = function(t, e, o) {
		return (t = c.g(t)) && (e = e.replace(/^on/, ""), t.removeEventListener ? t.removeEventListener(e, o, !1) : t.detachEvent && t.detachEvent("on" + e, o)), t
	}, c.dom.hasClass = function(t, e) {
		if (!t || !t.className || "string" != typeof t.className) return !1;
		var o = -1;
		try {
			o = t.className == e || t.className.indexOf(e)
		} catch (t) {
			return !1
		}
		return -1 < o
	}, e.undope = !0, n.instances = {}, n.getInstance = function(t, e) {
		if (n.instances[t]) return n.instances[t];
		var o = new i(t, e);
		return n.instances[t] = o
	}, i.mapZoomBaseIndex = [0, 0, 0, 8, 7, 7, 6, 6, 5, 5, 4, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0], i.baseScaleZoom = [19, 17, 15, 12, 10, 9, 7, 5, 3], i.baseScaleZoomMercatorSize = [512, 2048, 4096, 32768, 65536, 262144, 1048576, 4194304, 8388608], i.mapZoomBaseZoomMapping = [0, 0, 0, 3, 5, 5, 7, 7, 9, 9, 10, 12, 12, 12, 15, 15, 17, 17, 19, 19, 19, 19], i.baseScaleTileSize = [1024, 1024, 512, 512, 256, 512, 512, 512, 256], i.mapZoomTileSize = [0, 0, 0, 256, 256, 512, 256, 512, 256, 512, 256, 256, 512, 1024, 256, 512, 512, 1024, 512, 1024, 2048, 4096], i.baseZoomInfo = {
		3: [3],
		5: [4, 5],
		7: [6, 7],
		9: [8, 9],
		10: [10],
		12: [11, 12, 13],
		15: [14, 15],
		17: [16, 17],
		19: [18, 19, 20, 21]
	}, i.prototype = {
		getTileSize: function(t) {
			return t = Math.floor(t), "na" === this._name ? i.mapZoomTileSize[t] : this._opts.tileSize
		},
		getDataZoom: function(t) {
			return t = Math.floor(t), "na" === this._name ? i.mapZoomBaseZoomMapping[t] : t
		},
		getMercatorSize: function(t, e) {
			if ("na" === this._name) {
				t = Math.floor(t);
				var o = i.mapZoomBaseIndex[t];
				return i.baseScaleZoomMercatorSize[o]
			}
			return this._opts.tileSize * this.getZoomUnits(this.getDataZoom(t))
		}
	};
	var a = 52.35987755982988,
		r = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
		s = [75, 60, 45, 30, 15, 0],
		l = [
			[1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -.03801003308653, 17337981.2],
			[-7.435856389565537e-9, 8983055097726239e-21, -.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86],
			[-3.030883460898826e-8, 898305509983578e-20, .30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, .32710905363475, 6856817.37],
			[-1.981981304930552e-8, 8983055099779535e-21, .03278182852591, 40.31678527705744, .65659298677277, -4.44255534477492, .85341911805263, .12923347998204, -.04625736007561, 4482777.06],
			[3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -.00023663490511, -.6321817810242, -.00663494467273, .03430082397953, -.00466043876332, 2555164.4],
			[2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14, -.02145144861037, -1234426596e-14, .00010322952773, -323890364e-14, 826088.5]
		],
		d = [
			[-.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5],
			[.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5],
			[.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5],
			[.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
			[-.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
			[-.0003218135878613132, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]
		],
		m = {
			setPosition: function(t, e) {
				var o = t.style;
				o.left = e[0] + "px", o.top = e[1] + "px"
			},
			setUnSelectable: function(t) {
				t.style.MozUserSelect = "none"
			},
			isInDocument: function(t) {
				return t && t.parentNode && 11 != t.parentNode.nodeType
			},
			beforeEndHTML: function(t, e) {
				return c.dom.insertHTML(t, "beforeEnd", e), t.lastChild
			},
			getPosition: function(t) {
				for (var e = {
					left: 0,
					top: 0
				}; t && t.offsetParent;) e.left += t.offsetLeft, e.top += t.offsetTop, t = t.offsetParent;
				return e
			},
			stopBubble: function(t) {
				(t = window.event || t).stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
			},
			preventDefault: function(t) {
				return (t = window.event || t).preventDefault ? t.preventDefault() : t.returnValue = !1, !1
			},
			stopAndPrevent: function(t) {
				return this.stopBubble(t), this.preventDefault(t)
			},
			getScroll: function() {
				var t = document.documentElement,
					e = document.body;
				return t && (t.scrollTop || t.scrollLeft) ? [t.scrollTop, t.scrollLeft] : e ? [e.scrollTop, e.scrollLeft] : [0, 0]
			},
			getDistanceByPixel: function(t, e) {
				if (t && e) return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
			},
			create: function(t, e, o) {
				var n = document.createElement(t);
				return o && (n = document.createElementNS(o, t)), c.dom.setAttrs(n, e || {})
			},
			getCurrentStyle: function(t) {
				return t.currentStyle ? t.currentStyle : t.ownerDocument && t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : void 0
			},
			isDefined: function(t) {
				return void 0 !== t
			},
			isSupportSvg: function() {
				return "boolean" != typeof this.isSupportSvg.result && (this.isSupportSvg.result = !! document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1")), this.isSupportSvg.result
			},
			isSupportCanvas: function() {
				return "boolean" != typeof this.isSupportCanvas.result && (this.isSupportCanvas.result = !! this.create("canvas").getContext), this.isSupportCanvas.result
			},
			toRadian: function(t) {
				return t * Math.PI / 180
			},
			toAngle: function(t) {
				return t / Math.PI * 180
			},
			isMobile: function() {
				return !!(c.platform.isIphone || c.platform.isIpad || c.platform.isAndroid)
			},
			getCurrentTime: function() {
				return (new Date).getTime()
			},
			isAndroid23More: function() {
				return !!(c.platform.isAndroid && 2.3 < parseFloat(c.platform.android))
			},
			cohenSutherlandLineClip: function(t, e, o) {
				for (var n, i, r, a = !1, s = !1, l = !1, d = {
					x: t.x,
					y: t.y
				}, c = {
					x: e.x,
					y: e.y
				}, h = this.calcOutcode(d, o), u = this.calcOutcode(c, o), f = o.minX, g = o.minY, p = o.maxX, m = o.maxY; 0 == h.all && 0 == u.all ? l = a = !0 : 0 != (h.all & u.all) ? l = !0 : ((n = 0 != h.all ? h : u).top ? (i = d.x + (c.x - d.x) * (g - d.y) / (c.y - d.y), r = g) : n.bottom ? (i = d.x + (c.x - d.x) * (m - d.y) / (c.y - d.y), r = m) : n.right ? (r = d.y + (c.y - d.y) * (p - d.x) / (c.x - d.x), i = p) : n.left && (r = d.y + (c.y - d.y) * (f - d.x) / (c.x - d.x), i = f), s = !0, n.all == h.all ? (d.x = Math.round(i), d.y = Math.round(r), h = this.calcOutcode(d, o)) : (c.x = Math.round(i), c.y = Math.round(r), u = this.calcOutcode(c, o))), !l;);
				if (a) return {
					pixel0: new Pixel(d.x, d.y),
					pixel1: new Pixel(c.x, c.y),
					clip: !! s
				}
			},
			calcOutcode: function(t, e) {
				var o = {
					top: 0,
					bottom: 0,
					right: 0,
					left: 0,
					all: 0
				},
					n = t.x,
					i = t.y;
				return i < e.minY ? (o.top = 8, o.all += o.top) : i > e.maxY && (o.bottom = 4, o.all += o.bottom), n > e.maxX ? (o.right = 2, o.all += o.right) : n < e.minX && (o.left = 1, o.all += o.left), o
			},
			douglasPeucker: function(t, e) {
				if (0 == e) return t;
				for (var o = 0, n = 0, i = 1, r = t.length - 1; i < r; i++) {
					var a = this.getDistance(t[i], t[0], t[t.length - 1]);
					o < a && (n = i, o = a)
				}
				var s = [];
				if (e <= o) {
					var l = t.slice(0, n),
						d = t.slice(n, t.length),
						c = this.douglasPeucker(l, e),
						h = this.douglasPeucker(d, e);
					for (i = 0, r = c.length; i < r; i++) s.push(c[i]);
					for (i = 0, r = h.length; i < r; i++) s.push(h[i])
				} else s.push(t[0]), s.push(t[t.length - 1]);
				return s
			},
			pointInPolygon: function(t, e) {
				for (var o = t[0], n = t[1], i = !1, r = 0, a = e.length - 2; r < e.length; r += 2) {
					var s = e[r],
						l = e[r + 1],
						d = e[a],
						c = e[a + 1];
					n < l != n < c && o < (d - s) * (n - l) / (c - l) + s && (i = !i), a = r
				}
				return i
			},
			getDistance: function(t, e, o) {
				var n = e.lng - o.lng,
					i = e.lat - o.lat;
				if (0 == n) return Math.abs(t.lng - e.lng);
				if (0 == i) return Math.abs(t.lat - e.lat);
				var r = i / n,
					a = e.lat - r * e.lng;
				return Math.abs(r * t.lng - t.lat + a) / Math.sqrt(r * r + 1)
			},
			encodeTileUrl: function(t) {
				for (var e = "", o = 0; o < t.length; o++) {
					var n = (l = t.charCodeAt(o) << 1).toString(2),
						i = n;
					n.length < 8 && (i = (i = "00000000" + n).substr(n.length, 8)), e += i
				}
				var r = 5 - e.length % 5,
					a = [];
				for (o = 0; o < r; o++) a[o] = "0";
				e = a.join("") + e;
				var s = [];
				for (o = 0; o < e.length / 5; o++) {
					var l = e.substr(5 * o, 5),
						d = parseInt(l, 2) + 50;
					s.push(String.fromCharCode(d))
				}
				return s.join("") + r.toString()
			},
			pixelToLngLat: function(t, e, o) {
				return this.convertMC2LL([t / Math.pow(2, o - 18), e / Math.pow(2, o - 18)])
			},
			lngLatToPixel: function(t, e, o) {
				var n = this.convertLL2MC([t, e]),
					i = n[0] * Math.pow(2, o - 18),
					r = n[1] * Math.pow(2, o - 18);
				return [Math.ceil(i), Math.ceil(r)]
			},
			pointToLngLat: function(t, e) {
				return this.convertMC2LL([t, e])
			},
			lngLatToPoint: function(t, e) {
				return this.convertLL2MC([t, e])
			},
			translatePoint: function(t) {
				var o = this,
					e = $.extend(!0, {}, {
						points: [],
						from: 0,
						to: 0
					}, t),
					n = [];
				return 6 === e.from && 5 === e.to ? $.each(e.points, function(t, e) {
					n.push(o.pointToLngLat(e[0], e[1]))
				}) : $.each(e.points, function(t, e) {
					n.push(o.lngLatToPoint(e[0], e[1]))
				}), n
			},
			pointsStrToLngLatArr: function(t) {
				var i = this,
					r = [],
					e = t.split(",");
				return $.trim(e[0]) === $.trim(e[e.length - 1]) && e.pop(), $.each(e, function(t, e) {
					var o = $.trim(e).split(" "),
						n = i.pointToLngLat(o[0], o[1]);
					r.push(new BMap.Point(n[0], n[1]))
				}), r
			},
			convertLL2MC: function(t) {
				var e, o;
				t[0] = this.getLoop(t[0], -180, 180), t[1] = this.getRange(t[1], -74, 74), e = t.slice(0);
				for (var n = 0; n < s.length; n++) if (e[1] >= s[n]) {
					o = d[n];
					break
				}
				if (!o) for (n = s.length - 1; 0 <= n; n--) if (e[1] <= -s[n]) {
					o = d[n];
					break
				}
				var i = this.convertor(t, o);
				return t = [parseFloat(i[0].toFixed(2)), parseFloat(i[1].toFixed(2))]
			},
			convertMC2LL: function(t) {
				var e, o;
				e = [Math.abs(t[0]), Math.abs(t[1])];
				for (var n = 0; n < r.length; n++) if (r[n] <= e[1]) {
					o = l[n];
					break
				}
				var i = this.convertor(t, o);
				return t = [parseFloat(i[0].toFixed(12)), parseFloat(i[1].toFixed(12))]
			},
			convertor: function(t, e) {
				if (t && e) {
					var o = e[0] + e[1] * Math.abs(t[0]),
						n = Math.abs(t[1]) / e[9],
						i = e[2] + e[3] * n + e[4] * n * n + e[5] * n * n * n + e[6] * n * n * n * n + e[7] * n * n * n * n * n + e[8] * n * n * n * n * n * n;
					return [o *= t[0] < 0 ? -1 : 1, i *= t[1] < 0 ? -1 : 1]
				}
			},
			getRange: function(t, e, o) {
				return null != e && (t = Math.max(t, e)), null != o && (t = Math.min(t, o)), t
			},
			getLoop: function(t, e, o) {
				for (; o < t;) t -= o - e;
				for (; t < e;) t += o - e;
				return t
			},
			convertGCJ02ToBD09: function(t) {
				var e = {
					lng: 0,
					lat: 0
				},
					o = t.lng,
					n = t.lat,
					i = Math.sqrt(o * o + n * n) + 2e-5 * Math.sin(n * a),
					r = Math.atan2(n, o) + 3e-6 * Math.cos(o * a);
				return e.lng = Math.round(1e6 * (i * Math.cos(r) + .0065)) / 1e6, e.lat = Math.round(1e6 * (i * Math.sin(r) + .006)) / 1e6, e
			},
			convertBD09ToGCJ02: function(t) {
				var e = {
					lng: 0,
					lat: 0
				},
					o = t.lng - .0065,
					n = t.lat - .006,
					i = Math.sqrt(o * o + n * n) - 2e-5 * Math.sin(n * a),
					r = Math.atan2(n, o) - 3e-6 * Math.cos(o * a);
				return e.lng = Math.round(i * Math.cos(r) * 1e6) / 1e6, e.lat = Math.round(i * Math.sin(r) * 1e6) / 1e6, e
			}
		},
		h = {
			loadedCbk: function(t) {},
			errorCbk: function(t) {}
		},
		u = function(t, e) {
			e = e || {}, c.extend(h, e);
			var o = m.create("script", {
				src: t,
				type: "text/javascript",
				charset: "utf-8"
			});
			o.addEventListener ? (o.addEventListener("load", function(t) {
				var e = t.target;
				e.parentNode.removeChild(e)
			}, !1), o.addEventListener("loaded", function(t) {
				h.loadedCbk && h.loadedCbk([, , , , , ])
			}, !1), o.addEventListener("error", function(t) {
				h.errorCbk && h.errorCbk([, , , , , ])
			}, !1)) : o.attachEvent && o.attachEvent("onreadystatechange", function(t) {
				var e = window.event.srcElement;
				!e || "loaded" != e.readyState && "complete" != e.readyState || e.parentNode.removeChild(e)
			}), document.getElementsByTagName("head")[0].appendChild(o), o = null
		},
		f = {
			imgPath: "//webmap0.bdimg.com/image/api/",
			tileUrls: {
				http: ["https://ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile", "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile"],
				https: ["https://ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile", "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile", "https://ss2.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile", "https://ss3.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=vtile"]
			},
			vctMapStyleDomain: "https://ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/sty/",
			iconUrls: ["https://ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/sty/map_icons2x/", "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/sty/map_icons2x/"],
			poiUrl: "http://api.map.baidu.com/?qt=inf&operate=mapclick&clicktype=tile&ie=utf-8&oue=1&fromproduct=jsapi&res=api"
		};
	c.browser.ie ? c.extend(f, {
		distCursor: "url(" + f.imgPath + "ruler.cur),crosshair",
		defaultCursor: "url(" + f.imgPath + "openhand.cur),default",
		draggingCursor: "url(" + f.imgPath + "closedhand.cur),move"
	}) : c.browser.firefox ? c.extend(f, {
		distCursor: "url(" + f.imgPath + "ruler.cur),crosshair",
		defaultCursor: "-moz-grab",
		draggingCursor: "-moz-grabbing"
	}) : c.browser.chrome || c.browser.safari ? (c.extend(f, {
		distCursor: "url(" + f.imgPath + "ruler.cur) 2 6,crosshair",
		defaultCursor: "url(" + f.imgPath + "openhand.cur) 8 8,default",
		draggingCursor: "url(" + f.imgPath + "closedhand.cur) 8 8,move"
	}), (c.platform.isIphone || c.platform.isIpad) && (f.defaultCursor = "-webkit-grab", f.draggingCursor = "-webkit-grabbing")) : c.extend(f, {
		distCursor: "url(" + f.imgPath + "ruler.cur),crosshair",
		defaultCursor: "url(" + f.imgPath + "openhand.cur),default",
		draggingCursor: "url(" + f.imgPath + "closedhand.cur),move"
	});
	var g = c.lang.Event;

	function p(t, e, o) {
		this._map = t, this.container = t.getContainer(), this._indoorMgr = e, this._indoorInfo = o, this._visible = !0, this._adjustVisible = !0, this._bottomOffset = 0, this._init()
	}
	p.prototype = {
		_init: function() {
			this._render(), this._bindDom(), this._bind(), this._adjustDisplayHeight()
		},
		_render: function() {
			if (this._indoorInfo) {
				var t = this._div = m.create("div");
				c.ac(t, "floor-select-container"), c.ac(t, "all-border-radius");
				var e = this._btnTop = m.create("button");
				c.ac(e, "floor-switch-top"), c.ac(e, "top-border-radius");
				var o = m.create("div");
				c.ac(o, "floor-switch-top-icon"), e.appendChild(o);
				var n = this._btnBottom = m.create("button"),
					i = m.create("div");
				c.ac(i, "floor-switch-bottom-icon"), n.appendChild(i), c.ac(n, "floor-switch-bottom"), c.ac(n, "bottom-border-radius");
				var r = this._floorsContainer = m.create("div");
				c.ac(r, "floors-container"), r.appendChild(this._createFloorsDom()), this._div.appendChild(e), this._div.appendChild(r), this._div.appendChild(n);
				var a = 0;
				"" === this._btnTop.style.display && (a = 30), this._div.style.height = parseInt(this._floorsContainer.style.height, 10) + a + "px", this._div.style.bottom = "55px", this.container.appendChild(this._div);
				var s = this;
				setTimeout(function() {
					s._div.style.left = "10px"
				}, 20)
			}
		},
		_createFloorsDom: function() {
			if (this._indoorInfo) { //splice(2, 0, arr2)
			    if(this._indoorInfo.name == "南京南站"){
					this._indoorInfo.floors.splice(0, 0, "B1")
				}
				for (var t = this._ol = m.create("ol"), e = this._indoorInfo.currentFloor, o = this._indoorInfo.floors.length-1; 0 <= o; o--) {
					var n = this._indoorInfo.floors[o],
						i = m.create("li"),
						r = m.create("button");
					c.ac(r, "btn-select-floor"), n === e && c.ac(r, "selected"), r.setAttribute("data-floor", n), r.innerHTML = n, i.appendChild(r), t.appendChild(i)
				}
				return t
			}
		},
		updateUI: function() {
			if (!this._ol) return this._render(), this._bind(), void this._adjustDisplayHeight();
			this._ol = null, this._ol = this._createFloorsDom(), this._floorsContainer.innerHTML = "", this._floorsContainer.appendChild(this._ol), this._adjustDisplayHeight()
		},
		_bind: function() {
			var t = this._map,
				r = this;
			t.addEventListener("indoor_status_changed", function(t) {
				if (!1 !== r._visible) {
					var e = r._ol;
					if (t.uid) for (var o = t.floor, n = 0; n < e.children.length; n++) {
						var i = e.children[n].children[0];
						i.getAttribute("data-floor") === o ? c.ac(i, "selected") : c.rc(i, "selected")
					}
				}
			}), t.addEventListener("zoomend", function(t) {
				!r._indoorMgr.config.enableIndoor || this.getZoom() < r._indoorMgr.config.minZoom ? r._setAdjustVisbile(!1) : r._setAdjustVisbile(!0)
			})
		},
		_bindDom: function() {
			var n = this;
			c.on(this._floorsContainer, "click", function(t) {
				var e = t.target || t.srcElement;
				if ("button" === e.tagName.toLowerCase()) {
					n._indoorMgr.showIndoor(n._indoorInfo.uid, e.getAttribute("data-floor"));
					var o = new g("onindoor_bar_click");
					o.uid = n._indoorInfo.uid, n._map.dispatchEvent(o)
					if(n._indoorInfo.name == "南京南站"){
						if(n._tileLayer){
							n._map.removeTileLayer(n._tileLayer);
						}
						if(e.innerHTML == "B1"){
							n._drawNanjinUnderground();
						} 
				    }
				}
			}), c.on(this._floorsContainer, "mouseover", function(t) {
				var e = t.target;
				"button" === e.tagName.toLowerCase() && c.ac(e, "hover")
			}), c.on(this._floorsContainer, "mouseout", function(t) {
				var e = t.target;
				"button" === e.tagName.toLowerCase() && c.rc(e, "hover")
			}), c.on(this._btnTop, "mouseover", function(t) {
				this._disable || c.ac(this, "hover")
			}), c.on(this._btnTop, "mouseout", function(t) {
				c.rc(this, "hover")
			}), c.on(this._btnBottom, "mouseover", function(t) {
				this._disable || c.ac(this, "hover")
			}), c.on(this._btnBottom, "mouseout", function(t) {
				c.rc(this, "hover")
			}), c.on(this._btnTop, "click", function(t) {
				n._setBarSliderTop(parseInt(n._ol.style.top, 10) + 26)
			}), c.on(this._btnBottom, "click", function(t) {
				n._setBarSliderTop(parseInt(n._ol.style.top, 10) - 26)
			}), c.on(this._div, "mousemove", function(t) {
				m.stopBubble(t)
			}), c.on(this._div, "wheel", function(t) {
				m.stopAndPrevent(t)
			}), c.on(this._div, "mousewheel", function(t) {
				m.stopAndPrevent(t)
			}), c.on(window, "resize", function() {
				n._adjustDisplayHeight()
			})
			if(n._indoorInfo.name == "南京南站"){
				if(n._indoorInfo.currentFloor == "B1"){
					n._drawNanjinUnderground();
				}
			}
			
		},
		_drawNanjinUnderground:function(){
			var _this = this;
			var map = _this._map;
			var tileLayer = new BMap.TileLayer({isTransparentPng: true});
			_this._tileLayer = tileLayer;
			_this._tileLayer.getTilesUrl = function(tileCoord, zoom) {
				var x = tileCoord.x;
				var y = tileCoord.y;
				return '../main/map/' + zoom + '/tile-' + x + '_' + y + '.png';  //根据当前坐标，选取合适的瓦片图
			}
			map.addTileLayer(_this._tileLayer);
		},
		_adjustDisplayHeight: function() {
			if (this._indoorInfo) {
				var t = window.innerHeight - 291 - 100,
					e = this._indoorInfo.floors.length,
					o = 26 * e,
					n = e,
					i = 0;
				for (this._showArrow = t < o; t < o && 0 !== n;) o = 26 * --n + 30, i = 30;
				this._currentDisplayHeight = o, n < 3 ? this._setAdjustVisbile(!1) : this._setAdjustVisbile(!0), this._floorsContainer.style.height = 26 * n + "px";
				for (var r = this._indoorInfo.currentFloor, a = 0; a < this._indoorInfo.floors.length; a++) if (this._indoorInfo.floors[a] === this._indoorInfo.currentFloor) {
					r = a;
					break
				}
				this._div.style.height = parseInt(this._floorsContainer.style.height, 10) + i + "px";
				var s = 26 * -(e - (r + Math.round(n / 2)));
				this._setBarSliderTop(s), n < e ? (c.show(this._btnTop), c.show(this._btnBottom)) : (c.hide(this._btnTop), c.hide(this._btnBottom), this._setBarSliderTop(0))
			}
		},
		_setBarSliderTop: function(t) {
			var e = this._indoorInfo.floors.length,
				o = 26 * e;
			this._currentDisplayHeight && (o = this._showArrow ? this._currentDisplayHeight - 30 : this._currentDisplayHeight), 26 * e <= o - t ? (t = o - 26 * e, c.ac(this._btnBottom, "disable"), c.rc(this._btnBottom, "hover"), this._btnBottom._disable = !0) : (c.rc(this._btnBottom, "disable"), this._btnBottom._disable = !1), 0 <= t ? (t = 0, c.ac(this._btnTop, "disable"), c.rc(this._btnTop, "hover"), this._btnTop._disable = !0) : (c.rc(this._btnTop, "disable"), this._btnTop._disable = !1), this._ol.style.top = t + "px"
		},
		_setAdjustVisbile: function(t) {
			this._adjustVisible !== t && ((this._adjustVisible = t) && this._visible ? this._div.style.right = "20px" : this._div.style.right = "-30px")
		},
		setInfo: function(t) {
			this._indoorInfo && this._indoorInfo.uid === t.uid || (this._indoorInfo = t, this.updateUI())
		},
		getInfo: function() {
			return this._indoorInfo
		},
		getFloors: function() {
			if (this._indoorInfo) return this._indoorInfo.floors
		},
		show: function() {
			!0 !== this._visible && (this._visible = !0, this._div.style.left = "20px")
		},
		hide: function() {
			!1 !== this._visible && (this._visible = !1, this._div.style.right = "-30px")
		}
	};
	c.lang.Event;
	var G = {
		parse: function(t, o, e, n, i) {
			var r = n._map,
				a = n._indoorMgr,
				s = r.getZoom(),
				l = Math.pow(2, 18 - s),
				d = a.mercatorProjection.lngLatToPoint(r.getCenter()),
				c = d.x,
				h = d.y,
				u = r.getSize(),
				f = u.width,
				g = u.height,
				p = [];
			for (var m in t) if ("parsedLabelData" !== m && s === t[m].tileInfo[2]) {
				var v = [],
					_ = t[m].tileInfo;
				v.x = _[0], v.y = _[1], v.z = _[2];
				for (var b = (_[0] * e * l - c) / l + f / 2, y = (h - (_[1] + 1) * e * l) / l + g / 2, w = 0; w < t[m].length; w++) t[m][w].indoorLabelData && this.parseLabel(t[m][w].indoorLabelData, _, n, o, e, b, y, s, l, f, g, v, !0, window.indoorStyle);
				p.push(v)
			}
			if (/collision=0/.test(location.search)) for (var x = [], I = 0; I < p.length; I++) for (w = 0; w < p[I].length; w++) x.push(p[I][w]);
			else x = this.preComputeLabel(p, n._map.getZoom());
			for (I = 0; I < x.length; I++) {
				var S = x[I];
				if (!S.isDel && "fixed" === S.type) {
					var M = !1;
					if (S.icon && S.style && 4 === S.direction && (M = !0), S.icon) if (M) {
						var C = this;
						this.drawIcon(o, S, n, M, function(t) {
							for (var e = 0; e < t.textPos.length; e++) C.drawText(o, t.textPos[e].destX, t.textPos[e].destY, t.textPos[e].text, t.style, n)
						})
					} else this.drawIcon(o, S, n);
					if (S.style && !M) for (w = 0; w < S.textPos.length; w++) this.drawText(o, S.textPos[w].destX, S.textPos[w].destY, S.textPos[w].text, S.style, n)
				}
			}
			return a._computedLabels = x, p
		},
		parseLabel: function(t, e, o, n, i, r, a, s, l, d, c, h, u, f) {
			var g = t[1];
			if (g) {
				var p = n,
					m = s;
				9 === m && (m = 8);
				for (var v = e[0] * i * l, _ = e[1] * i * l, b = 0; b < g.length; b++) {
					var y = g[b],
						w = y[0],
						x = o.getStyleFromCache(w, "point", m, f),
						I = o.getStyleFromCache(w, "pointText", m, f),
						S = y[1];
					if (S) {
						var M = null,
							C = 100,
							T = 0,
							D = 0;
						x && x[0] ? (M = (x = x[0]).icon, C = x.zoom || 100) : x = null, I = I && I[0] ? I[0] : null;
						for (var L = 0; L < S.length; L++) {
							var P = S[L][4];
							if (P) {
								var R = P[2];
								if (o.isVisible(R, s)) {
									var B = Math.round(P[0] / 100),
										k = Math.round(P[1] / 100),
										A = {
											lng: v + B,
											lat: _ + k
										},
										F = B / l + r,
										Z = i - k / l + a;
									if (u || !(F < -50 || Z < -50 || d + 50 < F || c + 50 < Z)) {
										var E = P[7] || "",
											N = {
												type: "fixed",
												bds: [],
												pt: A,
												uid: P[3] || "",
												name: E,
												rank: P[4],
												iconPos: null,
												zoom: m,
												textPos: [],
												originPos: [F, Z],
												style: I,
												tilePosStr: P[0] + "," + P[1]
											};
										if (null !== M) {
											var O = window.iconSetInfo_high[M];
											O || "711" === M && (O = window.iconSetInfo_high._711), O && (T = (T = O[2]) / 2 * C / 100, D = (D = O[3]) / 2 * C / 100, N.iconPos = {
												destX: F - T / 2,
												destY: Z - D / 2,
												width: T,
												height: D
											}, N.icon = M)
										}
										if (I) {
											var X = P[5];
											"number" != typeof X && (X = 0);
											var Y = 0,
												z = 0,
												U = I.fontSize / 2,
												j = .2 * U;
											p.font = G.getFontStyle(I, o);
											var V = E.split("\\"),
												H = V.length;
											N.direction = X;
											for (var K = 0; K < H; K++) {
												var q = V[K],
													W = p.measureText(q).width;
												switch (X) {
												case 3:
													Y = F - W - T / 2, z = Z - U / 2 * H - j * (H - 1) / 2 + U * K + j * K;
													break;
												case 1:
													Y = F + T / 2, z = Z - U / 2 * H - j * (H - 1) / 2 + U * K + j * K;
													break;
												case 2:
													Y = F - W / 2, z = Z - D / 2 - U * H - j * (H - 1) - j + U * K + j * K;
													break;
												case 0:
													Y = F - W / 2, z = Z + D / 2 + j / 2 + U * K + j * K;
													break;
												case 4:
													Y = F - W / 2, z = Z - U / 2 * H - j * (H - 1) / 2 + U * K + j * K
												}
												N.textPos.push({
													destX: Y,
													destY: z,
													width: W,
													height: U,
													text: q
												})
											}
										}
										h.push(N)
									}
								}
							}
						}
					}
				}
			}
		},
		drawIcon: function(t, e, o, n, i) {
			var r = e.icon;
			if (G.iconCache[r]) {
				var a = G.iconCache[r];
				this.drawIconImage(t, e, a, n, i)
			} else {
				var s = o.getIconUrl(r),
					l = new Image,
					d = this;
				l.onload = function() {
					G.iconCache[r] = this, d.drawIconImage(t, e, this, n, i), l.onload = null
				}, l.src = s
			}
		},
		drawIconImage: function(t, e, o, n, i) {
			var r = e.iconPos,
				a = r.destX,
				s = r.destY,
				l = null,
				d = null,
				c = !0,
				h = e.style ? e.style.sid : null;
			if (e.style && 62203 === h) {
				for (var u = d = l = 0; u < e.textPos.length; u++) l < e.textPos[u].width && (l = e.textPos[u].width), d += 20;
				l = Math.ceil(l) + 10
			}
			n && 519 === h && (c = !1), null !== l && null !== d ? this.drawStretchedIcon(t, e, o, 8, l, d) : n && c ? (a -= ((l = Math.ceil(e.textPos[0].width) + 6) - o.width / 2) / 2, this.draw3StretchedIcon(t, e, o, 12, l, o.height / 2)) : t.drawImage(o, a, s, r.width, r.height), i && i(e)
		},
		drawStretchedIcon: function(t, e, o, n, i, r) {
			var a = e.originPos[0] - i / 2,
				s = e.originPos[1] - r / 2;
			0 < navigator.userAgent.indexOf("iPhone") && (s += 1);
			var l = n / 2;
			t.drawImage(o, 0, 0, n, n, a, s, l, l), t.drawImage(o, n, 0, 1, n, a + l, s, i - 2 * l, l), t.drawImage(o, o.width - n, 0, n, n, a + i - l, s, l, l), t.drawImage(o, 0, n, n, 1, a, s + l, l, r - 2 * l), t.drawImage(o, n, n, 1, 1, a + l, s + l, i - 2 * l, r - 2 * l), t.drawImage(o, o.width - n, n, n, 1, a + i - l, s + l, l, r - 2 * l), t.drawImage(o, 0, o.height - n, n, n, a, s + r - l, l, l), t.drawImage(o, n, o.height - n, 1, n, a + l, s + r - l, i - 2 * l, l), t.drawImage(o, o.width - n, o.height - n, n, n, a + i - l, s + r - l, l, l)
		},
		draw3StretchedIcon: function(t, e, o, n, i, r) {
			var a = e.originPos[0] - i / 2,
				s = e.originPos[1] - r / 2,
				l = n / 2;
			t.drawImage(o, 0, 0, n, o.height, a, s, l, o.height / 2), t.drawImage(o, n, 0, 1, o.height, a + l, s, i - 2 * l, o.height / 2), t.drawImage(o, o.width - n, 0, n, o.height, a + i - l, s, l, o.height / 2)
		},
		drawText: function(t, e, o, n, i, r) {
			t.font = G.getFontStyle(i, r), t.fillStyle = i.fontRgba, 0 < i.haloSize && (t.strokeStyle = i.haloRgba, t.strokeText(n, e, o)), t.fillText(n, e, o)
		},
		getFontStyle: function(t, e) {
			var o = 2 === t.fontWeight ? "italic" : "",
				n = t.fontSize / 2,
				i = o;
			return e.isIphone ? (i += " bold", i += " " + n + "px", i += ' arial, "PingFang SC", sans-serif') : (i += " " + n + "px", i += " arial, sans-serif"), i
		},
		preComputeLabel: function(t, e) {
			var o = [],
				n = 0;
			5 === e && (n = 1), t.sort(function(t, e) {
				return t.x * t.y < e.x * e.y ? -1 : 1
			});
			for (var i = 0, r = t.length; i < r; i++) for (var a = t[i], s = (a.x, a.y, a.z, 0), l = a.length; s < l; s++) {
				var d = a[s],
					c = void 0,
					h = void 0,
					u = void 0,
					f = void 0;
				if ("fixed" === d.type) {
					var g = d.iconPos,
						p = d.textPos;
					g && (c = g.destX, h = g.destY, u = g.destX + g.width, f = g.destY + g.height);
					for (var m = 0; m < p.length; m++) {
						var v = p[m];
						void 0 !== c ? (v.destX < c && (c = v.destX), v.destY < h && (h = v.destY), v.destX + v.width > u && (u = v.destX + v.width), v.destY + v.height > f && (f = v.destY + v.height)) : (c = v.destX, h = v.destY, u = v.destX + v.width, f = v.destY + v.height)
					}
				} else if ("line" === d.type) c = d.minX, h = d.minY, u = d.maxX, f = d.maxY;
				else if ("biaopai" === d.type) {
					var _ = d.pos;
					c = _.destX, h = _.destY, u = _.destX + _.width, f = _.destY + _.height
				}
				void 0 !== c && (d.minX = c, d.minY = h, d.maxX = u, d.maxY = f, d.bds = [c, h, u, f], o.push(d))
			}
			o.sort(function(t, e) {
				return e.rank - t.rank || e.minX - t.minX || e.minY - t.minY
			});
			for (i = 0, r = o.length; i < r; i++) {
				var b = o[i];
				for (b.isDel = !1, b.arrIntersectIndex = [], s = i + 1; s < r; s++) {
					var y = o[s];
					b.maxX - n < y.minX || b.minX > y.maxX - n || b.maxY - n < y.minY || b.minY > y.maxY - n || b.arrIntersectIndex.push(s)
				}
			}
			for (i = 0, r = o.length; i < r; i++) {
				var w = o[i];
				if (!1 === w.isDel) {
					var x = w.arrIntersectIndex;
					for (s = 0, l = x.length; s < l; s++) {
						o[x[s]].isDel = !0
					}
				}
			}
			return o
		},
		iconCache: {}
	};

	function v(t) {
		this._initVars(t), this._initColorCanvas(), this._bindEvent(t)
	}
	v.prototype = {
		_initVars: function(t) {
			this._map = t._map, this._indoorMgr = t, this._labelCtx = t._labelCtx, this.ratio = this._indoorMgr.ratio, this.sizeRatio = 1 < this.ratio ? 2 : 1, this.RANK1 = 1e6, this.RANK2 = 2e6, this.RANK3 = 3e6, this.RANK4 = 4e6, this.RANK5 = 5e6
		},
		_initColorCanvas: function() {
			var t = m.create("canvas"),
				e = t.style;
			e.width = "256px", e.height = "256px", t.width = 256, t.height = 256, this._colorCvsSize = 256, this._colorCvs = t, this._colorCtx = t.getContext("2d")
		},
		getLabelImageData: function(t, e, o) {
			var n = t.textPos,
				i = this.ratio,
				r = this.sizeRatio / i,
				a = this._colorCtx,
				s = this._colorCvsSize;
			a.clearRect(0, 0, s, s);
			for (var l = t.style, d = (l = {
				fontSize: t.style.fontSize / r,
				fontRgba: t.style.fontRgba,
				haloSize: t.style.haloSize,
				haloRgba: t.style.haloRgba,
				fontWeight: t.style.fontWeight
			}).fontSize / 2, c = .2 * d, h = n[0].width / r, u = 0, f = 0, g = n.length; f < g; f++) {
				var p = n[f],
					m = p.text,
					v = (p.destX - t.minX) / r,
					_ = d * (f + 1) + c * f - 1 / r;
				G.drawText(a, v, _, m, l, this._indoorMgr.vectorDrawLib), p.width / r > h && (h = p.width / r), u += (p.height + c) / r
			}
			return [a.getImageData(0, 0, h, u), a.getImageData(0, 0, h, u)]
		},
		_bindEvent: function(n) {
			var i = this,
				t = n._map;
			t.addEventListener("onhotspotover", function(t) {
				if (n.temp.isPermitSpotOver && t.spots[0].tag === n.indoorHotspotTarget && 0 < t.spots.length) {
					var e = t.spots[0].getUserData().uid;
					n.temp.curSpots[e] = t.spots[0];
					var o = i.findLabelByUid(e);
					o && (o && i._toHighLightColor(o), t.uid = e, t.labelInfo = o, i._indoorMgr.config.labelMouseOver(t))
				}
			}), t.addEventListener("onhotspotout", function(t) {
				if (n.temp.isPermitSpotOver && t.spots[0].tag === n.indoorHotspotTarget && 0 < t.spots.length) {
					var e = t.spots[0].getUserData().uid;
					delete n.temp.curSpots[e];
					var o = i.findLabelByUid(e);
					o && (o && i._toDefaultColor(o), t.uid = e, t.labelInfo = o, i._indoorMgr.config.labelMouseOut(t))
				}
			}), t.addEventListener("onhotspotclick", function(t) {
				if (t.spots[0].tag === n.indoorHotspotTarget) if (t.spots && 0 < t.spots.length) {
					var e = t.spots[0].getUserData().uid,
						o = i.findLabelByUid(e);
					o && (o && i._changeBaseMapState(o), t.uid = e, t.labelInfo = o, t.point = t.spots[0].getPosition(), i._indoorMgr.config.labelClick(t))
				} else i._recoverNormalState()
			}), t.addEventListener("spot_status_reset", function() {
				i._recoverNormalState()
			})
		},
		_getTextBound: function(t) {
			if (!t.textPos || 0 === t.textPos.length) return null;
			for (var e = this.ratio, o = this.sizeRatio / e, n = t.textPos, i = 0 * e + (n[0].destX - 0) / o, r = 0 * e + (n[0].destY - 0) / o, a = i + n[0].width / o, s = r + n[0].height / o, l = 0, d = n.length; l < d; l++) {
				var c = n[l],
					h = 0 * e + (c.destX - 0) / o;
				h < i && (i = h);
				var u = 0 * e + (c.destY - 0) / o;
				u < r && (r = u), h + c.width > a && (a = h + c.width), u + c.height > s && (s = u + c.height)
			}
			return [i, r, a, s]
		},
		getFilterImageData: function(t, e) {
			for (var o = t.data, n = 0, i = o.length; n < i; n += 4) {
				var r = o[n],
					a = o[n + 1],
					s = o[n + 2];
				if (0 !== o[n + 3]) {
					var l = Math.round((r + a + s) / 3) - 90;
					l = l < 0 ? 0 : l, o[n] = 51 + 1.3 * l, o[n + 1] = 133 + .8 * l, o[n + 2] = 255
				}
			}
			return t
		},
		_toHighLightColor: function(t) {
			if (!t._tempRank || t._tempRank != this.RANK5) {
				var e = this._getTextBound(t);
				if (e) {
					var o = Math.round(e[0]),
						n = Math.round(e[1]),
						i = this.getLabelImageData(t, o, n),
						r = i[0],
						a = i[1],
						s = this.getFilterImageData(r, this.RANK5);
					t._oldImgData = a, t._tempRank = this.RANK5, this._labelCtx.putImageData(s, o, n)
				}
			}
		},
		_toDefaultColor: function(t) {
			if (t._oldImgData) {
				this.sizeRatio;
				var e = this._getTextBound(t);
				if (!e) return;
				t._tempRank = this.RANK1, this._labelCtx.putImageData(t._oldImgData, Math.round(e[0]), Math.round(e[1])), t._oldImgData = null
			}
		},
		_changeBaseMapState: function(t) {
			this._indoorMgr, t.uid, t.guidExt
		},
		_recoverNormalState: function() {
			this._indoorMgr
		},
		findLabelByUid: function(t) {
			for (var e = this._indoorMgr, o = e._computedLabels, n = 0, i = o.length; n < i; n++) {
				var r = o[n];
				if (e.isClickableLabel(r) && r.uid == t) return r
			}
			return null
		}
	};
	var _ = {
		drawPoly: function(t, e, o, n, i, r) {
			var a = t[1];
			if (a) for (var s = t[6], l = 0; l < a.length; l++) {
				var d = a[l][0],
					c = i.getStyleFromCache(d, "polygon", o, r);
				if (c && c.length || (c = i.getStyleFromCache(d, "polygon", o - 1, r)), c && c.length) for (var h = a[l][1], u = 0; u < h.length; u++) {
					var f, g = h[u][1],
						p = g[0];
					if (i.isVisible(p, o)) g["cache" + o] || (g["cache" + o] = i.parseMidPoint(g[1], o, n, s)), f = g["cache" + o], this.drawSurface(e, f, c)
				}
			}
		},
		drawSurface: function(t, e, o) {
			var n = o[0];
			t.fillStyle = n.fillRgba, t.beginPath(), t.moveTo(e[0], e[1]);
			for (var i = 2, r = e.length; i < r; i += 2) t.lineTo(e[i], e[i + 1]);
			t.closePath(), n.borderWidth && (t.strokeStyle = n.borderRgba, t.lineWidth = n.borderWidth / 2, t.stroke()), t.fill()
		},
		drawSurfaceBorder: function(t, e, o) {
			var n = o[0];
			t.beginPath(), t.moveTo(e[0], e[1]);
			for (var i = 2, r = e.length; i < r; i += 2) t.lineTo(e[i], e[i + 1]);
			t.closePath(), t.strokeStyle = n.borderRgba, t.lineWidth = n.borderWidth / 2, t.stroke()
		},
		drawSurfaceFill: function(t, e, o) {
			var n = o[0];
			t.fillStyle = n.fillRgba, t.beginPath(), t.moveTo(e[0], e[1]);
			for (var i = 2, r = e.length; i < r; i += 2) t.lineTo(e[i], e[i + 1]);
			t.closePath(), t.fill()
		}
	};
	window.FeatureStyle;

	function b(t, e) {
		this._drawLib = t, this._indoorMgr = e, this._map = t._map, this._indoorData = {}, this.layerIndex = 28
	}
	b.prototype = {
		parse: function(t, e, o) {
			this.layerIndex;
			this._indoorData = t;
			for (var n = o, i = {}, r = [], a = [], s = 0; s < t.length; s++) {
				t[s][0];
				for (var l = t[s][1], d = this.parseContour(l[2], e), c = l[3].slice(0), h = l[1], u = l[0], f = {
					defaultFloor: h,
					currentFloor: h,
					name: l[11],
					uid: u,
					floors: [],
					contour: d.contoursCoords,
					center: d.center,
					lnglat: m.pointToLngLat(d.center[0], d.center[1]),
					boundsMin: d.boundsMin,
					boundsMax: d.boundsMax,
					floorLength: c.length,
					tileKey: n
				}, g = 0; g < c.length; g++) {
					var p = c[g];
					f.floors[g] = p
				}
				i[u] = f, i.tileInfo = e
			}
			return 0 === r.length && (r = null), 0 === a.length && (a = null), {
				indoorDataResult: i,
				indoorBase: r,
				indoorBaseContour: a
			}
		},
		parseContour: function(t, e) {
			if (!t || !t[0] || !t[0][1]) return {
				contoursCoords: [],
				center: [0, 0]
			};
			for (var o = [], n = [0, 0], i = [20037726.37, 11028190.87], r = [-20037726.37, -10601580.79], a = 0, s = e.col, l = e.row, d = e.mercatorSize, c = s * d, h = l * d, u = 0; u < t.length; u++) {
				var f = t[u][1],
					g = [c + f[0] / 100, h + f[1] / 100];
				n[0] += g[0], n[1] += g[1], g[0] < i[0] && (i[0] = g[0]), g[1] < i[1] && (i[1] = g[1]), g[0] > r[0] && (r[0] = g[0]), g[1] > r[1] && (r[1] = g[1]);
				for (var p = 2; p < f.length; p += 2) g[p] = g[p - 2] + f[p] / 100, g[p + 1] = g[p - 1] + f[p + 1] / 100, n[0] += g[p], n[1] += g[p + 1], g[p] < i[0] && (i[0] = g[p]), g[p + 1] < i[1] && (i[1] = g[p + 1]), g[p] > r[0] && (r[0] = g[p]), g[p + 1] > r[1] && (r[1] = g[p + 1]);
				a += f.length, o.push(g)
			}
			return n[0] /= a / 2, n[1] /= a / 2, {
				contoursCoords: o,
				center: n,
				boundsMin: i,
				boundsMax: r
			}
		},
		draw: function(t, e, o, n) {
			n = n || {};
			for (var i = o.tileSize, r = 0; r < e.length; r++) {
				var a, s = e[r][0],
					l = e[r][1][0];
				a = "string" == typeof n.floorName && n.indoorUid === l ? n.floorName : this._indoorMgr._indoorData[l].currentFloor;
				var d = this.getDataByFloorName(s, a);
				if (d) for (var c = this._map.getZoom(), h = 0; h < d[3][0].length; h++) {
					var u = d[3][0][h];
					u && 7 === u[0] && _.drawPoly(u, t, c, i, this._drawLib, window.indoorStyle)
				}
			}
		},
		getDataByFloorName: function(t, e) {
			if ("number" == typeof e) return t[e];
			for (var o = 0; o < t.length; o++) if (t[o][0] === e) return t[o];
			return null
		},
		getPOIData: function(t, e) {
			e = e || {};
			for (var o = [], n = 0; n < t.length; n++) {
				var i, r = t[n][0],
					a = t[n][1][0];
				i = "string" == typeof e.floorName && e.indoorUid === a ? e.floorName : this._indoorMgr._indoorData[a].currentFloor;
				var s = this.getDataByFloorName(r, i);
				if (s) for (var l = 0; l < s[3][0].length; l++) 3 === s[3][0][l][0] && o.push(s[3][0][l])
			}
			return o
		}
	};
	var y = {},
		w = {},
		x = {},
		I = {},
		S = (window.FeatureStyle, window.indoorStyle, window.iconSetInfo_high),
		M = f.iconUrls,
		C = {
			3: {
				start: 3,
				base: 3
			},
			4: {
				start: 4,
				base: 5
			},
			5: {
				start: 4,
				base: 5
			},
			6: {
				start: 6,
				base: 7
			},
			7: {
				start: 6,
				base: 7
			},
			8: {
				start: 8,
				base: 9
			},
			9: {
				start: 8,
				base: 9
			},
			10: {
				start: 10,
				base: 10
			},
			11: {
				start: 11,
				base: 12
			},
			12: {
				start: 11,
				base: 12
			},
			13: {
				start: 11,
				base: 12
			},
			14: {
				start: 14,
				base: 15
			},
			15: {
				start: 14,
				base: 15
			},
			16: {
				start: 16,
				base: 17
			},
			17: {
				start: 16,
				base: 17
			},
			18: {
				start: 18,
				base: 19
			},
			19: {
				start: 18,
				base: 19
			},
			20: {
				start: 18,
				base: 19
			},
			21: {
				start: 18,
				base: 19
			}
		};

	function T(t, e) {
		this._map = t, this._indoorMgr = e, this._ratio = e.config.devicePixelRatio, this.zoomBaseMap = C, this.indoorDrawLib = new b(this, e), this.loadStyle()
	}
	T.prototype = {
		loadStyle: function() {
			if (!window.indoorStyle) {
				var t = "20171110",
					e = "001";
				"undefined" != typeof MSV && MSV.mapstyle && (t = MSV.mapstyle.updateDate, e = MSV.mapstyle.version);
				var o = f.vctMapStyleDomain,
					n = "udt=" + t + "&v=" + e,
					i = o + "icons_na2x.js?" + n,
					r = o + "indoor_fs.js?" + n;
				u(o + "fs.js?" + n), u(r), u(i)
			}
		},
		drawLabels: function(t, e, o, n, i) {
			M || (M = e), t.parsedLabelData = G.parse(t, o, n, this, i)
		},
		getStyleFromCache: function(t, e, o, n) {
			var i = t + "-" + e + "-" + o;
			return n ? (w[i] || (w[i] = this.getStyle(t, e, o, n)), w[i]) : (y[i] || (y[i] = this.getStyle(t, e, o)), y[i])
		},
		getStyle: function(t, e, o, n) {
			var i = n || window.FeatureStyle,
				r = i[2];
			if ("arrow" === e) return this.parseArrowStyle(r[2]);
			switch (e) {
			case "point":
				r = r[0];
				break;
			case "pointText":
				r = r[1];
				break;
			case "line":
				r = r[3];
				break;
			case "polygon":
				r = r[4];
				break;
			case "polygon3d":
				r = r[5]
			}
			var a = [],
				s = i[1][o][0][t];
			if (!s) return a;
			for (var l = 0; l < s.length; l++) {
				var d = r[s[l]];
				if (d) {
					switch (e) {
					case "polygon":
						d = this.parsePolygonStyle(d, t);
						break;
					case "line":
						d = this.parseLineStyle(d, t);
						break;
					case "pointText":
						d = this.parsePointTextStyle(d, t);
						break;
					case "point":
						d = this.parsePointStyle(d, t);
						break;
					case "polygon3d":
						d = this.parsePolygon3dStyle(d, t)
					}
					a[a.length] = d
				}
			}
			return a
		},
		parsePointTextStyle: function(t, e) {
			return {
				sid: e,
				fontRgba: this.parseRgba(t[0]),
				haloRgba: this.parseRgba(t[1]),
				backRgba: this.parseRgba(t[2]),
				fontSize: t[3],
				haloSize: t[4],
				fontWeight: t[5],
				fontStyle: t[6],
				density: t[7]
			}
		},
		parsePointStyle: function(t, e) {
			return {
				sid: e,
				rank: t[0],
				ucflag: t[1],
				icon: t[2],
				iconType: t[3],
				nineGG: t[4],
				density: t[5],
				zoom: t[6]
			}
		},
		parseLineStyle: function(t, e) {
			return {
				sid: e,
				borderRgba: this.parseRgba(t[0]),
				fillRgba: this.parseRgba(t[1]),
				borderWidth: t[2],
				fillWidth: t[3],
				borderCap: t[4],
				fillCap: t[5],
				haveBorderLine: t[6],
				haveBorderTexture: t[7],
				haveFillTexture: t[8],
				isUseBorderRgba: t[9],
				isUseFillRgba: t[10],
				borderTexture: t[11],
				fillTexture: t[12],
				borderTextureType: t[13],
				fillTextureType: t[14],
				isRealWidth: t[15],
				haveArrow: t[16],
				needRound: t[17],
				realBorderWidth: t[18]
			}
		},
		parsePolygonStyle: function(t, e) {
			return {
				sid: e,
				fillRgba: this.parseRgba(t[0]),
				borderRgba: this.parseRgba(t[1]),
				borderWidth: t[2],
				borderTexture: t[3],
				borderTextureType: t[4],
				waterStyle: t[5],
				haloStyle: t[6],
				textureStyle: t[7],
				thickRgba: this.parseRgba(t[8])
			}
		},
		parseArrowStyle: function(t) {
			for (var e in t) {
				var o = t[e];
				return {
					color: this.parseRgba(o[0]),
					iconType: o[1],
					icon: o[2]
				}
			}
		},
		parseRgba: function(t) {
			var e = t;
			if (I[e]) return I[e];
			var o = 255 & (t >>>= 0),
				n = t >> 8 & 255,
				i = t >> 16 & 255,
				r = (t >> 24 & 255) / 255;
			return I[e] = "rgba(" + o + "," + n + "," + i + "," + r + ")", I[e]
		},
		isVisible: function(t, e) {
			var o;
			return x[t] || ((o = t.toString(2)).length < 8 && (o = new Array(8 - o.length + 1).join("0") + o), x[t] = o), "1" === (o = x[t])[e - C[e].start]
		},
		getStartZoom: function(t, e) {
			var o;
			x[t] || ((o = t.toString(2)).length < 8 && (o = new Array(8 - o.length + 1).join("0") + o), x[t] = o), o = x[t];
			for (var n = C[e].start, i = C[e].end - n + 1, r = 0; r < i; r++) if ("1" === o[r]) return r + n;
			return 99
		},
		getIconVertexData: function(t, e) {
			if (!(S = window.iconSetInfo_high)) return this.getIconVertexData(t, e);
			var o = S[t];
			if (o || 48 <= t.charCodeAt(0) && t.charCodeAt(0) <= 57 && (o = S["_" + t]), o) {
				var n = o[0] / 2 * e,
					i = o[1] / 2 * e,
					r = Math.round(-n / 2),
					a = Math.round(-i / 2),
					s = r + n,
					l = a + i;
				return {
					vertex: [r, a, s, a, s, l, r, a, s, l, r, l],
					texcoord: null,
					width: n,
					height: i,
					iconType: t
				}
			}
			return null
		},
		addBounds: function(t) {
			var e = 1e3,
				o = 1e3,
				n = -1e3,
				i = -1e3;
			if (t.iconPos && t.iconPos.vertex) for (var r = t.iconPos.vertex, a = 0, s = r.length; a < s; a += 2) {
				(d = r[a]) < e && (e = d), n < d && (n = d), (c = r[a + 1]) < o && (o = c), i < c && (i = c)
			}
			if (t.textPos && t.textPos.vertex) {
				var l = t.textPos.vertex;
				for (a = 0, s = l.length; a < s; a += 2) {
					var d, c;
					(d = l[a]) < e && (e = d), n < d && (n = d), (c = l[a + 1]) < o && (o = c), i < c && (i = c)
				}
			}
			t.bds = [e, o, n, i]
		},
		getTextVertexData: function(t, e, o, n, i) {
			var r = t[5],
				a = textSizeRatio;
			"number" != typeof r && (r = DIR_BOTTOM);
			for (var s = t[12], l = s.length, d = [], c = [], h = 0, u = 0, f = 0; f < l; f++) u += Math.round(s[f][3] / a);
			for (f = 0; f < l; f++) {
				var g, p, m = s[f],
					v = m[0],
					_ = m[1],
					b = Math.round(m[2] / a),
					y = Math.round(m[3] / a);
				switch (0 === e && (r = DIR_CENTER), r) {
				case DIR_LEFT:
					var w = u / 2 - y + 2 * (l - 1) / 2;
					g = Math.round(-e / 2 - b - 2), p = Math.round(w - h - 2 * f);
					break;
				case DIR_RIGHT:
					w = u / 2 - y + 2 * (l - 1) / 2;
					g = Math.round(e / 2 + 2), p = Math.round(w - h - 2 * f);
					break;
				case DIR_TOP:
					w = o / 2 + u - y + 2 * l;
					g = Math.round(-b / 2), p = Math.round(w - h - 2 * f);
					break;
				case DIR_BOTTOM:
					w = -o / 2 - 2 - y;
					g = Math.round(-b / 2), p = Math.round(w - h - 2 * f);
					break;
				case DIR_CENTER:
					w = -u / 2 - 2 * (l - 1) / 2;
					g = Math.round(-b / 2), p = Math.round(w - h - 2 * f)
				}
				h += y;
				var x = g + Math.round(b),
					I = p,
					S = x,
					M = I + Math.round(y),
					C = g,
					T = M,
					D = v / n,
					L = (i - _ - y * a) / i,
					P = (v + b * a) / n,
					R = L,
					B = P,
					k = (i - _) / i,
					A = D,
					F = k;
				d.push(g, p, x, I, S, M, g, p, S, M, C, T), c.push(D, L, P, R, B, k, D, L, B, k, A, F)
			}
			return {
				vertex: d,
				texcoord: c
			}
		},
		parseMidPoint: function(t, e, o) {
			var n = [],
				i = C[e].base,
				r = Math.pow(2, e - i) / 100,
				a = t[0] * r,
				s = t[1] * r;
			n[n.length] = a, n[n.length] = o - s;
			for (var l = 2; l < t.length; l += 2) a += t[l] * r, s += t[l + 1] * r, n[n.length] = a, n[n.length] = o - s;
			return n
		},
		getIconUrl: function(t) {
			var e = t.length % M.length,
				o = this.getIconVersionInfo(),
				n = o.ver,
				i = o.udt;
			return M[e] + t + ".png?v=" + n + "&udt=" + i
		},
		getIconVersionInfo: function() {
			if (this.iconVersionInfo) return this.iconVersionInfo;
			var t = "undefined" != typeof MSV ? MSV.mapstyle : {},
				e = t.version ? t.version : "001",
				o = t.updateDate ? t.updateDate : "20150621";
			return this.iconVersionInfo = {
				ver: e,
				udt: o
			}, this.iconVersionInfo
		}
	};
	var D = c.lang.Event;

	function L(t, e) {
		var o = this;
		o.authentic_key = null, o._map = t, o.initMinZoom = 17, o.initMaxZoom = 21, o.mobileInitMaxZoom = 20, o.getPoiInfoOptions = {
			onRequestComplete: function(t) {},
			onRequestSuccess: function(t) {},
			onRequestError: function(t) {}
		}, o.config = {
			tileTypeName: "na",
			devicePixelRatio: window.devicePixelRatio || 2,
			buildingId: null,
			floor: null,
			minZoom: o.initMinZoom,
			maxZoom: o.initMaxZoom,
			enableIndoor: !0,
			showBaseMap: !0,
			showIndoorControl: !0,
			showLabel: !0,
			autoShowIndoorControl: !0,
			complete: function(t) {},
			beforeChangeFloor: function(t) {},
			afterChangeFloor: function(t) {},
			indoorClick: function(t) {},
			labelClick: function(t) {},
			labelMouseOver: function(t) {},
			labelMouseOut: function(t) {},
			getPoiInfoOptions: o.getPoiInfoOptions
		}, e = e || {}, c.extend(o.config, e), o.vectorDrawLib = {}, o.indoorDrawLib = {}, o._tileCache = {}, o._indoorData = {}, o._tileCanvas = {}, o.currentUid = null, o.currentFloor = null, o._indoorControl = null, o.curViewLabels = {}, o._computedLabels = [], o.labelCanvas = null, o.labelCtx = null, o._labelClick = new v(this), o.enterMethod = null, o.ratio = null, o.scaler = 1, o.areaSpots = {}, o.indoorHotspotTarget = "INDOOR_SPOT_INFO", o.temp = {
			spotsGuid: 1,
			curAreaSpot: null,
			curSpots: {},
			isRequestPoiByUid: !1,
			indoorId: o.config.buildingId,
			indoorFloor: o.config.floor,
			isPermitSpotOver: !0
		}, o.mapType = t.getMapType(), o._tileType = n.getInstance(this.config.tileTypeName), o.mercatorProjection = o.mapType.getProjection(), o.isDrawText = !1, o._indoorAddres = {}, o.callbackNum = 1, o._init()
	}
	L.prototype = {
		_init: function() {
			var t = this,
				e = t._map;
			t.authentic_key = e.getKey(), t.authentic_key && (t._checkZoom(), BMAP_NORMAL_MAP.setMaxZoom(t.config.maxZoom), e.setMaxZoom(t.config.maxZoom), t._map.highResolutionEnabled() && (t.scaler = 2), t.vectorDrawLib = new T(e, t), t.indoorDrawLib = t.vectorDrawLib.indoorDrawLib, t._bind(), setTimeout(function() {
				e.initIndoorLayer({
					tileUrls: f.tileUrls,
					urlOpts: {
						styles: "pl",
						extdata: 1,
						textimg: 0,
						mesh3d: 0
					},
					maxZoom: t.config.maxZoom
				}), t.config.buildingId && t.setIndoor(t.config.buildingId, t.config.floor)
			}, 1e3))
		},
		_bind: function() {
			var g = this,
				c = g._map;

			function d(t, e) {
				if (e) {
					for (var o in t.areaSpots) {
						var n = t.areaSpots[o];
						if (m.pointInPolygon([e.x, e.y], n.spot)) return o
					}
					return null
				}
			}
			c.addEventListener("updateindoor", function(t) {
				var e = t.IndoorCanvas[0],
					o = e.data;
				if (g.config.enableIndoor && g._map.getZoom() >= g.config.minZoom && void 0 !== o && void 0 !== o[1]) {
					var n = e.canvasID;
					g.setTileCache(n, e);
					var i = e.canvasDom,
						r = i.getContext("2d");
					g.ratio = e.ratio;
					var a = n.split("_"),
						s = parseInt(a[2], 0),
						l = parseInt(a[3], 0),
						d = parseInt(a[4], 0),
						c = parseInt(a[5], 0),
						h = g._tileType.getTileSize(c),
						u = {
							baseTileSize: 1024,
							col: s,
							loopOffsetX: 0,
							mercatorSize: g._tileType.getMercatorSize(c),
							row: l,
							tileSize: h,
							tileTypeName: g.config.tileTypeName,
							useZoom: d,
							ratio: g.ratio,
							zoom: c
						};
					g._tileCache[n].tileInfo = u, g._tileCanvas[n] = i;
					var f = g.indoorDrawLib.parse(o[1], u, n);
					g.setData(f), g.setCurViewLabels(o[1], u), g.drawIndoor(r, o[1], u)
				}
			}), c.addEventListener("updateindoorlabel", function(t) {
				g.labelCanvas = t.labelCanvasDom, g.labelCtx = g.labelCanvas.getContext("2d"), g._labelClick.ratio = g.ratio, g._labelClick._labelCtx = g.labelCtx, g.updateLabel(), delete t.labelCanvasDom, t.type = "onindoorcomplete", g.config.complete(t)
			}), c.addEventListener("indoor_status_changed", function(t) {
				var e = t.uid,
					o = t.floor;
				if (g.temp.indoorId && g.temp.indoorId === e && (g.temp.indoorId = null, g.temp.indoorFloor = null), g.config.showBaseMap ? g.showBaseMap() : g.hideBaseMap(), null === e) e = g.currentUid, g._indoorData[e] && (o = g._indoorData[e].defaultFloor), g._indoorControl && g._indoorControl.hide(), g.currentUid = null, g.enterMethod = null;
				else if (g._indoorData[e]) {
					var n = g._indoorData[e];
					g.config.showIndoorControl && (g._indoorControl ? (g._indoorControl.setInfo(n), g._indoorControl.show()) : (n.currentFloor = o, g._indoorControl = new p(c, g, n))), g.currentUid = e, g.currentFloor = o
				}
				if ("byClick" === g.enterMethod && g._map.closeInfoWindow(), g._indoorData && g._indoorData[e] && g._indoorData[e].currentFloor !== o) {
					if (n) {
						t.currentFloor = g._indoorData[e].currentFloor, t.type = "onbefore_change_floor", g.config.beforeChangeFloor(t), g._indoorData[e].currentFloor = o;
						for (var i = n.tileKeys, r = g._map.getZoom(), a = g._tileType.getDataZoom(r), s = 0; s < i.length; s++) {
							var l = i[s].split("_");
							if (parseInt(l[4], 10) === a && parseInt(l[5], 10) === r) {
								var d = new D("onindoor_data_refresh");
								d.uid = e, d.floor = o, d.tileKey = i[s], g._map.dispatchEvent(d)
							}
						}
						g.updateLabel(), t.currentFloor = g._indoorData[e].currentFloor, t.type = "onafter_change_floor", g.config.afterChangeFloor(t)
					}
				} else g._map.dispatchEvent(new D("onrefresh"))
			}), c.addEventListener("moveend", function(t) {
				"centerAndZoom" !== t._eventSrc && g.config.enableIndoor && g._map.getZoom() >= g.config.minZoom && g._checkIndoorByMove()
			}), c.addEventListener("zoomend", function(t) {
				"centerAndZoom" !== t._eventSrc && (g._map.closeInfoWindow(), g.config.enableIndoor && g._map.getZoom() >= g.config.minZoom ? g._checkIndoorByMove() : "byClick" !== g.enterMethod && null !== g.currentUid && (g.showIndoor(null), g._checkIndoorByMove()))
			}), c.addEventListener("centerandzoom", function() {
				g.config.enableIndoor && g._map.getZoom() >= g.config.minZoom ? g._checkIndoorByMove() : "byClick" !== g.enterMethod && null !== g.currentUid && (g.showIndoor(null), g._checkIndoorByMove())
			}), c.addEventListener("indoor_data_refresh", function(t) {
				var e = g.getTileCache(t.tileKey);
				if (e) {
					var o = e.data,
						n = e.canvasDom.getContext("2d"),
						i = e.tileInfo;
					g.setCurViewLabels(o[1], i), g.drawIndoor(n, o[1], i)
				}
			}), c.addEventListener("click", function(t) {
				var e = g.temp;
				if ((!t.overlay || t.overlay instanceof BMap.Polygon) && t.point) {
					e.curAreaSpot = null;
					var o = new D("onareaspotclick");
					o.point = t.point, o.pixel = t.pixel, o.spots = e.curSpots;
					var n = o.spots || {};
					for (var i in n) {
						var r = n[i].getPosition(),
							a = g.mercatorProjection.lngLatToPoint(r);
						(s = d(g, a)) && (e.curAreaSpot = s)
					}
					if (null === e.curAreaSpot) {
						var s, l = o.point;
						a = g.mercatorProjection.lngLatToPoint(l);
						(s = d(g, a)) && (e.curAreaSpot = s)
					}
					o.curAreaSpot = e.curAreaSpot, g.enterMethod = "byClick", this.dispatchEvent(o)
				}
			}), c.addEventListener("areaspotclick", function(t) {
				var e = null;
				if (t.curAreaSpot && g.areaSpots[t.curAreaSpot] && (e = g.areaSpots[t.curAreaSpot].userData.uid), e === g.currentUid) return t.curAreaSpot && (g.enterMethod = "byClick"), void g.config.indoorClick(t);
				null === e ? g.currentUid && "byClick" === g.enterMethod && (g.currentUid = null, g.currentFloor = null, g.enterMethod = null, g._indoorControl.hide()) : (g.enterMethod = "byClick", g.showIndoor(e, g._indoorData[e].currentFloor), g.config.indoorClick(t))
			})
		},
		enableIndoor: function() {
			this.config.enableIndoor = !0, 19 < this.config.maxZoom && BMAP_NORMAL_MAP.setMaxZoom(this.config.maxZoom), c.show(this.labelCanvas.parentElement), this._map.panTo(this._map.getCenter()), this.showLabels(), this.showIndoorControl()
		},
		disableIndoor: function() {
			this.config.enableIndoor = !1, 19 < this.config.maxZoom && BMAP_NORMAL_MAP.setMaxZoom(19), c.hide(this.labelCanvas.parentElement), this.hideLabels(), this.hideIndoorControl()
		},
		getBuildingId: function() {
			return this.currentUid
		},
		setBuildingId: function(t, e) {
			e = e || {}, c.extend(this.config.getPoiInfoOptions, e), this.temp.isRequestPoiByUid = !0, this.getPoiInfoByUid(t, this.config.getPoiInfoOptions)
		},
		getAllFloors: function(t) {
			return t = t || this.currentUid, this._indoorData[t] && this._indoorData[t].floors
		},
		getFloor: function() {
			return this.currentFloor
		},
		setFloor: function(t) {
			this.currentUid && this.setIndoor(this.currentUid, t)
		},
		getMinZoom: function() {
			return this.config.minZoom
		},
		setMinZoom: function(t) {
			this.config.minZoom = t, this._checkZoom()
		},
		getMaxZoom: function() {
			return this.config.maxZoom
		},
		setMaxZoom: function(t) {
			this.config.maxZoom = t, this._checkZoom(), BMAP_NORMAL_MAP.setMaxZoom(this.config.maxZoom), this._map.setMaxZoom(this.config.maxZoom)
		},
		setOptions: function(t) {
			var e = this,
				o = t.buildingId,
				n = t.floor,
				i = t.maxZoom,
				r = t.minZoom;
			i && i !== e.getMaxZoom && e.setMaxZoom(i), r && r !== e.getMinZoom && e.setMinZoom(r), t = t || {}, c.extend(e.config, t), o ? e.setIndoor(o, n, t) : e.showIndoor(e.currentUid, e.currentFloor)
		},
		showBaseMap: function() {
			this.config.showBaseMap = !0, this._map.setNormalMapDisplay(!0)
		},
		hideBaseMap: function() {
			this.config.showBaseMap = !1, this._map.setNormalMapDisplay(!1)
		},
		setIndoor: function(t, e, o) {
			var n = this;
			if (n._indoorData[t]) {
				o = o || {}, c.extend(n.config, o);
				var i = n._indoorData[t],
					r = i.lnglat,
					a = new BMap.Point(r[0], r[1]),
					s = i.name;
				n._map.panTo(a), n.currentUid = t, n.showIndoor(t, e);
				var l = {
					status: 0,
					info: {
						uid: t,
						center: a,
						address: n._indoorAddres[t],
						name: s
					}
				};
				n.config.getPoiInfoOptions.onRequestSuccess(l), n.config.getPoiInfoOptions.onRequestComplete(l)
			} else n.temp.indoorId = t, n.temp.indoorFloor = e, n.setBuildingId(t, o)
		},
		showIndoorControl: function() {
			this.config.showIndoorControl = !0, this._indoorControl && this._indoorControl.show()
		},
		hideIndoorControl: function() {
			this.config.showIndoorControl = !1, this._indoorControl && this._indoorControl.hide()
		},
		showLabels: function() {
			this.config.showLabel = !0, this.updateLabel()
		},
		hideLabels: function() {
			this.config.showLabel = !1, this.updateLabel()
		},
		getPoiInfoByUid: function(i, t) {
			var r = this;
			t = t || {}, c.extend(r.config.getPoiInfoOptions, t);
			var a = "cbk_indoor_" + r.callbackNum++,
				e = f.poiUrl + "&ak=" + r.authentic_key + "&uid=" + i + "&callback=BMap." + a,
				s = {
					status: 0,
					info: null
				};
			BMap[a] = function(t) {
				if (s.status = t.uii_err, 0 === t.uii_err) {
					var e = t.content;
					r._indoorAddres[i] = e.addr;
					var o = {
						uid: e.uid,
						name: e.name,
						address: e.addr,
						center: ""
					};
					if (e && e.diPointX && e.diPointY) {
						var n = new BMap.Pixel(e.diPointX / 100, e.diPointY / 100);
						o.center = r.mercatorProjection.pointToLngLat(n)
					} else r.config.getPoiInfoOptions.onRequestError(s);
					s.info = o, r.temp.isRequestPoiByUid && (r._map.panTo(o.center), r.temp.isRequestPoiByUid = !1), r.config.getPoiInfoOptions.onRequestSuccess(s)
				} else r.config.getPoiInfoOptions.onRequestError(s);
				r.config.getPoiInfoOptions.onRequestComplete(s), delete BMap[a]
			};
			var o = {
				loadedCbk: BMap[a]
			};
			u(e, o)
		},
		setCurViewLabels: function(t, e) {
			var o = this,
				n = [],
				i = [];
			i.x = e.col, i.y = e.row, i.z = e.zoom, n.tileInfo = [e.col, e.row, e.zoom];
			var r = e.col + "_" + e.row + "_" + e.zoom;
			if (o.config.enableIndoor && t && o._map.getZoom() >= o.config.minZoom) for (var a = o.indoorDrawLib.getPOIData(t, {
				indoorUid: o.currentUid,
				floorName: o.currentFloor
			}), s = 0; s < a.length; s++) n.push({
				indoorLabelData: a[s]
			});
			o.curViewLabels[r] = n
		},
		updateLabel: function() {
			if (!this.config.enableIndoor || !this.config.showLabel || this._map.getZoom() < this.config.minZoom || this._map.getZoom() > this.config.maxZoom) return this.clearLabel(), void this.clearSpots();
			if (this.labelCanvas) {
				(new Date).getTime();
				var t = this._map;
				this.labelCanvas.style.left = -t.offsetX + "px", this.labelCanvas.style.top = -t.offsetY + "px", this.clearLabel();
				var e = this._tileType,
					o = t.getZoom(),
					n = e.getDataZoom(t.getZoom()),
					i = Math.pow(2, o - n);
				this.vectorDrawLib.drawLabels(this.curViewLabels, f.iconUrls, this.labelCtx, e.getTileSize(o), i), this.addSpotData(), this.temp.isPermitSpotOver = !0, 0 < this.curViewLabels.length && (this.isDrawText = !0)
			}
		},
		clearLabel: function() {
			var t = this._map.getSize(),
				e = t.width,
				o = t.height,
				n = this.ratio;
			this.labelCtx && this.labelCtx.clearRect(0, 0, e * n, o * n)
		},
		_checkZoom: function() {
			c.isMobile && (this.initMaxZoom = this.mobileInitMaxZoom);
			var t = this.initMinZoom,
				e = this.initMaxZoom,
				o = this.config;
			o.minZoom < t && (o.minZoom = t), o.maxZoom > e && (o.maxZoom = e)
		},
		_checkIndoorByMove: function() {
			var t = this,
				e = t._map,
				o = e.getSize(),
				n = {
					x: o.width / 2,
					y: o.height / 2
				},
				i = (Math.max(o.width, o.height), []);
			for (var r in t._indoorData) {
				var a = e.pointToPixel({
					lng: t._indoorData[r].lnglat[0],
					lat: t._indoorData[r].lnglat[1]
				}),
					s = m.getDistanceByPixel(n, a);
				i.push({
					uid: r,
					distance: s
				})
			}
			if (0 !== i.length) {
				i.sort(function(t, e) {
					return t.distance - e.distance
				});
				for (var l = i[0], d = e.getCenter(), c = t.mercatorProjection.lngLatToPoint(d), h = !1, u = 0; u < t._indoorData[l.uid].contour.length; u++) if (m.pointInPolygon([c.x, c.y], t._indoorData[l.uid].contour[u])) {
					h = !0;
					break
				}
				if (!1 === h && "e96b44200baa3b4082288acc" === l.uid) {
					var f = t._indoorData[l.uid].boundsMin,
						g = t._indoorData[l.uid].boundsMax;
					c.x > f[0] && c.y > f[1] && c.x < g[0] && c.y < g[1] && (h = !0)
				}
				h ? t.config.autoShowIndoorControl && "byClick" !== t.enterMethod && (null !== t.currentUid && t.currentUid !== l.uid && t.showIndoor(t.currentUid, t.currentFloor), t.currentUid !== l.uid && (l.uid === t.temp.indoorId ? t.showIndoor(t.temp.indoorId, t.temp.indoorFloor) : t.showIndoor(l.uid, t._indoorData[l.uid].currentFloor)), t.enterMethod = "byMove") : "byClick" !== t.enterMethod && t.showIndoor(null)
			}
		},
		drawIndoor: function(t, e, o) {
			var n = this;
			if (window.FeatureStyle && window.iconSetInfo_high) {
				var i = t.canvas,
					r = n.ratio,
					a = o.tileSize;
				1 < r && !i._scale && (t.scale(r, r), i._scale = !0), t.clearRect(0, 0, a, a), n.indoorDrawLib.draw(t, e, o, {
					indoorUid: n.currentUid,
					floorName: n.currentFloor
				}), t.canvas._drawFinished = !0
			} else n.vectorDrawLib.loadStyle(), setTimeout(function() {
				n.drawIndoor(t, e, o)
			}, 10)
		},
		setData: function(t) {
			var e = this;
			if (null !== t) {
				t = t.indoorDataResult;
				for (var o in t) if ("tileInfo" !== o) {
					var n = t[o].tileKey;
					if (e._indoorData[o]) e._indoorData[o][n] || (e._indoorData[o].tileKeys.push(n), e._indoorData[o][n] = !0);
					else {
						e._indoorData[o] = t[o], e._indoorData[o].tileKeys = [t[o].tileKey], e._indoorData[o][n] = !0;
						for (var i = 0; i < e._indoorData[o].contour.length; i++) e.addAreaSpot(e._indoorData[o].contour[i], {
							id: o + i,
							userData: {
								uid: o
							}
						})
					}
				}
				e.config.enableIndoor && e._map.getZoom() >= e.config.minZoom && e._checkIndoorByMove()
			}
		},
		removeData: function(t, e) {
			if (this._indoorData[t]) {
				for (var o = this._indoorData[t], n = 0; n < o.tileKeys.length; n++) if (o.tileKeys[n] === e) {
					o.tileKeys.splice(n, 1);
					break
				}
				delete o[e], 0 === o.tileKeys.length && delete this._indoorData[t]
			}
		},
		getTileCache: function(t) {
			return this._tileCache[t]
		},
		setTileCache: function(t, e) {
			this._tileCache[t] || (this._tileCache[t] = e)
		},
		showIndoor: function(t, e) {
			this._indoorData[t] && !e && (e = this._indoorData[t].defaultFloor);
			var o = new D("onindoor_status_changed");
			o.uid = t, o.floor = e, this._map.dispatchEvent(o)
		},
		addAreaSpot: function(t, e) {
			if (t && 0 !== t.length) {
				e = e || {}, this.areaSpots = this.areaSpots || {};
				var o = e.id || "sp" + this.temp.spotsGuid++;
				return this.areaSpots[o] = {
					spot: t,
					userData: e.userData
				}, o
			}
		},
		getAreaSpot: function(t) {
			return this.areaSpots && this.areaSpots[t] ? this.areaSpots[t] : null
		},
		removeAreaSpot: function(t) {
			t && this.areaSpots[t] && delete this.areaSpots[t]
		},
		clearAreaSpots: function() {
			this.areaSpots = {}
		},
		addSpotData: function() {
			this._spotData = [], this.clearSpots();
			this._map.getZoom();
			for (var t = 0, e = this._computedLabels.length; t < e; t++) {
				var o = this._computedLabels[t];
				if (this.isClickableLabel(o)) {
					var n = o.bds,
						i = null,
						r = [9, 9, 9, 9];
					if (o.pt) {
						var a = new BMap.Pixel(o.pt.lng, o.pt.lat),
							s = (i = this.mercatorProjection.pointToLngLat(a), this._map.pointToPixel(i));
						(r = [])[0] = s.y - n[1], r[1] = n[2] - s.x, r[2] = n[3] - s.y, r[3] = s.x - n[0]
					}
					var l = o.name,
						d = {
							n: l,
							pt: i,
							userdata: {
								iconPoint: i,
								uid: o.uid,
								name: l,
								type: o.icon,
								iconImg: o.iconImg,
								zoom: o.zoom,
								adver_log: o.adver_log || ""
							},
							offsets: r,
							bd: n,
							tag: "INDOOR_SPOT_INFO"
						},
						c = new BMap.Hotspot(i, {
							userData: d.userdata,
							offsets: d.offsets
						});
					this._map.addHotspot(c, d.tag), this._spotData.push(d)
				}
			}
		},
		clearSpots: function() {
			this._map.clearHotspots(this.indoorHotspotTarget)
		},
		isClickableLabel: function(t) {
			return !t.isDel && "line" !== t.type && "0" !== t.uid
		}
	}, t.version = "1.0.1", t.IndoorManager = L, Object.defineProperty(t, "__esModule", {
		value: !0
	})
});