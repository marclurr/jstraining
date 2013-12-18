define(["lib/route"], function (route){

	function makeWindow(hash) {
		var href = "http://rutlandzoo.org/";

		var on = {};

		return {
			location: {
				hash: hash,
				href: href,
				onhashchange: null,
				replace: function(newHref) {
					this.href = newHref;
					this.hash = newHref.substring(newHref.indexOf("#"));
					on.onhashchange();
				}
			},
			addEventListener: function(e, fn) {
				on.onhashchange = fn;
			},
		};
	}

	describe("the route module", function() {
		var called;
		var idValue;

		route("/", function() {
			called = "/";
		});

		route("/animals/{id}", function(id) {
			called = "/animals/{id}";
			idValue = id;
		});

		it("should resolve the ID parameter", function() {
			called = undefined;
			idValue = undefined;
			route.run(makeWindow("#/animals/42"));
			expect(called).toEqual("/animals/{id}");
			expect(idValue).toEqual("42");
		})

		it("should resolve the home route", function() {
			called = undefined;
			route.run(makeWindow("#/"));
			expect(called).toEqual("/");
		});

		it("should redirect to #/ for empty hash", function() {
			called = undefined;
			var win = makeWindow("");
			route.run(win);
			expect(win.location.href).toEqual("http://rutlandzoo.org/#/");
			expect(called).toEqual("/");
		});
	});
});