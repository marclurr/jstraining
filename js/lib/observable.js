define([], function() {

	function wrapProperty(wrapped, base, property) {
		Object.defineProperty(wrapped, property,
			{
				configurable: true, enumerable: true,
				get: function() { return base[property]; },
				set: function(value) {
					if (base[property] !== value) {
						base[property] = value;
						wrapped.notify(property);
					}
				}
			});

	}

	function wrap(base) {
		var watchers = [];
		var wrapped = {
			watch: function(fn) {
				watchers.push(fn);
			},
			notify: function(propertyName) {
				watchers.forEach(function(fn) {
					fn(propertyName);
				});
			}
		};

		for (var property in base) {
			if (base.hasOwnProperty(property)) {
				wrapProperty(wrapped, base, property);
			}
		}

		return wrapped;
	}

	return {
		wrap: wrap
	};
});