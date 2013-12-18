define(["lib/html", "vendor/q"], function(html, Q) {
	var _overlayDiv;
	var _deferred;

	function show(htmlPath) {
		_deferred = Q.defer();
		exported.promise = _deferred.promise;

		_overlayDiv = document.getElementById("overlay");
		_overlayDiv.style.visibility = "visible";
		return html.load(htmlPath, "overlay");
	}

	function hide(result) {
		_overlayDiv.style.visibility = "hidden";
		_deferred.resolve(result);
	}

	var exported =  {
		show: show,
		hide: hide
	};

	return exported;

});