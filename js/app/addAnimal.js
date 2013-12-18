define(["lib/modal", "lib/http"], function(modal, http) {

	function setup(element) {
		var closers = element.querySelectorAll("[data-dismiss]");
		for (var i = closers.length - 1; i >= 0; i--) {
			closers[i].addEventListener("click", modal.hide);
		}

		var form = element.querySelector("form");
		form.addEventListener("submit", function(e){
			e.preventDefault();

			var obj = {};
			var inputs = form.querySelectorAll("input");
			for (var i = inputs.length - 1; i >= 0; i--) {
				var input = inputs[i];
				var id = input.attributes["id"].value;
				obj[id] = input.value;
			}

			http("POST", "/animals", JSON.stringify(obj)).then(
			function(newAnimal) {
				modal.hide(newAnimal);
			}
			);

		});

	}

	function addAnimal() {
		modal.show("addAnimal").then(
			setup, 
			function(error) {
				alert(error);
			});

		return modal.promise;
	}

	return addAnimal;
});