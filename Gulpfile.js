const gulp = require('gulp'),
      pug = require('gulp-pug'),
      maps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      connect = require('gulp-connect'),
      jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish'),
      postcss = require('gulp-postcss'),
      lost = require('lost'),
      a_prefix = require('autoprefixer');

const path = {
    pug: 'dev/*.pug',
    html: 'pub/',
    sass: 'dev/sass/**/*.sass',
    css: 'pub/css/',
    js_s: ['dev/js/toolkit.js',             //add JS files in desired order
           'dev/js/plugins.js',
           'dev/js/output.js',
           'dev/js/files_generator/gf_require.js',
           'dev/js/files_generator/gf_server.js',
           'dev/js/files_generator/gf_file_structure.js',
           'dev/js/files_generator/gf_tasks.js',
           'dev/js/files_generator/gf_watch.js',
           'dev/js/files_generator/gf_default.js',
           'dev/js/files_generator/build_gf.js',
           'dev/js/files_generator/build_npm_install.js',
           'dev/js/input_processor.js',
           'dev/js/dom_generators.js', 
           'dev/js/dom_ctrl.js'],
    js_t: 'pub/js/'
};

//error handler
function swallowError(error) {
    console.log('Err_Plugin: ' + error.plugin);
    console.log('Err_Msg: ' + error.message);
    this.emit('end');
}

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
        .pipe(connect.reload());
});

//sass compiler
gulp.task('sass', function() {
    var post_processors = [lost, a_prefix({browsers: ['> 1%']})];
    return gulp.src(path.sass)
        .pipe(maps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', swallowError)
        .pipe(postcss(post_processors))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(path.css))
        .pipe(connect.reload());
});

//js concat + uglify
gulp.task('js', function () {
    return gulp.src(path.js_s)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(maps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify({
            mangle: true
        }))
        .on('error', swallowError)
        .pipe(maps.write('./'))
        .pipe(gulp.dest(path.js_t))
        .pipe(connect.reload());
});

//watch task
gulp.task('watch', function() {
    gulp.watch(path.pug, ['pug']);
    gulp.watch(path.sass, ['sass']);
    gulp.watch(path.js_s, ['js']);
});

gulp.task('default', ['connect', 'watch']);