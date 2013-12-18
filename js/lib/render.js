define(["vendor/doT"], function(doT) {

	var _key = "ubs-" + Date.now();

	function compileTemplate(templateElement) {
		templateElement.removeAttribute("data-repeat");
		var html = templateElement.outerHTML;
		return doT.template(html);
	}

	function renderElements(value, template, dataNodes, parent, nextSibling) {
		if (value && value.length) {

			var builder = [];
			for (var i = 0; i < value.length; i++) {
				builder.push(template(value[i]));
			}

			var div = document.createElement("div");
			div.innerHTML = builder.join("\n");

			while (div.firstChild) {
				dataNodes.push(div.firstChild);
				parent.insertBefore(div.firstChild, nextSibling);
			}
		}
		
	}

	function renderTemplate(templateElement, value) {
		var parent = templateElement.parentNode;
		var template = compileTemplate(templateElement);
		var dataNodes = [];
		renderElements(value, template, dataNodes, parent, templateElement);

		parent.removeChild(templateElement);

		return {
			parent: parent,
			template: template,
			dataNodes: dataNodes
		};
	}

	function updateFromCache(cacheItem, data) {
		var length = cacheItem.dataNodes.length;
		var nextSibling = length ? cacheItem.dataNodes[length-1].nextSibling : undefined;

		for (var i = length - 1; i >= 0; i--) {
			cacheItem.parent.removeChild(cacheItem.dataNodes[i]);
		}

		cacheItem.dataNodes = [];

		renderElements(data, cacheItem.template, cacheItem.dataNodes, 
			cacheItem.parent, nextSibling);
	}


	function renderRepeaters(element, data) {
		var cache = {};

		for (var property in data) {
			if (data.hasOwnProperty(property)) {
				cache[property] = [];
				var value = data[property];

				var templates = element.querySelectorAll(
					"[data-repeat='" + property + "']");

				for (var i = 0; i < templates.length; i++) {
					var cacheItem = renderTemplate(templates[i],  value);
					cache[property].push(cacheItem);

				}
			}
		}
		element[_key] = cache;
	}

	function update(element, data) {
		var cache = element[_key];
		if (!cache) { return; }

		for (var property in data) {
			if (data.hasOwnProperty(property)) {
				var cacheItem = cache[property];
				if (cacheItem && cacheItem.length) {
					cacheItem.forEach(function(item) {
						updateFromCache(item, data[property]);
					});
				}
			}
		}

	}

	return {
		repeaters: renderRepeaters,
		update: update
	};
});