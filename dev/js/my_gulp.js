//required plugins
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass');

//file structure
var path = {
    html: {
        src: 'dev/*.*',
        trg: 'pub/'
    },
    css: {
        src: 'dev/styles/*.*',
        trg: 'pub/css/'
    },
    js: {
        src: 'dev/scripts/*.*',
        trg: 'pub/js/'
    }
};

//compile html
gulp.task('pug', function() {
    return gulp.src(path.html.src)
        .pipe(pug({
        pretty: '\t'
    }))
        .pipe(gulp.dest(path.html.trg))
});

//compile css
gulp.task('sass', function() {
    return gulp.src(path.css.src)
        .pipe(sass({
        outputStyle: 'compressed'
    }))
        .pipe(gulp.dest(path.css.trg))
});

//watch task
gulp.task('watch', function() {
    gulp.watch(path.html.src, ['pug']);
    gulp.watch(path.css.src, ['sass']);
});