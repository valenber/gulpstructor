const gulp = require('gulp'),
      pug = require('gulp-pug'),
      maps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      livereload = require('gulp-livereload'),
      connect = require('gulp-connect');

const path = {
    pug: 'dev/*.pug',
    html: 'pub/',
    sass: 'dev/sass/**/*.sass',
    css: 'pub/css/',
    js_s: 'dev/js/*.js',
    js_t: 'pub/js/'
};

//server
gulp.task('connect', function() {
    connect.server({
        root: path.html,
        livereload: true
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
    return gulp.src(path.sass)
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', sass.logError)
        .pipe(maps.write('./'))
        .pipe(gulp.dest(path.css))
        .pipe(livereload());
});

//js concat + uglify
gulp.task('js', function () {
    return gulp.src(path.js_s)
        .pipe(maps.init())
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