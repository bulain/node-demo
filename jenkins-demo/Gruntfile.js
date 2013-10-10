module.exports = function(grunt) {
  grunt.initConfig({
    clean : {
      target : ['target'],
    },
    jshint : {
      all : ['Gruntfile.js', 'lib/*.js'],
      options : {
        eqnull : true
      },
    },
    jsdoc : {
      dist : {
        src : ['lib/*.js', 'test/*.js'],
        options : {
          destination : 'target/doc'
        }
      }
    },
    shell : {
      options : {
        stdout : true,
        stderr : true,
        failOnError : true
      },
      mocha : {
        command : './node_modules/.bin/mocha --reporter tap'
      },
      jsdoc : {
        command : './node_modules/jsdoc/jsdoc  -d target/doc lib/*.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['jshint', 'shell:mocha']);
  grunt.registerTask('all', ['clean', 'jshint', 'shell:mocha', 'shell:jsdoc']);

};
