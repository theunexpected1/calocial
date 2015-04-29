'use strict';
module.exports = function(grunt){
	grunt.initConfig({
		watch: {
			css: {
				files: ['./public/css/*.scss', './public/css/*.sass'],
				tasks: ['sass']
			}
		},

		sass: {
			dist: {
				options: {
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: './public/css',
					src: ['*.scss', '*.sass'],
					dest: './public/css',
					ext: '.css'
				}]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', 'sass:dist');

};