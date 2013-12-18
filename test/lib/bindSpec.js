define(["lib/bind", "lib/observable"], function(bind, observable) {
	describe("form binding", function() {
		function makeForm() {
			var html = '<form><input type="text" id="name"></form>';
			var div = document.createElement("div");
			div.innerHTML = html;
			return div.firstChild;
		}

		it("Should initialise form with object values", function() {
			var form = makeForm();
			var data = observable.wrap({name: "Something"});

			bind.form(form,data);

			expect(form.name.value).toEqual("Something");
		});

		it("should update form with object changes", function() {
			var form = makeForm();
			var data = observable.wrap({name: ""});

			bind.form(form, data);

			data.name = "Pumba";

			expect(form.name.value).toEqual("Pumba");

		});

		it("should update object with form changes", function() {
			var form = makeForm();
			var data = observable.wrap({name: ""});

			bind.form(form, data);

			form.name.value = "Timon";

			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", false, true);
			form.name.dispatchEvent(event);

			expect(data.name).toEqual("Timon");

		});
	});
});