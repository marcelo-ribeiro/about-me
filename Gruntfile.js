module.exports = function (grunt) {
  grunt.initConfig({

    serve: {
      options: {
        port: 9000
      }
    },

    watch: {
      css: {
        files: ['src/assets/scss/**/*.scss', 'src/assets/sass/**/*.sass'],
        tasks: ['css'],
        options: {
          interrupt: true,
          livereload: true,
        }
      },
      js: {
        files: ['src/assets/js/**/*.js'],
        tasks: ['js'],
        options: {
          interrupt: true,
          livereload: true,
        },
      },
      html: {
        files: ['build/**/*.html', 'build/**/*.php'],
        options: {
          interrupt: true,
          livereload: true,
        }
      }
    },

    sass: {
      options: {
        style: 'compressed', // nested, compact, compressed, expanded
        sourcemap: 'none',
        noCache: true
      },
      single_file: {
        files: {
          'build/assets/css/style.css': 'src/assets/scss/style.scss'
        }
      },
      // multiple_files: {
      //   files: [{
      //     expand: true,
      //     cwd: 'src/assets/sass/',
      //     src: ['*.scss', '!_*.scss'],
      //     dest: 'build/assets/css/source/',
      //     ext: '.css'
      //   }]
      // }
    },

    postcss: {
      options: {
        safe: true,
        processors: [require('autoprefixer-core')({browsers: 'last 2 version'})]
      },
      dist: {
        expand: true,
        cascade: true,
        remove: true,
        src: ['*.css', '!_*.css'],
        cwd: 'build/assets/css/',
        dest: 'build/assets/css/'
      }
    },

    uglify: {
      my_target: {
        files: [{
          expand: true,
          flatten: true,
          mangle: false,
          cwd: 'js/',
          src: [
          '*.js',
          '!*.min.js',
          '!all.js',
          ],
          dest: 'js/minified/',
          ext: '.min.js'
        }]
      }
    },

    concat: {
      css: {
        files: {
          'assets/css/style.css': [
          'assets/css/minified/style.min.css'
          ],
        },
      },
      js: {
        options: {
          separator: ';'
        },
        files: {
          'js/all.js': [
          'js/minified/move-top.min.js',
          'js/minified/easing.min.js',
          'js/minified/responsiveslides.min.js',
          'js/minified/jquery.mixitup.min.js',
          'js/minified/jquery.flexisel.min.js',
          ],
        }
      }
    }

});

grunt.loadNpmTasks('grunt-serve');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-postcss');

grunt.registerTask( 'default', [ 'sass', 'postcss', 'watch' ] );
grunt.registerTask( 'css', [ 'sass', 'postcss' ] );
grunt.registerTask( 'js', [ 'uglify', 'concat:js' ] );

};