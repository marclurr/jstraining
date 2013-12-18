define(["lib/route", "lib/html"], function(route, html){

	route("/", function() {
		html.load("home").then(
			function(element) {
			}
			);
	});
});