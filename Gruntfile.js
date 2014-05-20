'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').publicPath || 'public'
    },
    bower: {
        install: {
              //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
        }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },
    express: {
          options: {
              port: process.env.PORT || 9000
          },
          dev: {
              options: {
                  script: 'server.js'
              }
          }
      },
    open: {
          server: {
              url: 'http://localhost:<%= express.options.port %>'
          }
      },
    watch: {
          express: {
              files: [
                  'server.js',
                  'api/{,*//*}*.{js,json}'
              ],
              tasks: ['express:dev'],
              options: {
                  livereload: true,
                  nospawn: true //Without this option specified express won't be reloaded
              }
          },
          sass: {
              files: ['public/assets/sass/*.scss'],
              tasks: ['sass']
          },
          less: {
            files: ['public/assets/less/*.less'],
            tasks: ['less']
          },
          livereload: {
              options: {
                  livereload: { livereload: true }
              },
              files: [
                  '<%= yeoman.app %>{,*/}*.html',
                  '<%= yeoman.app %>/modules/**/**/{,*/}*.html',
                  '<%= yeoman.app %>/modules/**/**/{,*/}*.js',
                  '<%= yeoman.app %>/assets/sass/{,*/}*.scss'
              ]
          }
      },
      concurrent: {
          test: ['sass','jshint', 'karma']
      },
      sass: {
          dist: {
              options: {
                  includePaths: ['public/assets/sass/'],
                  outputStyle: 'nested'
              },
              files: {
                  'public/assets/css/main.css': 'public/assets/sass/main.scss'
              }
          }
      },
      less: {
          development: {
              options: {
                  compress: true,
                  yuicompress: true,
                  optimization: 2
              },
              files: {
                  "public/assets/css/main.css": "public/assets/less/main.less"
              }
          }
      }

  });
  

  grunt.registerTask('server', [
   'bower',
   'sass',
   'express:dev',
   'open',
   'watch'
  ]);

  grunt.registerTask('test', [
    'bower',
    'concurrent:test'
  ]);

  grunt.registerTask('heroku:production', [
    'bower'
  ]);


  grunt.registerTask('default', [
    //  'jshint',
    'bower'
  ]);

};
