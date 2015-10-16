module.exports = function (grunt) {
  grunt.initConfig({

    serve: {
      options: {
        port: 9000
      }
    },

    watch: {
      html: {
        files: ['**/*.html','**/*.php'],
        options: {
          interrupt: true,
          livereload: true,
        }
      },
      scripts: {
        files: [ 'assets/js/*.js' ],
        tasks: ['prod'],
        options: {
          interrupt: true,
          livereload: true,
        },
      },
      css: {
        files: ['assets/scss/*.scss'],
        tasks: ['css'],
        options: {
          interrupt: true,
          livereload: true,
        }
      }
    },

    sass: {
      options: {
        style: 'expanded',
        sourcemap: 'none',
        noCache: true
      },
      single_file: {
        files: {
          'assets/css/source/style.css': 'assets/scss/style.scss',
// 'assets/css/source/social-icon-link.css': 'assets/components/social-icon-link/sass/social-icon-link.scss'
}
},
// multiple_files: {
//   files: [{
//     expand: true,
//     cwd: 'assets/sass/',
//     src: ['*.scss', '!_*.scss'],
//     dest: 'assets/css/source/',
//     ext: '.css'
//   }]
// }
},

cssmin: {
  my_target: {
    files: [{
      expand: true,
      cwd: 'assets/css/source/',
      src: [
      '*.css', '!_*.css'
      ],
      dest: 'assets/css/minified/',
      ext: '.min.css'
    }]
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
  basic: {
    files: {
      'assets/css/style.css': [
      'assets/css/minified/style.min.css'
      ],
    },
  },
  extras: {
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
    cwd: 'assets/css/source/',
    dest: 'assets/css/source/'
  }
}

});

grunt.loadNpmTasks('grunt-serve');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-postcss');

grunt.registerTask( 'default', [ 'sass', 'postcss', 'cssmin' ] );
grunt.registerTask( 'css', [ 'sass', 'postcss', 'cssmin', 'concat:basic' ] );
grunt.registerTask( 'js', [ 'uglify', 'concat' ] );
grunt.registerTask( 'prod', [ 'cssmin', 'uglify', 'concat' ] );

};