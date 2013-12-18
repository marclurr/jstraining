define([], function() {
	var _routes = {};
	var _regexRoutes = [];

	function _doRoute(_window) {
		_window = _window || window;
		var path = _window.location.hash.substring(1);
		if (_routes[path]) {
			_routes[path]();
		} else {
			for (var i = _regexRoutes.length - 1; i >= 0; i--) {
				if (_regexRoutes[i].regex.test(path)) {
					var match = _regexRoutes[i].regex.exec(path);
				var params = match.slice(1, match.length);
				_regexRoutes[i].fn.apply(undefined, params);
			}
			}
		}
	}

	function _run(_window) {
		_window = _window || window;

		_window.addEventListener("hashchange", function() {
			_doRoute(_window);
		});

		if (_window.location.hash === "" || _window.location.hash === "#") {
			_window.location.replace(_window.location.href + "#/");
		} else {
			_doRoute(_window);
		}

	}

	function _extractRegex(path) {
		if (path.indexOf("{") < 0 || path.indexOf("}") < 0) {
			return null;
		}

		var parts = path.split("/");
		for (var i = 0; i < parts.length; i++) {
			if (/^{.+}$/.test(parts[i])) {
				parts[i] = "([^\\/]+)";

			}
		}

		var expr = "^" + parts.join("\\/") + "\\/?$";

		return new RegExp(expr);
	}

	function route(path, fn) {
		var regex = _extractRegex(path);
		if (!regex) {
			_routes[path] = fn;
			return;
		} else {
			_regexRoutes.push({regex: regex, fn: fn});
		}


	}

	route.run = _run;

	return route;
});