define([], function() {

	var errorCheckers = {
		required: function(field, errorElement) {
			field.addEventListener("change", function() {
				if (field.value) {
					errorElement.style.visibility = "hidden";
				} else {
					errorElement.style.visibility = "visible";
				}

			});
		}
	};

	function initElements(form, element) {
		element.style.visibility = "hidden";
		var  dataFor = element.attributes["data-for"].value;
		var parts = dataFor.split(":");
		var fieldId = parts[0];
		var errorType = parts[1];
		var checker = errorCheckers[errorType];
		if (checker) {
			checker(form.querySelector("#" + fieldId), element);
		}

	}

	function init(form) {
		var errorElements = form.querySelectorAll(".error[data-for]");
		for (var i = errorElements.length - 1; i >= 0; i--) {
			initElements(form, errorElements[i]);
		}
	}

	return {
		init: init
	};

});