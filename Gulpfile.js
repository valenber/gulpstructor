const gulp = require('gulp'),
      pug = require('gulp-pug'),
      maps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      livereload = require('gulp-livereload'),
      connect = require('gulp-connect'),
      jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish'),
      postcss = require('gulp-postcss'),
      a_prefix = require('autoprefixer');

const path = {
    pug: 'dev/*.pug',
    html: 'pub/',
    sass: 'dev/sass/**/*.sass',
    css: 'pub/css/',
    js_s: ['dev/js/toolkit.js',             //add JS files in desired order
           'dev/js/plugin_library.js', 
           'dev/js/dom_generators.js', 
           'dev/js/dom_handler.js', 
           'dev/js/build_gulp/require.js',
           'dev/js/build_gulp/file_structure.js',
           'dev/js/build_gulp/task.js',
           'dev/js/build_gulp/watch.js',
           'dev/js/build_npm_install.js',
           'dev/js/build_gulp.js',
           'dev/js/input_processor.js'],
    js_t: 'pub/js/'
};

//server
gulp.task('connect', function() {
    connect.server({
        root: path.html,
        livereload: true,
        port: 9000
    })
});

//pug compiler
gulp.task('pug', function() {
    return gulp.src(path.pug)
        .pipe(pug({
            pretty: '\t'
        }))
        .pipe(gulp.dest(path.html))
        .pipe(livereload());
});

//sass compiler
gulp.task('sass', function() {
    var post_processors = [a_prefix({browsers: ['> 1%']})];
    return gulp.src(path.sass)
        .pipe(maps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)
        .pipe(postcss(post_processors))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(path.css))
        .pipe(livereload());
});

//js concat + uglify
gulp.task('js', function () {
    return gulp.src(path.js_s)
        .pipe(maps.init())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest(path.js_t))
        .pipe(livereload());
});

//watch task
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(path.pug, ['pug']);
    gulp.watch(path.sass, ['sass']);
    gulp.watch(path.js_s, ['js']);
});

gulp.task('default', ['connect', 'watch']);