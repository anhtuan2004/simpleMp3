/**
 * Created by AT on 10/30/2014.
 */

// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    
    pkg: grunt.file.readJSON('package.json'),
    
    sass: {
      options: {
        sourceMap: true,
        outputStyle: "compact" //compressed
      },
      dist: {
        files: {
          'style.css': 'sass/styles.scss'
        }
      }
    },
    
    watch: {
      sass: {
        files: ['sass/*.scss','sass/*/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true,
        }
      },
      
    }
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('default', ['watch']); //, 'sass'
  // grunt.registerTask('sass', ['watch']);
};