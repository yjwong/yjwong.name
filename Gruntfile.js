/*!
 * Yong Jie's Website - Gruntfile
 * http://yjwong.name
 * Copyright 2014 Wong Yong Jie
 */

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build/'],
    connect: {
      development: {
        options: {
          base: ['build/', '.'],
          hostname: 'localhost',
          livereload: true
        }
      }
    },
    assemble: {
      options: {
        flatten: true,
        partials: ['templates/partials/*.hbs'],
        layoutdir: 'templates/layouts',
        layout: 'default.hbs'
      },
      site: {
        files: {
          'build/': ['templates/*.hbs']
        }
      }
    },
    copy: {
      js: {
        files: [{
          expand: true,
          src: ['js/**'],
          dest: 'build/'
        }]
      },
      img: {
        files: [{
          expand: true,
          src: ['img/**'],
          dest: 'build/'
        }]
      },
      bower: {
        files: [{
          expand: true,
          src: ['bower_components/**'],
          dest: 'build/'
        }]
      },
      misc: {
        files: [{
          expand: true,
          src: ['misc/**'],
          dest: 'build/'
        }]
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js']
    },
    autoprefixer: {
      development: {
        expand: true,
        src: ['build/css/**/*.css'],
        dest: '.'
      }
    },
    sass: {
      development: {
        options: {
          outputStyle: 'nested'
        },
        files: [{
          expand: true,
          src: ['css/**/*.scss'],
          dest: 'build/',
          ext: '.css',
          extDot: 'first'
        }]
      }
    },
    uglify: {
      production: {
        files: [{
          expand: true,
          src: ['js/**/*.js'],
          dest: 'build/'
        }]
      }
    },
    watch: {
      livereload: {
        files: ['build/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['js/**'],
        tasks: [
          'jshint',
          'copy:js'
        ]
      },
      css: {
        files: ['css/**/*.scss'],
        tasks: [
          'wiredep',
          'sass:development',
          'autoprefixer:development'
        ]
      },
      img: {
        files: ['img/**'],
        tasks: ['copy:img']
      },
      misc: {
        files: ['misc/**'],
        tasks: ['copy:misc']
      },
      templates: {
        files: ['templates/**'],
        tasks: [
          'wiredep',
          'assemble'
        ]
      }
    },
    wiredep: {
      all: {
        src: ['css/*.scss', 'templates/layouts/*.hbs'],
        options: {
          ignorePath: '../../'
        }
      }
    }
  });
  
  // Load Grunt tasks.
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-wiredep');
  
  // Serves the build directory.
  grunt.registerTask('serve', [
    'wiredep',
    'sass:development',
    'autoprefixer:development',
    'jshint',
    'assemble',
    'connect',
    'watch'
  ]);
  
  // Register the default task.
  grunt.registerTask('default', [
    'wiredep',
    'sass:development',
    'autoprefixer:development',
    'uglify:production',
    'jshint',
    'assemble',
    'copy:img',
    'copy:bower',
    'copy:misc'
  ]);
};
