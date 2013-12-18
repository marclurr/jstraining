define(["lib/route", "lib/html", "lib/http", "lib/render", "app/addAnimal", "lib/bind"], 
	function(route, html, http, render, addAnimal, bind) {
		var _element, _animals;

		var handlers = {
			add: function() {
				addAnimal().then(
					function (newAnimal) {
						if (newAnimal) {
							_animals.items.push(JSON.parse(newAnimal));
							render.update(_element, {animals: _animals.items});
						}
					});
			}
		};

		function _render(element) {
			_element = element;
			http("GET", "/animals").then(
				function (json) {
					_animals = JSON.parse(json);
					render.repeaters(element, {animals: _animals.items});
				},
				function (error) {
					window.alert("Error: " + error);
				});
		}

		function setup(element) {
			_render(element);
			bind.handlers(element, handlers);

			// var clickables = element.querySelectorAll("[data-click]");

			// for (var i = clickables.length - 1; i >= 0; i--) {
			// 	var functionName = clickables[i].attributes["data-click"].value;

			// 	if (handlers[functionName]) {
			// 		clickables[i]
			// 			.addEventListener("click", handlers[functionName]);
			// 	}

			// }
		}

		route("/animals", function() {
			html.load("animals").then(setup);
		});

		return {
			setup: setup
		};

	});