define(["lib/render"], function(render) {
	function createTargetDiv() {
		var templateHtml = 
			  '<ul id="actual"><li data-repeat="animals">'
			+ '<a href="{{=it.id}}">{{=it.name}}</a>'
			+ '</li></ul>';

		var div = document.createElement("div");
		div.innerHTML = templateHtml;

		return div;

	}

	function createDataArray() {
		var animals = [
			{id: 1, name:"Timon"},
			{id: 2, name:"Pumba"}
		];

		return animals;
	}
	describe("The repeaters method", function() {

		it("should render an unordered list", function() {
			var div = createTargetDiv();
			var animals = createDataArray();

			render.repeaters(div, {animals: animals});

			var ul = div.querySelector("#actual");
			var lis = div.querySelectorAll("li");

			expect(lis.length).toEqual(2);

			for (var i = 0; i < lis.length; i++) {
				var li = lis[i];
				var a = li.firstChild;

				expect(a.attributes["href"].value)
					.toEqual(animals[i].id.toString());

				expect(a.innerHTML)
					.toEqual(animals[i].name.toString());
			}

		});


		it("Should update elements from new data", function() {
			var div = createTargetDiv();
			var animals = createDataArray();

			render.repeaters(div, {animals: animals});
			animals.push({id: 3, name: "Something"});
			render.update(div, {animals: animals});
			
			var ul = div.querySelector("#actual");
			var lis = div.querySelectorAll("li");

			expect(lis.length).toEqual(3);

			for (var i = 0; i < lis.length; i++) {
				var li = lis[i];
				var a = li.firstChild;

				expect(a.attributes["href"].value)
					.toEqual(animals[i].id.toString());

				expect(a.innerHTML)
					.toEqual(animals[i].name.toString());
			}
		});
	});
});