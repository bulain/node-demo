module.exports = function(grunt) {
  grunt.initConfig({
    jshint : {
      all : ['Gruntfile.js', 'lib/*.js'],
      options : {
        eqnull : true
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint']);

};
