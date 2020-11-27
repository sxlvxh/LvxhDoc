function LvxhUtils() {
	var _this = this;
	this.uuid = function() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

		s[8] = s[13] = s[18] = s[23] = "";

		var uuid = s.join("");
		return uuid;
	};
	this.error = function() {
		for (var i = 0; i < arguments.length; i++) {
			window.console && window.console.error(arguments[i]);
		}
	};
	this.log = function() {
		for (var i = 0; i < arguments.length; i++) {
			window.console && window.console.log(arguments[i]);
		}
	};
	this.loadJs = function(url, callback) {
		var script = document.createElement('script'), fn = callback
				|| function() {
				};
		script.type = 'text/javascript';
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
		if (script.readyState) {
			script.onreadystatechange = function() {
				if (script.readyState == 'loaded'
						|| script.readyState == 'complete') {
					script.onreadystatechange = null;
					// _this.error("111");
					fn();
				}
			};

		} else {
			script.onload = function() {
				// _this.error("222");
				fn();
			};
		}

	}
}