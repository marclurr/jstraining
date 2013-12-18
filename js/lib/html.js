define(["vendor/q", "lib/http"], function(Q, http){

	function _setDom(elementId, html) {
		var div = document.createElement("div");
		div.innerHTML = html;

		var parent = document.getElementById(elementId);
		parent.innerHTML = "";
		parent.appendChild(div);

		return div;
	}

	function load(file, elementId) {
		var deferred = Q.defer();

		elementId = elementId || "app";

		http("GET", "html/"+ file + ".html")
		.then(
			function(text){
				var newDiv = _setDom(elementId, text);
				deferred.resolve(newDiv);
			},
			function(error){
				deferred.reject(error);
			});

		return deferred.promise;

	}

	return {
		load: load
	};

});