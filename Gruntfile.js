module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files: ["js/lib/*.js", "js/app/*.js"],
			options: {
				globals: {
					console: true, 
					module: true,
					document: true
				}
			}
		},
		watch: {
			files: ["<%= jshint.files %>"],
			tasks: ["jshint"]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.registerTask("default", ["jshint"]);
};